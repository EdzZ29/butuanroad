import { CarIcon, KeyRoundIcon, MessageSquareIcon, ReceiptTextIcon } from "lucide-react"

import { IconTile } from "@/components/reui/icon-tile"
import { SectionHeading } from "@/components/site/section-heading"

const steps = [
  {
    icon: CarIcon,
    title: "Pick a car",
    text: "Browse sedans, MPVs, SUVs, pickups and vans. Choose self-drive or with driver.",
  },
  {
    icon: ReceiptTextIcon,
    title: "Get your quote",
    text: "Set your dates and destination. Your estimated total updates instantly.",
  },
  {
    icon: MessageSquareIcon,
    title: "Send your request",
    text: "Send it by SMS or copy it to Messenger or Viber. We confirm availability.",
  },
  {
    icon: KeyRoundIcon,
    title: "Hit the road",
    text: "Pick up at our garage or have the car delivered. Enjoy the ride.",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-t py-20 sm:py-28">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 sm:px-6">
        <SectionHeading
          eyebrow="How it works"
          title="From quote to keys in minutes"
          align="center"
        />
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <li
                key={step.title}
                className="flex flex-col gap-4 rounded-xl border bg-card p-6"
              >
                <div className="flex items-center justify-between">
                  <IconTile variant="soft" size="lg">
                    <Icon />
                  </IconTile>
                  <span className="font-heading text-sm font-medium text-muted-foreground tabular-nums">
                    0{i + 1}
                  </span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-base font-semibold">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {step.text}
                  </p>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
