import { PhoneIcon } from "lucide-react"

import { SectionHeading } from "@/components/site/section-heading"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { faqs, site } from "@/lib/site"

export function Faq() {
  return (
    <section id="faq" className="border-t bg-card/40 py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[340px_1fr] lg:gap-12">
        <div className="flex flex-col gap-6">
          <SectionHeading
            eyebrow="FAQ"
            title="Good to know"
            description="Can't find your answer? Call or text us any time."
          />
          <Button asChild variant="outline" size="xl" className="self-start">
            <a href={site.phoneHref}>
              <PhoneIcon data-icon="inline-start" />
              {site.phone}
            </a>
          </Button>
        </div>
        <Accordion
          type="single"
          collapsible
          defaultValue="item-0"
          className="rounded-xl border bg-card px-5"
        >
          {faqs.map((faq, i) => (
            <AccordionItem key={faq.q} value={`item-${i}`}>
              <AccordionTrigger className="py-5 text-base hover:no-underline">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-muted-foreground">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
