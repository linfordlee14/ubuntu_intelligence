"use client"

import { useState } from "react"
import Link from "next/link"
import { Shield, MapPin, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const navLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/scenarios", label: "Scenarios" },
  { href: "/decision-support", label: "Decision Support" },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-primary">
              CableGuard AI
            </span>
            <span className="hidden text-[11px] text-muted-foreground sm:block">
              Municipal Decision Support System
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-surface hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
          <div className="ml-3 flex items-center gap-1.5 rounded-full border border-teal/20 bg-teal/5 px-3 py-1.5">
            <MapPin className="h-3.5 w-3.5 text-teal" />
            <span className="text-xs font-medium text-teal">
              Qonce, Eastern Cape
            </span>
          </div>
        </nav>

        {/* Mobile hamburger */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="border-t bg-white px-4 pb-4 pt-2 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block rounded-md px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-surface hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-2 flex items-center gap-1.5 px-3">
            <MapPin className="h-3.5 w-3.5 text-teal" />
            <span className="text-xs font-medium text-teal">
              Qonce, Eastern Cape
            </span>
          </div>
        </div>
      )}
    </header>
  )
}
