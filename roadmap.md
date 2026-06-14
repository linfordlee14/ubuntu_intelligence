# CableGuard AI — Development Roadmap

**Team:** Ubuntu Intelligence
**Last Updated:** June 13, 2026

---

## Phase 1 — MVP (Hackathon Sprint)

**Timeline:** June 14 – June 21, 2026 (7 days)
**Goal:** Working simulation demo + pitch submission on Devpost

### Milestones

| Day | Milestone | Owner | Deliverable |
|-----|-----------|-------|-------------|
| Day 1 (Jun 14) | Attend kickoff, review challenge brief, finalize scope | Both | Scope document, challenge alignment |
| Day 2 (Jun 15) | Next.js project scaffold + Supabase setup | Linford | Running dev environment |
| Day 3 (Jun 16) | Sensor simulation engine + dashboard map UI | Linford | Simulated data pipeline |
| Day 3 (Jun 16) | Hardware research report + circuit schematic | Cwaita | Technical specification |
| Day 4 (Jun 17) | AI classification logic (simulated TinyML) | Linford | Working classifier demo |
| Day 4 (Jun 17) | Sensor data profiles (vibration signatures) | Cwaita | Training data mockups |
| Day 5 (Jun 18) | Alert system (WhatsApp-style notifications) | Linford | End-to-end alert flow |
| Day 5 (Jun 18) | SDD documentation finalization | Cwaita | Complete SDD package |
| Day 6 (Jun 19) | Full integration test + demo rehearsal | Both | Smooth 5-step demo |
| Day 7 (Jun 20) | Pitch video recording + Devpost submission | Both | Submitted project |
| Buffer (Jun 21) | Final edits before 11:59 PM ET deadline | Both | Polished submission |

### Deliverables
- Next.js simulation dashboard with live map
- Simulated sensor data feed (vibration, current, acoustic)
- AI classification engine with confidence scoring
- WhatsApp-style alert notification UI
- 5-minute pitch video
- Devpost project page with documentation
- SDD document package

### Dependencies
- Devpost account and project creation
- Supabase free tier account
- Vercel deployment (free tier)
- Challenge brief (revealed at kickoff June 14)

### Risk Assessment
| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Challenge brief misalignment | Medium | High | Adapt framing while keeping core solution |
| Time pressure (7 days) | High | High | Pre-build scaffold before kickoff |
| Technical blockers | Low | Medium | Use proven stack (Next.js + Supabase) |

---

## Phase 2 — Prototype (Post-Hackathon)

**Timeline:** July – September 2026 (3 months)
**Goal:** Physical ESP32 prototype + real vibration data + pilot proposal

### Milestones

| Month | Milestone | Deliverable |
|-------|-----------|-------------|
| Month 1 | Hardware procurement + assembly | Working ESP32 + sensor breadboard |
| Month 1 | Field vibration data collection (Qonce) | 500+ labeled vibration samples |
| Month 2 | Edge Impulse model training + deployment | TinyML model on ESP32 |
| Month 2 | Waterproof enclosure design + testing | Sealed PVC prototype |
| Month 3 | Benchtop demo (simulate burial + detection) | End-to-end physical demo |
| Month 3 | BCMM pilot proposal submission | Formal proposal document |

### Deliverables
- Physical sensor node prototype (ESP32 + sensors + solar)
- Trained TinyML classification model (Edge Impulse)
- Waterproof underground enclosure
- 500+ labeled vibration data samples
- BCMM pilot proposal document
- Security company partnership MOU

### Dependencies
- Hardware budget (~R3,000 for 2 prototype nodes)
- Access to cable route sites for data collection
- BCMM contact for pilot negotiation
- Edge Impulse free account

### Risk Assessment
| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Hardware procurement delays | Medium | Medium | Order components early; use local suppliers |
| Insufficient training data | Medium | High | Augment with synthetic data; partner with Omicron IoT |
| BCMM bureaucratic delays | High | Medium | Pursue security company partnership in parallel |
| Soil/weather damage to prototype | Medium | Medium | Test multiple enclosure designs |

---

## Phase 3 — Scale (Commercial Deployment)

**Timeline:** October 2026 – June 2027 (9 months)
**Goal:** 50-node deployment across BCMM + commercial partnerships

### Milestones

| Quarter | Milestone | Deliverable |
|---------|-----------|-------------|
| Q4 2026 | 5-node pilot deployment in Qonce | Live field data + performance report |
| Q4 2026 | Eskom/Telkom engagement | Partnership discussions initiated |
| Q1 2027 | 20-node expansion across BCMM | Scaled deployment + operations playbook |
| Q1 2027 | API for security company integration | REST API documentation |
| Q2 2027 | 50-node deployment + multi-municipality pitch | Full BCMM coverage + expansion proposal |
| Q2 2027 | SEDA/NYDA funding application | Grant application submitted |

### Deliverables
- 50 deployed sensor nodes across BCMM
- Commercial API for security company integration
- Operations and maintenance playbook
- Multi-municipality expansion proposal
- Funding secured (target: R500,000)
- Company registration (Ubuntu Intelligence (Pty) Ltd)

### Dependencies
- Pilot success (Phase 2 validation)
- Municipal approval for installation
- Funding (SEDA, NYDA, Eskom Development Foundation, or angel investment)
- Manufacturing partner for scaled production

### Risk Assessment
| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Pilot underperformance | Medium | Critical | Extend pilot period; refine model with field data |
| Funding gaps | Medium | High | Diversify: grants + security company revenue share |
| Competitor entry | Low | Medium | First-mover advantage; covert design is hard to replicate |
| Regulatory blockers | Low | Medium | Engage BCMM legal team early; municipal infrastructure permits |
