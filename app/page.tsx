import Link from "next/link"
import {
  ArrowRight,
  BarChart3,
  Radio,
  Lightbulb,
  CheckCircle2,
  Target,
  XCircle,
  Zap,
} from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FadeIn } from "@/components/ui/fade-in"
import { cn } from "@/lib/utils"

const stats = [
  {
    value: "R7 Billion+",
    label: "Annual cost of cable theft in South Africa",
    icon: BarChart3,
    variant: "danger" as const,
  },
  {
    value: "47 Incidents",
    label: "Per year in BCMM — each costs R200,000+",
    icon: Zap,
    variant: "amber" as const,
  },
  {
    value: "0 Systems",
    label: "Covert detection systems currently deployed in Qonce",
    icon: XCircle,
    variant: "default" as const,
  },
]

const steps = [
  {
    icon: Radio,
    title: "Signal",
    description:
      "Covert vibration sensors detect cable tampering in real time across Qonce's underground network.",
  },
  {
    icon: BarChart3,
    title: "Insight",
    description:
      "AI analyzes sensor data against historical patterns to assess threat probability and cost impact.",
  },
  {
    icon: Lightbulb,
    title: "Decision",
    description:
      "The simulator presents scenario projections — BCMM operators choose whether to act.",
  },
  {
    icon: Target,
    title: "Action",
    description:
      "Approved alerts are escalated to patrol units. Human operators decide on deployment.",
  },
  {
    icon: CheckCircle2,
    title: "Outcome",
    description:
      "Early detection prevents theft completion, reducing costs, outages, and community disruption.",
  },
]

const nonGoals = [
  "Identify or monitor individual people",
  "Automate police dispatch",
  "Make budget decisions on behalf of BCMM",
  "Replace human investigators or municipal officers",
  "Use real personal or location data of residents",
  "Claim to predict exact theft dates or perpetrators",
]

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* ── HERO SECTION ── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary to-primary/90 px-4 py-24 md:py-32 lg:py-40">
        <div className="container mx-auto max-w-4xl text-center">
          <FadeIn>
            <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
              The Cost of Doing Nothing
            </h1>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-300 md:text-xl">
              An AI-powered simulator showing Buffalo City Metro Municipality
              the true cost of delayed intervention on cable theft — and what
              changes when they act.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/dashboard"
                className={cn(buttonVariants({ variant: "teal", size: "lg" }))}
              >
                Launch Simulator
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/scenarios"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "border-white/20 text-white hover:bg-white/10"
                )}
              >
                See the Data
              </Link>
            </div>
          </FadeIn>
        </div>
        {/* Background decoration */}
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-teal/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-teal/5 blur-3xl" />
      </section>

      {/* ── COMMUNITY QUOTE SECTION ── */}
      <section className="bg-primary px-4 py-16 md:py-20">
        <div className="container mx-auto max-w-3xl">
          <FadeIn>
            <blockquote className="relative">
              <div className="absolute -left-4 -top-2 text-6xl text-teal/30 font-serif">
                &ldquo;
              </div>
              <p className="pl-8 text-lg leading-relaxed text-gray-200 italic md:text-xl">
                We&apos;re writing to express our extreme frustration about the
                rampant cable theft and vandalism in our community. Daily
                disruptions to essential services like electricity and water are
                taking a toll on residents.
              </p>
              <footer className="mt-6 pl-8">
                <p className="text-sm font-medium text-teal">
                  — Community Group, Qonce (King William&apos;s Town), Eastern
                  Cape
                </p>
              </footer>
            </blockquote>
          </FadeIn>
        </div>
      </section>

      {/* ── THREE STAT CARDS ── */}
      <section className="bg-surface px-4 py-16 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <FadeIn>
            <h2 className="mb-12 text-center text-3xl font-bold tracking-tight text-primary">
              The Scale of the Problem
            </h2>
          </FadeIn>
          <div className="grid gap-6 md:grid-cols-3">
            {stats.map((stat, i) => (
              <FadeIn key={stat.value} delay={i * 0.1}>
                <Card
                  className={`border-l-4 ${
                    stat.variant === "danger"
                      ? "border-l-danger"
                      : stat.variant === "amber"
                        ? "border-l-amber"
                        : "border-l-primary"
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p
                          className={`text-3xl font-bold md:text-4xl ${
                            stat.variant === "danger"
                              ? "text-danger"
                              : stat.variant === "amber"
                                ? "text-amber"
                                : "text-primary"
                          }`}
                        >
                          {stat.value}
                        </p>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {stat.label}
                        </p>
                      </div>
                      <stat.icon
                        className={`h-8 w-8 ${
                          stat.variant === "danger"
                            ? "text-danger/30"
                            : stat.variant === "amber"
                              ? "text-amber/30"
                              : "text-primary/30"
                        }`}
                      />
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="bg-white px-4 py-16 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <FadeIn>
            <h2 className="mb-4 text-center text-3xl font-bold tracking-tight text-primary">
              How It Works
            </h2>
            <p className="mb-12 text-center text-muted-foreground">
              Signal → Insight → Decision → Action → Outcome
            </p>
          </FadeIn>
          <div className="relative">
            {/* Connecting line (desktop) */}
            <div className="absolute left-0 right-0 top-12 hidden h-0.5 bg-teal/20 md:block" />
            <div className="grid gap-8 md:grid-cols-5">
              {steps.map((step, i) => (
                <FadeIn key={step.title} delay={i * 0.1}>
                  <div className="flex flex-col items-center text-center">
                    <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full border-2 border-teal/20 bg-white shadow-sm">
                      <step.icon className="h-8 w-8 text-teal" />
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-primary">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── NON-GOALS SECTION ── */}
      <section className="bg-surface px-4 py-16 md:py-20">
        <div className="container mx-auto max-w-3xl">
          <FadeIn>
            <Card className="border-2 border-teal/30">
              <CardContent className="p-8">
                <h2 className="mb-6 text-2xl font-bold tracking-tight text-primary">
                  What This System Does NOT Do
                </h2>
                <p className="mb-6 text-muted-foreground">
                  CableGuard AI is a decision-support simulator — not an
                  automated system, not a surveillance tool, and not a
                  replacement for human judgment.
                </p>
                <ul className="space-y-3">
                  {nonGoals.map((goal) => (
                    <li key={goal} className="flex items-start gap-3">
                      <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-danger" />
                      <span className="text-sm text-gray-700">{goal}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="bg-primary px-4 py-16 text-center">
        <FadeIn>
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Ready to See the Numbers?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-300">
            Explore 5-year cost projections, compare intervention scenarios, and
            make informed decisions about infrastructure protection.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/dashboard"
              className={cn(buttonVariants({ variant: "teal", size: "lg" }))}
            >
              Launch Simulator
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/decision-support"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "border-white/20 text-white hover:bg-white/10"
              )}
            >
              Decision Support
            </Link>
          </div>
        </FadeIn>
      </section>
    </div>
  )
}
