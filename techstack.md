# CableGuard AI — Technical Stack

**Team:** Ubuntu Intelligence
**Last Updated:** June 13, 2026

---

## Frontend Technologies

| Component | Technology | Justification |
|-----------|-----------|---------------|
| Framework | **Next.js 14 (App Router)** | Server components, API routes, optimized builds. Industry standard for React dashboards. |
| Styling | **Tailwind CSS** | Rapid UI development, consistent design tokens, zero runtime overhead. |
| Mapping | **Leaflet + React-Leaflet** | Open-source mapping with GPS marker support. No API key costs (uses OpenStreetMap). |
| Charts | **Recharts** | Lightweight, composable, React-native charting for confidence scores and analytics. |
| State | **Zustand** | Minimal boilerplate for real-time state updates from sensor feeds. |
| Notifications | **Sonner (toast library)** | Clean alert notifications in the dashboard UI. |
| Deployment | **Vercel (free tier)** | Zero-config Next.js deployment. HTTPS, CDN, serverless functions included. |

## Backend Technologies

| Component | Technology | Justification |
|-----------|-----------|---------------|
| Database + Realtime | **Supabase** | PostgreSQL with built-in Realtime subscriptions. Free tier is sufficient for hackathon + pilot. Row-level security for multi-tenant access. |
| API Layer | **Next.js API Routes** | Co-located with frontend. No separate backend to deploy or maintain. |
| Sensor Data Ingestion | **Supabase Realtime + MQTT Bridge** | Sensors push via MQTT; a lightweight bridge writes to Supabase. Dashboard subscribes to Realtime channel. |
| Alert Dispatch | **Twilio API (WhatsApp Business)** | Programmatic WhatsApp messaging. Free trial for hackathon; paid for production. |
| SMS Fallback | **Twilio SMS** | Backup when WhatsApp delivery fails. Critical for areas with poor data coverage. |
| Cron / Scheduled Tasks | **Vercel Cron** | Periodic health checks, sensor heartbeat monitoring, daily analytics aggregation. |

## Database

### Schema (Supabase / PostgreSQL)

```sql
-- Sensor nodes deployed in the field
CREATE TABLE sensor_nodes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  node_id TEXT UNIQUE NOT NULL,
  label TEXT,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  zone TEXT,
  status TEXT DEFAULT 'active', -- active, offline, maintenance
  battery_level INTEGER DEFAULT 100,
  last_heartbeat TIMESTAMPTZ,
  installed_at TIMESTAMPTZ DEFAULT NOW()
);

-- Raw sensor readings
CREATE TABLE sensor_readings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  node_id TEXT REFERENCES sensor_nodes(node_id),
  vibration_amplitude DOUBLE PRECISION,
  vibration_frequency DOUBLE PRECISION,
  current_level DOUBLE PRECISION,
  acoustic_level DOUBLE PRECISION,
  temperature DOUBLE PRECISION,
  recorded_at TIMESTAMPTZ DEFAULT NOW()
);

-- AI classification events
CREATE TABLE detection_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  node_id TEXT REFERENCES sensor_nodes(node_id),
  classification TEXT NOT NULL, -- SAFE, SUSPICIOUS, CRITICAL
  confidence DOUBLE PRECISION NOT NULL, -- 0.0 to 1.0
  vibration_class TEXT, -- pedestrian, vehicle, rain, animal, digging
  sensors_triggered TEXT[], -- which sensors contributed
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  detected_at TIMESTAMPTZ DEFAULT NOW(),
  resolved_at TIMESTAMPTZ,
  resolution TEXT -- false_alarm, confirmed_theft, patrol_dispatched
);

-- Alert dispatch log
CREATE TABLE alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES detection_events(id),
  channel TEXT NOT NULL, -- whatsapp, sms, dashboard
  recipient TEXT NOT NULL,
  message TEXT,
  status TEXT DEFAULT 'sent', -- sent, delivered, read, failed
  sent_at TIMESTAMPTZ DEFAULT NOW()
);
```

## Authentication

| Component | Technology | Justification |
|-----------|-----------|---------------|
| Auth Provider | **Supabase Auth** | Built-in with database. Email/password + magic links. |
| Role-Based Access | **Supabase RLS (Row-Level Security)** | Municipal operators see their zones only. Security companies see their assigned areas. |
| Session Management | **Supabase Auth Helpers for Next.js** | Seamless integration with App Router middleware. |

### Access Roles
- **Admin** — Full access. System configuration, user management.
- **Operator** — Dashboard access. Review alerts, approve dispatches, manage nodes.
- **Responder** — Receives WhatsApp/SMS alerts. View-only dashboard access.
- **Viewer** — Read-only dashboard. Analytics and historical data.

## AI Components

### Edge AI (On-Device — Phase 2+)

| Component | Technology | Details |
|-----------|-----------|---------|
| Framework | **TensorFlow Lite for Microcontrollers** | Optimized for ESP32. <50KB model size. |
| Training Platform | **Edge Impulse** | Free for students. Visual workflow for data collection → training → deployment. |
| Model Type | **1D Convolutional Neural Network** | Best for time-series vibration classification. |
| Input Features | Vibration FFT (256-point), amplitude envelope, zero-crossing rate | 3-channel feature vector per reading |
| Output Classes | SAFE, PEDESTRIAN, VEHICLE, RAIN, ANIMAL, DIGGING | 6-class classification |
| Inference Speed | <100ms per classification | Real-time on ESP32 at 240MHz |

### Cloud AI (Dashboard — Phase 1 Simulation)

| Component | Technology | Details |
|-----------|-----------|---------|
| Simulation Engine | **TypeScript (Next.js server-side)** | Generates realistic sensor data with configurable noise and event injection. |
| Confidence Scoring | **Multi-sensor fusion algorithm** | Weighted combination: vibration (0.5) + current (0.3) + acoustic (0.2). |
| Hotspot Analysis | **PostGIS + SQL aggregation** | Spatial clustering of detection events. Identifies repeat-target zones. |
| Predictive Model | **Time-series analysis (future)** | Peak-time prediction based on historical incident patterns. |

### Confidence Threshold Design

```
Confidence < 40%  →  LOG ONLY (dashboard record, no alert)
40% ≤ Confidence < 65%  →  WATCH (dashboard highlight, no notification)
65% ≤ Confidence < 85%  →  NOTIFY (WhatsApp alert to operator for human review)
Confidence ≥ 85%  →  DISPATCH (automatic alert to security + SAPS)
```

**Design rationale:** False negative cost (R200K+ damage) is ~400x false positive cost (~R500 patrol). We bias toward recall. The 65-85% human review band prevents alert fatigue while catching edge cases.

## Cloud Infrastructure

| Component | Service | Tier |
|-----------|---------|------|
| Hosting | Vercel | Free (hackathon), Pro (production) |
| Database | Supabase | Free (hackathon), Pro (production) |
| File Storage | Supabase Storage | Incident photos, reports |
| DNS | Vercel Domains | Included |
| CDN | Vercel Edge Network | Included |
| Monitoring | Vercel Analytics | Built-in |

**Cost at hackathon scale:** R0 (all free tiers)
**Cost at 50-node production:** ~R800/month (Supabase Pro + Vercel Pro)

## Security Requirements

| Requirement | Implementation |
|-------------|----------------|
| Data encryption at rest | Supabase (AES-256 on PostgreSQL) |
| Data encryption in transit | HTTPS (TLS 1.3) via Vercel |
| Authentication | Supabase Auth with PKCE flow |
| Authorization | Row-Level Security policies per role |
| API security | Next.js middleware + Supabase service role key (server-only) |
| Sensor communication | GSM-encrypted SMS; MQTT with TLS (production) |
| Audit logging | All alert dispatches logged with timestamps |
| POPIA compliance | No personal data collected from community members |

## Monitoring & Analytics

| Component | Tool | Purpose |
|-----------|------|---------|
| Application monitoring | Vercel Analytics | Page performance, error tracking |
| Database monitoring | Supabase Dashboard | Query performance, connection pool |
| Sensor health | Custom heartbeat system | Battery level, last contact time, uptime |
| Alert delivery | Twilio delivery receipts | WhatsApp/SMS delivery confirmation |
| Incident analytics | Custom dashboard page | Hotspot mapping, time-of-day analysis, response time tracking |

## CI/CD Pipeline

| Stage | Tool | Trigger |
|-------|------|---------|
| Version control | GitHub | All code changes |
| Linting | ESLint + Prettier | Pre-commit hook (Husky) |
| Type checking | TypeScript strict mode | CI step |
| Build | Next.js build | Push to main |
| Preview deployment | Vercel Preview | Pull request |
| Production deployment | Vercel Production | Merge to main |
| Database migrations | Supabase CLI | Manual (reviewed) |

## Scalability Considerations

**Hackathon (5 simulated nodes):** Free tiers handle everything. No scaling concerns.

**Pilot (10 real nodes):** Supabase free tier supports up to 500MB database + 50K monthly active users. More than sufficient.

**Production (50+ nodes):**
- Supabase Pro for connection pooling (Supavisor) and larger database
- Vercel Pro for higher serverless function limits
- MQTT broker (e.g., HiveMQ Cloud free tier → production) for sensor ingestion
- Consider edge functions for latency-sensitive alert dispatch

**At 500+ nodes:**
- Dedicated MQTT broker (self-hosted or AWS IoT Core)
- Time-series database (TimescaleDB extension on Supabase) for sensor readings
- CDN-cached dashboard for multiple operator sessions
- Regional deployment for multi-municipality support
