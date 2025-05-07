"use client"


import { motion } from "framer-motion"
import { Event } from "@/lib/types"
import EventCard from "./event-card"

interface EventGridProps {
  events: Event[]
}

export default function EventGrid({ events }: EventGridProps) {
  if (!events || events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">Tidak ada event tersedia</h3>
        <p className="text-zinc-500 dark:text-zinc-400 mt-2">
          Silakan coba dengan filter yang berbeda atau periksa kembali nanti untuk event baru
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {events.map((event, index) => (
        <motion.div
          key={event.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
        >
          <EventCard event={event} />
        </motion.div>
      ))}
    </div>
  )
}