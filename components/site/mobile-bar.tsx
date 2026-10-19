"use client"

import { PhoneIcon } from "lucide-react"

import { useBooking } from "@/components/site/booking-context"
import { Button } from "@/components/ui/button"
import { peso } from "@/lib/quote"
import { site } from "@/lib/site"

export function MobileBar() {
  const { quote, startBooking } = useBooking()

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t bg-background/95 p-3 backdrop-blur-md md:hidden">
      <div className="flex gap-2">
        <Button asChild variant="outline" size="xl" className="flex-1">
          <a href={site.phoneHref}>
            <PhoneIcon data-icon="inline-start" />
            Call
          </a>
        </Button>
        <Button size="xl" className="flex-[2]" onClick={() => startBooking()}>
          {quote ? `Book for ${peso(quote.total)}` : "Get a quote"}
        </Button>
      </div>
    </div>
  )
}
