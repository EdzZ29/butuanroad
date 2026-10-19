"use client"

import { useState } from "react"
import Image from "next/image"
import { ArrowRightIcon, CogIcon, FuelIcon, UsersIcon } from "lucide-react"

import { useBooking } from "@/components/site/booking-context"
import { SectionHeading } from "@/components/site/section-heading"
import { vehicleIcon } from "@/components/site/vehicle-icon"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { peso } from "@/lib/quote"
import {
  categories,
  categoryLabel,
  fleet,
  type Vehicle,
  type VehicleCategory,
} from "@/lib/site"

function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const { startBooking } = useBooking()
  const Icon = vehicleIcon[vehicle.category]

  return (
    <Card className="group gap-0 py-0 transition-colors hover:ring-primary/40">
      <div className="relative flex h-44 items-center justify-center border-b bg-muted/40">
        {vehicle.image ? (
          <Image
            src={vehicle.image}
            alt={vehicle.name}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <Icon
            strokeWidth={1}
            className="size-16 text-muted-foreground/50 transition-colors group-hover:text-primary"
          />
        )}
        <div className="absolute top-3 left-3 flex gap-1.5">
          <Badge variant="secondary">{categoryLabel[vehicle.category]}</Badge>
          {vehicle.driverOnly && <Badge variant="outline">With driver</Badge>}
        </div>
      </div>

      <CardContent className="flex flex-col gap-4 py-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg leading-tight font-semibold">
            {vehicle.name}
          </h3>
          <div className="text-right">
            <div className="font-heading text-xl font-semibold text-primary tabular-nums">
              {peso(vehicle.rates.daily)}
            </div>
            <div className="text-xs text-muted-foreground">per day</div>
          </div>
        </div>
        <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
          <li className="flex items-center gap-1.5">
            <UsersIcon className="size-4" />
            {vehicle.seats} seats
          </li>
          <li className="flex items-center gap-1.5">
            <CogIcon className="size-4" />
            {vehicle.transmission}
          </li>
          <li className="flex items-center gap-1.5">
            <FuelIcon className="size-4" />
            {vehicle.fuel}
          </li>
        </ul>
      </CardContent>

      <CardFooter className="justify-between border-t bg-transparent py-3">
        <span className="text-xs text-muted-foreground">
          12 hrs from {peso(vehicle.rates.halfDay)}
        </span>
        <Button
          variant="ghost"
          size="lg"
          className="text-primary hover:text-primary"
          onClick={() => startBooking(vehicle.id)}
        >
          Book this
          <ArrowRightIcon data-icon="inline-end" />
        </Button>
      </CardFooter>
    </Card>
  )
}

export function Fleet() {
  const [filter, setFilter] = useState<VehicleCategory | "all">("all")
  const visible =
    filter === "all" ? fleet : fleet.filter((v) => v.category === filter)
  const available = categories.filter(
    (c) => c.value === "all" || fleet.some((v) => v.category === c.value)
  )

  return (
    <section id="fleet" className="border-t py-20 sm:py-28">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 sm:px-6">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Our fleet"
            title="Choose your ride"
            description="From city-friendly sedans to 15-seater vans. Every car is cleaned and checked before each trip."
          />
          <ToggleGroup
            type="single"
            variant="outline"
            value={filter}
            onValueChange={(v) => v && setFilter(v as VehicleCategory | "all")}
            className="shrink-0 flex-wrap"
          >
            {available.map((c) => (
              <ToggleGroupItem
                key={c.value}
                value={c.value}
                className="h-9 px-3.5 data-[state=on]:border-primary data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
              >
                {c.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      </div>
    </section>
  )
}
