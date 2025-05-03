// app/home.server.tsx
import { getClasses } from "@/lib/firebase"

export async function fetchClasses() {
  const classes = await getClasses()
  return classes
}
