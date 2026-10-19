"use client"

import { useState } from "react"
import { format, startOfToday } from "date-fns"
import { CalendarDaysIcon, KeyRoundIcon, UserRoundIcon } from "lucide-react"
import type { DateRange } from "react-day-picker"

import { TimePicker } from "@/components/reui/time-picker"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { peso, type ServiceType } from "@/lib/quote"
import { categories, fleet } from "@/lib/site"
import { cn } from "@/lib/utils"

export const controlClass = "h-10 w-full data-[size=default]:h-10"

export function ServiceChoice({
  value,
  onChange,
  driverOnly,
  className,
}: {
  value: ServiceType
  onChange: (value: ServiceType) => void
  driverOnly?: boolean
  className?: string
}) {
  const options = [
    {
      value: "self" as const,
      label: "Self-drive",
      hint: "You take the wheel",
      icon: KeyRoundIcon,
    },
    {
      value: "driver" as const,
      label: "With driver",
      hint: "We drive you",
      icon: UserRoundIcon,
    },
  ]

  return (
    <div role="radiogroup" className={cn("grid grid-cols-2 gap-2", className)}>
      {options.map((option) => {
        const disabled = driverOnly && option.value === "self"
        const selected = (driverOnly ? "driver" : value) === option.value
        const Icon = option.icon
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={selected}
            disabled={disabled}
            onClick={() => onChange(option.value)}
            className={cn(
              "flex items-center gap-3 rounded-lg border bg-input/30 px-3 py-2.5 text-left transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-40",
              selected
                ? "border-primary bg-primary/10"
                : "border-input hover:bg-input/50"
            )}
          >
            <Icon
              className={cn(
                "size-4 shrink-0",
                selected ? "text-primary" : "text-muted-foreground"
              )}
            />
            <span className="flex flex-col">
              <span className="text-sm font-medium">{option.label}</span>
              <span className="text-xs text-muted-foreground">
                {option.hint}
              </span>
            </span>
          </button>
        )
      })}
    </div>
  )
}

export function VehicleSelect({
  id,
  value,
  onChange,
}: {
  id?: string
  value: string
  onChange: (value: string) => void
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger id={id} className={controlClass}>
        <SelectValue placeholder="Choose a vehicle" />
      </SelectTrigger>
      <SelectContent position="popper">
        {categories
          .filter((c) => c.value !== "all")
          .map((category) => {
            const vehicles = fleet.filter((v) => v.category === category.value)
            if (!vehicles.length) return null
            return (
              <SelectGroup key={category.value}>
                <SelectLabel>{category.label}</SelectLabel>
                {vehicles.map((v) => (
                  <SelectItem key={v.id} value={v.id}>
                    <span>{v.name}</span>
                    <span className="text-muted-foreground">
                      {peso(v.rates.daily)}/day
                    </span>
                  </SelectItem>
                ))}
              </SelectGroup>
            )
          })}
      </SelectContent>
    </Select>
  )
}

function RangeCalendar({
  value,
  onChange,
}: {
  value: DateRange | undefined
  onChange: (value: DateRange | undefined) => void
}) {
  // Only mounted while the popover is open, so reading today is safe here.
  const [today] = useState(startOfToday)
  return (
    <Calendar
      mode="range"
      selected={value}
      onSelect={onChange}
      defaultMonth={value?.from ?? today}
      disabled={{ before: today }}
      className="[--cell-size:--spacing(9)]"
    />
  )
}

export function DateRangeField({
  id,
  value,
  onChange,
}: {
  id?: string
  value: DateRange | undefined
  onChange: (value: DateRange | undefined) => void
}) {
  const [open, setOpen] = useState(false)

  let label = "Pick-up and return dates"
  if (value?.from && value.to) {
    label = `${format(value.from, "MMM d")} to ${format(value.to, "MMM d, yyyy")}`
  } else if (value?.from) {
    label = `${format(value.from, "MMM d, yyyy")}, same day`
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          variant="outline"
          className={cn(
            controlClass,
            "justify-start px-2.5 font-normal",
            !value?.from && "text-muted-foreground"
          )}
        >
          <CalendarDaysIcon className="text-muted-foreground" />
          {label}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <RangeCalendar
          value={value}
          onChange={(next) => {
            onChange(next)
            if (next?.from && next.to && next.from.getTime() !== next.to.getTime()) {
              setOpen(false)
            }
          }}
        />
        <p className="border-t px-3 py-2 text-xs text-muted-foreground">
          For a same-day rental, pick just one date.
        </p>
      </PopoverContent>
    </Popover>
  )
}

export function TimeField({
  id,
  label,
  value,
  onChange,
}: {
  id?: string
  label: string
  value: string | null
  onChange: (value: string | null) => void
}) {
  return (
    <TimePicker
      id={id}
      aria-label={label}
      value={value}
      onValueChange={onChange}
      hourCycle={12}
      minuteStep={30}
      placeholder="Select time"
      className={controlClass}
    />
  )
}
