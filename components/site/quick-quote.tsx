"use client"

import { ArrowRightIcon, ReceiptTextIcon } from "lucide-react"

import { useBooking } from "@/components/site/booking-context"
import {
  DateRangeField,
  ServiceChoice,
  TimeField,
  VehicleSelect,
} from "@/components/site/fields"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { peso } from "@/lib/quote"
import { fleet } from "@/lib/site"

const lowestDaily = Math.min(...fleet.map((v) => v.rates.daily))

export function HeroBookButton() {
  const { startBooking } = useBooking()
  return (
    <Button size="xl" onClick={() => startBooking()}>
      Book a car
      <ArrowRightIcon data-icon="inline-end" />
    </Button>
  )
}

export function QuickQuote() {
  const { state, update, vehicle, quote, setStep } = useBooking()

  const continueBooking = () => {
    setStep(quote ? 2 : 1)
    document.getElementById("book")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <Card className="w-full gap-0 bg-card/95 py-0 shadow-2xl shadow-black/40 backdrop-blur [--card-spacing:--spacing(5)] sm:[--card-spacing:--spacing(6)]">
      <CardHeader className="border-b py-5">
        <CardTitle className="flex items-center gap-2 text-lg">
          <ReceiptTextIcon className="size-4 text-primary" />
          Instant quote
        </CardTitle>
        <CardDescription>
          Pick a car and dates to see your estimate.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-4 py-5">
        <ServiceChoice
          value={state.service}
          driverOnly={vehicle?.driverOnly}
          onChange={(service) => update({ service })}
        />

        <div className="flex flex-col gap-2">
          <Label htmlFor="qq-vehicle">Vehicle</Label>
          <VehicleSelect
            id="qq-vehicle"
            value={state.vehicleId}
            onChange={(vehicleId) => update({ vehicleId })}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="qq-dates">Dates</Label>
          <DateRangeField
            id="qq-dates"
            value={state.range}
            onChange={(range) => update({ range })}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-2">
            <Label htmlFor="qq-pickup-time">Pick-up time</Label>
            <TimeField
              id="qq-pickup-time"
              label="Pick-up time"
              value={state.pickupTime}
              onChange={(pickupTime) => update({ pickupTime })}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="qq-return-time">Return time</Label>
            <TimeField
              id="qq-return-time"
              label="Return time"
              value={state.returnTime}
              onChange={(returnTime) => update({ returnTime })}
            />
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex-col items-stretch gap-4 border-t bg-muted/40 py-5">
        <div className="flex items-end justify-between gap-4">
          <div className="flex flex-col gap-0.5">
            <span className="text-xs text-muted-foreground">
              {quote ? "Estimated total" : "Starting at"}
            </span>
            <span className="font-heading text-3xl font-semibold tracking-tight tabular-nums">
              {quote
                ? peso(quote.total)
                : peso(vehicle?.rates.daily ?? lowestDaily)}
              {!quote && (
                <span className="text-sm font-normal text-muted-foreground">
                  {" "}
                  / day
                </span>
              )}
            </span>
          </div>
          {quote && (
            <span className="text-right text-xs text-muted-foreground">
              {quote.isHalfDay
                ? "12-hour rental"
                : `${quote.days} ${quote.days === 1 ? "day" : "days"}`}
              {quote.deposit > 0 && (
                <>
                  <br />+ {peso(quote.deposit)} refundable deposit
                </>
              )}
            </span>
          )}
        </div>
        <Button size="xl" onClick={continueBooking}>
          {quote ? "Continue booking" : "Start booking"}
          <ArrowRightIcon data-icon="inline-end" />
        </Button>
      </CardFooter>
    </Card>
  )
}
