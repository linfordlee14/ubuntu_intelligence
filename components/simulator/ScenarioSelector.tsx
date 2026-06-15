"use client"

import { motion } from "framer-motion"
import { ShieldAlert, Clock, ShieldCheck } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import type { Scenario } from "@/lib/types"

interface ScenarioOption {
  id: Scenario
  title: string
  description: string
  icon: React.ElementType
  color: "danger" | "amber" | "teal"
}

const scenarios: ScenarioOption[] = [
  {
    id: "do-nothing",
    title: "Do Nothing",
    description:
      "BCMM takes no action. Cable theft continues to compound at 8% annually.",
    icon: ShieldAlert,
    color: "danger",
  },
  {
    id: "delay-3-years",
    title: "Delay 3 Years",
    description:
      "Investment delayed. Costs grow for 3 years before intervention begins.",
    icon: Clock,
    color: "amber",
  },
  {
    id: "invest-now",
    title: "Invest Now — CableGuard AI",
    description:
      "Covert sensors deployed immediately. 65% incident reduction from Year 1.",
    icon: ShieldCheck,
    color: "teal",
  },
]

const colorMap = {
  danger: {
    border: "border-danger",
    bg: "bg-danger/5",
    selectedBg: "bg-danger/10",
    text: "text-danger",
    icon: "text-danger",
    ring: "ring-danger/30",
  },
  amber: {
    border: "border-amber",
    bg: "bg-amber/5",
    selectedBg: "bg-amber/10",
    text: "text-amber",
    icon: "text-amber",
    ring: "ring-amber/30",
  },
  teal: {
    border: "border-teal",
    bg: "bg-teal/5",
    selectedBg: "bg-teal/10",
    text: "text-teal",
    icon: "text-teal",
    ring: "ring-teal/30",
  },
}

interface ScenarioSelectorProps {
  selected: Scenario
  onSelect: (scenario: Scenario) => void
}

export function ScenarioSelector({
  selected,
  onSelect,
}: ScenarioSelectorProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {scenarios.map((s) => {
        const isSelected = selected === s.id
        const colors = colorMap[s.color]

        return (
          <motion.button
            key={s.id}
            onClick={() => onSelect(s.id)}
            layout
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="text-left"
          >
            <Card
              className={cn(
                "cursor-pointer border-2 transition-all",
                isSelected
                  ? cn(colors.border, colors.selectedBg, "ring-2", colors.ring)
                  : "border-transparent hover:border-gray-200"
              )}
            >
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <div
                    className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                      isSelected ? colors.bg : "bg-gray-100"
                    )}
                  >
                    <s.icon
                      className={cn(
                        "h-5 w-5",
                        isSelected ? colors.icon : "text-gray-400"
                      )}
                    />
                  </div>
                  <div>
                    <h3
                      className={cn(
                        "font-semibold",
                        isSelected ? colors.text : "text-gray-700"
                      )}
                    >
                      {s.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {s.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.button>
        )
      })}
    </div>
  )
}
