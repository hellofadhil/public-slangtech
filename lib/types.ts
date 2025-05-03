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
