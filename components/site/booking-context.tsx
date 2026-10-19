"use client"

import { createContext, useContext, useState } from "react"
import type { DateRange } from "react-day-picker"

import { fleet } from "@/lib/site"
import {
  computeQuote,
  withTime,
  type Destination,
  type ServiceType,
} from "@/lib/quote"

export type BookingState = {
  service: ServiceType
  vehicleId: string
  range: DateRange | undefined
  pickupTime: string | null
  returnTime: string | null
  destination: Destination
  destinationNote: string
  delivery: boolean
  address: string
  name: string
  phone: string
  email: string
  notes: string
}

const initialState: BookingState = {
  service: "self",
  vehicleId: "",
  range: undefined,
  pickupTime: "09:00",
  returnTime: "09:00",
  destination: "city",
  destinationNote: "",
  delivery: false,
  address: "",
  name: "",
  phone: "",
  email: "",
  notes: "",
}

function useBookingValue() {
  const [state, setState] = useState<BookingState>(initialState)
  const [step, setStep] = useState(1)

  const update = (patch: Partial<BookingState>) =>
    setState((prev) => ({ ...prev, ...patch }))

  const vehicle = fleet.find((v) => v.id === state.vehicleId)
  const pickup = withTime(state.range?.from, state.pickupTime)
  const dropoff = withTime(state.range?.to ?? state.range?.from, state.returnTime)
  const withDriver = state.service === "driver" || !!vehicle?.driverOnly

  const quote = computeQuote({
    vehicle,
    service: state.service,
    pickup,
    dropoff,
    destination: state.destination,
    delivery: state.delivery,
  })

  /** Jump to the booking form, optionally choosing a vehicle first. */
  const startBooking = (vehicleId?: string) => {
    if (vehicleId) {
      const picked = fleet.find((v) => v.id === vehicleId)
      update({
        vehicleId,
        ...(picked?.driverOnly ? { service: "driver" as const } : {}),
      })
    }
    setStep(1)
    document.getElementById("book")?.scrollIntoView({ behavior: "smooth" })
  }

  const reset = () => {
    setState(initialState)
    setStep(1)
  }

  return {
    state,
    update,
    step,
    setStep,
    vehicle,
    pickup,
    dropoff,
    withDriver,
    quote,
    startBooking,
    reset,
  }
}

type BookingContextValue = ReturnType<typeof useBookingValue>

const BookingContext = createContext<BookingContextValue | null>(null)

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const value = useBookingValue()
  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  )
}

export function useBooking() {
  const ctx = useContext(BookingContext)
  if (!ctx) throw new Error("useBooking must be used within BookingProvider")
  return ctx
}
