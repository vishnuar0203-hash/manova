import { useState } from "react"
import { mockAnalysis } from "@/data/mock-analysis"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { AlertCircle, AlertTriangle, Info, CheckSquare, Square, Sparkles, TrendingUp } from "lucide-react"

const priorityConfig = {
  high:   { icon: AlertCircle,   color: "text-destructive",     bg: "bg-destructive/5 border-destructive/20",  badge: "destructive" as const, label: "Critical" },
  medium: { icon: AlertTriangle, color: "text-chart-1",         bg: "bg-chart-1/5 border-chart-1/20",          badge: "secondary"   as const, label: "Medium" },
  low:    { icon: Info,          color: "text-muted-foreground", bg: "bg-muted/40 border-border/60",            badge: "outline"     as const, label: "Low" },
}

function scoreColor(score: number) {
  if (score >= 85) return { bar: "bg-chart-2", text: "text-chart-2", label: "Excellent" }
  if (score >= 75) return { bar: "bg-chart-4", text: "text-chart-4", label: "Good" }
  return { bar: "bg-destructive", text: "text-destructive", label: "Needs Work" }
}

function RadialScore({ score, size = 120 }: { score: number; size?: number }) {
  const r = 40
  const circumference = 2 * Math.PI * r
  const filled = (score / 100) * circumference
  const sc = scoreColor(score)

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 100 100" className="-rotate-90">
        <circle cx="50" cy="50" r={r} fill="none" stroke="var(--border)" strokeWidth="8" />
        <circle
          cx="50" cy="50" r={r}
          fill="none"
          stroke="var(--chart-2)"
          strokeWidth="8"
          strokeDasharray={`${filled} ${circumference}`}
          strokeLinecap="round"
          className="transition-all duration-1000"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className={`text-2xl font-bold tabular-nums ${sc.text}`}>{score}</span>
        <span className="text-[10px] text-muted-foreground">/100</span>
      </div>
    </div>
  )
}

const CHECKLIST_ITEMS = [
  { id: 1, text: "Reduce window overexposure by 1.5 stops", priority: "high" as const, done: false },
  { id: 2, text: "Add micro-roughness to floor material", priority: "medium" as const, done: false },
  { id: 3, text: "Fix shadow banding on plaster wall", priority: "medium" as const, done: false },
  { id: 4, text: "Scale furniture down 8% relative to room height", priority: "low" as const, done: true },
  { id: 5, text: "Add fabric softness texture to cushions", priority: "low" as const, done: true },
]

export function RenderReviewTab() {
  const { renderReview } = mockAnalysis
  const [checklist, setChecklist] = useState(CHECKLIST_ITEMS)

  const toggleItem = (id: number) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item))
    )
  }

  const doneCount = checklist.filter((i) => i.done).length
  const overallSc = scoreColor(renderReview.overallScore)

  return (
    <div className="space-y-6">

      {/* ── Score Header ── */}
      <div className="grid lg:grid-cols-[auto_1fr] gap-6">
        {/* Main score */}
        <Card className="border-border/70">
          <CardContent className="flex flex-col items-center justify-center pt-6 pb-6 gap-3 min-w-[180px]">
            <RadialScore score={renderReview.overallScore} size={128} />
            <div className="text-center space-y-1">
              <p className="text-sm font-semibold">Overall Quality</p>
              <Badge variant="secondary" className={`text-[10px] ${overallSc.text}`}>
                {overallSc.label}
              </Badge>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/40 px-3 py-1.5 rounded-full">
              <Sparkles className="w-3 h-3 text-chart-2" />
              AI Render Analysis
            </div>
          </CardContent>
        </Card>

        {/* Dimension score cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 content-start">
          {renderReview.dimensions.map((d) => {
            const sc = scoreColor(d.score)
            return (
              <Card key={d.name} className="border-border/70 hover:border-border transition-colors">
                <CardContent className="pt-4 pb-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-muted-foreground">{d.name}</span>
                    <span className={`text-lg font-bold tabular-nums ${sc.text}`}>{d.score}</span>
                  </div>
                  <Progress value={d.score} className="h-1" />
                  <div className="flex items-center justify-between">
                    <Badge
                      variant={d.status === "excellent" ? "default" : d.status === "good" ? "secondary" : "destructive"}
                      className="text-[9px] h-4"
                    >
                      {sc.label}
                    </Badge>
                    {d.status === "excellent" && <TrendingUp className="w-3 h-3 text-chart-2" />}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* ── Before / After ── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold">Before / After Comparison</h4>
          <Badge variant="outline" className="text-[10px] text-chart-2 border-chart-2/30 bg-chart-2/5">
            AI Enhanced
          </Badge>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Current Render</p>
            <div className="overflow-hidden rounded-xl border border-border/70">
              <AspectRatio ratio={16 / 9}>
                <div className="w-full h-full bg-gradient-to-br from-stone-300 to-zinc-400 dark:from-stone-700 dark:to-zinc-800 flex items-end p-4">
                  <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-destructive" />
                    <span className="text-[10px] text-white/80">Issues detected</span>
                  </div>
                </div>
              </AspectRatio>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {renderReview.annotations.filter((a) => a.priority === "high").map((a) => (
                <Badge key={a.id} variant="destructive" className="text-[10px]">{a.title}</Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">AI-Improved Preview</p>
            <div className="overflow-hidden rounded-xl border border-chart-2/25">
              <AspectRatio ratio={16 / 9}>
                <div className="w-full h-full bg-gradient-to-br from-amber-200 to-stone-300 dark:from-amber-900/50 dark:to-stone-700 flex items-end p-4">
                  <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-chart-2" />
                    <span className="text-[10px] text-white/80">All issues resolved</span>
                  </div>
                </div>
              </AspectRatio>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {renderReview.annotations.filter((a) => a.priority === "high").map((a) => (
                <Badge key={a.id} variant="outline" className="text-[10px] text-chart-2 border-chart-2/30">{a.title} — fixed</Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* ── Issue Annotations ── */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <h4 className="text-sm font-semibold">Issue Annotations</h4>
          <Badge variant="outline" className="text-[10px]">
            {renderReview.annotations.length} issues
          </Badge>
          <div className="ml-auto flex gap-1.5">
            {(["high", "medium", "low"] as const).map((p) => {
              const count = renderReview.annotations.filter((a) => a.priority === p).length
              return count > 0 ? (
                <Badge key={p} variant={priorityConfig[p].badge} className="text-[10px]">
                  {priorityConfig[p].label} {count}
                </Badge>
              ) : null
            })}
          </div>
        </div>

        <div className="space-y-2">
          {renderReview.annotations.map((a) => {
            const cfg = priorityConfig[a.priority as keyof typeof priorityConfig]
            const Icon = cfg.icon
            return (
              <div
                key={a.id}
                className={`flex gap-3 p-4 rounded-xl border transition-colors ${cfg.bg}`}
              >
                <div className="shrink-0 mt-0.5">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center ${cfg.color === "text-destructive" ? "bg-destructive/10" : cfg.color === "text-chart-1" ? "bg-chart-1/10" : "bg-muted"}`}>
                    <Icon className={`w-3.5 h-3.5 ${cfg.color}`} />
                  </div>
                </div>
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-semibold">{a.title}</p>
                    <Badge variant={cfg.badge} className="text-[10px] shrink-0">{cfg.label}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{a.description}</p>
                  <div className="flex items-center gap-3 pt-0.5">
                    <span className="text-[10px] text-muted-foreground/60 font-mono">
                      Zone: {a.x}% × {a.y}%
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <Separator />

      {/* ── Improvement Checklist ── */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <h4 className="text-sm font-semibold">Improvement Checklist</h4>
          <Badge variant="secondary" className="text-[10px]">
            {doneCount} / {checklist.length} done
          </Badge>
          <div className="ml-auto">
            <Progress value={(doneCount / checklist.length) * 100} className="w-24 h-1.5" />
          </div>
        </div>

        <div className="space-y-1.5">
          {checklist.map((item) => {
            const cfg = priorityConfig[item.priority]
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => toggleItem(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all duration-200 hover:bg-muted/30 ${
                  item.done ? "opacity-60 bg-muted/20 border-border/40" : "border-border/60 bg-card"
                }`}
              >
                {item.done ? (
                  <CheckSquare className="w-4 h-4 text-chart-2 shrink-0" />
                ) : (
                  <Square className={`w-4 h-4 shrink-0 ${cfg.color}`} />
                )}
                <span className={`text-sm flex-1 transition-all ${item.done ? "line-through text-muted-foreground" : "text-foreground"}`}>
                  {item.text}
                </span>
                <Badge
                  variant={item.done ? "outline" : cfg.badge}
                  className="text-[10px] shrink-0"
                >
                  {item.done ? "Done" : cfg.label}
                </Badge>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
