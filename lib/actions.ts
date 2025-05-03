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
  storageBucket: "training-b34f7.firebasestorage.app",
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
}

interface RegistrationData {
  name: string
  phoneNumber: string
  email: string
  birthDate: number
  birthPlace: string
  address: string
  currentResidence: string
  reason: string
  lastEducation: string
  classId: string
  paymentProof: File
}

export async function registerParticipant(data: RegistrationData, type: string) {
  try {
    // Create participant entry
    const participantsRef = ref(database, "participants")
    const newParticipantRef = push(participantsRef)
    const participantId = newParticipantRef.key

    if (!participantId) {
      throw new Error("Failed to generate participant ID")
    }

    const now = Date.now()

    // Upload payment proof to Vercel Blob
    const fileExtension = data.paymentProof.name.split(".").pop()
    const fileName = `payment_proof_${participantId}_${now}.${fileExtension}`

    // Upload to Vercel Blob
    const blob = await put(fileName, data.paymentProof, {
      access: "public",
    })

    const participant: Omit<Participant, "id"> = {
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
      classId: data.classId,
      createdAt: now,
      updatedAt: now,
      type
    }

    await set(newParticipantRef, participant)

    // Create payment file entry
    const paymentFilesRef = ref(database, "payment_files")
    const newPaymentFileRef = push(paymentFilesRef)

    const paymentFile: Omit<PaymentFile, "id"> = {
      participantId,
      filePath: blob.url, // Use the Vercel Blob URL
      verified: false,
      verificationStatus: "pending",
    }

    await set(newPaymentFileRef, paymentFile)

    revalidatePath("/")
    return { success: true, participantId }
  } catch (error) {
    console.error("Error registering participant:", error)
    throw new Error("Failed to register participant")
  }
}
