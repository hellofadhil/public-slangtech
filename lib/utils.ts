import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Class } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatDate(timestamp: number): string {
  const date = new Date(timestamp)
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date)
}

export function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case "active":
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
    case "inactive":
      return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
    case "upcoming":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
    case "on going":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
    default:
      return "bg-zinc-100 text-zinc-800 dark:bg-zinc-800/50 dark:text-zinc-300"
  }
}

export function getUniqueCategories(classes: Class[]): string[] {
  const categories = classes.map((classItem) => classItem.category)
  return [...new Set(categories)].filter(Boolean).sort()
}

export function filterClasses(
  classes: Class[],
  searchParams?: { query?: string; categories?: string; type?: string; status?: string },
) {
  if (!classes || !searchParams) return classes

  return classes.filter((classItem) => {
    // Filter by search query
    if (searchParams.query) {
      const query = searchParams.query.toLowerCase()
      const matchesName = classItem.name.toLowerCase().includes(query)
      const matchesDescription = classItem.description.toLowerCase().includes(query)
      const matchesCategory = classItem.category.toLowerCase().includes(query)

      if (!(matchesName || matchesDescription || matchesCategory)) {
        return false
      }
    }

    // Filter by categories
    if (searchParams.categories) {
      const selectedCategories = searchParams.categories.split(",").filter(Boolean)
      if (selectedCategories.length > 0 && !selectedCategories.includes(classItem.category)) {
        return false
      }
    }

    // Filter by type
    if (searchParams.type && classItem.type !== searchParams.type) {
      return false
    }

    // Filter by status
    if (searchParams.status && classItem.status !== searchParams.status) {
      return false
    }

    return true
  })
}
