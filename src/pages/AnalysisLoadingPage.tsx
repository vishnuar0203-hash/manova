import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { CheckCircle2, Circle, Sparkles, Loader2 } from "lucide-react"
import { Progress } from "@/components/ui/progress"

const STEPS = [
  { id: "process",   label: "Processing design images",         detail: "Reading pixel data, resolving geometry" },
  { id: "style",     label: "Detecting architectural style",    detail: "Matching against 1,200+ style signatures" },
  { id: "material",  label: "Analyzing material palette",       detail: "Identifying surfaces, textures, finishes" },
  { id: "context",   label: "Mapping cultural context",         detail: "Correlating climate, region, typology" },
  { id: "concept",   label: "Generating concept directions",    detail: "Synthesizing 3 named concept paths" },
  { id: "reference", label: "Building reference library",       detail: "Sourcing precedents & architect works" },
  { id: "insights",  label: "Preparing insights report",        detail: "Scoring composition, sustainability, more" },
]

const STEP_DURATION = 620

export function AnalysisLoadingPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [activeStep, setActiveStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set())

  useEffect(() => {
    let stepIndex = 0

    function advance() {
      if (stepIndex >= STEPS.length) {
        setTimeout(() => navigate(`/projects/${id}/analysis`), 600)
        return
      }

      setActiveStep(stepIndex)

      const timer = setTimeout(() => {
        setCompletedSteps((prev) => new Set([...prev, stepIndex]))
        stepIndex++
        advance()
      }, STEP_DURATION)

      return timer
    }

    const timer = setTimeout(() => advance(), 400)
    return () => clearTimeout(timer)
  }, [id, navigate])

  const progress = Math.round(((completedSteps.size) / STEPS.length) * 100)

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
      {/* Subtle radial gradient backdrop */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,_var(--tw-gradient-stops))] from-muted/40 via-background to-background" />

      <div className="relative z-10 flex flex-col items-center gap-10 w-full max-w-md px-6">

        {/* Brand mark */}
        <div className="flex flex-col items-center gap-3 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-primary text-primary-foreground shadow-lg">
            <Sparkles className="w-7 h-7" />
          </div>
          <div className="text-center">
            <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-muted-foreground">MANOVA</p>
            <p className="text-xs text-muted-foreground/60">Analyzing your design</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-500 delay-100">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Analysis in progress</span>
            <span className="text-xs font-semibold tabular-nums">{progress}%</span>
          </div>
          <Progress value={progress} className="h-1.5" />
        </div>

        {/* Steps list */}
        <div className="w-full space-y-1 animate-in fade-in slide-in-from-bottom-2 duration-500 delay-200">
          {STEPS.map((step, i) => {
            const isDone = completedSteps.has(i)
            const isActive = activeStep === i && !isDone

            return (
              <div
                key={step.id}
                className={[
                  "flex items-start gap-3 rounded-lg px-4 py-2.5 transition-all duration-300",
                  isActive ? "bg-muted/60" : "",
                ].join(" ")}
              >
                {/* Icon */}
                <div className="mt-0.5 shrink-0">
                  {isDone ? (
                    <CheckCircle2 className="w-4 h-4 text-primary animate-in zoom-in duration-300" />
                  ) : isActive ? (
                    <Loader2 className="w-4 h-4 text-primary animate-spin" />
                  ) : (
                    <Circle className="w-4 h-4 text-border" />
                  )}
                </div>

                {/* Text */}
                <div className="min-w-0">
                  <p className={[
                    "text-sm font-medium leading-tight transition-colors duration-200",
                    isDone ? "text-foreground" : isActive ? "text-foreground" : "text-muted-foreground/50",
                  ].join(" ")}>
                    {step.label}
                  </p>
                  {isActive && (
                    <p className="text-[11px] text-muted-foreground mt-0.5 animate-in fade-in duration-200">
                      {step.detail}
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Footer note */}
        <p className="text-[11px] text-muted-foreground/50 text-center animate-in fade-in duration-500 delay-300">
          Results are ready in seconds — no page refresh needed
        </p>
      </div>
    </div>
  )
}
