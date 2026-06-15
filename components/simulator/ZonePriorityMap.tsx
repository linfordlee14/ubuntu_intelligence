"use client"

import { motion } from "framer-motion"
import { MapPin, AlertTriangle, Users, Cable, Radio } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { CableZone } from "@/lib/types"
import zonesData from "@/data/cable-zones.json"

const zones = zonesData as CableZone[]

// Compute risk scores (matching zone-optimizer logic)
function computeRiskScore(zone: CableZone, maxFreq: number, maxCable: number): number {
  const freqNorm = zone.incidentFrequency / maxFreq
  const cableNorm = zone.cableLengthKm / maxCable
  return Math.round((freqNorm * 0.5 + cableNorm * 0.5) * 10)
}

const maxFreq = Math.max(...zones.map((z) => z.incidentFrequency))
const maxCable = Math.max(...zones.map((z) => z.cableLengthKm))

const rankedZones = zones
  .map((z) => ({
    ...z,
    riskScore: computeRiskScore(z, maxFreq, maxCable),
  }))
  .sort((a, b) => b.riskScore - a.riskScore)
  .map((z, i) => ({ ...z, rank: i + 1 }))

const totalCable = zones.reduce((s, z) => s + z.cableLengthKm, 0)
const nodesPerZone = (z: (typeof rankedZones)[0]) =>
  Math.max(2, Math.round((z.cableLengthKm / totalCable) * 50))

function riskColor(score: number): string {
  if (score >= 8) return "text-danger"
  if (score >= 5) return "text-amber"
  return "text-teal"
}

function riskBg(score: number): string {
  if (score >= 8) return "bg-danger/10"
  if (score >= 5) return "bg-amber/10"
  return "bg-teal/10"
}

function riskBarColor(score: number): string {
  if (score >= 8) return "bg-danger"
  if (score >= 5) return "bg-amber"
  return "bg-teal"
}

export function ZonePriorityMap() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Zone Priority Ranking</CardTitle>
        <p className="text-sm text-muted-foreground">
          Cable zones ranked by composite risk score based on incident frequency
          and infrastructure exposure.
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {rankedZones.map((zone, i) => (
            <motion.div
              key={zone.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className={cn(
                "rounded-lg border p-4 transition-colors",
                zone.rank <= 3
                  ? "border-teal/30 bg-teal/5"
                  : "border-gray-100 bg-white"
              )}
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                {/* Left: Zone info */}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                      {zone.rank}
                    </span>
                    <h4 className="font-semibold text-primary">{zone.name}</h4>
                    {zone.rank <= 3 && (
                      <Badge
                        variant="teal"
                        className="ml-1 text-[10px]"
                      >
                        Deploy Here First
                      </Badge>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {zone.description}
                  </p>
                </div>

                {/* Right: Risk score */}
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-lg font-bold",
                      riskBg(zone.riskScore),
                      riskColor(zone.riskScore)
                    )}
                  >
                    {zone.riskScore}
                  </div>
                </div>
              </div>

              {/* Stats row */}
              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="flex items-center gap-1.5">
                  <AlertTriangle className="h-3.5 w-3.5 text-muted-foreground" />
                  <div>
                    <p className="text-xs font-semibold text-gray-800">
                      {zone.incidentFrequency}/yr
                    </p>
                    <p className="text-[10px] text-muted-foreground">Incidents</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <Cable className="h-3.5 w-3.5 text-muted-foreground" />
                  <div>
                    <p className="text-xs font-semibold text-gray-800">
                      {zone.cableLengthKm} km
                    </p>
                    <p className="text-[10px] text-muted-foreground">Cable at risk</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5 text-muted-foreground" />
                  <div>
                    <p className="text-xs font-semibold text-gray-800">
                      {zone.populationServed.toLocaleString()}
                    </p>
                    <p className="text-[10px] text-muted-foreground">Households</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <Radio className="h-3.5 w-3.5 text-muted-foreground" />
                  <div>
                    <p className="text-xs font-semibold text-gray-800">
                      {nodesPerZone(zone)} nodes
                    </p>
                    <p className="text-[10px] text-muted-foreground">Recommended</p>
                  </div>
                </div>
              </div>

              {/* Risk bar */}
              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(zone.riskScore / 10) * 100}%` }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className={cn("h-full rounded-full", riskBarColor(zone.riskScore))}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Methodology note */}
        <div className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
          <p className="text-xs text-muted-foreground">
            <strong>Methodology:</strong> Zone rankings are based on incident
            frequency and cable infrastructure data only — not demographic or
            socioeconomic factors. Risk score = 50% normalized incident frequency
            + 50% normalized cable length at risk.
          </p>
        </div>

        {/* Decision Point 2 callout */}
        <div className="mt-4 rounded-lg border-2 border-amber/40 bg-amber/5 p-5">
          <div className="flex items-start gap-3">
            <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-amber" />
            <div>
              <h4 className="font-semibold text-amber">
                Human Decision Required
              </h4>
              <p className="mt-1 text-sm text-muted-foreground">
                The AI recommends a deployment order based on risk scoring.
                Municipal operators must decide which zones to prioritize based
                on operational, political, and community factors the model cannot
                assess.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
