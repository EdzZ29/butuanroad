import { ExternalLinkIcon, QuoteIcon } from "lucide-react"

import { Rating } from "@/components/reui/rating"
import { SectionHeading } from "@/components/site/section-heading"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { reviews, reviewTags, site } from "@/lib/site"

const starClass =
  "[&_[data-slot=rating-star-filled]]:fill-primary [&_[data-slot=rating-star-filled]]:text-primary"

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
}

export function Reviews() {
  return (
    <section id="reviews" className="border-t py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[340px_1fr]">
        <div className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="Reviews"
            title="Rated 5.0 by our renters"
          />
          <div className="flex flex-col gap-3 rounded-xl border bg-card p-6">
            <div className="flex items-baseline gap-2">
              <span className="font-heading text-5xl font-semibold tracking-tight">
                {site.rating.toFixed(1)}
              </span>
              <span className="text-sm text-muted-foreground">out of 5</span>
            </div>
            <Rating rating={site.rating} className={starClass} />
            <p className="text-sm text-muted-foreground">
              Based on {site.reviewCount} reviews on Google
            </p>
            <div className="flex flex-wrap gap-1.5 pt-2">
              {reviewTags.map((tag) => (
                <Badge key={tag.label} variant="outline" className="h-6 gap-1.5">
                  {tag.label}
                  <span className="text-muted-foreground">{tag.count}</span>
                </Badge>
              ))}
            </div>
          </div>
          <Button asChild variant="outline" size="xl" className="self-start">
            <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer">
              Read all reviews on Google
              <ExternalLinkIcon data-icon="inline-end" />
            </a>
          </Button>
        </div>

        <div className="grid content-start gap-4 md:grid-cols-2">
          {reviews.map((review, i) => (
            <figure
              key={review.name}
              className={
                "flex flex-col gap-5 rounded-xl border bg-card p-6" +
                (i === 0 ? " md:col-span-2" : "")
              }
            >
              <div className="flex items-center justify-between">
                <Rating rating={5} size="sm" className={starClass} />
                <QuoteIcon className="size-5 text-primary/60" />
              </div>
              <blockquote
                className={
                  "leading-relaxed text-pretty" + (i === 0 ? " text-lg" : "")
                }
              >
                {review.text}
              </blockquote>
              <figcaption className="mt-auto flex items-center gap-3">
                <Avatar>
                  <AvatarFallback className="bg-primary/15 text-xs font-medium text-primary">
                    {initials(review.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{review.name}</span>
                  <span className="text-xs text-muted-foreground">
                    Google review
                  </span>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
