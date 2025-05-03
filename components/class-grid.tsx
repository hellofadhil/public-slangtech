"use client"

import ClassCard from "./class-card"
import { motion } from "framer-motion"
import { Class } from "@/lib/types"

interface ClassGridProps {
  classes: Class[]
}

export default function ClassGrid({ classes }: ClassGridProps) {
  if (!classes || classes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">Tidak ada kelas tersedia</h3>
        <p className="text-zinc-500 dark:text-zinc-400 mt-2">
          Silakan coba dengan filter yang berbeda atau periksa kembali nanti untuk kelas baru
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {classes.map((classItem, index) => (
        <motion.div
          key={classItem.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
        >
          <ClassCard classItem={classItem} />
        </motion.div>
      ))}
    </div>
  )
}