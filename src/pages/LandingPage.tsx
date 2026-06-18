import { Link } from "react-router-dom"
import { ArrowRight, Building2, Sparkles, Eye, BarChart3, CheckCircle2, ChevronRight, Star, Layers, Cpu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { ModeToggle } from "@/components/mode-toggle"

function HeroMockPanel() {
  return (
    <Card className="w-full shadow-2xl border-border/60 overflow-hidden">
      <div className="bg-muted/40 px-4 py-2.5 border-b border-border flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-chart-4/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-chart-2/80" />
        </div>
        <span className="text-[11px] text-muted-foreground font-medium ml-1">MANOVA — Analysis Results</span>
        <Badge variant="secondary" className="ml-auto text-[10px] py-0.5">Live Preview</Badge>
      </div>

      {/* Project metadata row */}
      <div className="px-4 py-3 border-b border-border bg-muted/20">
        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
          {[
            { label: "Project Type", value: "Luxury Residential Villa" },
            { label: "Location", value: "Dubai, UAE" },
            { label: "Style Detected", value: "Modern Tropical" },
            { label: "Confidence", value: "92%" },
          ].map((item) => (
            <div key={item.label} className="flex flex-col gap-0.5">
              <span className="text-[9px] text-muted-foreground uppercase tracking-wide">{item.label}</span>
              <span className="text-[11px] font-semibold">{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Render thumbnail */}
      <div className="relative h-36 bg-gradient-to-br from-amber-100 via-stone-200 to-zinc-300 dark:from-stone-800 dark:via-stone-700 dark:to-zinc-800 overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-15" viewBox="0 0 400 144" preserveAspectRatio="xMidYMid slice">
          <line x1="0" y1="118" x2="400" y2="118" stroke="currentColor" strokeWidth="1"/>
          <line x1="50" y1="118" x2="50" y2="42" stroke="currentColor" strokeWidth="1"/>
          <line x1="50" y1="42" x2="190" y2="42" stroke="currentColor" strokeWidth="1"/>
          <line x1="190" y1="42" x2="190" y2="118" stroke="currentColor" strokeWidth="1"/>
          <line x1="190" y1="72" x2="330" y2="72" stroke="currentColor" strokeWidth="1"/>
          <line x1="330" y1="72" x2="330" y2="118" stroke="currentColor" strokeWidth="1"/>
          <line x1="70" y1="42" x2="70" y2="24" stroke="currentColor" strokeWidth="1"/>
          <line x1="70" y1="24" x2="170" y2="24" stroke="currentColor" strokeWidth="1"/>
          <line x1="170" y1="24" x2="170" y2="42" stroke="currentColor" strokeWidth="1"/>
          <rect x="88" y="80" width="38" height="38" fill="none" stroke="currentColor" strokeWidth="0.75"/>
          <rect x="140" y="80" width="28" height="38" fill="none" stroke="currentColor" strokeWidth="0.75"/>
          <rect x="210" y="84" width="76" height="34" fill="none" stroke="currentColor" strokeWidth="0.75"/>
        </svg>
        <div className="absolute bottom-2.5 left-3">
          <Badge className="bg-background/85 text-foreground border border-border text-[10px] backdrop-blur-sm">
            Riyadh Villa — Design Development
          </Badge>
        </div>
        <div className="absolute top-2.5 right-3">
          <div className="flex items-center gap-1 bg-background/85 backdrop-blur-sm rounded-full px-2.5 py-1 border border-border">
            <Star className="w-3 h-3 fill-chart-4 text-chart-4" />
            <span className="text-xs font-bold">87</span>
            <span className="text-[10px] text-muted-foreground">/100</span>
          </div>
        </div>
      </div>

      {/* Score bars */}
      <CardContent className="p-4 space-y-3">
        <p className="text-[10px] text-muted-foreground uppercase tracking-wide font-medium">Design Metrics</p>
        <div className="grid grid-cols-2 gap-x-5 gap-y-2.5">
          {[
            { label: "Composition", value: 91 },
            { label: "Materiality", value: 83 },
            { label: "Lighting", value: 88 },
            { label: "Sustainability", value: 78 },
          ].map((item) => (
            <div key={item.label} className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-muted-foreground">{item.label}</span>
                <span className="text-[11px] font-bold tabular-nums">{item.value}</span>
              </div>
              <Progress value={item.value} className="h-1" />
            </div>
          ))}
        </div>

        <Separator />

        {/* Color palette */}
        <div className="space-y-1.5">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wide font-medium">Material Palette</p>
          <div className="flex gap-2">
            {[
              { hex: "#e8dcc8", name: "Sahara" },
              { hex: "#7a5230", name: "Oud" },
              { hex: "#c06040", name: "Dusk" },
              { hex: "#2d2d2d", name: "Shadow" },
              { hex: "#f9f6f0", name: "Alabaster" },
            ].map((c) => (
              <div key={c.hex} className="flex flex-col items-center gap-1">
                <div className="w-5 h-5 rounded border border-border/60 shadow-sm" style={{ backgroundColor: c.hex }} />
                <span className="text-[9px] text-muted-foreground">{c.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* AI insight */}
        <div className="flex items-start gap-2 rounded-lg bg-muted/60 p-2.5">
          <Sparkles className="w-3.5 h-3.5 text-chart-2 mt-0.5 shrink-0" />
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            Strong contextual integration detected. Passive cooling strategy needs refinement for optimal thermal comfort.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

const features = [
  {
    icon: BarChart3,
    title: "AI Design Analysis",
    description: "Instant scoring across composition, materiality, lighting, and sustainability — with actionable recommendations ranked by impact.",
  },
  {
    icon: Sparkles,
    title: "Concept Generation",
    description: "AI-generated concept directions tailored to your project type, climate zone, and cultural context. Three directions, scored for compatibility.",
  },
  {
    icon: Eye,
    title: "Render Intelligence",
    description: "Automated render review with annotated improvement notes, quality scoring, and a step-by-step improvement guide per software.",
  },
  {
    icon: Layers,
    title: "Material Intelligence",
    description: "Curated material recommendations organized by zone — floor, wall, ceiling, furniture — with cost tier and sustainability scores.",
  },
  {
    icon: Cpu,
    title: "Presentation Ready",
    description: "AI-generated project narratives, selling points, and slide outlines you can export as PDF, PowerPoint, or web presentations.",
  },
  {
    icon: Building2,
    title: "Reference Discovery",
    description: "Pinterest-quality reference boards automatically curated across architecture, interiors, materials, and landscape — specific to your project.",
  },
]

const steps = [
  {
    number: "01",
    title: "Upload Your Design",
    description: "Drop in sketches, floor plans, renders, model screenshots, or concept images. Supports all major formats including DWG and RVT.",
  },
  {
    number: "02",
    title: "AI Analysis Runs",
    description: "MANOVA evaluates 40+ design criteria across composition, materiality, climate response, and cultural context in under 60 seconds.",
  },
  {
    number: "03",
    title: "Act on Insights",
    description: "Review scored results across 10 intelligence modules, accept recommendations, and export client-ready presentations.",
  },
]

const firms = ["Foster + Partners", "Zaha Hadid Arch", "SOM", "Gensler", "BIG", "AECOM"]

export function LandingPage() {
  return (
    <div className="min-h-svh bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 flex h-14 items-center gap-8">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Building2 className="h-3.5 w-3.5" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-black tracking-tight text-sm">MANOVA</span>
              <span className="text-[9px] text-muted-foreground tracking-wide">THE ARCHITECTURAL COPILOT</span>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-6 ml-4">
            {["Features", "Workflow", "Examples", "Pricing"].map((item) => (
              <a key={item} href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {item}
              </a>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <ModeToggle />
            <Button variant="ghost" size="sm" asChild>
              <Link to="/dashboard">Sign In</Link>
            </Button>
            <Button size="sm" asChild>
              <Link to="/dashboard">
                Start Free
                <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 pt-20 pb-28">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-700">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="gap-1.5 py-1 px-3">
                <Sparkles className="w-3 h-3 text-chart-2" />
                Powered by AI
              </Badge>
              <Badge variant="outline" className="py-1 px-3 text-muted-foreground">v2.1 — Now with Render Review</Badge>
            </div>

            <div className="space-y-5">
              <div>
                <h1 className="text-6xl font-black tracking-tight leading-none mb-1">
                  MANOVA
                </h1>
                <p className="text-2xl font-light text-muted-foreground tracking-wide">
                  The Architectural Copilot
                </p>
              </div>
              <p className="text-base text-muted-foreground leading-relaxed max-w-lg">
                Upload sketches, floor plans, model screenshots, renders, or concept images. Receive intelligent design analysis, concept directions, reference discovery, material recommendations, mood boards, render reviews, and presentation-ready insights in minutes.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button size="lg" className="gap-2" asChild>
                <Link to="/dashboard">
                  Start for Free
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="gap-2" asChild>
                <Link to="/projects/1/analysis">
                  See Demo Analysis
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1">
              {["No credit card", "Free 5 analyses", "Cancel anytime"].map((item) => (
                <div key={item} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-3.5 h-3.5 text-chart-2" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Right — mock panel */}
          <div className="animate-in fade-in slide-in-from-right-4 duration-700 delay-150">
            <HeroMockPanel />
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="border-y border-border/60 bg-muted/30 py-10">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-center text-sm text-muted-foreground mb-6">
            Trusted by <span className="font-semibold text-foreground">2,400+</span> architects & designers at
          </p>
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-3">
            {firms.map((firm) => (
              <span key={firm} className="text-sm font-medium text-muted-foreground/70 hover:text-muted-foreground transition-colors">
                {firm}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="text-center mb-14 space-y-3">
          <Badge variant="outline" className="text-muted-foreground">Features</Badge>
          <h2 className="text-3xl font-bold tracking-tight">Everything your practice needs</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            From first concept sketch to client presentation — MANOVA covers every design review milestone.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature) => (
            <Card key={feature.title} className="p-6 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
              <CardContent className="p-0 space-y-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <feature.icon className="w-4.5 h-4.5" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-sm">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-border/60 bg-muted/20 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-14 space-y-3">
            <Badge variant="outline" className="text-muted-foreground">Workflow</Badge>
            <h2 className="text-3xl font-bold tracking-tight">Three steps to design clarity</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={step.number} className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-5xl font-black text-muted-foreground/15 tabular-nums leading-none">
                    {step.number}
                  </span>
                  {i < steps.length - 1 && (
                    <ArrowRight className="hidden md:block w-4 h-4 text-border ml-auto" />
                  )}
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-3xl px-6 text-center space-y-6">
          <h2 className="text-4xl font-extrabold tracking-tight">
            Ready to elevate your design practice?
          </h2>
          <p className="text-muted-foreground text-lg">
            Join 2,400+ architects already using MANOVA to produce better work, faster.
          </p>
          <Button size="lg" className="gap-2 px-8" asChild>
            <Link to="/dashboard">
              Get Started Free
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/60 py-10">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-primary text-primary-foreground">
              <Building2 className="h-3 w-3" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-sm font-black">MANOVA</span>
              <span className="text-[9px] text-muted-foreground tracking-wide">THE ARCHITECTURAL COPILOT</span>
            </div>
          </div>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Docs", "Support"].map((item) => (
              <a key={item} href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                {item}
              </a>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">© 2026 MANOVA. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
