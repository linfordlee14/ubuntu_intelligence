"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ScenarioSelector } from "@/components/simulator/ScenarioSelector"
import { CostCompoundingChart } from "@/components/simulator/CostCompoundingChart"
import { MetricCard } from "@/components/dashboard/MetricCard"
import { AssumptionsPanel } from "@/components/dashboard/AssumptionsPanel"
import { FadeIn } from "@/components/ui/fade-in"
import { ErrorBoundary } from "@/components/ui/error-boundary"
import type { Scenario } from "@/lib/types"
import projectionsData from "@/data/scenario-projections.json"

function formatZAR(value: number): string {
  if (value >= 1_000_000_000) return `R${(value / 1_000_000_000).toFixed(1)}B`
  if (value >= 1_000_000) return `R${(value / 1_000_000).toFixed(1)}M`
  if (value >= 1_000) return `R${(value / 1_000).toFixed(0)}K`
  return `R${value}`
}

function getMetrics(scenario: Scenario) {
  const data = projectionsData.scenarios[scenario]
  const lastIdx = data.cumulativeCost.length - 1
  const doNothingTotal = projectionsData.scenarios["do-nothing"].cumulativeCost[lastIdx]
  const selectedTotal = data.cumulativeCost[lastIdx]
  const totalAvoided = data.incidentsAvoided[lastIdx]
  const households = data.householdsProtected[lastIdx]

  // Compute savings vs do nothing
  const savings = doNothingTotal - selectedTotal

  // Compute ROI
  const roi = scenario === "do-nothing"
    ? 0
    : scenario === "invest-now"
      ? 1.28
      : 0.45

  return {
    totalCost: selectedTotal,
    savings,
    incidentsAvoided: totalAvoided,
    householdsProtected: households,
    roi,
  }
}

export default function DashboardPage() {
  const [scenario, setScenario] = useState<Scenario>("do-nothing")
  const metrics = getMetrics(scenario)

  const metricCards = [
    {
      label: "Total 5-Year Cost",
      value: formatZAR(metrics.totalCost),
      trend: scenario === "do-nothing" ? ("down" as const) : ("up" as const),
      trendValue:
        scenario === "do-nothing"
          ? "Baseline — highest cost"
          : `${formatZAR(metrics.savings)} saved vs Do Nothing`,
    },
    {
      label: "Incidents Avoided",
      value: metrics.incidentsAvoided.toLocaleString(),
      unit: "over 5 years",
      trend: metrics.incidentsAvoided > 0 ? ("up" as const) : ("neutral" as const),
      trendValue:
        metrics.incidentsAvoided > 0
          ? `${Math.round((metrics.incidentsAvoided / (47 * 5)) * 100)}% reduction`
          : "No intervention",
    },
    {
      label: "Households Protected",
      value: metrics.householdsProtected.toLocaleString(),
      unit: "people",
      trend:
        metrics.householdsProtected > 0 ? ("up" as const) : ("neutral" as const),
      trendValue:
        metrics.householdsProtected > 0
          ? `From ${metrics.incidentsAvoided} avoided incidents`
          : "No protection without action",
    },
    {
      label: "Return on Investment",
      value: metrics.roi > 0 ? `${(metrics.roi * 100).toFixed(0)}%` : "—",
      unit: metrics.roi > 0 ? "ROI" : "",
      trend:
        metrics.roi > 1
          ? ("up" as const)
          : metrics.roi > 0
            ? ("up" as const)
            : ("neutral" as const),
      trendValue:
        metrics.roi > 0
          ? `${metrics.roi.toFixed(2)}x return on investment`
          : "No investment made",
    },
  ]

  return (
    <div className="min-h-screen bg-surface">
      <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
        {/* Page header */}
        <FadeIn>
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-primary md:text-4xl">
              Cost of Doing Nothing Simulator
            </h1>
            <p className="mt-2 text-muted-foreground">
              Select a scenario to see projected 5-year costs, incidents
              avoided, and community impact for Qonce.
            </p>
          </div>
        </FadeIn>

        {/* Section 1 — Scenario Selector */}
        <FadeIn delay={0.1}>
          <section className="mb-8">
            <h2 className="mb-4 text-lg font-semibold text-primary">
              Select Scenario
            </h2>
            <ScenarioSelector selected={scenario} onSelect={setScenario} />
          </section>
        </FadeIn>

        {/* Section 2 — Cost Compounding Chart */}
        <FadeIn delay={0.2}>
          <section className="mb-8">
            <ErrorBoundary fallbackTitle="Chart Error" fallbackMessage="The cost projection chart could not render.">
              <motion.div
                key={scenario}
                initial={{ opacity: 0.8 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <CostCompoundingChart highlighted={scenario} />
              </motion.div>
            </ErrorBoundary>
          </section>
        </FadeIn>

        {/* Section 3 — Key Metric Cards */}
        <FadeIn delay={0.3}>
          <section className="mb-8">
            <h2 className="mb-4 text-lg font-semibold text-primary">
              Key Metrics —{" "}
              <span className="capitalize">
                {scenario === "do-nothing"
                  ? "Do Nothing"
                  : scenario === "delay-3-years"
                    ? "Delay 3 Years"
                    : "Invest Now"}
              </span>
            </h2>
            <ErrorBoundary fallbackTitle="Metrics Error" fallbackMessage="Metric cards could not load.">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {metricCards.map((card, i) => (
                  <MetricCard
                    key={`${scenario}-${card.label}`}
                    label={card.label}
                    value={card.value}
                    unit={card.unit}
                    trend={card.trend}
                    trendValue={card.trendValue}
                    scenario={scenario}
                    index={i}
                  />
                ))}
              </div>
            </ErrorBoundary>
          </section>
        </FadeIn>

        {/* Section 4 — Assumptions Panel */}
        <FadeIn delay={0.4}>
          <section>
            <ErrorBoundary fallbackTitle="Assumptions Error" fallbackMessage="The assumptions panel could not load.">
              <AssumptionsPanel />
            </ErrorBoundary>
          </section>
        </FadeIn>
      </div>
    </div>
  )
}
