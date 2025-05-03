import ClassGrid from "@/components/class-grid"
import FeaturedClass from "@/components/featured-class"
import { Suspense } from "react"
import { ClassesSkeleton } from "@/components/skeletons"
import { SearchFilter } from "@/components/search-filter"
import { Testimonials } from "@/components/testimonials"
import { Newsletter } from "@/components/newsletter"
import { Navbar } from "@/components/navbar"
import { getClasses } from "@/lib/firebase"
import type { Metadata } from "next"
import { filterClasses } from "@/lib/utils"

export const metadata: Metadata = {
  title: "SlangTech | Kelas Pelatihan Profesional",
  description:
    "SlangTech menyediakan kelas pelatihan profesional untuk meningkatkan keterampilan dan karir Anda. Daftar sekarang dan mulai perjalanan belajar Anda.",
}

export default async function Home({
  searchParams,
}: {
  searchParams: { query?: string; categories?: string; type?: string; status?: string }
}) {
  const allClasses = await getClasses()
  const filteredClasses = filterClasses(allClasses, searchParams)

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <Navbar />

      <main>
        <section className="relative py-20 md:py-28 lg:py-36 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid-pattern.png')] bg-center opacity-5 dark:opacity-10"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-50 to-transparent dark:from-zinc-950 dark:to-transparent"></div>
          <div className="container relative px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-8 text-center">
              <div className="space-y-4 max-w-3xl">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-900 bg-clip-text text-transparent dark:from-zinc-100 dark:via-zinc-300 dark:to-zinc-100">
                  Tingkatkan Keahlian Anda Bersama SlangTech
                </h1>
                <p className="mx-auto max-w-[800px] text-zinc-600 md:text-xl/relaxed lg:text-xl/relaxed dark:text-zinc-400">
                  Platform pelatihan profesional dengan kurikulum terkini dan instruktur berpengalaman. Mulai perjalanan
                  belajar Anda dan raih karir impian.
                </p>
              </div>
              <div className="flex flex-col gap-3 min-[400px]:flex-row">
                <a
                  href="#kelas"
                  className="inline-flex h-11 items-center justify-center rounded-md bg-gradient-to-r from-zinc-800 to-zinc-900 px-8 text-sm font-medium text-zinc-50 shadow transition-all duration-300 hover:shadow-lg hover:from-zinc-700 hover:to-zinc-800 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50 dark:from-zinc-200 dark:to-zinc-50 dark:text-zinc-900 dark:hover:from-zinc-100 dark:hover:to-zinc-200 dark:focus-visible:ring-zinc-300"
                >
                  Lihat Kelas
                </a>
                <a
                  href="/contact"
                  className="inline-flex h-11 items-center justify-center rounded-md border border-zinc-200 bg-white px-8 text-sm font-medium text-zinc-900 shadow-sm transition-all duration-300 hover:bg-zinc-100 hover:text-zinc-900 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:focus-visible:ring-zinc-300"
                >
                  Hubungi Kami
                </a>
              </div>
              <div className="mt-8 flex items-center justify-center space-x-4 text-sm text-zinc-500 dark:text-zinc-400">
                <div className="flex items-center">
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
                    className="mr-2 h-4 w-4"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <span>100+ Kelas</span>
                </div>
                <div className="h-1 w-1 rounded-full bg-zinc-300 dark:bg-zinc-700"></div>
                <div className="flex items-center">
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
                    className="mr-2 h-4 w-4"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <span>50+ Instruktur</span>
                </div>
                <div className="h-1 w-1 rounded-full bg-zinc-300 dark:bg-zinc-700"></div>
                <div className="flex items-center">
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
                    className="mr-2 h-4 w-4"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <span>10.000+ Alumni</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 lg:py-20 bg-white dark:bg-zinc-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
              <div className="inline-block rounded-lg bg-zinc-100 px-3 py-1 text-sm dark:bg-zinc-800">
                Kelas Unggulan
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-zinc-900 dark:text-zinc-50">
                Kelas Terpopuler
              </h2>
              <p className="mx-auto max-w-[700px] text-zinc-500 md:text-xl dark:text-zinc-400">
                Kelas-kelas yang paling diminati oleh peserta kami
              </p>
            </div>

            <Suspense fallback={<div className="h-[400px] flex items-center justify-center">Loading...</div>}>
              <FeaturedClass />
            </Suspense>
          </div>
        </section>

        <section id="kelas" className="py-12 md:py-16 lg:py-20 bg-zinc-50 dark:bg-zinc-950">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
              <div className="inline-block rounded-lg bg-zinc-100 px-3 py-1 text-sm dark:bg-zinc-800">
                Katalog Kelas
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-zinc-900 dark:text-zinc-50">
                Semua Kelas
              </h2>
              <p className="mx-auto max-w-[700px] text-zinc-500 md:text-xl dark:text-zinc-400">
                Pilih kelas yang sesuai dengan kebutuhan dan minat Anda
              </p>
            </div>

            <SearchFilter classes={filteredClasses} />

            <Suspense fallback={<ClassesSkeleton />}>
              <ClassGrid classes={filteredClasses} />
            </Suspense>
          </div>
        </section>

        <Testimonials />

        <Newsletter />
      </main>

      <footer className="border-t bg-white dark:bg-zinc-900 dark:border-zinc-800">
        <div className="container flex flex-col gap-8 py-12 md:py-16">
          <div className="flex flex-col gap-10 md:flex-row md:justify-between">
            <div className="space-y-4 max-w-sm">
              <div className="flex items-center gap-2">
                <span className="bg-gradient-to-r from-zinc-900 to-zinc-600 bg-clip-text text-2xl font-extrabold text-transparent dark:from-zinc-100 dark:to-zinc-400">
                  Slang<span className="text-zinc-500 dark:text-zinc-400">Tech</span>
                </span>
              </div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Platform pelatihan profesional terkemuka di Indonesia. Kami menyediakan kelas-kelas berkualitas tinggi
                untuk membantu Anda meningkatkan keterampilan dan karir.
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors"
                  aria-label="Instagram"
                >
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
                    className="h-5 w-5"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors"
                  aria-label="Twitter"
                >
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
                    className="h-5 w-5"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors"
                  aria-label="Facebook"
                >
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
                    className="h-5 w-5"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors"
                  aria-label="LinkedIn"
                >
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
                    className="h-5 w-5"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect width="4" height="12" x="2" y="9"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:gap-16">
              <div className="space-y-4">
                <h3 className="text-base font-medium text-zinc-900 dark:text-zinc-50">Pelatihan</h3>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="#"
                      className="text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors"
                    >
                      Semua Kelas
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors"
                    >
                      Kelas Private
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors"
                    >
                      Kelas Grup
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors"
                    >
                      Jadwal Kelas
                    </a>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-base font-medium text-zinc-900 dark:text-zinc-50">Perusahaan</h3>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="#"
                      className="text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors"
                    >
                      Tentang Kami
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors"
                    >
                      Karir
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors"
                    >
                      Blog
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors"
                    >
                      Kontak
                    </a>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-base font-medium text-zinc-900 dark:text-zinc-50">Bantuan</h3>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="#"
                      className="text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors"
                    >
                      FAQ
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors"
                    >
                      Syarat & Ketentuan
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors"
                    >
                      Kebijakan Privasi
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors"
                    >
                      Pusat Bantuan
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-t border-zinc-200 dark:border-zinc-800 pt-8">
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              © {new Date().getFullYear()} SlangTech. Hak Cipta Dilindungi.
            </p>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-xs text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors"
              >
                Syarat & Ketentuan
              </a>
              <a
                href="#"
                className="text-xs text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors"
              >
                Kebijakan Privasi
              </a>
              <a
                href="#"
                className="text-xs text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors"
              >
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
