# CableGuard AI — Cost of Doing Nothing Simulator

**Team:** Ubuntu Intelligence  
**Hackathon:** USAII Global AI Hackathon 2026  
**Track:** Graduate — AI for Systems & Society  
**Challenge:** Brief 6, Direction A  
**Qualifier Code:** GR26-65CEEFA7

## What It Is

CableGuard AI is an AI-powered municipal decision-support simulator that answers one question:

> *"What does cable theft cost the Qonce community if Buffalo City Metro Municipality does nothing — and what is the projected impact of investing in early detection?"*

It models three scenarios over 5 years:
1. **Do Nothing** — costs compound at 8% annually
2. **Delay 3 Years** — costs grow before intervention begins
3. **Invest Now** — 65% incident reduction with covert sensor deployment

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page with problem statement and community quote |
| `/dashboard` | Interactive scenario selector with cost projection charts and metric cards |
| `/scenarios` | Side-by-side comparison, budget/ROI calculator, zone priority ranking |
| `/decision-support` | Human-in-the-loop interface with 3 explicit decision points and audit log |

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS
- **Components:** shadcn/ui
- **Charts:** Recharts
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Deployment:** Vercel

## Responsible AI

- All projections shown as ranges, never point predictions
- Zone rankings based on incident data only — not demographic factors
- False positive rate (12%) displayed explicitly
- 3 human decision points with explicit "AI does NOT decide" callouts
- Decision audit log for accountability
- Model assumptions panel with sources and rationale

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy

Push to GitHub and connect to Vercel for zero-config deployment.

## Data Disclosure

All data is synthetic and generated for demonstration purposes. No real incident data, personal information, or location data of residents is used.

## License

Built for the USAII Global AI Hackathon 2026.
