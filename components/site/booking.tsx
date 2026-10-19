"use client"

import { format } from "date-fns"
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  CopyIcon,
  IdCardIcon,
  MessageSquareIcon,
  PhoneIcon,
  RotateCcwIcon,
} from "lucide-react"
import { toast } from "sonner"

import { Frame, FrameHeader, FramePanel, FrameTitle } from "@/components/reui/frame"
import { IconTile } from "@/components/reui/icon-tile"
import {
  Stepper,
  StepperContent,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperNav,
  StepperPanel,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/components/reui/stepper"
import { useBooking } from "@/components/site/booking-context"
import {
  controlClass,
  DateRangeField,
  ServiceChoice,
  TimeField,
  VehicleSelect,
} from "@/components/site/fields"
import { SectionHeading } from "@/components/site/section-heading"
import { vehicleIcon } from "@/components/site/vehicle-icon"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { formatTime, peso } from "@/lib/quote"
import { site } from "@/lib/site"
import { cn } from "@/lib/utils"

const steps = [
  { title: "Trip", description: "Car and schedule" },
  { title: "Details", description: "How to reach you" },
  { title: "Send", description: "Review and request" },
]

function Field({
  label,
  htmlFor,
  hint,
  children,
  className,
}: {
  label: string
  htmlFor?: string
  hint?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  )
}

function OptionButton({
  selected,
  onClick,
  children,
}: {
  selected: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onClick}
      className={cn(
        "h-10 rounded-lg border px-3 text-sm transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
        selected
          ? "border-primary bg-primary/10 text-foreground"
          : "border-input bg-input/30 text-muted-foreground hover:bg-input/50"
      )}
    >
      {children}
    </button>
  )
}

function useBookingMessage() {
  const { state, vehicle, pickup, dropoff, withDriver, quote } = useBooking()
  if (!vehicle || !pickup || !dropoff || !quote) return ""

  const lines = [
    `Hi ${site.name}! I'd like to book a car.`,
    "",
    `Vehicle: ${vehicle.name} (${withDriver ? "with driver" : "self-drive"})`,
    `Pick-up: ${format(pickup, "EEE, MMM d, yyyy")} at ${formatTime(state.pickupTime)}`,
    `Return: ${format(dropoff, "EEE, MMM d, yyyy")} at ${formatTime(state.returnTime)}`,
    `Destination: ${state.destination === "city" ? "Within Butuan City" : `Outside Butuan City (${state.destinationNote})`}`,
  ]
  if (state.address) {
    lines.push(`${withDriver ? "Pick-up point" : "Delivery address"}: ${state.address}`)
  }
  lines.push(`Estimated total: ${peso(quote.total)}`)
  lines.push("", `Name: ${state.name}`, `Phone: ${state.phone}`)
  if (state.email) lines.push(`Email: ${state.email}`)
  if (state.notes) lines.push(`Notes: ${state.notes}`)
  return lines.join("\n")
}

function TripStep() {
  const { state, update, vehicle, pickup, dropoff, withDriver } = useBooking()
  const badTimes = pickup && dropoff && dropoff <= pickup

  return (
    <div className="flex flex-col gap-6">
      <Field label="Service">
        <ServiceChoice
          value={state.service}
          driverOnly={vehicle?.driverOnly}
          onChange={(service) => update({ service })}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Vehicle" htmlFor="bk-vehicle">
          <VehicleSelect
            id="bk-vehicle"
            value={state.vehicleId}
            onChange={(vehicleId) => update({ vehicleId })}
          />
        </Field>
        <Field label="Dates" htmlFor="bk-dates">
          <DateRangeField
            id="bk-dates"
            value={state.range}
            onChange={(range) => update({ range })}
          />
        </Field>
        <Field label="Pick-up time" htmlFor="bk-pickup-time">
          <TimeField
            id="bk-pickup-time"
            label="Pick-up time"
            value={state.pickupTime}
            onChange={(pickupTime) => update({ pickupTime })}
          />
        </Field>
        <Field label="Return time" htmlFor="bk-return-time">
          <TimeField
            id="bk-return-time"
            label="Return time"
            value={state.returnTime}
            onChange={(returnTime) => update({ returnTime })}
          />
        </Field>
      </div>
      {badTimes && (
        <p className="-mt-3 text-sm text-destructive">
          Return time must be after the pick-up time.
        </p>
      )}

      <Separator />

      <Field label="Where are you headed?">
        <div role="radiogroup" className="grid grid-cols-2 gap-2">
          <OptionButton
            selected={state.destination === "city"}
            onClick={() => update({ destination: "city" })}
          >
            Within Butuan City
          </OptionButton>
          <OptionButton
            selected={state.destination === "outside"}
            onClick={() => update({ destination: "outside" })}
          >
            Outside Butuan City
          </OptionButton>
        </div>
      </Field>
      {state.destination === "outside" && (
        <Field label="Destination" htmlFor="bk-destination">
          <Input
            id="bk-destination"
            className={controlClass}
            placeholder="e.g. Surigao City, Bukidnon"
            value={state.destinationNote}
            onChange={(e) => update({ destinationNote: e.target.value })}
          />
        </Field>
      )}

      {withDriver ? (
        <Field
          label="Pick-up point"
          htmlFor="bk-address"
          hint="Optional. Where should our driver meet you?"
        >
          <Input
            id="bk-address"
            className={controlClass}
            placeholder="Hotel, airport, or home address"
            value={state.address}
            onChange={(e) => update({ address: e.target.value })}
          />
        </Field>
      ) : (
        <div className="flex flex-col gap-3">
          <Label className="flex items-start gap-3 rounded-lg border bg-input/30 p-3 font-normal">
            <Checkbox
              checked={state.delivery}
              onCheckedChange={(v) => update({ delivery: v === true })}
              className="mt-0.5"
            />
            <span className="flex flex-col gap-0.5">
              <span className="text-sm font-medium">
                Deliver and collect the car
              </span>
              <span className="text-xs text-muted-foreground">
                We bring the car to you within Butuan City. Otherwise, pick it
                up at our garage.
              </span>
            </span>
          </Label>
          {state.delivery && (
            <Field label="Delivery address" htmlFor="bk-address">
              <Input
                id="bk-address"
                className={controlClass}
                placeholder="Street, barangay, landmark"
                value={state.address}
                onChange={(e) => update({ address: e.target.value })}
              />
            </Field>
          )}
        </div>
      )}
    </div>
  )
}

function DetailsStep() {
  const { state, update, withDriver } = useBooking()
  return (
    <div className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" htmlFor="bk-name">
          <Input
            id="bk-name"
            autoComplete="name"
            className={controlClass}
            placeholder="Juan Dela Cruz"
            value={state.name}
            onChange={(e) => update({ name: e.target.value })}
          />
        </Field>
        <Field label="Mobile number" htmlFor="bk-phone">
          <Input
            id="bk-phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            className={controlClass}
            placeholder="09XX XXX XXXX"
            value={state.phone}
            onChange={(e) => update({ phone: e.target.value })}
          />
        </Field>
      </div>
      <Field label="Email" htmlFor="bk-email" hint="Optional">
        <Input
          id="bk-email"
          type="email"
          autoComplete="email"
          className={controlClass}
          placeholder="you@example.com"
          value={state.email}
          onChange={(e) => update({ email: e.target.value })}
        />
      </Field>
      <Field label="Notes" htmlFor="bk-notes" hint="Optional">
        <Textarea
          id="bk-notes"
          rows={3}
          placeholder="Flight details, child seat, number of passengers, anything we should know"
          value={state.notes}
          onChange={(e) => update({ notes: e.target.value })}
        />
      </Field>
      {!withDriver && (
        <div className="flex items-start gap-3 rounded-lg border bg-muted/40 p-4">
          <IconTile variant="soft" size="sm">
            <IdCardIcon />
          </IconTile>
          <p className="text-sm text-muted-foreground">
            For self-drive, please bring a valid driver&apos;s license and one
            other government-issued ID when you pick up the car.
          </p>
        </div>
      )}
    </div>
  )
}

function SendStep() {
  const message = useBookingMessage()
  const smsHref = `sms:${site.smsNumber}?&body=${encodeURIComponent(message)}`

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message)
      toast.success("Booking details copied", {
        description: "Paste them into Messenger, Viber or SMS.",
      })
    } catch {
      toast.error("Couldn't copy. Please select the text and copy it manually.")
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <p className="text-sm text-muted-foreground">
        Send us your request and we&apos;ll confirm availability and your final
        price. Nothing is charged online.
      </p>
      <pre className="max-h-72 overflow-auto rounded-lg border bg-muted/40 p-4 font-sans text-sm leading-relaxed whitespace-pre-wrap">
        {message}
      </pre>
      <div className="grid gap-2 sm:grid-cols-3">
        <Button asChild size="xl">
          <a href={smsHref}>
            <MessageSquareIcon data-icon="inline-start" />
            Send via SMS
          </a>
        </Button>
        <Button variant="outline" size="xl" onClick={copy}>
          <CopyIcon data-icon="inline-start" />
          Copy details
        </Button>
        <Button asChild variant="outline" size="xl">
          <a href={site.phoneHref}>
            <PhoneIcon data-icon="inline-start" />
            Call us
          </a>
        </Button>
      </div>
    </div>
  )
}

function QuoteSummary() {
  const { state, vehicle, pickup, dropoff, withDriver, quote } = useBooking()
  const Icon = vehicle ? vehicleIcon[vehicle.category] : null

  const trip = [
    { label: "Service", value: withDriver ? "With driver" : "Self-drive" },
    {
      label: "Pick-up",
      value: pickup
        ? `${format(pickup, "EEE, MMM d")}, ${formatTime(state.pickupTime)}`
        : "Not set",
    },
    {
      label: "Return",
      value: dropoff
        ? `${format(dropoff, "EEE, MMM d")}, ${formatTime(state.returnTime)}`
        : "Not set",
    },
    {
      label: "Destination",
      value: state.destination === "city" ? "Within the city" : "Out of town",
    },
  ]

  return (
    <Frame spacing="lg" className="lg:sticky lg:top-24">
      <FrameHeader>
        <FrameTitle>Your quote</FrameTitle>
      </FrameHeader>
      <FramePanel className="flex flex-col gap-5">
        <div className="flex items-center gap-3">
          {Icon ? (
            <IconTile variant="soft" size="lg">
              <Icon />
            </IconTile>
          ) : (
            <IconTile variant="outline" size="lg" className="text-muted-foreground">
              <ArrowRightIcon />
            </IconTile>
          )}
          <div className="flex flex-col">
            <span className="font-medium">
              {vehicle?.name ?? "No vehicle yet"}
            </span>
            <span className="text-xs text-muted-foreground">
              {vehicle
                ? `${vehicle.seats} seats, ${vehicle.transmission.toLowerCase()}`
                : "Pick one to see your price"}
            </span>
          </div>
        </div>

        <dl className="flex flex-col gap-2.5 text-sm">
          {trip.map((row) => (
            <div key={row.label} className="flex justify-between gap-4">
              <dt className="text-muted-foreground">{row.label}</dt>
              <dd className="text-right">{row.value}</dd>
            </div>
          ))}
        </dl>

        <Separator />

        {quote ? (
          <>
            <dl className="flex flex-col gap-2.5 text-sm">
              {quote.lines.map((line) => (
                <div key={line.label} className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">{line.label}</dt>
                  <dd className="tabular-nums">{peso(line.amount)}</dd>
                </div>
              ))}
            </dl>
            <div className="flex items-end justify-between gap-4 rounded-lg bg-muted/60 px-4 py-3">
              <span className="text-sm text-muted-foreground">
                Estimated total
              </span>
              <span className="font-heading text-2xl font-semibold text-primary tabular-nums">
                {peso(quote.total)}
              </span>
            </div>
            {quote.deposit > 0 && (
              <p className="text-xs text-muted-foreground">
                Plus a {peso(quote.deposit)} refundable security deposit.
              </p>
            )}
          </>
        ) : (
          <p className="text-sm text-muted-foreground">
            Your price breakdown appears here once you choose a car and dates.
          </p>
        )}
      </FramePanel>
      <p className="px-4 pt-1 pb-2 text-xs text-muted-foreground">
        Estimate based on current rates. Fuel and tolls not included.
      </p>
    </Frame>
  )
}

export function Booking() {
  const { state, step, setStep, vehicle, quote, pickup, reset } = useBooking()

  const tripValid =
    !!vehicle &&
    !!quote &&
    (state.destination === "city" || state.destinationNote.trim().length > 1) &&
    (!state.delivery || state.service === "driver" || vehicle.driverOnly || state.address.trim().length > 3)
  const detailsValid =
    state.name.trim().length > 1 && state.phone.replace(/\D/g, "").length >= 10

  const canEnter = (n: number) =>
    n === 1 || (n === 2 && tripValid) || (n === 3 && tripValid && detailsValid)
  const canContinue = step === 1 ? tripValid : detailsValid

  const goTo = (n: number) => {
    setStep(n)
    document.getElementById("book")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id="book" className="border-t bg-card/40 py-20 sm:py-28">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 sm:px-6">
        <SectionHeading
          eyebrow="Book and get a quote"
          title="Reserve your car in three steps"
          description="See your estimated total as you go. When you're ready, send the request and we'll confirm."
        />

        <div className="grid items-start gap-6 lg:grid-cols-[1fr_380px]">
          <Card className="gap-0 py-0">
            <Stepper
              value={step}
              onValueChange={(n) => canEnter(n) && setStep(n)}
              indicators={{ completed: <CheckIcon className="size-3.5" /> }}
            >
              <StepperNav className="border-b px-5 py-5 sm:px-6">
                {steps.map((s, i) => {
                  const n = i + 1
                  return (
                    <StepperItem
                      key={s.title}
                      step={n}
                      disabled={!canEnter(n)}
                      className="relative"
                    >
                      <StepperTrigger className="gap-3 rounded-lg text-left">
                        <StepperIndicator className="size-7 text-xs data-[state=inactive]:bg-muted data-[state=inactive]:text-muted-foreground">
                          {n}
                        </StepperIndicator>
                        <div className="hidden flex-col gap-1 sm:flex">
                          <StepperTitle>{s.title}</StepperTitle>
                          <StepperDescription className="text-xs">
                            {s.description}
                          </StepperDescription>
                        </div>
                      </StepperTrigger>
                      {n < steps.length && (
                        <StepperSeparator className="mx-3 group-data-[state=completed]/step:bg-primary" />
                      )}
                    </StepperItem>
                  )
                })}
              </StepperNav>

              <StepperPanel className="p-5 sm:p-6">
                <StepperContent value={1}>
                  <TripStep />
                </StepperContent>
                <StepperContent value={2}>
                  <DetailsStep />
                </StepperContent>
                <StepperContent value={3}>
                  <SendStep />
                </StepperContent>
              </StepperPanel>
            </Stepper>

            <div className="flex items-center justify-between gap-3 border-t px-5 py-4 sm:px-6">
              {step > 1 ? (
                <Button variant="ghost" size="lg" onClick={() => goTo(step - 1)}>
                  <ArrowLeftIcon data-icon="inline-start" />
                  Back
                </Button>
              ) : (
                <span className="text-xs text-muted-foreground">
                  {pickup ? "Looks good so far." : "Step 1 of 3"}
                </span>
              )}
              {step < 3 ? (
                <Button
                  size="lg"
                  className="px-4"
                  disabled={!canContinue}
                  onClick={() => goTo(step + 1)}
                >
                  Continue
                  <ArrowRightIcon data-icon="inline-end" />
                </Button>
              ) : (
                <Button variant="ghost" size="lg" onClick={reset}>
                  <RotateCcwIcon data-icon="inline-start" />
                  Start over
                </Button>
              )}
            </div>
          </Card>

          <QuoteSummary />
        </div>
      </div>
    </section>
  )
}
