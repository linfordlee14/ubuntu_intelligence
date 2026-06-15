"use client"

import { ScenarioComparisonPanel } from "@/components/simulator/ScenarioComparisonPanel"
import { NodeDeploymentOptimizer } from "@/components/simulator/NodeDeploymentOptimizer"
import { ZonePriorityMap } from "@/components/simulator/ZonePriorityMap"
import { FadeIn } from "@/components/ui/fade-in"
import { ErrorBoundary } from "@/components/ui/error-boundary"

export default function ScenariosPage() {
  return (
    <div className="min-h-screen bg-surface">
      <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
        {/* Page header */}
        <FadeIn>
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-primary md:text-4xl">
              Scenario Comparison
            </h1>
            <p className="mt-2 text-muted-foreground">
              Compare all three intervention strategies side by side, calculate
              ROI for different budgets, and see which cable zones should be
              protected first.
            </p>
          </div>
        </FadeIn>

        {/* Section 1 — Side-by-Side Comparison */}
        <FadeIn delay={0.1}>
          <section className="mb-10">
            <ErrorBoundary fallbackTitle="Comparison Error" fallbackMessage="The scenario comparison table could not render.">
              <ScenarioComparisonPanel />
            </ErrorBoundary>
          </section>
        </FadeIn>

        {/* Section 2 — Budget & ROI Calculator */}
        <FadeIn delay={0.2}>
          <section className="mb-10">
            <ErrorBoundary fallbackTitle="Calculator Error" fallbackMessage="The ROI calculator could not render.">
              <NodeDeploymentOptimizer />
            </ErrorBoundary>
          </section>
        </FadeIn>

        {/* Section 3 — Zone Priority Ranking */}
        <FadeIn delay={0.3}>
          <section>
            <ErrorBoundary fallbackTitle="Zone Data Error" fallbackMessage="The zone priority list could not render.">
              <ZonePriorityMap />
            </ErrorBoundary>
          </section>
        </FadeIn>
      </div>
    </div>
  )
}
