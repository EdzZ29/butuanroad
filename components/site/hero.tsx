import Image from "next/image"
import { ArrowRightIcon, ClockIcon, MapPinIcon, PhoneIcon } from "lucide-react"

import { Rating } from "@/components/reui/rating"
import { HeroBookButton, QuickQuote } from "@/components/site/quick-quote"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { site } from "@/lib/site"

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden">
      <Image
        src="/images/bg.jpg"
        alt=""
        fill
        preload
        sizes="100vw"
        className="-z-20 object-cover object-left grayscale"
      />
      <div className="absolute inset-0 -z-10 bg-background/[0.86]" />

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pt-32 pb-20 sm:px-6 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:pt-40 lg:pb-28">
        <div className="flex flex-col items-start gap-7">
          <Badge
            variant="outline"
            className="h-7 gap-2 rounded-full border-primary/40 bg-primary/10 px-3 text-xs text-primary"
          >
            <span className="size-1.5 rounded-full bg-primary" />
            Open 24 hours in Butuan City
          </Badge>

          <h1 className="text-5xl leading-[1.05] font-semibold tracking-tight sm:text-6xl">
            Your road,
            <br />
            <span className="text-primary">your ride.</span>
          </h1>

          <p className="max-w-lg text-lg text-pretty text-muted-foreground">
            Clean, well-maintained cars for rent in Butuan City since{" "}
            {site.since}. Drive yourself or ride with one of our drivers, and
            see your price before you book.
          </p>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <HeroBookButton />
            <Button asChild variant="outline" size="xl">
              <a href={site.phoneHref}>
                <PhoneIcon data-icon="inline-start" />
                Call {site.phone}
              </a>
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Rating
                rating={site.rating}
                size="sm"
                className="[&_[data-slot=rating-star-filled]]:fill-primary [&_[data-slot=rating-star-filled]]:text-primary"
              />
              <span>
                <span className="font-medium text-foreground">
                  {site.rating.toFixed(1)}
                </span>{" "}
                from {site.reviewCount} Google reviews
              </span>
            </div>
            <span className="flex items-center gap-2">
              <ClockIcon className="size-4" />
              24/7 pick-up and return
            </span>
            <span className="flex items-center gap-2">
              <MapPinIcon className="size-4" />
              Based in Butuan City
            </span>
          </div>
        </div>

        <QuickQuote />
      </div>

      <a
        href="#fleet"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground lg:flex"
      >
        See the fleet
        <ArrowRightIcon className="size-3.5 rotate-90" />
      </a>
    </section>
  )
}
