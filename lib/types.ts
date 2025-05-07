export type Class = {
  id: number | string
  name: string
  description: string
  category: string
  type: "no private" | "private"
  startDate: number
  endDate: number
  price: number
  status: "active" | "inactive" | "upcoming" | "on going"
  image?: string
  color?: string
  icon?: string
}

export interface Participant {
  id: string
  name: string
  phoneNumber: string
  email: string
  birthDate: number // timestamp
  birthPlace: string
  address: string
  currentResidence: string
  reason: string
  status: "pending" | "accepted" | "rejected" // status peserta (pending menunggu verifikasi)
  lastEducation: string
  classId: string // relasi ke Class
  createdAt: number
  updatedAt: number
}

export interface PaymentFile {
  id: string // ID pembayaran
  participantId: string // ID peserta yang mengirimkan pembayaran
  filePath: string // Path file pembayaran
  verified: boolean // Status verifikasi oleh admin
  verificationDate?: number // Tanggal verifikasi pembayaran
  verificationStatus: "pending" | "verified" | "invalid" // Status verifikasi admin
}




export interface Event {
  id: string
  title: string
  description: string
  categoryId: string
  categoryName: string
  trainerId: string
  trainerName: string
  partnerId?: string
  partnerName?: string
  location: string
  startDate: number
  endDate: number
  price: number
  capacity: number
  enrolled: number
  status: "upcoming" | "ongoing" | "completed" | "cancelled"
  image?: string
  createdAt: number
  updatedAt: number
}

export interface Trainer {
  id: string
  name: string
  email: string
  specialization: string
  bio: string
  experience: number // dalam tahun
  rating?: number
  status: "active" | "inactive"
  avatar?: string
  phone?: string
  socialMedia?: {
    linkedin?: string
    twitter?: string
    website?: string
  }
  createdAt: number
  updatedAt?: number
}

export interface Partner {
  id: string
  name: string
  description: string
  type: "corporate" | "academic" | "nonprofit" | "government"
  website?: string
  logo?: string
  contactName?: string
  contactEmail?: string
  contactPhone?: string
  status: "active" | "inactive"
  createdAt: number
  updatedAt?: number
}

export interface EventCategory {
  id: string
  name: string
  description: string
  color?: string
  icon?: string
  status: "active" | "inactive"
  createdAt: number
  updatedAt?: number
}