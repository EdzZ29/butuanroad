import { BusFrontIcon, CarFrontIcon, CarIcon, TruckIcon, type LucideIcon } from "lucide-react"

import type { VehicleCategory } from "@/lib/site"

export const vehicleIcon: Record<VehicleCategory, LucideIcon> = {
  sedan: CarIcon,
  mpv: CarFrontIcon,
  suv: CarFrontIcon,
  pickup: TruckIcon,
  van: BusFrontIcon,
}
