"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { format } from "date-fns"
import { CalendarIcon, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { toast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { registerParticipant, registerParticipantEvent } from "@/lib/actions"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const formSchema = z.object({
  name: z.string().min(3, { message: "Nama harus minimal 3 karakter" }),
  phoneNumber: z.string().min(10, { message: "Nomor telepon tidak valid" }),
  email: z.string().email({ message: "Email tidak valid" }),
  birthDate: z.date({ required_error: "Tanggal lahir wajib diisi" }),
  birthPlace: z.string().min(2, { message: "Tempat lahir wajib diisi" }),
  address: z.string().min(5, { message: "Alamat wajib diisi" }),
  currentResidence: z.string().min(5, { message: "Alamat domisili wajib diisi" }),
  lastEducation: z.string().min(2, { message: "Pendidikan terakhir wajib diisi" }),
  reason: z.string().min(10, { message: "Alasan mengikuti event wajib diisi" }),
  status_current: z.string( {
    required_error: "Status saat ini wajib dipilih",
  }),
})

type FormValues = z.infer<typeof formSchema>

interface RegistrationFormProps {
  eventId: string
  className: string
}

export function RegistrationFormEvent({ eventId, className }: RegistrationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [step, setStep] = useState(1)
  const router = useRouter()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phoneNumber: "",
      email: "",
      birthPlace: "",
      address: "",
      currentResidence: "",
      lastEducation: "",
      reason: "",
      status_current: "",
    },
  })

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true)

    try {
      // Convert birthDate to timestamp
      const birthDateTimestamp = data.birthDate.getTime()

      const registrationData = {
        ...data,
        birthDate: birthDateTimestamp,
        eventId: eventId,
      };

      await registerParticipantEvent(registrationData, "event");

      toast({
        title: "Pendaftaran Berhasil!",
        description: "Data Anda telah berhasil dikirim.",
      })

      // Redirect to success page
      router.push(`/register/success?name=${encodeURIComponent(data.name)}&class=${encodeURIComponent(className)}`)
    } catch (error) {
      console.error("Registration error:", error)
      toast({
        title: "Pendaftaran Gagal",
        description: "Terjadi kesalahan saat mengirim data. Silakan coba lagi.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const nextStep = async () => {
    const fieldsToValidate =
      step === 1
        ? ["name", "phoneNumber", "email", "birthDate", "birthPlace"]
        : ["address", "currentResidence", "lastEducation", "reason", "status_current"]

    const result = await form.trigger(fieldsToValidate as any)
    if (result) {
      setStep(step + 1)
    }
  }

  const prevStep = () => {
    setStep(step - 1)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {step === 1 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Lengkap</FormLabel>
                    <FormControl>
                      <Input placeholder="Masukkan nama lengkap" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nomor Telepon</FormLabel>
                    <FormControl>
                      <Input placeholder="Contoh: 081234567890" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Masukkan email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="birthDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Tanggal Lahir</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "dd MMMM yyyy")
                            ) : (
                              <span>Pilih tanggal</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <input
                          type="date"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          value={
                            field.value ? format(field.value, "yyyy-MM-dd") : ""
                          }
                          onChange={(e) => {
                            const date = e.target.value
                              ? new Date(e.target.value)
                              : null;
                            field.onChange(date);
                          }}
                          max={format(new Date(), "yyyy-MM-dd")}
                          min="1900-01-01"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="birthPlace"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tempat Lahir</FormLabel>
                    <FormControl>
                      <Input placeholder="Masukkan tempat lahir" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alamat KTP</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Masukkan alamat sesuai KTP"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="currentResidence"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alamat Domisili</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Masukkan alamat domisili saat ini"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastEducation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pendidikan Terakhir</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Contoh: S1 Teknik Informatika"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status_current"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status Saat Ini</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih status saat ini" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Pelajar">Pelajar</SelectItem>
                      <SelectItem value="CPMI">CPMI</SelectItem>
                      <SelectItem value="PMI">PMI</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alasan Mengikuti Event</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Ceritakan alasan Anda ingin mengikuti kelas ini"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        <div className="flex justify-between pt-4 border-t border-zinc-200 dark:border-zinc-800">
          {step > 1 && (
            <Button type="button" variant="outline" onClick={prevStep}>
              Sebelumnya
            </Button>
          )}

          {step < 2 ? (
            <Button type="button" className="ml-auto" onClick={nextStep}>
              Selanjutnya
            </Button>
          ) : (
            <Button
              type="submit"
              className="ml-auto bg-gradient-to-r from-zinc-800 to-zinc-900 hover:from-zinc-700 hover:to-zinc-800 text-white dark:from-zinc-200 dark:to-zinc-50 dark:text-zinc-900 dark:hover:from-zinc-100 dark:hover:to-zinc-200"
              disabled={isSubmitting}
            >
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Kirim Pendaftaran
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}