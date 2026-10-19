import { Brand } from "@/components/site/header"
import { navLinks, site } from "@/lib/site"

export function Footer() {
  return (
    <footer className="border-t bg-card/40 pb-24 md:pb-0">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr]">
        <div className="flex flex-col gap-4">
          <Brand />
          <p className="max-w-xs text-sm text-muted-foreground">
            {site.tagline}. Self-drive and chauffeured car rental in Butuan
            City since {site.since}.
          </p>
        </div>
        <div className="flex flex-col gap-3 text-sm">
          <span className="font-medium">Explore</span>
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="flex flex-col gap-3 text-sm">
          <span className="font-medium">Get in touch</span>
          <a
            href={site.phoneHref}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            {site.phone}
          </a>
          <span className="text-muted-foreground">
            {site.address.line1}
            <br />
            {site.address.line2}
          </span>
          <span className="text-muted-foreground">{site.hours}</span>
        </div>
      </div>
      <div className="border-t">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <span>{site.legalName}</span>
          <span>Serving Butuan City and Caraga since {site.since}</span>
        </div>
      </div>
    </footer>
  )
}
