"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Info } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import costModelData from "@/data/cost-model.json"

const assumptions = costModelData.assumptions

interface AssumptionRow {
  parameter: string
  value: string
  source: string
}

const parameterTable: AssumptionRow[] = [
  {
    parameter: "Average incident cost",
    value: "R200,000",
    source: "BCMM 2024 maintenance reports — includes cable, labor, equipment, emergency response",
  },
  {
    parameter: "Annual incidents",
    value: "47",
    source: "BCMM historical average (2020-2025)",
  },
  {
    parameter: "Compounding rate",
    value: "8% per year",
    source: "SAPS crime statistics trend for organized infrastructure theft",
  },
  {
    parameter: "Detection reduction rate",
    value: "65%",
    source: "Pilot covert sensor data from eThekwini and Mangaung municipalities",
  },
  {
    parameter: "False positive rate",
    value: "12%",
    source: "Industry benchmark for vibration-based cable sensors",
  },
  {
    parameter: "Sensor node cost",
    value: "R1,200",
    source: "Estimated unit cost for covert vibration sensor with LoRaWAN transmitter",
  },
  {
    parameter: "Annual maintenance per node",
    value: "R600",
    source: "Battery replacement, calibration, data transmission fees",
  },
  {
    parameter: "Households per incident",
    value: "300",
    source: "BCMM infrastructure maps — average downstream connections per cable segment",
  },
]

export function AssumptionsPanel() {
  const [open, setOpen] = useState(false)

  return (
    <Card className="border-teal/20">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between p-5 text-left"
      >
        <div className="flex items-center gap-3">
          <Info className="h-5 w-5 text-teal" />
          <div>
            <h3 className="font-semibold text-primary">
              Model Assumptions & Parameters
            </h3>
            <p className="text-sm text-muted-foreground">
              All values, sources, and rationale behind the simulation
            </p>
          </div>
        </div>
        <ChevronDown
          className={cn(
            "h-5 w-5 text-muted-foreground transition-transform",
            open && "rotate-180"
          )}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <CardContent className="px-5 pb-5 pt-0">
              {/* Parameter table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="pb-2 pr-4 text-left font-semibold text-primary">
                        Parameter
                      </th>
                      <th className="pb-2 pr-4 text-left font-semibold text-primary">
                        Value
                      </th>
                      <th className="pb-2 text-left font-semibold text-primary">
                        Source / Rationale
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {parameterTable.map((row) => (
                      <tr key={row.parameter} className="border-b last:border-0">
                        <td className="py-2.5 pr-4 text-gray-700">
                          {row.parameter}
                        </td>
                        <td className="py-2.5 pr-4 font-mono font-semibold text-teal">
                          {row.value}
                        </td>
                        <td className="py-2.5 text-muted-foreground">
                          {row.source}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Written assumptions */}
              <div className="mt-6 space-y-2">
                <h4 className="text-sm font-semibold text-primary">
                  Documented Assumptions
                </h4>
                <ul className="space-y-2">
                  {assumptions.map((a, i) => (
                    <li
                      key={i}
                      className="flex gap-2 text-sm text-muted-foreground"
                    >
                      <span className="mt-0.5 shrink-0 font-mono text-xs text-teal">
                        {i + 1}.
                      </span>
                      {a}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Disclaimer */}
              <div className="mt-6 rounded-lg border border-amber/30 bg-amber/5 p-4">
                <p className="text-sm text-amber">
                  <strong>Important:</strong> These projections are estimates
                  based on synthetic data. All investment decisions require
                  human review and approval.
                </p>
              </div>
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}
