"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Upload, X, FileText, ImageIcon } from "lucide-react"
import Image from "next/image"

interface FileUploaderProps {
  value?: File
  onChange: (file: File) => void
  accept?: string
  maxSize?: number // in MB
}

export function FileUploader({ value, onChange, accept = ".jpg,.jpeg,.png,.pdf", maxSize = 5 }: FileUploaderProps) {
  const [dragActive, setDragActive] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const validateFile = (file: File): boolean => {
    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      setError(`Ukuran file terlalu besar. Maksimal ${maxSize}MB.`)
      return false
    }

    // Check file type
    const acceptedTypes = accept.split(",").map((type) => type.trim())
    const fileExtension = `.${file.name.split(".").pop()?.toLowerCase()}`

    if (
      !acceptedTypes.some((type) => {
        if (type.startsWith(".")) {
          return fileExtension === type
        } else {
          return file.type.match(type)
        }
      })
    ) {
      setError(`Format file tidak didukung. Gunakan ${accept.replace(/\./g, "")}`)
      return false
    }

    setError(null)
    return true
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      if (validateFile(file)) {
        onChange(file)
        if (file.type.startsWith("image/")) {
          const reader = new FileReader()
          reader.onload = (e) => {
            setPreview(e.target?.result as string)
          }
          reader.readAsDataURL(file)
        } else {
          setPreview(null)
        }
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()

    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (validateFile(file)) {
        onChange(file)
        if (file.type.startsWith("image/")) {
          const reader = new FileReader()
          reader.onload = (e) => {
            setPreview(e.target?.result as string)
          }
          reader.readAsDataURL(file)
        } else {
          setPreview(null)
        }
      }
    }
  }

  const handleClick = () => {
    inputRef.current?.click()
  }

  const removeFile = () => {
    onChange(undefined as any)
    setError(null)
    setPreview(null)
    if (inputRef.current) {
      inputRef.current.value = ""
    }
  }

  const getFileIcon = () => {
    if (!value) return null

    if (value.type.startsWith("image/")) {
      return <ImageIcon className="h-6 w-6 text-zinc-500" />
    } else {
      return <FileText className="h-6 w-6 text-zinc-500" />
    }
  }

  return (
    <div className="space-y-4">
      <div
        className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-md transition-colors ${
          dragActive ? "border-zinc-500 bg-zinc-100 dark:bg-zinc-800" : "border-zinc-300 dark:border-zinc-700"
        } ${value ? "bg-zinc-50 dark:bg-zinc-900" : ""}`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        <input ref={inputRef} type="file" accept={accept} onChange={handleChange} className="hidden" />

        {value ? (
          <div className="flex flex-col items-center justify-center p-4 w-full">
            {preview ? (
              <div className="relative h-20 w-full max-w-[200px] rounded-md overflow-hidden">
                <Image src={preview || "/placeholder.svg"} alt="Preview" fill className="object-cover" />
              </div>
            ) : (
              <div className="flex items-center space-x-2 mb-2">
                {getFileIcon()}
                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300 truncate max-w-[200px]">
                  {value.name}
                </span>
              </div>
            )}
            <div className="flex items-center mt-2">
              <Button type="button" variant="outline" size="sm" onClick={removeFile} className="text-xs">
                <X className="h-4 w-4 mr-1" /> Hapus File
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-4" onClick={handleClick}>
            <Upload className="h-8 w-8 text-zinc-500 mb-2" />
            <p className="text-sm text-zinc-600 dark:text-zinc-400 text-center">
              <span className="font-medium">Klik untuk upload</span> atau drag and drop
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-1">
              {accept.replace(/\./g, "").toUpperCase()} (Maks. {maxSize}MB)
            </p>
          </div>
        )}
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}
