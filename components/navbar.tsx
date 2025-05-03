"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close menu when clicking a link
  const handleLinkClick = () => {
    setIsOpen(false)
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b backdrop-blur-md transition-all duration-300",
        scrolled
          ? "bg-white/90 dark:bg-zinc-900/90 border-zinc-200 dark:border-zinc-800"
          : "bg-white/50 dark:bg-zinc-900/50 border-transparent",
      )}
    >
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Link href="/">
            <span className="bg-gradient-to-r from-zinc-900 to-zinc-600 bg-clip-text text-2xl font-extrabold text-transparent dark:from-zinc-100 dark:to-zinc-400 transition-transform hover:scale-105 duration-300">
              Slang<span className="text-zinc-500 dark:text-zinc-400">Tech</span>
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <NavLink href="#" label="Beranda" onClick={handleLinkClick} />
          <NavLink href="#kelas" label="Kelas" onClick={handleLinkClick} />
          <NavLink href="#testimonials" label="Testimonial" onClick={handleLinkClick} />
          <NavLink href="#" label="Kontak" onClick={handleLinkClick} />
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center text-zinc-700 dark:text-zinc-300 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-x-0 top-16 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 md:hidden z-50"
            >
              <div className="container py-4 flex flex-col space-y-4">
                <MobileNavLink href="#" label="Beranda" onClick={handleLinkClick} />
                <MobileNavLink href="#kelas" label="Kelas" onClick={handleLinkClick} />
                <MobileNavLink href="#testimonials" label="Testimonial" onClick={handleLinkClick} />
                <MobileNavLink href="#" label="Kontak" onClick={handleLinkClick} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}

interface NavLinkProps {
  href: string
  label: string
  onClick?: () => void
}

function NavLink({ href, label, onClick }: NavLinkProps) {
  return (
    <Link
      href={href}
      className="text-sm font-medium text-zinc-900 hover:text-zinc-600 dark:text-zinc-200 dark:hover:text-zinc-50 transition-colors relative after:absolute after:bottom-0 after:left-0 after:bg-zinc-900 dark:after:bg-zinc-200 after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:duration-300"
      onClick={onClick}
    >
      {label}
    </Link>
  )
}

function MobileNavLink({ href, label, onClick }: NavLinkProps) {
  return (
    <Link
      href={href}
      className="block py-2 text-base font-medium text-zinc-900 dark:text-zinc-200 hover:text-zinc-600 dark:hover:text-zinc-50 transition-colors"
      onClick={onClick}
    >
      {label}
    </Link>
  )
}
