"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      toast({
        title: "Error",
        description: "Silakan masukkan alamat email Anda",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Berhasil!",
        description: "Terima kasih telah berlangganan newsletter kami",
      })
      setEmail("")
      setIsLoading(false)
    }, 1000)
  }

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white dark:bg-zinc-950">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2 max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-zinc-900 dark:text-zinc-50">
              Dapatkan Informasi Terbaru
            </h2>
            <p className="mx-auto max-w-[700px] text-zinc-500 md:text-xl dark:text-zinc-400">
              Berlangganan newsletter kami untuk mendapatkan informasi terbaru tentang kelas dan promo menarik
            </p>
          </div>
          <div className="w-full max-w-md">
            <form onSubmit={handleSubmit} className="flex w-full max-w-md flex-col gap-2 sm:flex-row">
              <Input
                type="email"
                placeholder="Masukkan email Anda"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
              />
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-gradient-to-r from-zinc-800 to-zinc-900 hover:from-zinc-700 hover:to-zinc-800 text-white dark:from-zinc-200 dark:to-zinc-50 dark:text-zinc-900 dark:hover:from-zinc-100 dark:hover:to-zinc-200"
              >
                {isLoading ? "Mengirim..." : "Berlangganan"}
              </Button>
            </form>
            <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
              Kami tidak akan pernah membagikan email Anda kepada pihak lain.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
