"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"

const NODE_COST = 1200
const MAINTENANCE_PER_YEAR = 600
const INCIDENTS_PER_YEAR = 47
const AVG_INCIDENT_COST = 200000
const DETECTION_RATE = 0.65
const PROJECTION_YEARS = 5

function formatZAR(value: number): string {
  if (value >= 1_000_000) return `R${(value / 1_000_000).toFixed(1)}M`
  if (value >= 1_000) return `R${(value / 1_000).toFixed(0)}K`
  return `R${value}`
}

function computeMetrics(budget: number) {
  const costPerNodeFullyLoaded =
    NODE_COST + MAINTENANCE_PER_YEAR * PROJECTION_YEARS
  const nodeCount = Math.floor(budget / costPerNodeFullyLoaded)
  const nodeCost = nodeCount * NODE_COST
  const annualMaintenance = nodeCount * MAINTENANCE_PER_YEAR
  const totalInvestment =
    nodeCost + annualMaintenance * PROJECTION_YEARS

  const incidentsAvoidedPerYear = Math.round(
    INCIDENTS_PER_YEAR * DETECTION_RATE
  )
  const savingsPerYear =
    incidentsAvoidedPerYear * AVG_INCIDENT_COST * DETECTION_RATE
  const totalSavings5yr = savingsPerYear * PROJECTION_YEARS
  const costReduction = totalSavings5yr > 0
    ? Math.round(
        (totalSavings5yr /
          (AVG_INCIDENT_COST * INCIDENTS_PER_YEAR * PROJECTION_YEARS)) *
          100
      )
    : 0

  const roi =
    totalInvestment > 0
      ? Math.round((totalSavings5yr / totalInvestment) * 10) / 10
      : 0

  const paybackMonths =
    savingsPerYear > 0
      ? Math.ceil((totalInvestment / savingsPerYear) * 12)
      : 0

  return {
    nodeCount,
    nodeCost,
    annualMaintenance,
    totalInvestment,
    incidentsAvoidedPerYear,
    costReduction,
    roi,
    paybackMonths,
    totalSavings5yr,
  }
}

// Pre-compute chart data for budget levels
const budgetSteps = Array.from(
  { length: 20 },
  (_, i) => (i + 1) * 25000
)

const chartData = budgetSteps.map((budget) => {
  const m = computeMetrics(budget)
  return {
    budget: formatZAR(budget),
    reduction: m.costReduction,
    nodes: m.nodeCount,
  }
})

interface MetricRowProps {
  label: string
  value: string
  subtext?: string
  color?: string
}

function MetricRow({ label, value, subtext, color }: MetricRowProps) {
  return (
    <div className="flex items-center justify-between border-b py-3 last:border-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <div className="text-right">
        <motion.span
          key={value}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className={cn("font-mono text-sm font-bold", color ?? "text-primary")}
        >
          {value}
        </motion.span>
        {subtext && (
          <p className="text-xs text-muted-foreground">{subtext}</p>
        )}
      </div>
    </div>
  )
}

interface ChartEntry {
  budget: string
  nodes: number
  reduction: number
}

interface CustomTooltipProps {
  active?: boolean
  payload?: Array<{ value: number; payload: ChartEntry }>
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload?.length) return null
  const d = payload[0].payload as ChartEntry
  return (
    <div className="rounded-lg border bg-white p-3 shadow-lg">
      <p className="text-sm font-semibold text-primary">{d.budget}</p>
      <p className="text-xs text-muted-foreground">
        {d.nodes.toLocaleString()} nodes
      </p>
      <p className="font-mono text-xs font-bold text-teal">
        {d.reduction}% cost reduction
      </p>
    </div>
  )
}

export function NodeDeploymentOptimizer() {
  const [budget, setBudget] = useState(250000)
  const metrics = useMemo(() => computeMetrics(budget), [budget])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">
          Budget & ROI Calculator
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Adjust the budget to see how many sensor nodes can be deployed and the
          projected return on investment.
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left: Slider + metrics */}
          <div>
            {/* Budget slider */}
            <div className="mb-6">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-medium text-primary">
                  Deployment Budget
                </span>
                <span className="font-mono text-lg font-bold text-teal">
                  {formatZAR(budget)}
                </span>
              </div>
              <Slider
                value={[budget]}
                onValueChange={([v]) => setBudget(v)}
                min={50000}
                max={500000}
                step={25000}
              />
              <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                <span>R50,000</span>
                <span>R500,000</span>
              </div>
            </div>

            {/* Metrics */}
            <div className="rounded-lg border bg-surface p-4">
              <MetricRow
                label="Sensor Nodes"
                value={metrics.nodeCount.toLocaleString()}
                subtext={`@ ${formatZAR(NODE_COST)} per node`}
                color="text-teal"
              />
              <MetricRow
                label="5-Year Cost Reduction"
                value={`${metrics.costReduction}%`}
                subtext={`${formatZAR(metrics.totalSavings5yr)} saved`}
                color="text-teal"
              />
              <MetricRow
                label="Incidents Avoided / Year"
                value={metrics.incidentsAvoidedPerYear.toLocaleString()}
                subtext={`${DETECTION_RATE * 100}% detection rate`}
              />
              <MetricRow
                label="ROI"
                value={`${metrics.roi}x`}
                subtext="return on investment over 5 years"
                color={metrics.roi > 1 ? "text-teal" : "text-amber"}
              />
              <MetricRow
                label="Payback Period"
                value={
                  metrics.paybackMonths > 0
                    ? `${metrics.paybackMonths} months`
                    : "—"
                }
                subtext="time to recoup investment"
              />
              <MetricRow
                label="Total Investment"
                value={formatZAR(metrics.totalInvestment)}
                subtext="nodes + 5yr maintenance"
              />
            </div>
          </div>

          {/* Right: Bar chart */}
          <div>
            <h4 className="mb-3 text-sm font-medium text-primary">
              Cost Reduction by Budget Level
            </h4>
            <div className="h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="budget"
                    tick={{ fontSize: 10 }}
                    tickLine={false}
                    axisLine={{ stroke: "#d1d5db" }}
                    interval={2}
                  />
                  <YAxis
                    tickFormatter={(v: number) => `${v}%`}
                    tick={{ fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                    domain={[0, 70]}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar
                    dataKey="reduction"
                    fill="#0D7377"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={40}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-2 text-center text-xs text-muted-foreground">
              Budget vs. projected 5-year cost reduction (%)
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
