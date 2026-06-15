# CableGuard AI — CLAUDE.md
## System Context for Claude Code / Windsurf

---

## Who We Are
**Team:** Ubuntu Intelligence  
**Members:** Linford Musiyambodza (Software Lead) + Cwaita Nobongoza (Research Lead)  
**Hackathon:** USAII Global AI Hackathon 2026  
**Track:** Graduate — AI for Systems & Society  
**Challenge:** Brief 6, Direction A — The Cost of Doing Nothing Simulator  
**Qualifier Code:** GR26-65CEEFA7  
**Deadline:** June 21, 2026 at 11:59 PM ET  

---

## What We Are Building

**CableGuard AI** is an AI-powered municipal decision-support simulator that answers one question:

> *"What does cable theft cost the Qonce community if Buffalo City Metro Municipality (BCMM) does nothing — and what is the projected impact of investing in early detection?"*

This is **NOT** a surveillance tool.  
This is **NOT** an automated decision system.  
This is a **decision-support simulator** for municipal operators and infrastructure managers.

It maps: **Signal → Insight → Decision → Action → Outcome**

### The Real-World Problem
In Qonce (King William's Town), Eastern Cape, South Africa:
- Criminal syndicates steal underground copper cables from BCMM infrastructure
- Each theft causes R200,000+ in damage and leaves communities without power for 2–5 days
- Cable theft costs South Africa R7 billion+ annually
- Current systems (CCTV, visible sensors) are destroyed by thieves — they are reactive, not proactive
- BCMM makes arrests after tip-offs, but the damage is already done

### Our Solution (The Simulator)
A three-scenario cost modeling dashboard that shows BCMM decision-makers:
1. **Do Nothing** — costs compound year over year without intervention
2. **Delay 3 Years** — cost of waiting before investing in detection
3. **Invest Now (CableGuard AI)** — projected cost reduction with covert sensor deployment

The system supports **3 explicit human decision points**:
- Decision Point 1: Should BCMM invest in early detection now or delay?
- Decision Point 2: How many sensor nodes to deploy given budget constraints?
- Decision Point 3: Which cable zones should be prioritized for first deployment?

---

## Tech Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| Framework | Next.js 14 (App Router) | Use `/app` directory, server components where possible |
| Styling | Tailwind CSS | Mobile-first, utility classes only |
| UI Components | shadcn/ui | Import from `@/components/ui/` |
| Charts | Recharts | Line, Bar, Area charts for cost modeling |
| Animations | Framer Motion | Subtle transitions on scenario switching |
| Data | Synthetic JSON (local) | No backend needed — all data in `/data/` directory |
| Deployment | Vercel | Zero-config, free tier |
| Icons | Lucide React | Consistent icon set |

**No database required.** All simulation data is synthetic and local.  
**No authentication required.** Public demo dashboard.

---

## Project Structure

```
/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Landing / hero page
│   ├── dashboard/
│   │   └── page.tsx        # Main simulator dashboard
│   ├── scenarios/
│   │   └── page.tsx        # Scenario comparison view
│   └── decision-support/
│       └── page.tsx        # Human decision points interface
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── simulator/
│   │   ├── ScenarioSelector.tsx
│   │   ├── CostCompoundingChart.tsx
│   │   ├── ScenarioComparisonPanel.tsx
│   │   ├── NodeDeploymentOptimizer.tsx
│   │   └── ZonePriorityMap.tsx
│   ├── dashboard/
│   │   ├── MetricCard.tsx
│   │   ├── AlertFeed.tsx
│   │   └── ConfidenceScore.tsx
│   └── layout/
│       ├── Header.tsx
│       ├── Sidebar.tsx
│       └── Footer.tsx
├── data/
│   ├── theft-incidents.json     # Synthetic incident history
│   ├── cost-model.json          # Cost parameters and assumptions
│   ├── cable-zones.json         # Qonce cable zone definitions
│   └── scenario-projections.json # Pre-computed scenario outputs
├── lib/
│   ├── cost-model.ts            # Cost compounding calculations
│   ├── scenario-engine.ts       # Scenario simulation logic
│   ├── zone-optimizer.ts        # Node deployment optimization
│   └── types.ts                 # TypeScript type definitions
└── public/
    └── qonce-map.svg            # Simplified map of cable zones
```

---

## Design System

### Color Palette
```
Primary (Navy):     #0C2340  — backgrounds, headers
Teal (Accent):      #0D7377  — positive indicators, CableGuard scenarios
Amber (Warning):    #D4952E  — delay scenarios, caution states
Red (Critical):     #DC3545  — "do nothing" scenarios, alerts
Light (Surface):    #F0F4F8  — card backgrounds
White:              #FFFFFF
```

### Typography
- Headings: `font-bold` with `tracking-tight`
- Body: Default Tailwind (`text-base`, `text-gray-600`)
- Data labels: `text-sm font-mono`
- Large stats: `text-4xl font-bold`

### Component Principles
- Every card must have a clear purpose label
- Charts must have axis labels and a legend
- Decision points must have explicit "Human decides:" callouts
- Never show a number without context (always include units and timeframe)
- Use color consistently: red=bad/cost, teal=good/saved, amber=caution

---

## Data Model

### Synthetic Cost Parameters (used in simulation)
```typescript
const COST_PARAMS = {
  avgIncidentCost: 200000,        // ZAR per theft incident
  incidentsPerYear: 47,           // BCMM annual average
  outrageDaysPerIncident: 3,      // Average community outage
  householdsAffectedPerIncident: 300,
  cableGuardNodeCost: 1200,       // ZAR per sensor node
  detectionReductionRate: 0.65,   // 65% incident reduction with full deployment
  falsePositiveRate: 0.12,        // 12% false positive rate
  patrolCostPerDispatch: 500,     // ZAR per patrol dispatch
  annualMaintenanceCostPerNode: 600, // ZAR per year
}
```

### Three Scenarios
```typescript
type Scenario = 'do-nothing' | 'delay-3-years' | 'invest-now'

interface ScenarioProjection {
  scenario: Scenario
  years: number[]              // [1, 2, 3, 4, 5]
  cumulativeCost: number[]     // ZAR
  incidentsAvoided: number[]
  outrageDays: number[]
  householdsProtected: number[]
  roi: number                  // Return on investment ratio
}
```

---

## AI Logic (Simulation Engine)

The AI layer runs client-side in TypeScript. It is NOT a black box — every output is explainable.

### Cost Compounding Model
```
Year N Cost = BaseIncidentCost × IncidentsPerYear × (1 + CompoundingRate)^N
```
Where `CompoundingRate = 0.08` (8% annual increase due to organised crime growth)

### Node Deployment Optimizer
Given:
- Budget input (ZAR)
- Number of cable zones (10 zones in Qonce)
- Incident frequency per zone

Output:
- Recommended number of nodes
- Priority zone ranking (highest-risk zones first)
- Projected cost reduction per zone

### Confidence Score
Multi-signal input produces a single confidence score:
- Incident frequency weight: 40%
- Cable length at risk weight: 30%
- Historical response time weight: 30%

---

## Human-in-the-Loop Design

**AI produces:** scenario projections, cost estimates, zone priority rankings, node deployment recommendations

**Humans decide:**
1. Whether to approve budget allocation for sensor deployment
2. Which zones to prioritize given political and operational constraints
3. Whether to escalate a detected event to police (in the live monitoring view)

**AI does NOT:**
- Make budget decisions
- Dispatch police or security
- Identify individual suspects
- Override human judgment on resource allocation

---

## Responsible AI Requirements

### Risk 1: Model Overconfidence
**Mitigation:** All projections shown as ranges (low/mid/high estimates), never point predictions. Include explicit "Assumptions" panel on every projection.

### Risk 2: Bias in Zone Prioritization
**Mitigation:** Zone priority is based on incident frequency and cable infrastructure data, not demographic data. Explicitly state this in the UI.

### Risk 3: False Positive Cost to Security Teams
**Mitigation:** Show false positive rate (12%) explicitly on the dashboard. Include "Human review required" threshold at 65-85% confidence.

### Model Drift Detection
After deployment, incident data is compared monthly against model predictions. If actual incidents deviate >20% from projections for 2+ consecutive months, the system flags "Model Review Required."

---

## Build Order (Step by Step)

Follow this exact order. Do not skip ahead.

### Step 1: Project Setup
- Next.js 14 with TypeScript and Tailwind
- Install: shadcn/ui, recharts, framer-motion, lucide-react
- Create folder structure as defined above
- Set up Tailwind with custom color palette

### Step 2: Data Layer
- Create all 4 JSON files in `/data/`
- Create TypeScript types in `/lib/types.ts`
- Implement cost model in `/lib/cost-model.ts`
- Implement scenario engine in `/lib/scenario-engine.ts`

### Step 3: Landing Page (`/app/page.tsx`)
- Hero with problem statement and community quote
- Three key stats (R7B annual cost, 47 incidents/year, 0 covert systems)
- "Launch Simulator" CTA button

### Step 4: Dashboard Page (`/app/dashboard/page.tsx`)
- Scenario selector (3 cards: Do Nothing / Delay 3yr / Invest Now)
- Cost compounding chart (line chart, 5-year projection)
- Key metric cards (total cost saved, incidents avoided, households protected)
- Confidence score display

### Step 5: Scenario Comparison (`/app/scenarios/page.tsx`)
- Side-by-side comparison of all 3 scenarios
- ROI calculator with budget slider
- Node deployment optimizer
- Zone priority ranking

### Step 6: Decision Support (`/app/decision-support/page.tsx`)
- 3 explicit decision point cards with human review prompts
- Alert escalation flow (simulated)
- Audit log of decisions
- "What the AI does NOT decide" panel

### Step 7: Polish & Deploy
- Responsive design check (mobile first)
- Framer Motion transitions
- Vercel deployment
- Test all interactive elements

---

## What Judges Are Looking For (Score It Against This)

| Dimension | Weight | What to Show |
|-----------|--------|-------------|
| Problem Understanding | 20% | Clear scope, non-goals stated, 2+ stakeholders |
| AI Reasoning | 35% | Architecture explained, evaluation strategy, model tradeoffs |
| Solution Design | 20% | Modular components, clear boundaries |
| Impact & Insight | 15% | Connects to real BCMM decisions |
| Responsible AI | 10% | False positives, model drift, human-in-loop |

**AI Reasoning is 35% of the score.** Every chart must explain WHY the AI produced that output.

---

## Non-Goals (State These Explicitly)

This system does NOT:
- Identify or monitor individual people
- Automate police dispatch
- Make budget decisions on behalf of BCMM
- Replace human investigators or municipal officers
- Use real personal or location data of residents
- Claim to predict exact theft dates or perpetrators

---

## Devpost Submission Checklist

- [ ] Qualifier Code: GR26-65CEEFA7
- [ ] Challenge: Brief 6, Direction A
- [ ] Track: Graduate
- [ ] Project description written
- [ ] AI architecture explanation filled
- [ ] Human-in-loop decision documented
- [ ] Responsible AI guardrail documented
- [ ] Tools used listed (Next.js, Recharts, shadcn/ui, Claude/Windsurf for coding assistance)
- [ ] Data disclosure (synthetic data, documented assumptions)
- [ ] 3-5 minute pitch video recorded
- [ ] Working demo deployed on Vercel
- [ ] Demo URL added to Devpost
