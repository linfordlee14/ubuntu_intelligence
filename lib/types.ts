export type Scenario = 'do-nothing' | 'delay-3-years' | 'invest-now'

export interface ScenarioProjection {
  scenario: Scenario
  years: number[]              // [1, 2, 3, 4, 5]
  cumulativeCost: number[]     // ZAR
  incidentsAvoided: number[]
  outrageDays: number[]
  householdsProtected: number[]
  roi: number                  // Return on investment ratio
}

export interface CostParams {
  avgIncidentCost: number          // ZAR per theft incident
  incidentsPerYear: number         // BCMM annual average
  outrageDaysPerIncident: number   // Average community outage
  householdsAffectedPerIncident: number
  cableGuardNodeCost: number       // ZAR per sensor node
  detectionReductionRate: number   // 0-1, incident reduction with full deployment
  falsePositiveRate: number        // 0-1
  patrolCostPerDispatch: number    // ZAR per patrol dispatch
  annualMaintenanceCostPerNode: number // ZAR per year
}

export interface CableZone {
  id: string
  name: string
  description: string
  cableLengthKm: number
  incidentFrequency: number      // Historical annual average
  criticalityScore: number       // 1-10
  coordinates: { lat: number; lng: number }
  populationServed: number
  lastIncidentDate: string       // ISO date string
  avgResponseTimeHours?: number  // Optional, computed from incident data
}

export interface IncidentEvent {
  id: string
  date: string                   // ISO date string
  zone: string
  zoneName: string
  damageCost: number
  outageDays: number
  householdsAffected: number
  cableMetersStolen: number
  responseTimeHours: number
  resolved: boolean
}

export interface DecisionPoint {
  id: number
  title: string
  description: string
  aiRecommendation: string
  humanDecides: string
  options: DecisionOption[]
  selectedOptionId?: string
  decidedAt?: string             // ISO date string
  decidedBy?: string
}

export interface DecisionOption {
  id: string
  label: string
  description: string
  estimatedCostZAR: number
  estimatedImpact: string
  riskLevel: 'low' | 'medium' | 'high'
}

export interface DeploymentRecommendation {
  totalNodes: number
  totalCostZAR: number
  annualMaintenanceCostZAR: number
  zoneAllocations: ZoneAllocation[]
  projectedIncidentReduction: number  // 0-1
  projectedROI: number
}

export interface ZoneAllocation {
  zoneId: string
  zoneName: string
  nodesAllocated: number
  costZAR: number
  projectedReductionPercent: number
}

export interface ConfidenceScore {
  overall: number                // 0-100
  incidentFrequencyScore: number // 0-100, weight 40%
  cableLengthScore: number       // 0-100, weight 30%
  responseTimeScore: number      // 0-100, weight 30%
}

export interface MetricCardData {
  label: string
  value: string
  unit: string
  trend?: 'up' | 'down' | 'neutral'
  trendValue?: string
  variant: 'default' | 'success' | 'warning' | 'danger'
}

export interface AlertItem {
  id: string
  timestamp: string
  type: 'incident' | 'detection' | 'maintenance' | 'system'
  severity: 'low' | 'medium' | 'high' | 'critical'
  message: string
  zone?: string
  acknowledged: boolean
}
