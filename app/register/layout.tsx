import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Pendaftaran Kelas | SlangTech",
  description: "Formulir pendaftaran kelas pelatihan di SlangTech",
}

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
