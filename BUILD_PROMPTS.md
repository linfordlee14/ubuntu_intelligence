# CableGuard AI — Master Build Prompt
## For Windsurf + Claude Code

Paste each prompt in order. Complete one step fully before moving to the next.

---

## PROMPT 1 — Project Setup

```
Read CLAUDE.md in this repo completely before doing anything.

Then scaffold a Next.js 14 project with:
- TypeScript (strict mode)
- Tailwind CSS with custom color palette from CLAUDE.md
- App Router (use /app directory)
- shadcn/ui (run the init command)

Install these packages:
- recharts
- framer-motion
- lucide-react
- @radix-ui/react-slider (for budget slider)

Create the full folder structure exactly as defined in CLAUDE.md under "Project Structure".

In tailwind.config.ts, add the custom colors from CLAUDE.md:
- primary: #0C2340
- teal: #0D7377
- amber: #D4952E
- danger: #DC3545
- surface: #F0F4F8

Create /lib/types.ts with all TypeScript interfaces from CLAUDE.md including:
- Scenario type
- ScenarioProjection interface
- CostParams interface
- CableZone interface
- IncidentEvent interface
- DecisionPoint interface

Do not build any pages yet. Only setup.
```

---

## PROMPT 2 — Data Layer

```
Read CLAUDE.md before continuing.

Create all 4 synthetic data files in /data/:

1. /data/cost-model.json
Use the COST_PARAMS from CLAUDE.md. Add:
- compoundingRate: 0.08
- projectionYears: 5
- modelVersion: "1.0.0"
- lastUpdated: "2026-06-14"
- assumptions: array of 5 documented assumptions about the data

2. /data/theft-incidents.json
Create 47 synthetic incident records for the past year. Each record must have:
- id, date, zone (one of 10 zones), damageCost (150000-300000 ZAR range),
  outageDays (1-7), householdsAffected (100-600), cableMetersStolen (50-400),
  responseTimeHours (2-24), resolved: boolean

Distribute incidents across 10 zones with some zones having higher frequency.
Most incidents between 20:00-04:00 (night time). Use realistic 2025 dates.

3. /data/cable-zones.json
Define 10 Qonce cable zones:
- id, name, description, cableLength (km), incidentFrequency (per year),
  criticalityScore (1-10), coordinates (approximate lat/lng near King William's Town: -32.88, 27.39),
  populationServed, lastIncidentDate

4. /data/scenario-projections.json
Pre-compute all 3 scenario projections for years 1-5:
- doNothing: costs compound at 8% annually, 47 incidents/year baseline
- delay3Years: same as doNothing for years 1-3, then 65% reduction from year 4
- investNow: 65% incident reduction from year 1, node costs subtracted

Then implement /lib/cost-model.ts:
- calculateYearlyCost(year, scenario, nodeCount)
- calculateCumulativeCost(years, scenario, nodeCount)
- calculateROI(nodeCount, years)
- calculateIncidentsAvoided(years, detectionRate)
- calculateHouseholdsProtected(incidentsAvoided)

And /lib/scenario-engine.ts:
- generateProjection(scenario, years, nodeCount, budget)
- compareScenarios(nodeCount)
- getRecommendedNodeCount(budget)

And /lib/zone-optimizer.ts:
- rankZonesByRisk(zones, incidents)
- optimizeNodeDeployment(budget, zones)
- calculateZoneCoverage(nodeCount, zones)
```

---

## PROMPT 3 — Layout & Landing Page

```
Read CLAUDE.md before continuing.

Build the root layout and landing page.

1. /app/layout.tsx
- Root layout with proper metadata (title: "CableGuard AI | Ubuntu Intelligence")
- Import global CSS
- Add Inter font from next/font/google
- Wrap with a simple providers component

2. /components/layout/Header.tsx
- Logo: shield icon (Lucide) + "CableGuard AI" in navy
- Subtitle: "Municipal Decision Support System"
- Navigation links: Dashboard / Scenarios / Decision Support
- Badge showing "Qonce, Eastern Cape" with a location pin
- Responsive: hamburger menu on mobile

3. /components/layout/Footer.tsx
- "Ubuntu Intelligence — USAII Global AI Hackathon 2026"
- "Built for BCMM and communities of Qonce"
- "This system supports human decisions. It does not make them."

4. /app/page.tsx — Landing/Hero Page
Build a compelling hero with these sections:

HERO SECTION:
- Large headline: "The Cost of Doing Nothing"
- Subheadline: "An AI-powered simulator showing Buffalo City Metro Municipality the true cost of delayed intervention on cable theft — and what changes when they act."
- Two CTAs: "Launch Simulator" → /dashboard and "See the Data" → /scenarios

COMMUNITY QUOTE SECTION (dark navy background):
- Pull quote from the community letter: "We're writing to express our extreme frustration about the rampant cable theft and vandalism in our community. Daily disruptions to essential services like electricity and water are taking a toll on residents."
- Attribution: "— Community Group, Qonce (King William's Town), Eastern Cape"

THREE STAT CARDS:
- R7 Billion+ (Annual cost of cable theft in South Africa)
- 47 Incidents (Per year in BCMM — each costs R200,000+)
- 0 Systems (Covert detection systems currently deployed in Qonce)

HOW IT WORKS SECTION:
- 5 steps with icons: Signal → Insight → Decision → Action → Outcome
- Brief description of each step

NON-GOALS SECTION (important for judges):
- "What this system does NOT do" — list from CLAUDE.md non-goals
- Card with teal border

Use framer-motion for scroll-triggered fade-in animations on each section.
Make it mobile responsive.
```

---

## PROMPT 4 — Main Dashboard

```
Read CLAUDE.md before continuing.

Build /app/dashboard/page.tsx and all required components.

This is the main simulator interface. It has 4 sections:

SECTION 1 — Scenario Selector (/components/simulator/ScenarioSelector.tsx)
Three clickable cards, one selected at a time:
- "Do Nothing" (red/danger color) — "BCMM takes no action. Cable theft continues to compound."
- "Delay 3 Years" (amber color) — "Investment delayed. Costs grow before intervention."
- "Invest Now — CableGuard AI" (teal color) — "Covert sensors deployed immediately."

When a scenario is selected, all charts on the page update to show that scenario's data.
Add a framer-motion layout transition when switching scenarios.

SECTION 2 — Cost Compounding Chart (/components/simulator/CostCompoundingChart.tsx)
A Recharts AreaChart showing all 3 scenarios simultaneously over 5 years:
- X axis: Year 1 through Year 5
- Y axis: Cumulative cost in ZAR (format as "R2.4M")
- Three colored lines: red (do nothing), amber (delay), teal (invest now)
- Shaded area fill for each scenario
- Tooltip showing exact values and difference between scenarios
- Legend clearly labeled
- Title: "Projected Cumulative Cost of Cable Theft — 5 Year Horizon"
- Subtitle: "Synthetic model based on BCMM incident data and cost parameters"

SECTION 3 — Key Metric Cards (/components/dashboard/MetricCard.tsx)
Show 4 metric cards that update when scenario changes:
- Total 5-Year Cost (selected scenario)
- Incidents Avoided vs Do Nothing
- Households Protected
- Return on Investment (ratio)

Each card: large number, label, small trend indicator, color-coded by scenario.

SECTION 4 — Assumptions Panel (collapsible)
A collapsible panel at the bottom showing all model assumptions:
- Source, value, and rationale for each parameter
- "These projections are estimates based on synthetic data. All investment decisions require human review and approval."
- Toggle to show/hide

Make the whole page interactive — when the user switches scenarios, charts and metrics animate to new values using framer-motion.
```

---

## PROMPT 5 — Scenario Comparison & Node Optimizer

```
Read CLAUDE.md before continuing.

Build /app/scenarios/page.tsx and the optimizer component.

SECTION 1 — Side-by-Side Scenario Comparison
A 3-column comparison table (or cards on mobile) showing all scenarios at Year 1, Year 3, Year 5:
- Do Nothing vs Delay 3yr vs Invest Now
- Rows: Total Cost, Incidents, Outage Days, Households Affected, Net Savings vs Do Nothing
- Color code each scenario column (red / amber / teal)
- Bottom row: "Difference from Do Nothing" highlighted in bold

SECTION 2 — Budget & ROI Calculator (/components/simulator/NodeDeploymentOptimizer.tsx)
Interactive budget slider:
- Slider from R50,000 to R500,000 in R25,000 increments
- As slider moves, show in real-time:
  - Number of nodes deployable at that budget
  - Projected 5-year cost reduction (%)
  - Estimated incidents avoided per year
  - ROI ratio (e.g., "14.2x return")
  - Payback period in months

Use @radix-ui/react-slider for the slider component.
Show a Recharts BarChart of cost reduction by budget level.

SECTION 3 — Zone Priority Ranking (/components/simulator/ZonePriorityMap.tsx)
A ranked list of all 10 Qonce cable zones showing:
- Zone name and description
- Risk score (1-10) with color indicator
- Incidents in the past year
- Cable length at risk (km)
- Households served
- Recommended node count for this zone
- "Deploy Here First" badge on top 3 zones

Include a text note: "Zone rankings are based on incident frequency and cable infrastructure data only — not demographic or socioeconomic factors."

DECISION POINT 2 callout box:
"Human Decision Required: The AI recommends a deployment order based on risk scoring. Municipal operators must decide which zones to prioritize based on operational, political, and community factors the model cannot assess."
```

---

## PROMPT 6 — Decision Support Page

```
Read CLAUDE.md before continuing.

Build /app/decision-support/page.tsx

This page makes the human-in-the-loop design explicit for judges.

SECTION 1 — Page Header
Title: "Decision Support Interface"
Subtitle: "This system informs human decisions. It does not make them."
Brief explanation of the Signal → Insight → Decision → Action → Outcome flow as a visual stepper.

SECTION 2 — Three Decision Point Cards
Each card is clearly labeled "HUMAN DECISION REQUIRED" with an orange badge.

DECISION POINT 1: Budget Allocation
- What the AI shows: Projected 5-year cost savings at different investment levels
- What the AI does NOT decide: Whether BCMM should reallocate budget, which department funds it, political feasibility
- Input fields: Proposed budget (ZAR), Decision maker name/role, Decision date
- Status: Pending / Approved / Rejected
- "Record This Decision" button (updates local state)

DECISION POINT 2: Zone Deployment Priority  
- What the AI shows: Risk-ranked list of 10 zones
- What the AI does NOT decide: Community impact, operational access, municipal priorities
- Input: Zone selection checkboxes, deployment timeline, notes field
- "Confirm Priority Order" button

DECISION POINT 3: Alert Escalation
- What the AI shows: Detection event with confidence score
- What the AI does NOT decide: Whether to dispatch police or security
- Simulate a detection event: show vibration score rising, confidence reaching 78%
- Two human action buttons: "Dispatch Security" (teal) / "Dismiss — False Alarm" (gray)
- Shows: "AI confidence: 78% — Human review required before action"

SECTION 3 — Decision Audit Log
A table showing all decisions recorded in this session:
- Timestamp, Decision Type, Decision Made, Recorded By
- "This log demonstrates that every consequential action requires human authorization."

SECTION 4 — What This System Does NOT Do
A clear card with the full non-goals list from CLAUDE.md.
Style: white card with teal left border (NOT an accent stripe — use padding and background tint instead).
```

---

## PROMPT 7 — Polish, Responsive & Deploy

```
Read CLAUDE.md before continuing.

Final polish pass before deployment.

1. RESPONSIVE DESIGN
Check every page on mobile (375px width):
- Navigation becomes hamburger menu
- Charts resize properly (use ResponsiveContainer from Recharts everywhere)
- Metric cards stack vertically (grid-cols-1 on mobile, grid-cols-2 on tablet, grid-cols-4 on desktop)
- Decision point cards stack vertically on mobile
- Sliders work on touch

2. LOADING STATES
Add loading skeletons (use shadcn/ui Skeleton) for:
- Charts while data loads
- Metric cards while scenario calculates
- Zone list while optimizer runs

3. ERROR BOUNDARIES
Wrap each major section in an error boundary that shows a friendly fallback.

4. FRAMER MOTION POLISH
Add these specific animations:
- Page transitions: fade in on route change
- Scenario switch: metric cards count up to new values (use a simple counter animation)
- Chart update: smooth transition when scenario changes (Recharts handles this natively)
- Landing page: staggered fade-in for stat cards (0.1s delay between each)

5. SEO + METADATA
In layout.tsx, add:
- title: "CableGuard AI — Cost of Doing Nothing Simulator | Ubuntu Intelligence"
- description: "AI-powered municipal decision support for cable theft prevention in Qonce, South Africa. USAII Global AI Hackathon 2026."
- og:image (create a simple og-image)

6. VERCEL DEPLOYMENT
- Push to GitHub
- Connect repo to Vercel
- Deploy to production
- Confirm all pages load at production URL
- Add production URL to README.md

7. FINAL CHECKLIST
Run through every judge evaluation dimension:
- [ ] Problem Understanding: Landing page clearly states scope and non-goals
- [ ] AI Reasoning: Every chart has a methodology note, every score is explained
- [ ] Solution Design: All 3 pages have clear component boundaries
- [ ] Impact & Insight: Decision points connect directly to BCMM real decisions
- [ ] Responsible AI: Assumptions panel, false positive rate shown, model drift mentioned

Report the production Vercel URL when done.
```

---

## NOTES FOR WINDSURF

- Always read CLAUDE.md before starting each prompt
- Build one prompt at a time — do not skip ahead
- If you hit a blocker, describe it clearly and suggest an alternative
- Keep all synthetic data realistic but clearly labeled as synthetic
- Every number on screen must have a source or assumption note
- Never show a projection as a single number — always show a range or add "estimated"
- The system must feel like a professional municipal decision tool, not a student project
