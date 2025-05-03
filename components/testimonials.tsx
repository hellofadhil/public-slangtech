"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Budi Santoso",
    role: "Web Developer",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "Kelas di SlangTech sangat membantu saya dalam meningkatkan keterampilan programming. Instrukturnya sangat berpengalaman dan materi yang diberikan sangat relevan dengan kebutuhan industri saat ini.",
    company: "Tech Solutions",
  },
  {
    id: 2,
    name: "Siti Rahayu",
    role: "UI/UX Designer",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "Saya mengikuti kelas design di SlangTech dan sangat puas dengan hasilnya. Sekarang saya bisa membuat desain yang lebih profesional dan sesuai dengan standar industri.",
    company: "Creative Studio",
  },
  {
    id: 3,
    name: "Ahmad Hidayat",
    role: "Digital Marketing Specialist",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "Kelas marketing di SlangTech memberikan wawasan baru tentang strategi digital marketing yang efektif. Saya langsung bisa menerapkannya di perusahaan dan hasilnya sangat memuaskan.",
    company: "Growth Marketing",
  },
  {
    id: 4,
    name: "Dewi Lestari",
    role: "Product Manager",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "SlangTech membantu saya memahami product management dengan lebih baik. Kelas yang interaktif dan studi kasus yang relevan membuat pembelajaran menjadi lebih efektif.",
    company: "Innovative Products",
  },
]

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section id="testimonials" className="py-12 md:py-16 lg:py-20 bg-zinc-100 dark:bg-zinc-900">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
          <div className="inline-block rounded-lg bg-zinc-200 px-3 py-1 text-sm dark:bg-zinc-800">Testimonial</div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-zinc-900 dark:text-zinc-50">
            Apa Kata Mereka
          </h2>
          <p className="mx-auto max-w-[700px] text-zinc-500 md:text-xl dark:text-zinc-400">
            Pengalaman peserta yang telah mengikuti kelas di SlangTech
          </p>
        </div>

        <div className="relative mx-auto max-w-4xl">
          <Card className="border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
            <CardContent className="p-6 md:p-10">
              <Quote className="h-10 w-10 text-zinc-300 dark:text-zinc-700 mb-4" />
              <p className="text-lg md:text-xl text-zinc-700 dark:text-zinc-300 mb-6">
                {testimonials[currentIndex].content}
              </p>
              <div className="flex items-center">
                <Avatar className="h-12 w-12 mr-4">
                  <AvatarImage
                    src={testimonials[currentIndex].avatar || "/placeholder.svg"}
                    alt={testimonials[currentIndex].name}
                  />
                  <AvatarFallback>{testimonials[currentIndex].name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-semibold text-zinc-900 dark:text-zinc-50">{testimonials[currentIndex].name}</h4>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    {testimonials[currentIndex].role}, {testimonials[currentIndex].company}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center mt-6 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 w-2 rounded-full transition-all ${
                  index === currentIndex ? "bg-zinc-900 w-6 dark:bg-zinc-100" : "bg-zinc-300 dark:bg-zinc-700"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <div className="absolute top-1/2 -translate-y-1/2 left-0 -ml-4 md:-ml-6">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950"
              onClick={prevTestimonial}
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Previous testimonial</span>
            </Button>
          </div>

          <div className="absolute top-1/2 -translate-y-1/2 right-0 -mr-4 md:-mr-6">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950"
              onClick={nextTestimonial}
            >
              <ChevronRight className="h-5 w-5" />
              <span className="sr-only">Next testimonial</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
