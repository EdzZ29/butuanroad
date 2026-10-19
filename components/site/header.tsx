"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { MenuIcon, PhoneIcon } from "lucide-react"

import { Scrollspy } from "@/components/reui/scrollspy"
import { useBooking } from "@/components/site/booking-context"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { navLinks, site } from "@/lib/site"
import { cn } from "@/lib/utils"

export function Brand({ className }: { className?: string }) {
  return (
    <a href="#top" className={cn("flex items-center gap-3", className)}>
      <Image
        src="/images/logo.jpg"
        alt={`${site.name} Car Rental logo`}
        width={40}
        height={40}
        className="size-10 rounded-full ring-1 ring-border"
      />
      <span className="flex flex-col leading-tight">
        <span className="font-heading text-[15px] font-semibold tracking-tight">
          {site.name}
        </span>
        <span className="text-[11px] tracking-wide text-muted-foreground uppercase">
          Car Rental Services
        </span>
      </span>
    </a>
  )
}

export function Header() {
  const { startBooking } = useBooking()
  const docRef = useRef<Document | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    docRef.current = document
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
        scrolled
          ? "border-border bg-background/90 backdrop-blur-md"
          : "border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4 sm:px-6">
        <Brand />

        <Scrollspy
          targetRef={docRef}
          offset={80}
          history={false}
          className="hidden items-center gap-1 lg:flex"
        >
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              data-scrollspy-anchor={link.id}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground data-[active=true]:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </Scrollspy>

        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="lg" className="hidden md:inline-flex">
            <a href={site.phoneHref}>
              <PhoneIcon data-icon="inline-start" />
              {site.phone}
            </a>
          </Button>
          <Button size="lg" className="px-4" onClick={() => startBooking()}>
            Book now
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon-lg"
                className="lg:hidden"
                aria-label="Open menu"
              >
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <Brand />
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4">
                {navLinks.map((link) => (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={() => setOpen(false)}
                    className="rounded-md px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
              <div className="mt-auto flex flex-col gap-2 p-4">
                <Button asChild variant="outline" size="xl">
                  <a href={site.phoneHref}>
                    <PhoneIcon data-icon="inline-start" />
                    Call {site.phone}
                  </a>
                </Button>
                <Button
                  size="xl"
                  onClick={() => {
                    setOpen(false)
                    startBooking()
                  }}
                >
                  Book now
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
