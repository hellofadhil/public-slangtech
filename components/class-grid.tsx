"use client"

import ClassCard from "./class-card"
import { motion } from "framer-motion"
import { Class } from "@/lib/types"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

interface ClassGridProps {
  classes: Class[]
}

// Fungsi membagi array jadi dua bagian sama besar
function splitClassesEvenly(classes: Class[]) {
  const half = Math.ceil(classes.length / 2)
  return [classes.slice(0, half), classes.slice(half)]
}

export default function ClassGrid({ classes }: ClassGridProps) {
  if (!classes || classes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
          Tidak ada kelas tersedia
        </h3>
        <p className="text-zinc-500 dark:text-zinc-400 mt-2">
          Silakan coba dengan filter yang berbeda atau periksa kembali nanti untuk kelas baru
        </p>
      </div>
    )
  }

  const [firstHalf, secondHalf] = splitClassesEvenly(classes)

  return (
    <div className="space-y-10">
      {[firstHalf, secondHalf].map((group, groupIndex) => (
        <Carousel
          key={groupIndex}
          opts={{ align: "start", loop: true }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {group.map((classItem, index) => (
              <CarouselItem
                key={classItem.id}
                className="pl-4 w-full sm:basis-full md:basis-1/2 lg:basis-1/3"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="h-full"
                >
                  <ClassCard classItem={classItem} />
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-1" />
          <CarouselNext className="right-1" />
        </Carousel>
      ))}
    </div>
  )
}
