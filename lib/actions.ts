"use server"

import { revalidatePath } from "next/cache"
import { getDatabase, ref, push, set } from "firebase/database"
import { initializeApp } from "firebase/app"
import { put } from "@vercel/blob"
import type { Participant, PaymentFile } from "./types"

const firebaseConfig = {
  apiKey: "AIzaSyCDXGe7qYScSvBbT0ed44vfd7yj6GmGcoM",
  authDomain: "training-b34f7.firebaseapp.com",
  databaseURL: "https://training-b34f7-default-rtdb.firebaseio.com",
  projectId: "training-b34f7",
  storageBucket: "training-b34f7.appspot.com",
  messagingSenderId: "946439855027",
  appId: "1:946439855027:web:6176004d1a919aa5be09c6",
  measurementId: "G-77LH0CR4EH",
}

// Initialize Firebase
let app
let database

try {
  app = initializeApp(firebaseConfig)
  database = getDatabase(app)
} catch (error) {
  console.error("Firebase initialization error:", error)
  throw new Error("Failed to initialize Firebase. Please try again later.")
}

interface BaseRegistrationData {
  name: string
  phoneNumber: string
  email: string
  birthDate: number
  birthPlace: string
  address: string
  currentResidence: string
  reason: string
  lastEducation: string
  paymentProof: File
  classId?: string
  eventId?: string
  status_current?: string
}

interface BaseRegistrationDataEvent {
  name: string
  phoneNumber: string
  email: string
  birthDate: number
  birthPlace: string
  address: string
  currentResidence: string
  reason: string
  lastEducation: string
  classId?: string
  eventId?: string
  status_current?: string
}

interface ParticipantEvent {
  id: string
  name: string
  phoneNumber: string
  email: string
  birthDate: number
  birthPlace: string
  address: string
  currentResidence: string
  reason: string
  lastEducation: string
  status_current: string
  status: "pending" | "accepted" | "rejected"
  createdAt: number
  updatedAt: number
  type: "class" | "event"
  classId?: string
  eventId?: string
}

export async function registerParticipant(
  data: BaseRegistrationData,
  type: "class" | "event"
) {
  try {
    if (!app || !database) {
      throw new Error("Database connection not established")
    }

    if (!data.paymentProof) {
      throw new Error("Payment proof is required")
    }

    const participantsRef = ref(database, "participants")
    const newParticipantRef = push(participantsRef)
    const participantId = newParticipantRef.key

    if (!participantId) {
      throw new Error("Failed to generate participant ID")
    }

    const now = Date.now()
    const fileExtension = data.paymentProof.name.split(".").pop()
    const fileName = `payment_proof_${participantId}_${now}.${fileExtension}`

    let blob
    try {
      blob = await put(fileName, data.paymentProof, { access: "public" })
    } catch (uploadError) {
      console.error("File upload error:", uploadError)
      throw new Error("Failed to upload payment proof")
    }

    const participantData: Omit<Participant, "id"> = {
      name: data.name,
      phoneNumber: data.phoneNumber,
      email: data.email,
      birthDate: data.birthDate,
      birthPlace: data.birthPlace,
      address: data.address,
      currentResidence: data.currentResidence,
      reason: data.reason,
      status: "pending",
      lastEducation: data.lastEducation,
      createdAt: now,
      updatedAt: now,
      type,
      ...(type === "class" ? { classId: data.classId! } : { eventId: data.eventId! }),
    }

    await set(newParticipantRef, participantData)

    const paymentFilesRef = ref(database, "payment_files")
    const newPaymentFileRef = push(paymentFilesRef)

    const paymentFile: Omit<PaymentFile, "id"> = {
      participantId,
      filePath: blob.url,
      verified: false,
      verificationStatus: "pending",
    }

    await set(newPaymentFileRef, paymentFile)

    revalidatePath("/")
    return { success: true, participantId }
  } catch (error) {
    console.error("Error registering participant:", error)
    throw error instanceof Error
      ? error
      : new Error("Failed to register participant")
  }
}

export async function registerParticipantEvent(
  data: BaseRegistrationDataEvent,
  type: "class" | "event"
) {
  try {
    if (!app || !database) {
      throw new Error("Database connection not established")
    }

    const participantsRef = ref(database, "participants")
    const newParticipantRef = push(participantsRef)
    const participantId = newParticipantRef.key

    if (!participantId) {
      throw new Error("Failed to generate participant ID")
    }

    const now = Date.now()

    const participantData: Omit<ParticipantEvent, "id"> = {
      name: data.name,
      phoneNumber: data.phoneNumber,
      email: data.email,
      birthDate: data.birthDate,
      birthPlace: data.birthPlace,
      address: data.address,
      currentResidence: data.currentResidence,
      reason: data.reason,
      lastEducation: data.lastEducation,
      status_current: data.status_current || "pending",
      status: "accepted", // Automatically set to accepted
      createdAt: now,
      updatedAt: now,
      type,
      ...(type === "class" ? { classId: data.classId } : { eventId: data.eventId }),
    }

    await set(newParticipantRef, participantData)

    revalidatePath("/")
    return { success: true, participantId }
  } catch (error) {
    console.error("Error registering participant:", error)
    throw error instanceof Error
      ? error
      : new Error("Failed to register participant")
  }
}