"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import projectionsData from "@/data/scenario-projections.json"

function formatZAR(value: number): string {
  if (value >= 1_000_000) return `R${(value / 1_000_000).toFixed(1)}M`
  if (value >= 1_000) return `R${(value / 1_000).toFixed(0)}K`
  return `R${value}`
}

const scenarios = ["do-nothing", "delay-3-years", "invest-now"] as const
const scenarioLabels: Record<string, string> = {
  "do-nothing": "Do Nothing",
  "delay-3-years": "Delay 3 Years",
  "invest-now": "Invest Now",
}
const scenarioColors: Record<string, string> = {
  "do-nothing": "text-danger",
  "delay-3-years": "text-amber",
  "invest-now": "text-teal",
}
const scenarioBg: Record<string, string> = {
  "do-nothing": "bg-danger/5",
  "delay-3-years": "bg-amber/5",
  "invest-now": "bg-teal/5",
}

interface RowData {
  label: string
  yearIdx: number
  accessor: (scenario: string, idx: number) => string
  highlight?: boolean
}

function getRows(yearIdx: number): RowData[] {
  const data = projectionsData.scenarios
  const doNothingCost = data["do-nothing"].cumulativeCost[yearIdx]

  return [
    {
      label: "Cumulative Cost",
      yearIdx,
      accessor: (s) => formatZAR(data[s as keyof typeof data].cumulativeCost[yearIdx]),
    },
    {
      label: "Incidents This Year",
      yearIdx,
      accessor: (s) => String(data[s as keyof typeof data].incidentsPerYear[yearIdx]),
    },
    {
      label: "Outage Days",
      yearIdx,
      accessor: (s) => String(data[s as keyof typeof data].outrageDays[yearIdx]),
    },
    {
      label: "Households Protected",
      yearIdx,
      accessor: (s) => data[s as keyof typeof data].householdsProtected[yearIdx].toLocaleString(),
    },
    {
      label: "Savings vs Do Nothing",
      yearIdx,
      accessor: (s) => {
        const cost = data[s as keyof typeof data].cumulativeCost[yearIdx]
        const diff = doNothingCost - cost
        return diff > 0 ? formatZAR(diff) : "—"
      },
      highlight: true,
    },
  ]
}

export function ScenarioComparisonPanel() {
  const yearSnapshots = [
    { label: "Year 1", idx: 0 },
    { label: "Year 3", idx: 2 },
    { label: "Year 5", idx: 4 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">
          Side-by-Side Scenario Comparison
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Projected outcomes at Year 1, Year 3, and Year 5 across all three
          intervention strategies.
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {yearSnapshots.map((snapshot) => {
            const rows = getRows(snapshot.idx)
            return (
              <div key={snapshot.label}>
                <h3 className="mb-3 text-sm font-bold text-primary">
                  {snapshot.label}
                </h3>
                {/* Desktop table */}
                <div className="hidden overflow-x-auto md:block">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="pb-2 pr-4 text-left font-semibold text-muted-foreground">
                          Metric
                        </th>
                        {scenarios.map((s) => (
                          <th
                            key={s}
                            className={cn(
                              "pb-2 text-right font-semibold",
                              scenarioColors[s]
                            )}
                          >
                            {scenarioLabels[s]}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((row) => (
                        <tr
                          key={row.label}
                          className={cn(
                            "border-b last:border-0",
                            row.highlight && "font-semibold"
                          )}
                        >
                          <td className="py-2.5 pr-4 text-gray-700">
                            {row.label}
                          </td>
                          {scenarios.map((s) => (
                            <td
                              key={s}
                              className={cn(
                                "py-2.5 text-right font-mono",
                                row.highlight ? scenarioColors[s] : "text-gray-800"
                              )}
                            >
                              {row.accessor(s, snapshot.idx)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile cards */}
                <div className="space-y-3 md:hidden">
                  {scenarios.map((s) => (
                    <div
                      key={s}
                      className={cn(
                        "rounded-lg border p-3",
                        scenarioBg[s],
                        s === "do-nothing"
                          ? "border-danger/20"
                          : s === "delay-3-years"
                            ? "border-amber/20"
                            : "border-teal/20"
                      )}
                    >
                      <p
                        className={cn(
                          "mb-2 text-sm font-bold",
                          scenarioColors[s]
                        )}
                      >
                        {scenarioLabels[s]}
                      </p>
                      {rows.map((row) => (
                        <div
                          key={row.label}
                          className="flex items-center justify-between py-1"
                        >
                          <span className="text-xs text-muted-foreground">
                            {row.label}
                          </span>
                          <span
                            className={cn(
                              "font-mono text-xs",
                              row.highlight
                                ? scenarioColors[s]
                                : "text-gray-800"
                            )}
                          >
                            {row.accessor(s, snapshot.idx)}
                          </span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
