import EventGrid from "@/components/event-grid"
import { getEvents } from "@/lib/firebase"

// export default async function EventPage() {
//   const events = await getEvents()

//   return (
//     <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-6">
//       <EventGrid events={events} />
//     </div>
//   )
// }


import ClassGrid from "@/components/class-grid"
import { Suspense } from "react"
import { ClassesSkeleton } from "@/components/skeletons"
import { SearchFilter } from "@/components/search-filter"
import { Testimonials } from "@/components/testimonials"
import { Newsletter } from "@/components/newsletter"
import { getClasses } from "@/lib/firebase"
import type { Metadata } from "next"
import { filterClasses, filterEvents } from "@/lib/utils"

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

  const events = await getEvents()
  const filteredEvents = filterEvents(events, searchParams)

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">

      <main>

        <section id="kelas" className="py-12 md:py-16 lg:py-20 bg-zinc-50 dark:bg-zinc-950">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
              <div className="inline-block rounded-lg bg-zinc-100 px-3 py-1 text-sm dark:bg-zinc-800">
                Katalog Events
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-zinc-900 dark:text-zinc-50">
                Semua Events
              </h2>
              <p className="mx-auto max-w-[700px] text-zinc-500 md:text-xl dark:text-zinc-400">
                Pilih Events yang sesuai dengan kebutuhan dan minat Anda
              </p>
            </div>


            <Suspense fallback={<ClassesSkeleton />}>
                  <EventGrid events={filteredEvents} />
            </Suspense>
          </div>
        </section>

        <Testimonials />

        <Newsletter />
      </main>


    </div>
  )
}
