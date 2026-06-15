"use client"

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Scenario } from "@/lib/types"
import projectionsData from "@/data/scenario-projections.json"

function formatZAR(value: number): string {
  if (value >= 1_000_000) return `R${(value / 1_000_000).toFixed(1)}M`
  if (value >= 1_000) return `R${(value / 1_000).toFixed(0)}K`
  return `R${value}`
}

interface ChartDataPoint {
  year: string
  "do-nothing": number
  "delay-3-years": number
  "invest-now": number
}

const chartData: ChartDataPoint[] = [1, 2, 3, 4, 5].map((y, i) => ({
  year: `Year ${y}`,
  "do-nothing": projectionsData.scenarios["do-nothing"].cumulativeCost[i],
  "delay-3-years": projectionsData.scenarios["delay-3-years"].cumulativeCost[i],
  "invest-now": projectionsData.scenarios["invest-now"].cumulativeCost[i],
}))

interface CustomTooltipProps {
  active?: boolean
  payload?: Array<{
    name: string
    value: number
    color: string
  }>
  highlighted?: Scenario
}

function CustomTooltip({ active, payload, highlighted }: CustomTooltipProps) {
  if (!active || !payload?.length) return null

  const labels: Record<string, string> = {
    "do-nothing": "Do Nothing",
    "delay-3-years": "Delay 3 Years",
    "invest-now": "Invest Now",
  }

  const sorted = [...payload].sort((a, b) => b.value - a.value)

  return (
    <div className="rounded-lg border bg-white p-3 shadow-lg">
      <p className="mb-2 text-sm font-semibold text-primary">
        {payload[0]?.name ? `Year ${payload[0].name.split(" ")[1]}` : ""}
      </p>
      {sorted.map((entry) => (
        <div
          key={entry.name}
          className={`flex items-center justify-between gap-4 py-0.5 ${
            highlighted && entry.name !== highlighted ? "opacity-40" : ""
          }`}
        >
          <div className="flex items-center gap-2">
            <div
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-xs text-muted-foreground">
              {labels[entry.name] ?? entry.name}
            </span>
          </div>
          <span className="text-xs font-mono font-semibold">
            {formatZAR(entry.value)}
          </span>
        </div>
      ))}
      {sorted.length === 3 && (
        <div className="mt-2 border-t pt-2">
          <div className="flex justify-between">
            <span className="text-xs text-muted-foreground">
              Potential savings
            </span>
            <span className="text-xs font-mono font-bold text-teal">
              {formatZAR(sorted[2].value - sorted[0].value)}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

interface CostCompoundingChartProps {
  highlighted?: Scenario
}

export function CostCompoundingChart({
  highlighted,
}: CostCompoundingChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">
          Projected Cumulative Cost of Cable Theft — 5 Year Horizon
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Synthetic model based on BCMM incident data and cost parameters
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-[360px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
            >
              <defs>
                <linearGradient id="gradNothing" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#DC3545" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#DC3545" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradDelay" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#D4952E" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#D4952E" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradInvest" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0D7377" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#0D7377" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="year"
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: "#d1d5db" }}
              />
              <YAxis
                tickFormatter={formatZAR}
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                width={70}
              />
              <Tooltip content={<CustomTooltip highlighted={highlighted} />} />
              <Legend
                formatter={(value: string) => {
                  const labels: Record<string, string> = {
                    "do-nothing": "Do Nothing",
                    "delay-3-years": "Delay 3 Years",
                    "invest-now": "Invest Now",
                  }
                  return (
                    <span className="text-xs text-muted-foreground">
                      {labels[value] ?? value}
                    </span>
                  )
                }}
              />
              <Area
                type="monotone"
                dataKey="do-nothing"
                stroke="#DC3545"
                strokeWidth={highlighted === "do-nothing" ? 3 : 2}
                fill="url(#gradNothing)"
                fillOpacity={highlighted && highlighted !== "do-nothing" ? 0.3 : 1}
                strokeOpacity={highlighted && highlighted !== "do-nothing" ? 0.4 : 1}
              />
              <Area
                type="monotone"
                dataKey="delay-3-years"
                stroke="#D4952E"
                strokeWidth={highlighted === "delay-3-years" ? 3 : 2}
                fill="url(#gradDelay)"
                fillOpacity={highlighted && highlighted !== "delay-3-years" ? 0.3 : 1}
                strokeOpacity={highlighted && highlighted !== "delay-3-years" ? 0.4 : 1}
              />
              <Area
                type="monotone"
                dataKey="invest-now"
                stroke="#0D7377"
                strokeWidth={highlighted === "invest-now" ? 3 : 2}
                fill="url(#gradInvest)"
                fillOpacity={highlighted && highlighted !== "invest-now" ? 0.3 : 1}
                strokeOpacity={highlighted && highlighted !== "invest-now" ? 0.4 : 1}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
