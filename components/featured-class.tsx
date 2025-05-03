import { getFeaturedClasses } from "@/lib/firebase"
import { formatCurrency, formatDate } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Users, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default async function FeaturedClass() {
  const featuredClass = await getFeaturedClasses()

  if (!featuredClass || featuredClass.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">Tidak ada kelas unggulan saat ini</h3>
        <p className="text-zinc-500 dark:text-zinc-400 mt-2">Silakan periksa kembali nanti</p>
      </div>
    )
  }

  const classItem = featuredClass[0]

  return (
    <div className="relative overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800">
      <div className="grid md:grid-cols-2">
        <div className="relative h-64 md:h-auto">
          <Image
            src={classItem.image || "/placeholder.svg?height=400&width=600"}
            alt={classItem.name}
            className="object-cover"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
        <div className="p-6 md:p-8 lg:p-10 flex flex-col">
          <div className="mb-4 flex gap-2">
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
              {classItem.status.charAt(0).toUpperCase() + classItem.status.slice(1)}
            </Badge>
            <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
              {classItem.type === "private" ? "Private" : "Group"}
            </Badge>
          </div>

          <h3 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">{classItem.name}</h3>
          <p className="text-zinc-500 dark:text-zinc-400 mb-2">{classItem.category}</p>

          <p className="text-zinc-700 dark:text-zinc-300 mb-6">{classItem.description}</p>

          <div className="flex flex-col gap-3 text-sm text-zinc-600 dark:text-zinc-400 mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>
                {formatDate(classItem.startDate)} - {formatDate(classItem.endDate)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>{classItem.type === "private" ? "Kelas Private" : "Kelas Grup"}</span>
            </div>
          </div>

          <div className="mt-auto flex items-center justify-between">
            <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{formatCurrency(classItem.price)}</div>
            <Link href={`/register/${classItem.id}`}>
              <Button className="bg-gradient-to-r from-zinc-800 to-zinc-900 hover:from-zinc-700 hover:to-zinc-800 text-white dark:from-zinc-200 dark:to-zinc-50 dark:text-zinc-900 dark:hover:from-zinc-100 dark:hover:to-zinc-200">
                Daftar Sekarang <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
