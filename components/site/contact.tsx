import { ClockIcon, ExternalLinkIcon, MapPinIcon, PhoneIcon } from "lucide-react"

import { IconTile } from "@/components/reui/icon-tile"
import { SectionHeading } from "@/components/site/section-heading"
import { Button } from "@/components/ui/button"
import { site } from "@/lib/site"

export function Contact() {
  const cards = [
    {
      icon: PhoneIcon,
      title: "Call or text",
      body: (
        <a href={site.phoneHref} className="text-primary hover:underline">
          {site.phone}
        </a>
      ),
    },
    {
      icon: MapPinIcon,
      title: "Visit us",
      body: (
        <>
          {site.address.line1}
          <br />
          {site.address.line2}
        </>
      ),
    },
    {
      icon: ClockIcon,
      title: "Hours",
      body: site.hours,
    },
  ]

  return (
    <section id="contact" className="border-t py-20 sm:py-28">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 sm:px-6">
        <SectionHeading
          eyebrow="Contact"
          title="We're always open"
          description="Drop by our garage, give us a call, or send a text. Day or night."
        />

        <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
          <div className="flex flex-col gap-4">
            {cards.map((card) => {
              const Icon = card.icon
              return (
                <div
                  key={card.title}
                  className="flex items-start gap-4 rounded-xl border bg-card p-5"
                >
                  <IconTile variant="soft">
                    <Icon />
                  </IconTile>
                  <div className="flex flex-col gap-1 text-sm">
                    <span className="font-medium">{card.title}</span>
                    <span className="leading-relaxed text-muted-foreground">
                      {card.body}
                    </span>
                  </div>
                </div>
              )
            })}
            <Button asChild variant="outline" size="xl">
              <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer">
                Get directions
                <ExternalLinkIcon data-icon="inline-end" />
              </a>
            </Button>
          </div>

          <div className="relative min-h-80 overflow-hidden rounded-xl border bg-card">
            <iframe
              title={`Map to ${site.legalName}`}
              src={site.mapEmbedUrl}
              className="absolute inset-0 size-full border-0 grayscale-[0.4] invert-[0.92] hue-rotate-180"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
