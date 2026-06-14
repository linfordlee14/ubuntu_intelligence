# CableGuard AI — Scope Document

**Team:** Ubuntu Intelligence
**Last Updated:** June 13, 2026

---

## In Scope

### Hackathon Deliverables (June 14–21, 2026)

**Simulation Dashboard (Next.js)**
- Real-time map displaying 5 simulated sensor nodes across Qonce cable routes
- Live sensor data visualization (vibration amplitude, current level, acoustic level)
- AI classification engine producing confidence scores (0-100%) per event
- Graduated status indicators: SAFE → WATCH → SUSPICIOUS → CRITICAL
- Alert log with timestamps, GPS coordinates, confidence scores, and resolution status
- WhatsApp-style notification preview showing alert message format

**Sensor Simulation Engine**
- Configurable data generator producing realistic vibration, current, and acoustic signals
- Inject-able "digging event" scenarios with escalating signature patterns
- Multi-sensor fusion algorithm combining three signal types into a single confidence score
- Background noise simulation (pedestrian, vehicle, rain, animal) for contrast

**AI Classification Logic**
- Simulated TinyML classification pipeline (TypeScript implementation)
- Six output classes: SAFE, PEDESTRIAN, VEHICLE, RAIN, ANIMAL, DIGGING
- Confidence scoring with configurable thresholds (40/65/85%)
- Alert escalation logic: LOG → WATCH → NOTIFY → DISPATCH

**Alert System**
- Dashboard toast notifications for real-time events
- WhatsApp message template preview (formatted alert with GPS, timestamp, confidence)
- Alert dispatch log with delivery status tracking

**Documentation**
- Software Design Document (SDD) package
- System architecture diagrams
- Pitch deck (17-slide PPTX)
- Devpost project page with description, images, and demo video
- 5-minute pitch video

### Post-Hackathon (Phase 2 — if funded)
- Physical ESP32 + sensor prototype assembly
- Real vibration data collection in Qonce
- Edge Impulse model training and ESP32 deployment
- Waterproof PVC enclosure design and field testing
- BCMM pilot proposal submission
- Security company partnership negotiation

---

## Out of Scope

### Not Building During Hackathon
- Physical hardware prototype (no ESP32, sensors, or enclosures built)
- Real sensor data ingestion from field devices
- Actual WhatsApp Business API integration (demo uses simulated preview only)
- Twilio account setup or real SMS dispatch
- MQTT broker deployment
- Mobile app (dashboard is web-only, responsive)
- User authentication system (demo runs without login)
- Multi-tenant access control
- Payment or billing systems
- Integration with SAPS dispatch systems
- LoRa mesh network implementation
- Fiber optic monitoring integration

### Not Addressing in This Project
- Cable theft prevention through physical deterrents (locks, guards, barriers)
- Community policing or neighborhood watch coordination
- Legislative advocacy or policy reform
- Insurance claim processing
- Cable replacement logistics or supply chain
- Alternative energy solutions for affected communities

---

## Future Considerations

### Phase 2 Expansions (3-6 months post-hackathon)
- Physical prototype with real sensors → benchtop demo
- Wokwi or Proteus simulation for hardware validation before physical assembly
- Edge Impulse integration for TinyML model training with real data
- Twilio WhatsApp Business API integration for live alerts
- Supabase Auth for multi-user access control
- Mobile-optimized dashboard (Progressive Web App)

### Phase 3 Expansions (6-12 months)
- REST API for security company integration
- Multi-municipality deployment support
- Historical analytics and predictive modeling
- Integration with municipal GIS systems
- Automated reporting for BCMM infrastructure teams
- Eskom/Telkom infrastructure monitoring modules

### Long-term Vision
- National cable theft detection network
- Integration with South African Police Service (SAPS) dispatch
- Cross-border deployment (Namibia, Botswana, Zimbabwe)
- Adaptation for water pipe theft, transformer theft, and other infrastructure crime
- AI model marketplace for different infrastructure types

---

## Assumptions

1. **Hackathon judges value a working simulation over physical hardware.** The demo will clearly label itself as a "digital twin" simulation of the production system.

2. **Supabase and Vercel free tiers will support the hackathon demo.** Based on expected load (5 simulated nodes, <10 concurrent dashboard users), free tiers are sufficient.

3. **The challenge brief for "AI for Systems & Society" will align with infrastructure protection.** Cable theft is a documented community safety crisis. If the brief requires a different framing, we will adapt the pitch angle while keeping the core solution.

4. **Next.js + Supabase is a viable stack for real-time IoT dashboards.** Supabase Realtime supports WebSocket subscriptions for live data updates. This has been validated by multiple production IoT platforms.

5. **WhatsApp is the preferred alert channel for South African communities and security teams.** This is confirmed by the community PDF — residents already report incidents via WhatsApp.

6. **ESP32 + TinyML is feasible for edge vibration classification.** This is validated by Edge Impulse case studies and Omicron IoT's deployed vibration sensors.

7. **A sensor node can be built for under R1,500.** Based on component pricing research: ESP32 (~R80), sensors (~R250), GSM module (~R120), LoRa (~R150), solar+battery (~R400), enclosure (~R200) = ~R1,200.

---

## Constraints

1. **Time:** 7 days from kickoff to submission (June 14–21).
2. **Team size:** 2 people (Linford and Cwaita).
3. **Budget:** R0 for hackathon (free tiers only). Hardware budget needed for Phase 2.
4. **No physical hardware:** Hackathon demo is simulation-only.
5. **Internet dependency for demo:** Simulation runs in the browser; requires internet for Supabase connection.
6. **Devpost submission format:** Must include project description, images/screenshots, demo video, and qualifier code (GR26-65CEEFA7).
7. **5-minute pitch limit:** Presentation must be concise and impactful within the time constraint.
8. **Judge feedback to address:** AI reasoning depth, architectural specificity, false positive vs false negative tradeoff analysis, named sensor/fusion logic components.
