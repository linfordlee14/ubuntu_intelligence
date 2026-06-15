import type { Scenario } from './types'

const DEFAULTS = {
  avgIncidentCost: 200000,
  incidentsPerYear: 47,
  compoundingRate: 0.08,
  detectionReductionRate: 0.65,
  cableGuardNodeCost: 1200,
  annualMaintenanceCostPerNode: 600,
  householdsAffectedPerIncident: 300,
  outrageDaysPerIncident: 3,
} as const

/**
 * Calculate the projected cost for a single year under a given scenario.
 *
 * Cost model:
 * - Do nothing: baseCost * incidents * (1 + compoundRate)^year
 * - Delay 3 years: same as do-nothing for years 1-3, then reduced from year 4
 * - Invest now: reduced incidents from year 1 + node deployment cost in year 1
 */
export function calculateYearlyCost(
  year: number,
  scenario: Scenario,
  nodeCount: number = 0,
  params = DEFAULTS
): number {
  const baseCost = params.avgIncidentCost * params.incidentsPerYear
  const compounded = baseCost * Math.pow(1 + params.compoundingRate, year)

  switch (scenario) {
    case 'do-nothing':
      return compounded

    case 'delay-3-years':
      if (year <= 3) return compounded
      return compounded * (1 - params.detectionReductionRate)

    case 'invest-now': {
      const reducedCost = compounded * (1 - params.detectionReductionRate)
      const nodeCost = nodeCount * params.cableGuardNodeCost
      const maintenance = nodeCount * params.annualMaintenanceCostPerNode
      return year === 1
        ? reducedCost + nodeCost + maintenance
        : reducedCost + maintenance
    }

    default:
      return compounded
  }
}

/**
 * Calculate cumulative cost over N years for a scenario.
 */
export function calculateCumulativeCost(
  years: number,
  scenario: Scenario,
  nodeCount: number = 0,
  params = DEFAULTS
): number {
  let total = 0
  for (let y = 1; y <= years; y++) {
    total += calculateYearlyCost(y, scenario, nodeCount, params)
  }
  return total
}

/**
 * Calculate ROI: (cost_saved - investment) / investment
 */
export function calculateROI(
  nodeCount: number,
  years: number = 5,
  params = DEFAULTS
): number {
  const investment =
    nodeCount * params.cableGuardNodeCost +
    nodeCount * params.annualMaintenanceCostPerNode * years
  const doNothingCost = calculateCumulativeCost(years, 'do-nothing', 0, params)
  const investCost = calculateCumulativeCost(years, 'invest-now', nodeCount, params)
  const savings = doNothingCost - investCost
  return investment > 0 ? (savings - investment) / investment : 0
}

/**
 * Calculate number of incidents avoided over N years.
 */
export function calculateIncidentsAvoided(
  years: number,
  detectionRate: number = DEFAULTS.detectionReductionRate,
  params = DEFAULTS
): number {
  const avoidedPerYear = Math.round(params.incidentsPerYear * detectionRate)
  return avoidedPerYear * years
}

/**
 * Calculate households protected based on incidents avoided.
 */
export function calculateHouseholdsProtected(
  incidentsAvoided: number,
  params = DEFAULTS
): number {
  return incidentsAvoided * params.householdsAffectedPerIncident
}

export { DEFAULTS }
