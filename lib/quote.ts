import { fees, type Vehicle } from "@/lib/site"

export type ServiceType = "self" | "driver"
export type Destination = "city" | "outside"

export type QuoteInput = {
  vehicle?: Vehicle
  service: ServiceType
  pickup?: Date
  dropoff?: Date
  destination: Destination
  delivery: boolean
}

export type QuoteLine = { label: string; amount: number }

export type Quote = {
  hours: number
  days: number
  isHalfDay: boolean
  lines: QuoteLine[]
  total: number
  deposit: number
}

export function peso(amount: number) {
  return "₱" + Math.round(amount).toLocaleString("en-US")
}

/** Combine a date with an "HH:mm" time string. */
export function withTime(date: Date | undefined, time: string | null) {
  if (!date || !time) return undefined
  const [h, m] = time.split(":").map(Number)
  const d = new Date(date)
  d.setHours(h, m, 0, 0)
  return d
}

/** "14:30" to "2:30 PM" */
export function formatTime(time: string | null) {
  if (!time) return ""
  const [h, m] = time.split(":").map(Number)
  const period = h >= 12 ? "PM" : "AM"
  const hour = h % 12 === 0 ? 12 : h % 12
  return `${hour}:${String(m).padStart(2, "0")} ${period}`
}

export function computeQuote(input: QuoteInput): Quote | null {
  const { vehicle, service, pickup, dropoff, destination, delivery } = input
  if (!vehicle || !pickup || !dropoff) return null

  const hours = (dropoff.getTime() - pickup.getTime()) / 36e5
  if (hours <= 0) return null

  const isHalfDay = hours <= 12
  const days = isHalfDay ? 1 : Math.ceil(hours / 24)
  const { rates } = vehicle

  let base: number
  let baseLabel: string
  if (isHalfDay) {
    base = rates.halfDay
    baseLabel = "12-hour rental"
  } else if (days >= 30) {
    base = (rates.monthly / 30) * days
    baseLabel = `${days} days at monthly rate`
  } else if (days >= 7) {
    base = (rates.weekly / 7) * days
    baseLabel = `${days} days at weekly rate`
  } else {
    base = rates.daily * days
    baseLabel = `${days} ${days === 1 ? "day" : "days"} x ${peso(rates.daily)}`
  }

  const lines: QuoteLine[] = [{ label: baseLabel, amount: Math.round(base) }]
  const withDriver = service === "driver" || vehicle.driverOnly

  if (withDriver) {
    lines.push({
      label: `Driver, ${days} ${days === 1 ? "day" : "days"}`,
      amount: fees.driverPerDay * days,
    })
  }
  if (destination === "outside") {
    lines.push({
      label: `Out-of-town, ${days} ${days === 1 ? "day" : "days"}`,
      amount: fees.outOfTownPerDay * days,
    })
  }
  if (delivery && !withDriver) {
    lines.push({
      label: "Delivery and pick-up",
      amount: fees.deliveryEachWay * 2,
    })
  }

  return {
    hours,
    days,
    isHalfDay,
    lines,
    total: lines.reduce((sum, l) => sum + l.amount, 0),
    deposit: withDriver ? 0 : fees.securityDeposit,
  }
}
