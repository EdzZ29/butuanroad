import {
  ClockIcon,
  RouteIcon,
  ShieldCheckIcon,
  TruckIcon,
  UserRoundIcon,
} from "lucide-react"

import { Frame, FramePanel } from "@/components/reui/frame"
import { IconTile } from "@/components/reui/icon-tile"
import { SectionHeading } from "@/components/site/section-heading"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { peso } from "@/lib/quote"
import { categoryLabel, fees, fleet } from "@/lib/site"

const feeItems = [
  {
    icon: UserRoundIcon,
    title: "Driver",
    amount: `${peso(fees.driverPerDay)} / day`,
    note: "Experienced local driver, up to 12 hours a day.",
  },
  {
    icon: RouteIcon,
    title: "Out of town",
    amount: `+${peso(fees.outOfTownPerDay)} / day`,
    note: "For trips outside Butuan City.",
  },
  {
    icon: TruckIcon,
    title: "Delivery",
    amount: `${peso(fees.deliveryEachWay)} / trip`,
    note: "We bring and collect the car within the city.",
  },
  {
    icon: ClockIcon,
    title: "Excess hour",
    amount: `${peso(fees.excessPerHour)} / hour`,
    note: "Charged after your agreed return time.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Security deposit",
    amount: peso(fees.securityDeposit),
    note: "Self-drive only. Fully refundable on return.",
  },
]

export function Rates() {
  return (
    <section id="rates" className="border-t bg-card/40 py-20 sm:py-28">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 sm:px-6">
        <SectionHeading
          eyebrow="Rates"
          title="Simple, upfront pricing"
          description="Longer rentals cost less per day. Weekly and monthly rates apply automatically in your quote."
        />

        <Frame spacing="sm">
          <FramePanel className="overflow-x-auto p-0">
            <Table className="min-w-[640px]">
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="h-11 pl-5">Vehicle</TableHead>
                  <TableHead>Seats</TableHead>
                  <TableHead className="text-right">12 hours</TableHead>
                  <TableHead className="text-right">Daily</TableHead>
                  <TableHead className="text-right">Weekly</TableHead>
                  <TableHead className="pr-5 text-right">Monthly</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fleet.map((v) => (
                  <TableRow key={v.id}>
                    <TableCell className="py-3.5 pl-5">
                      <div className="font-medium">{v.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {categoryLabel[v.category]}
                        {v.driverOnly && ", with driver only"}
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {v.seats}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {peso(v.rates.halfDay)}
                    </TableCell>
                    <TableCell className="text-right font-medium text-primary tabular-nums">
                      {peso(v.rates.daily)}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {peso(v.rates.weekly)}
                    </TableCell>
                    <TableCell className="pr-5 text-right tabular-nums">
                      {peso(v.rates.monthly)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </FramePanel>
        </Frame>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {feeItems.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.title}
                className="flex flex-col gap-3 rounded-xl border bg-card p-5"
              >
                <IconTile variant="soft" size="default">
                  <Icon />
                </IconTile>
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-muted-foreground">
                    {item.title}
                  </span>
                  <span className="font-heading text-lg font-semibold tabular-nums">
                    {item.amount}
                  </span>
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {item.note}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
