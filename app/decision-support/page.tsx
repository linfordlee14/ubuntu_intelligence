"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Radio,
  BarChart3,
  Lightbulb,
  Target,
  CheckCircle2,
  Shield,
  MapPin,
  AlertTriangle,
  XCircle,
  User,
  Calendar,
  FileText,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { FadeIn } from "@/components/ui/fade-in"
import { cn } from "@/lib/utils"
import zonesData from "@/data/cable-zones.json"

// ── Types ──

interface AuditEntry {
  id: string
  timestamp: string
  type: string
  decision: string
  recordedBy: string
}

type BudgetStatus = "pending" | "approved" | "rejected"

// ── Stepper ──

const flowSteps = [
  { icon: Radio, label: "Signal", desc: "Sensors detect cable tampering" },
  { icon: BarChart3, label: "Insight", desc: "AI analyzes threat probability" },
  { icon: Lightbulb, label: "Decision", desc: "Human reviews projections" },
  { icon: Target, label: "Action", desc: "Operator authorizes response" },
  { icon: CheckCircle2, label: "Outcome", desc: "Theft prevented or mitigated" },
]

function FlowStepper() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {flowSteps.map((step, i) => (
        <div key={step.label} className="flex items-center gap-3 sm:flex-col sm:text-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-teal/30 bg-teal/10">
            <step.icon className="h-5 w-5 text-teal" />
          </div>
          <div>
            <p className="text-sm font-bold text-primary">{step.label}</p>
            <p className="text-xs text-muted-foreground">{step.desc}</p>
          </div>
          {i < flowSteps.length - 1 && (
            <div className="hidden h-0.5 w-8 bg-teal/20 sm:block" />
          )}
        </div>
      ))}
    </div>
  )
}

// ── Non-Goals ──

const nonGoals = [
  "Identify or monitor individual people",
  "Automate police dispatch",
  "Make budget decisions on behalf of BCMM",
  "Replace human investigators or municipal officers",
  "Use real personal or location data of residents",
  "Claim to predict exact theft dates or perpetrators",
]

// ── Decision Point 1: Budget Allocation ──

interface BudgetCardProps {
  onRecord: (entry: AuditEntry) => void
}

function BudgetAllocationCard({ onRecord }: BudgetCardProps) {
  const [budget, setBudget] = useState("")
  const [decisionMaker, setDecisionMaker] = useState("")
  const [decisionDate, setDecisionDate] = useState("")
  const [status, setStatus] = useState<BudgetStatus>("pending")

  const handleRecord = () => {
    if (!budget || !decisionMaker) return
    const entry: AuditEntry = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      type: "Budget Allocation",
      decision: `R${Number(budget).toLocaleString()} — ${status}`,
      recordedBy: decisionMaker,
    }
    onRecord(entry)
    setStatus("approved")
  }

  return (
    <Card className="border-l-4 border-l-amber">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Badge className="bg-amber text-white">HUMAN DECISION REQUIRED</Badge>
        </div>
        <CardTitle className="text-lg">Decision Point 1: Budget Allocation</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* What AI shows */}
        <div className="rounded-lg bg-teal/5 p-4">
          <h4 className="text-sm font-semibold text-teal">What the AI Shows</h4>
          <p className="mt-1 text-sm text-muted-foreground">
            Projected 5-year cost savings at different investment levels. ROI
            ratios, incidents avoided, and households protected for budget
            scenarios from R50K to R500K.
          </p>
        </div>

        {/* What AI does NOT decide */}
        <div className="rounded-lg bg-gray-50 p-4">
          <h4 className="text-sm font-semibold text-gray-600">
            What the AI Does NOT Decide
          </h4>
          <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
            <li>• Whether BCMM should reallocate budget</li>
            <li>• Which department funds the project</li>
            <li>• Political feasibility of the investment</li>
          </ul>
        </div>

        {/* Input fields */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="mb-1 block text-sm font-medium text-primary">
              Proposed Budget (ZAR)
            </label>
            <Input
              type="number"
              placeholder="e.g. 250000"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-primary">
              Decision Maker
            </label>
            <Input
              placeholder="Name / Role"
              value={decisionMaker}
              onChange={(e) => setDecisionMaker(e.target.value)}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-primary">
              Decision Date
            </label>
            <Input
              type="date"
              value={decisionDate}
              onChange={(e) => setDecisionDate(e.target.value)}
            />
          </div>
        </div>

        {/* Status + actions */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Status:</span>
            <Badge
              variant={
                status === "approved"
                  ? "teal"
                  : status === "rejected"
                    ? "destructive"
                    : "outline"
              }
            >
              {status === "pending"
                ? "Pending"
                : status === "approved"
                  ? "Approved"
                  : "Rejected"}
            </Badge>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setStatus("rejected")}
            >
              Reject
            </Button>
            <Button size="sm" variant="teal" onClick={handleRecord}>
              Record This Decision
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// ── Decision Point 2: Zone Priority ──

interface ZonePriorityCardProps {
  onRecord: (entry: AuditEntry) => void
}

const zones = zonesData.slice(0, 10)

function ZoneDeploymentCard({ onRecord }: ZonePriorityCardProps) {
  const [selected, setSelected] = useState<string[]>([])
  const [timeline, setTimeline] = useState("")
  const [notes, setNotes] = useState("")
  const [confirmed, setConfirmed] = useState(false)

  const toggleZone = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((z) => z !== id) : [...prev, id]
    )
  }

  const handleConfirm = () => {
    if (selected.length === 0) return
    const entry: AuditEntry = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      type: "Zone Priority",
      decision: `${selected.length} zones selected for deployment`,
      recordedBy: "Municipal Operator",
    }
    onRecord(entry)
    setConfirmed(true)
  }

  return (
    <Card className="border-l-4 border-l-amber">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Badge className="bg-amber text-white">HUMAN DECISION REQUIRED</Badge>
        </div>
        <CardTitle className="text-lg">
          Decision Point 2: Zone Deployment Priority
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* What AI shows */}
        <div className="rounded-lg bg-teal/5 p-4">
          <h4 className="text-sm font-semibold text-teal">What the AI Shows</h4>
          <p className="mt-1 text-sm text-muted-foreground">
            Risk-ranked list of 10 cable zones based on incident frequency and
            infrastructure exposure.
          </p>
        </div>

        {/* What AI does NOT decide */}
        <div className="rounded-lg bg-gray-50 p-4">
          <h4 className="text-sm font-semibold text-gray-600">
            What the AI Does NOT Decide
          </h4>
          <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
            <li>• Community impact of deployment delays</li>
            <li>• Operational access constraints</li>
            <li>• Municipal political priorities</li>
          </ul>
        </div>

        {/* Zone checkboxes */}
        <div>
          <label className="mb-2 block text-sm font-medium text-primary">
            Select Priority Zones
          </label>
          <div className="grid gap-2 sm:grid-cols-2">
            {zones.map((zone) => (
              <label
                key={zone.id}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-lg border p-3 text-sm transition-colors",
                  selected.includes(zone.id)
                    ? "border-teal/40 bg-teal/5"
                    : "border-gray-200 hover:border-gray-300"
                )}
              >
                <input
                  type="checkbox"
                  checked={selected.includes(zone.id)}
                  onChange={() => toggleZone(zone.id)}
                  className="h-4 w-4 rounded accent-teal"
                />
                <span className="font-medium text-primary">{zone.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Timeline + notes */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-primary">
              Deployment Timeline
            </label>
            <Input
              placeholder="e.g. Phase 1: Q3 2026"
              value={timeline}
              onChange={(e) => setTimeline(e.target.value)}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-primary">
              Notes
            </label>
            <Textarea
              placeholder="Operational constraints, community factors..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
            />
          </div>
        </div>

        {/* Confirm button */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            {selected.length} of 10 zones selected
          </span>
          <Button
            size="sm"
            variant="teal"
            onClick={handleConfirm}
            disabled={selected.length === 0 || confirmed}
          >
            {confirmed ? "Priority Order Confirmed" : "Confirm Priority Order"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// ── Decision Point 3: Alert Escalation ──

interface AlertEscalationCardProps {
  onRecord: (entry: AuditEntry) => void
}

function AlertEscalationCard({ onRecord }: AlertEscalationCardProps) {
  const [confidence, setConfidence] = useState(0)
  const [vibrationScore, setVibrationScore] = useState(0)
  const [escalated, setEscalated] = useState(false)
  const [resolved, setResolved] = useState(false)

  // Simulate vibration score rising
  useEffect(() => {
    if (resolved) return
    const interval = setInterval(() => {
      setVibrationScore((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + Math.random() * 8 + 2
      })
    }, 200)
    return () => clearInterval(interval)
  }, [resolved])

  // Map vibration to confidence
  useEffect(() => {
    const c = Math.min(78, Math.round(vibrationScore * 0.78))
    setConfidence(c)
  }, [vibrationScore])

  const handleDispatch = () => {
    const entry: AuditEntry = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      type: "Alert Escalation",
      decision: "Security dispatched — human authorized",
      recordedBy: "Municipal Operator",
    }
    onRecord(entry)
    setEscalated(true)
    setResolved(true)
  }

  const handleDismiss = () => {
    const entry: AuditEntry = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      type: "Alert Escalation",
      decision: "Dismissed as false alarm — human authorized",
      recordedBy: "Municipal Operator",
    }
    onRecord(entry)
    setEscalated(false)
    setResolved(true)
  }

  return (
    <Card className="border-l-4 border-l-amber">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Badge className="bg-amber text-white">HUMAN DECISION REQUIRED</Badge>
        </div>
        <CardTitle className="text-lg">
          Decision Point 3: Alert Escalation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* What AI shows */}
        <div className="rounded-lg bg-teal/5 p-4">
          <h4 className="text-sm font-semibold text-teal">What the AI Shows</h4>
          <p className="mt-1 text-sm text-muted-foreground">
            Detection event with confidence score. Sensor vibration pattern,
            zone location, and threat assessment.
          </p>
        </div>

        {/* What AI does NOT decide */}
        <div className="rounded-lg bg-gray-50 p-4">
          <h4 className="text-sm font-semibold text-gray-600">
            What the AI Does NOT Decide
          </h4>
          <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
            <li>• Whether to dispatch police or security</li>
            <li>• Level of force or response required</li>
            <li>• Whether the event is a genuine threat</li>
          </ul>
        </div>

        {/* Simulated detection event */}
        <div className="rounded-lg border-2 border-danger/20 bg-danger/5 p-5">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-danger" />
            <h4 className="font-semibold text-danger">Simulated Detection Event</h4>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs text-muted-foreground">Zone</p>
              <p className="text-sm font-semibold text-primary">
                Zone 3 — Mdantsane North
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Time</p>
              <p className="text-sm font-semibold text-primary">
                02:14 AM — Night pattern detected
              </p>
            </div>
          </div>

          {/* Vibration score bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                Vibration Score
              </span>
              <span className="font-mono text-xs font-bold text-danger">
                {Math.min(100, Math.round(vibrationScore))}%
              </span>
            </div>
            <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-gray-200">
              <motion.div
                className="h-full rounded-full bg-danger"
                initial={{ width: 0 }}
                animate={{
                  width: `${Math.min(100, vibrationScore)}%`,
                }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Confidence */}
          <div className="mt-4 flex items-center justify-between rounded-lg bg-white p-3">
            <span className="text-sm text-muted-foreground">
              AI Confidence
            </span>
            <span className="font-mono text-lg font-bold text-amber">
              {confidence}%
            </span>
          </div>

          <p className="mt-3 text-center text-sm font-medium text-amber">
            AI confidence: {confidence}% — Human review required before action
          </p>
        </div>

        {/* Action buttons */}
        {!resolved ? (
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              variant="teal"
              className="flex-1"
              onClick={handleDispatch}
              disabled={confidence < 50}
            >
              <Shield className="mr-2 h-4 w-4" />
              Dispatch Security
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleDismiss}
            >
              <XCircle className="mr-2 h-4 w-4" />
              Dismiss — False Alarm
            </Button>
          </div>
        ) : (
          <div
            className={cn(
              "rounded-lg p-4 text-center",
              escalated ? "bg-teal/10 text-teal" : "bg-gray-100 text-gray-600"
            )}
          >
            <p className="font-semibold">
              {escalated
                ? "✓ Security dispatched by human operator"
                : "✓ Event dismissed as false alarm by human operator"}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// ── Main Page ──

export default function DecisionSupportPage() {
  const [auditLog, setAuditLog] = useState<AuditEntry[]>([])

  const addAuditEntry = useCallback((entry: AuditEntry) => {
    setAuditLog((prev) => [entry, ...prev])
  }, [])

  return (
    <div className="min-h-screen bg-surface">
      <div className="container mx-auto max-w-4xl px-4 py-8 md:px-6 md:py-12">
        {/* Section 1 — Header */}
        <FadeIn>
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-primary md:text-4xl">
              Decision Support Interface
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              This system informs human decisions. It does not make them.
            </p>
          </div>
        </FadeIn>

        {/* Flow stepper */}
        <FadeIn delay={0.1}>
          <Card className="mb-10">
            <CardContent className="p-6">
              <FlowStepper />
            </CardContent>
          </Card>
        </FadeIn>

        {/* Section 2 — Decision Points */}
        <div className="space-y-8">
          <FadeIn delay={0.15}>
            <BudgetAllocationCard onRecord={addAuditEntry} />
          </FadeIn>
          <FadeIn delay={0.2}>
            <ZoneDeploymentCard onRecord={addAuditEntry} />
          </FadeIn>
          <FadeIn delay={0.25}>
            <AlertEscalationCard onRecord={addAuditEntry} />
          </FadeIn>
        </div>

        {/* Section 3 — Audit Log */}
        <FadeIn delay={0.3}>
          <Card className="mt-10">
            <CardHeader>
              <CardTitle className="text-lg">Decision Audit Log</CardTitle>
              <p className="text-sm text-muted-foreground">
                Every consequential action recorded in this session requires
                human authorization.
              </p>
            </CardHeader>
            <CardContent>
              {auditLog.length === 0 ? (
                <div className="rounded-lg border border-dashed p-8 text-center">
                  <FileText className="mx-auto h-8 w-8 text-muted-foreground/50" />
                  <p className="mt-2 text-sm text-muted-foreground">
                    No decisions recorded yet. Use the decision point cards above
                    to record human authorizations.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="pb-2 pr-4 text-left font-semibold text-primary">
                          Timestamp
                        </th>
                        <th className="pb-2 pr-4 text-left font-semibold text-primary">
                          Type
                        </th>
                        <th className="pb-2 pr-4 text-left font-semibold text-primary">
                          Decision
                        </th>
                        <th className="pb-2 text-left font-semibold text-primary">
                          Recorded By
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <AnimatePresence>
                        {auditLog.map((entry) => (
                          <motion.tr
                            key={entry.id}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="border-b last:border-0"
                          >
                            <td className="py-2.5 pr-4 font-mono text-xs text-muted-foreground">
                              {new Date(entry.timestamp).toLocaleString()}
                            </td>
                            <td className="py-2.5 pr-4">
                              <Badge variant="outline">{entry.type}</Badge>
                            </td>
                            <td className="py-2.5 pr-4 text-gray-700">
                              {entry.decision}
                            </td>
                            <td className="py-2.5 text-muted-foreground">
                              {entry.recordedBy}
                            </td>
                          </motion.tr>
                        ))}
                      </AnimatePresence>
                    </tbody>
                  </table>
                </div>
              )}
              <div className="mt-4 rounded-lg bg-gray-50 p-3">
                <p className="text-xs text-muted-foreground">
                  <strong>Note:</strong> This log demonstrates that every
                  consequential action requires human authorization. In a
                  production system, this audit trail would be immutable and
                  timestamped to a secure ledger.
                </p>
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        {/* Section 4 — Non-Goals */}
        <FadeIn delay={0.35}>
          <Card className="mt-10 border-l-4 border-l-teal bg-teal/[0.03]">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Shield className="mt-0.5 h-5 w-5 shrink-0 text-teal" />
                <div>
                  <h3 className="font-semibold text-primary">
                    What This System Does NOT Do
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    CableGuard AI is a decision-support simulator — not an
                    automated system, not a surveillance tool, and not a
                    replacement for human judgment.
                  </p>
                  <ul className="mt-4 space-y-2">
                    {nonGoals.map((goal) => (
                      <li key={goal} className="flex items-start gap-2">
                        <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-danger" />
                        <span className="text-sm text-gray-700">{goal}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </div>
  )
}
