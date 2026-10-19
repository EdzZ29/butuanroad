// Business details, fleet, rates and fees shown across the site.
// Edit this file to update what customers see. Rates below are placeholders:
// replace them with your actual prices before going live.

export const site = {
  name: "Butuan Road",
  legalName: "Butuan ROAd Car Rental Services",
  tagline: "Your Road, Your Ride",
  since: 2022,
  phone: "0998 959 9849",
  phoneHref: "tel:+639989599849",
  smsNumber: "+639989599849",
  address: {
    line1: "Block 2 Lot 18, Princess 5, 2nd Street",
    line2: "Butuan City, 8600 Agusan del Norte",
    plusCode: "WG8W+PF Butuan City",
  },
  hours: "Open 24 hours, every day",
  rating: 5.0,
  reviewCount: 24,
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Butuan+ROAd+Car+Rental+Services+Butuan+City",
  mapEmbedUrl:
    "https://www.google.com/maps?q=WG8W%2BPF+Butuan+City,+Agusan+del+Norte&z=16&output=embed",
}

export type VehicleCategory = "sedan" | "mpv" | "suv" | "pickup" | "van"

export const categories: { value: VehicleCategory | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "sedan", label: "Sedan" },
  { value: "mpv", label: "MPV" },
  { value: "suv", label: "SUV" },
  { value: "pickup", label: "Pickup" },
  { value: "van", label: "Van" },
]

export type Vehicle = {
  id: string
  name: string
  category: VehicleCategory
  seats: number
  transmission: "Automatic" | "Manual"
  fuel: "Gasoline" | "Diesel"
  /** Optional photo path under /public, e.g. "/images/fleet/vios.jpg" */
  image?: string
  /** Only available with one of our drivers */
  driverOnly?: boolean
  rates: {
    halfDay: number
    daily: number
    weekly: number
    monthly: number
  }
}

export const fleet: Vehicle[] = [
  {
    id: "vios",
    name: "Toyota Vios",
    category: "sedan",
    seats: 5,
    transmission: "Automatic",
    fuel: "Gasoline",
    rates: { halfDay: 1200, daily: 1800, weekly: 11200, monthly: 42000 },
  },
  {
    id: "mirage-g4",
    name: "Mitsubishi Mirage G4",
    category: "sedan",
    seats: 5,
    transmission: "Automatic",
    fuel: "Gasoline",
    rates: { halfDay: 1100, daily: 1700, weekly: 10500, monthly: 39000 },
  },
  {
    id: "xpander",
    name: "Mitsubishi Xpander",
    category: "mpv",
    seats: 7,
    transmission: "Automatic",
    fuel: "Gasoline",
    rates: { halfDay: 1600, daily: 2500, weekly: 15750, monthly: 60000 },
  },
  {
    id: "innova",
    name: "Toyota Innova",
    category: "mpv",
    seats: 8,
    transmission: "Automatic",
    fuel: "Diesel",
    rates: { halfDay: 1800, daily: 2800, weekly: 17500, monthly: 66000 },
  },
  {
    id: "fortuner",
    name: "Toyota Fortuner",
    category: "suv",
    seats: 7,
    transmission: "Automatic",
    fuel: "Diesel",
    rates: { halfDay: 2200, daily: 3500, weekly: 22000, monthly: 84000 },
  },
  {
    id: "hilux",
    name: "Toyota Hilux",
    category: "pickup",
    seats: 5,
    transmission: "Manual",
    fuel: "Diesel",
    rates: { halfDay: 2000, daily: 3200, weekly: 20000, monthly: 75000 },
  },
  {
    id: "hiace",
    name: "Toyota HiAce",
    category: "van",
    seats: 15,
    transmission: "Manual",
    fuel: "Diesel",
    driverOnly: true,
    rates: { halfDay: 2500, daily: 4000, weekly: 25000, monthly: 96000 },
  },
]

export const fees = {
  driverPerDay: 1000,
  outOfTownPerDay: 500,
  deliveryEachWay: 300,
  excessPerHour: 200,
  securityDeposit: 3000,
}

export const categoryLabel: Record<VehicleCategory, string> = {
  sedan: "Sedan",
  mpv: "MPV",
  suv: "SUV",
  pickup: "Pickup",
  van: "Van",
}

export const reviewTags = [
  { label: "Affordable budget", count: 4 },
  { label: "Quality cars", count: 3 },
  { label: "Friendly owners", count: 2 },
  { label: "Smooth transaction", count: 2 },
  { label: "Accommodating", count: 2 },
]

export const reviews = [
  {
    name: "Vanness Ivan Atis",
    text: "The car I rented was clean, well-maintained, and very fuel-efficient, making the trip smooth and hassle-free. The rental process was quick and convenient, with friendly staff providing excellent service.",
  },
  {
    name: "Shaira Mae Dapar",
    text: "Great service and smooth booking process. The car was clean, well-maintained, and ready on time. Highly recommended for hassle-free rentals!",
  },
  {
    name: "Kevin Vicente",
    text: "They have quality cars as well as affordable budget and the transaction is very smooth.",
  },
]

export const faqs = [
  {
    q: "What do I need to rent a self-drive car?",
    a: "A valid driver's license, one other government-issued ID, and a refundable security deposit. We confirm the complete list with you when we finalize your booking.",
  },
  {
    q: "Can I rent a car with a driver?",
    a: "Yes. Choose \"With driver\" when you book and one of our experienced drivers will take you around Butuan City or out of town. The driver fee is added to your quote.",
  },
  {
    q: "Do you deliver the car to my place?",
    a: "Yes. We can deliver and collect the car anywhere within Butuan City for a small fee per trip. Just tick the delivery option and add your address.",
  },
  {
    q: "Can I take the car outside Butuan City?",
    a: "Yes. Tell us your destination so we can prepare the car for the trip. An out-of-town fee applies per rental day.",
  },
  {
    q: "How is fuel handled?",
    a: "Fuel is not included in the rate. For self-drive rentals, please return the car with the same fuel level it had when you received it.",
  },
  {
    q: "Is the online quote final?",
    a: "The quote is an estimate based on our current rates. We confirm availability and the final amount when we call or message you back.",
  },
]

export const navLinks = [
  { id: "fleet", label: "Fleet" },
  { id: "rates", label: "Rates" },
  { id: "how-it-works", label: "How it works" },
  { id: "reviews", label: "Reviews" },
  { id: "contact", label: "Contact" },
]
