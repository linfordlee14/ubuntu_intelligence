"use client"

import { motion } from "framer-motion"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { Scenario } from "@/lib/types"

interface MetricCardProps {
  label: string
  value: string
  unit?: string
  trend?: "up" | "down" | "neutral"
  trendValue?: string
  scenario: Scenario
  index?: number
}

const scenarioColorMap: Record<Scenario, {
  text: string
  bg: string
  border: string
}> = {
  "do-nothing": {
    text: "text-danger",
    bg: "bg-danger/5",
    border: "border-danger/20",
  },
  "delay-3-years": {
    text: "text-amber",
    bg: "bg-amber/5",
    border: "border-amber/20",
  },
  "invest-now": {
    text: "text-teal",
    bg: "bg-teal/5",
    border: "border-teal/20",
  },
}

export function MetricCard({
  label,
  value,
  unit,
  trend,
  trendValue,
  scenario,
  index = 0,
}: MetricCardProps) {
  const colors = scenarioColorMap[scenario]

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <Card className={cn("border", colors.border)}>
        <CardContent className="p-5">
          <p className="text-sm text-muted-foreground">{label}</p>
          <div className="mt-2 flex items-baseline gap-1.5">
            <motion.span
              key={value}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={cn("text-3xl font-bold tracking-tight", colors.text)}
            >
              {value}
            </motion.span>
            {unit && (
              <span className="text-sm text-muted-foreground">{unit}</span>
            )}
          </div>
          {trend && trendValue && (
            <div className="mt-2 flex items-center gap-1">
              {trend === "up" && (
                <TrendingUp className="h-3.5 w-3.5 text-teal" />
              )}
              {trend === "down" && (
                <TrendingDown className="h-3.5 w-3.5 text-danger" />
              )}
              {trend === "neutral" && (
                <Minus className="h-3.5 w-3.5 text-muted-foreground" />
              )}
              <span
                className={cn(
                  "text-xs font-medium",
                  trend === "up"
                    ? "text-teal"
                    : trend === "down"
                      ? "text-danger"
                      : "text-muted-foreground"
                )}
              >
                {trendValue}
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
