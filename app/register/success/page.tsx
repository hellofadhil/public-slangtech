import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle, ArrowLeft } from "lucide-react"

export default function RegistrationSuccessPage({
  searchParams,
}: {
  searchParams: { name?: string; class?: string }
}) {
  const name = searchParams.name || "Peserta"
  const className = searchParams.class || "kelas"

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center">
      <div className="container max-w-md px-4 py-16">
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="rounded-full bg-green-100 p-3 dark:bg-green-900/30">
            <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Pendaftaran Berhasil!</h1>
            <p className="text-zinc-600 dark:text-zinc-400">
              Terima kasih, <span className="font-medium">{name}</span>! Pendaftaran Anda untuk {className} telah kami
              terima.
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6 w-full">
            <h2 className="font-medium text-zinc-900 dark:text-zinc-50 mb-4">Langkah Selanjutnya:</h2>
            <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
              <li className="flex items-start">
                <span className="mr-2 mt-0.5 text-green-500">•</span>
                <span>Tim kami akan memverifikasi pembayaran Anda dalam 1x24 jam</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 mt-0.5 text-green-500">•</span>
                <span>Anda akan menerima email konfirmasi setelah pembayaran diverifikasi</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 mt-0.5 text-green-500">•</span>
                <span>Informasi lebih lanjut mengenai kelas akan dikirimkan melalui email</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col w-full gap-3">
            <Link href="/">
              <Button className="w-full bg-gradient-to-r from-zinc-800 to-zinc-900 hover:from-zinc-700 hover:to-zinc-800 text-white dark:from-zinc-200 dark:to-zinc-50 dark:text-zinc-900 dark:hover:from-zinc-100 dark:hover:to-zinc-200">
                <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Beranda
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="w-full">
                Hubungi Kami
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
