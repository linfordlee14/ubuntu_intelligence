import type { Scenario, ScenarioProjection } from './types'
import {
  calculateYearlyCost,
  calculateCumulativeCost,
  calculateROI,
  calculateIncidentsAvoided,
  calculateHouseholdsProtected,
  DEFAULTS,
} from './cost-model'

/**
 * Generate a full scenario projection for display in charts and cards.
 */
export function generateProjection(
  scenario: Scenario,
  years: number = 5,
  nodeCount: number = 0,
  budget: number = 0
): ScenarioProjection {
  const yearArray = Array.from({ length: years }, (_, i) => i + 1)

  const yearlyCosts = yearArray.map(y =>
    Math.round(calculateYearlyCost(y, scenario, nodeCount))
  )

  const cumulativeCosts: number[] = []
  let cumulative = 0
  for (const cost of yearlyCosts) {
    cumulative += cost
    cumulativeCosts.push(Math.round(cumulative))
  }

  const incidentsAvoidedPerYear = scenario === 'do-nothing'
    ? yearArray.map(() => 0)
    : scenario === 'delay-3-years'
      ? yearArray.map(y => y <= 3 ? 0 : Math.round(DEFAULTS.incidentsPerYear * DEFAULTS.detectionReductionRate))
      : yearArray.map(() => Math.round(DEFAULTS.incidentsPerYear * DEFAULTS.detectionReductionRate))

  const incidentsPerYear = yearArray.map(y =>
    DEFAULTS.incidentsPerYear - (incidentsAvoidedPerYear[y - 1] ?? 0)
  )

  const outrageDays = incidentsPerYear.map(incidents =>
    incidents * DEFAULTS.outrageDaysPerIncident
  )

  const cumulativeAvoided: number[] = []
  let totalAvoided = 0
  for (const avoided of incidentsAvoidedPerYear) {
    totalAvoided += avoided
    cumulativeAvoided.push(totalAvoided)
  }

  const householdsProtected = cumulativeAvoided.map(a =>
    a * DEFAULTS.householdsAffectedPerIncident
  )

  const roi = scenario === 'do-nothing'
    ? 0
    : calculateROI(nodeCount, years)

  return {
    scenario,
    years: yearArray,
    cumulativeCost: cumulativeCosts,
    incidentsAvoided: cumulativeAvoided,
    outrageDays,
    householdsProtected,
    roi: Math.round(roi * 100) / 100,
  }
}

/**
 * Compare all 3 scenarios side-by-side with default parameters.
 */
export function compareScenarios(
  nodeCount: number = 4166,
  years: number = 5
): {
  doNothing: ScenarioProjection
  delay3Years: ScenarioProjection
  investNow: ScenarioProjection
  savingsVsNothing: number
  savingsVsDelay: number
} {
  const doNothing = generateProjection('do-nothing', years, 0)
  const delay3Years = generateProjection('delay-3-years', years, nodeCount)
  const investNow = generateProjection('invest-now', years, nodeCount)

  const lastIdx = years - 1
  const savingsVsNothing =
    (doNothing.cumulativeCost[lastIdx] ?? 0) - (investNow.cumulativeCost[lastIdx] ?? 0)
  const savingsVsDelay =
    (delay3Years.cumulativeCost[lastIdx] ?? 0) - (investNow.cumulativeCost[lastIdx] ?? 0)

  return {
    doNothing,
    delay3Years,
    investNow,
    savingsVsNothing: Math.round(savingsVsNothing),
    savingsVsDelay: Math.round(savingsVsDelay),
  }
}

/**
 * Given a budget, recommend how many sensor nodes to deploy.
 * Accounts for first-year node cost + 5 years of maintenance.
 */
export function getRecommendedNodeCount(
  budget: number,
  params = DEFAULTS
): {
  nodeCount: number
  nodeCost: number
  annualMaintenance: number
  fiveYearMaintenance: number
  totalCost: number
  remainingBudget: number
} {
  // Total cost per node = purchase + 5 years maintenance
  const costPerNodeFullyLoaded =
    params.cableGuardNodeCost + params.annualMaintenanceCostPerNode * 5

  const nodeCount = Math.floor(budget / costPerNodeFullyLoaded)
  const nodeCost = nodeCount * params.cableGuardNodeCost
  const annualMaintenance = nodeCount * params.annualMaintenanceCostPerNode
  const fiveYearMaintenance = annualMaintenance * 5
  const totalCost = nodeCost + fiveYearMaintenance
  const remainingBudget = budget - totalCost

  return {
    nodeCount,
    nodeCost,
    annualMaintenance,
    fiveYearMaintenance,
    totalCost,
    remainingBudget,
  }
}
