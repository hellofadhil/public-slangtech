import type { Metadata } from 'next'
import './globals.css'
import Footer from '@/components/footer'
import { Navbar } from '@/components/navbar'

export const metadata: Metadata = {
  title: "SlangTech | Kelas Pelatihan Profesional",
  description:
    "SlangTech menyediakan kelas pelatihan profesional untuk meningkatkan keterampilan dan karir Anda. Daftar sekarang dan mulai perjalanan belajar Anda.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar/>
        {children}
        <Footer/>
        </body>
    </html>
  )
}
