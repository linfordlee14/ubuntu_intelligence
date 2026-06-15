import type { CableZone, IncidentEvent, ZoneAllocation } from './types'
import { DEFAULTS } from './cost-model'

interface ZoneRiskScore {
  zone: CableZone
  riskScore: number
  rank: number
}

/**
 * Rank cable zones by composite risk score.
 * Risk = 40% incident frequency + 30% cable length + 30% response time (normalized).
 */
export function rankZonesByRisk(
  zones: CableZone[],
  incidents: IncidentEvent[]
): ZoneRiskScore[] {
  // Count incidents per zone from incident data
  const incidentCounts = new Map<string, number>()
  for (const inc of incidents) {
    incidentCounts.set(inc.zone, (incidentCounts.get(inc.zone) ?? 0) + 1)
  }

  const maxFrequency = Math.max(...zones.map(z => incidentCounts.get(z.id) ?? z.incidentFrequency), 1)
  const maxCableLength = Math.max(...zones.map(z => z.cableLengthKm), 1)
  const maxResponseTime = Math.max(...zones.map(z => z.avgResponseTimeHours ?? 8), 1)

  const scored = zones.map(zone => {
    const frequency = incidentCounts.get(zone.id) ?? zone.incidentFrequency
    const frequencyNorm = frequency / maxFrequency
    const cableNorm = zone.cableLengthKm / maxCableLength
    const responseNorm = (zone.avgResponseTimeHours ?? 8) / maxResponseTime

    const riskScore = Math.round(
      (frequencyNorm * 0.4 + cableNorm * 0.3 + responseNorm * 0.3) * 100
    )

    return { zone, riskScore }
  })

  scored.sort((a, b) => b.riskScore - a.riskScore)

  return scored.map((item, index) => ({
    ...item,
    rank: index + 1,
  }))
}

/**
 * Given a budget, optimize node deployment across zones.
 * Allocates proportionally to risk score — higher risk zones get more nodes.
 */
export function optimizeNodeDeployment(
  budget: number,
  zones: CableZone[],
  incidents: IncidentEvent[] = []
): {
  totalNodes: number
  totalCostZAR: number
  annualMaintenanceCostZAR: number
  allocations: ZoneAllocation[]
  projectedIncidentReduction: number
  projectedROI: number
} {
  const ranked = rankZonesByRisk(zones, incidents)
  const totalRiskPoints = ranked.reduce((sum, r) => sum + r.riskScore, 0)

  // Total cost per node = purchase + 5yr maintenance
  const costPerNode =
    DEFAULTS.cableGuardNodeCost + DEFAULTS.annualMaintenanceCostPerNode * 5
  const totalNodes = Math.floor(budget / costPerNode)
  const totalCostZAR = totalNodes * DEFAULTS.cableGuardNodeCost
  const annualMaintenanceCostZAR = totalNodes * DEFAULTS.annualMaintenanceCostPerNode

  // Distribute nodes proportionally to risk
  const allocations: ZoneAllocation[] = ranked.map(r => {
    const proportion = r.riskScore / totalRiskPoints
    const nodes = Math.max(1, Math.round(totalNodes * proportion))
    const zoneCost = nodes * DEFAULTS.cableGuardNodeCost
    const reductionPercent = Math.min(
      100,
      Math.round((nodes / Math.max(1, r.zone.incidentFrequency * 50)) * 100 * DEFAULTS.detectionReductionRate)
    )

    return {
      zoneId: r.zone.id,
      zoneName: r.zone.name,
      nodesAllocated: nodes,
      costZAR: zoneCost,
      projectedReductionPercent: Math.min(reductionPercent, 85),
    }
  })

  // Projected incident reduction based on detection rate
  const projectedIncidentReduction = DEFAULTS.detectionReductionRate

  // Simple ROI: savings over 5 years vs total investment
  const baseCost5yr =
    DEFAULTS.avgIncidentCost * DEFAULTS.incidentsPerYear * 5
  const investCost5yr =
    baseCost5yr * (1 - projectedIncidentReduction) +
    totalCostZAR +
    annualMaintenanceCostZAR * 5
  const savings = baseCost5yr - investCost5yr
  const investment = totalCostZAR + annualMaintenanceCostZAR * 5
  const projectedROI = investment > 0 ? Math.round((savings / investment) * 100) / 100 : 0

  return {
    totalNodes,
    totalCostZAR,
    annualMaintenanceCostZAR,
    allocations,
    projectedIncidentReduction: Math.round(projectedIncidentReduction * 100) / 100,
    projectedROI,
  }
}

/**
 * Calculate what percentage of total cable infrastructure is covered by a node count.
 */
export function calculateZoneCoverage(
  nodeCount: number,
  zones: CableZone[]
): {
  totalCableKm: number
  coveredZones: number
  coveragePercent: number
  nodesPerKm: number
} {
  const totalCableKm = zones.reduce((sum, z) => sum + z.cableLengthKm, 0)
  const nodesPerKm = totalCableKm > 0 ? nodeCount / totalCableKm : 0
  // Assume 1 node covers ~0.5km effectively
  const coveredKm = nodeCount * 0.5
  const coveragePercent = Math.min(100, Math.round((coveredKm / totalCableKm) * 100))
  const coveredZones = zones.filter(z => {
    const zoneNodes = Math.ceil(z.cableLengthKm * 2)
    return nodeCount >= zoneNodes
  }).length

  return {
    totalCableKm: Math.round(totalCableKm * 10) / 10,
    coveredZones,
    coveragePercent,
    nodesPerKm: Math.round(nodesPerKm * 100) / 100,
  }
}
