import { getEventById } from "@/lib/firebase"
import { notFound } from "next/navigation"
import { formatCurrency } from "@/lib/utils"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { RegistrationFormEvent } from "@/components/registration-form-event"

export default async function RegisterPage({ params }: { params: { eventId: string } }) {
  const eventItem = await getEventById(params.eventId)

  if (!eventItem) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="container px-4 md:px-6 py-10">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Kembali ke Beranda
        </Link>

        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden">
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">{eventItem.title}</h2>
                  <p className="text-zinc-500 dark:text-zinc-400 mb-4">{eventItem.categoryName}</p>

                  <div className="border-t border-zinc-200 dark:border-zinc-800 my-4 pt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-zinc-600 dark:text-zinc-400">Biaya Kelas</span>
                      <span className="font-semibold text-zinc-900 dark:text-zinc-50">
                        {formatCurrency(eventItem.price)}
                      </span>
                    </div>
                    {/* <div className="flex justify-between items-center mb-2">
                      <span className="text-zinc-600 dark:text-zinc-400">Tipe Kelas</span>
                      <span className="font-semibold text-zinc-900 dark:text-zinc-50">
                        {eventItem.type === "private" ? "Private" : "Group"}
                      </span>
                    </div> */}
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-600 dark:text-zinc-400">Status</span>
                      <span className="font-semibold text-zinc-900 dark:text-zinc-50">
                        {eventItem.status.charAt(0).toUpperCase() + eventItem.status.slice(1)}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-zinc-200 dark:border-zinc-800 my-4 pt-4">
                    <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Petunjuk Pembayaran:</h3>
                    <ol className="list-decimal list-inside text-sm text-zinc-600 dark:text-zinc-400 space-y-2">
                      <li>
                        Transfer biaya kelas ke rekening berikut:
                        <div className="ml-5 mt-1">
                          <p>Bank BCA</p>
                          <p>No. Rek: 1011811944</p>
                          <p>a.n. Hannan Azka Tuminem</p>
                        </div>
                      </li>
                      <li>Simpan bukti pembayaran (screenshot/foto)</li>
                      <li>Upload bukti pembayaran pada form pendaftaran</li>
                      <li>Tunggu konfirmasi dari admin (1x24 jam)</li>
                    </ol>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Butuh Bantuan?</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                  Jika Anda memiliki pertanyaan atau mengalami kesulitan dalam proses pendaftaran, silakan hubungi tim
                  support kami.
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 text-zinc-600 dark:text-zinc-400"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  <span className="text-zinc-600 dark:text-zinc-400">+62 812-3456-7890</span>
                </div>
                <div className="flex items-center gap-2 text-sm mt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 text-zinc-600 dark:text-zinc-400"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </svg>
                  <span className="text-zinc-600 dark:text-zinc-400">support@slangtech.com</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 md:p-8">
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Formulir Pendaftaran</h1>
                <p className="text-zinc-500 dark:text-zinc-400 mt-1">
                  Silakan lengkapi data diri Anda untuk mendaftar kelas {eventItem.title}
                </p>
              </div>

              <RegistrationFormEvent eventId={params.eventId} className={eventItem.title} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
