# CableGuard AI — Mission Document

**Team:** Ubuntu Intelligence
**Project:** CableGuard AI
**Track:** Graduate — AI for Systems & Society
**Hackathon:** USAII Global AI Hackathon 2026

---

## Vision

Every community in South Africa protected by invisible, intelligent infrastructure that prevents crime before it causes harm.

## Mission

Deploy covert AI-powered sensor networks that detect cable theft in real-time, alert responders instantly, and restore safety and dignity to underserved communities.

## Core Principles

**Ubuntu — "I am because we are"**
This project exists because a community asked for help. Every design decision is measured against one question: does this protect the people who need it most?

**Covert by Design**
If a thief can see it, they will destroy it. Every component is invisible — buried underground, hidden in conduit, absent from the surface. Detection without detection.

**Edge-First Intelligence**
The system must work during the very outages it is trying to prevent. AI classification happens on-device, offline, without cloud dependency. Internet is for alerting, not for thinking.

**Community-Native Response**
Alerts travel through WhatsApp — the tool communities already use to report incidents. We close the response loop that currently fails, using the infrastructure people already trust.

**Radical Affordability**
At ~R1,200 per node, the system costs less than 1% of a single cable theft incident. If cost is a barrier, the solution fails before deployment.

## Success Criteria

| Metric | Target | Measurement |
|--------|--------|-------------|
| Detection accuracy | >85% true positive rate | Simulation validation, then field testing |
| False positive rate | <15% of total alerts | Alert log analysis over 30-day trial |
| Alert latency | <60 seconds from detection to WhatsApp delivery | End-to-end timing test |
| Node cost | ≤R1,500 per unit at prototype scale | Bill of materials audit |
| Uptime during outage | 72+ hours on solar/battery alone | Battery discharge test |
| Hackathon demo | Complete 5-step simulation in under 3 minutes | Live presentation run |

## Stakeholders

| Stakeholder | Role | Interest |
|-------------|------|----------|
| Qonce Community Groups | End beneficiaries | Faster response, fewer outages, safety |
| Buffalo City Metro Municipality (BCMM) | Infrastructure owner | Reduce repair costs, protect assets |
| Private Security Companies (KWT) | Response partners | Actionable, high-confidence alerts |
| SAPS (South African Police Service) | Law enforcement | Evidence-based dispatch, arrest support |
| Eskom / Telkom / Transnet | National infrastructure | Scalable theft prevention across networks |
| SEDA / NYDA / DSI | Funding bodies | Innovation, youth entrepreneurship, social impact |
| USAII Hackathon Judges | Evaluation panel | Technical depth, social impact, feasibility |

## Business Goals

1. **Win the hackathon** — demonstrate a working simulation that tells the full story from detection to response
2. **Secure pilot funding** — use hackathon placement to approach SEDA, NYDA, or Eskom Development Foundation for a 10-node pilot in Qonce
3. **Partner with a security company** — sign an MOU with a King William's Town private security firm within 90 days of hackathon
4. **Validate the AI model** — collect real vibration data from underground cable sites and achieve >85% classification accuracy
5. **Build a commercial product** — transition from hackathon prototype to a deployable product within 12 months

## User Personas

### Persona 1 — Nomsa (Community Resident)
- **Age:** 38, mother of three
- **Location:** Qonce, Eastern Cape
- **Problem:** Loses power for 2-5 days after each cable theft. Cannot cook, children cannot study, neighborhood feels unsafe at night.
- **Need:** Wants to know that someone is watching, that something will prevent the next outage before it happens.
- **Interaction with CableGuard:** Nomsa never sees the system. She only knows it exists because the outages stop.

### Persona 2 — Thabo (Municipal Infrastructure Manager)
- **Age:** 45, BCMM infrastructure division
- **Problem:** Spends 60% of his budget on cable replacement. Gets blamed for slow response but has no early warning. Repair crews arrive after the damage.
- **Need:** A detection system that alerts before damage is done, with GPS locations and confidence scores so he can prioritize dispatch.
- **Interaction with CableGuard:** Receives real-time dashboard access. Reviews alerts flagged as "suspicious" (65-85% confidence). Approves dispatch for high-confidence events.

### Persona 3 — Sipho (Private Security Patrol Lead)
- **Age:** 32, security company based in King William's Town
- **Problem:** Gets called to cable theft sites hours after the crime. Arrives to find cut cables and no suspects. Currently reactive, never proactive.
- **Need:** Instant, GPS-tagged alerts with confidence scores so his team can respond while suspects are still on-site.
- **Interaction with CableGuard:** Receives WhatsApp alerts with location pin, timestamp, and confidence score. Taps to open live map. Dispatches nearest patrol.
