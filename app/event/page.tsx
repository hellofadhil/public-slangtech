import EventGrid from "@/components/event-grid"
import { getEvents } from "@/lib/firebase"

export default async function EventPage() {
  const events = await getEvents()

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-6">
      <EventGrid events={events} />
    </div>
  )
}
