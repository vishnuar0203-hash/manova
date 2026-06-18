import { mockAnalysis } from "@/data/mock-analysis"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { AlertCircle, AlertTriangle, Info } from "lucide-react"

const priorityConfig = {
  high: { icon: AlertCircle, className: "text-destructive", badge: "destructive" as const },
  medium: { icon: AlertTriangle, className: "text-chart-1", badge: "secondary" as const },
  low: { icon: Info, className: "text-muted-foreground", badge: "outline" as const },
}

const statusConfig: Record<string, { color: string; badge: "default" | "secondary" | "destructive" | "outline" }> = {
  excellent: { color: "text-chart-2", badge: "default" },
  good: { color: "text-chart-4", badge: "secondary" },
  improve: { color: "text-destructive", badge: "destructive" },
}

export function RenderReviewTab() {
  const { renderReview } = mockAnalysis

  return (
    <div className="space-y-6">
      {/* Overall score + dimension bars */}
      <div className="grid lg:grid-cols-[200px_1fr] gap-6">
        {/* Radial score */}
        <Card className="border-border/70">
          <CardContent className="flex flex-col items-center justify-center pt-6 pb-6 gap-2">
            <div className="relative flex items-center justify-center">
              <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="var(--border)" strokeWidth="10" />
                <circle
                  cx="50" cy="50" r="40"
                  fill="none"
                  stroke="var(--chart-2)"
                  strokeWidth="10"
                  strokeDasharray={`${(renderReview.overallScore / 100) * 251.2} 251.2`}
                  strokeLinecap="round"
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-3xl font-bold tabular-nums">{renderReview.overallScore}</span>
                <span className="text-xs text-muted-foreground">/100</span>
              </div>
            </div>
            <p className="text-sm font-semibold text-center">Overall Quality</p>
            <Badge variant="secondary" className="text-[10px]">Good</Badge>
          </CardContent>
        </Card>

        {/* Dimension bars with status */}
        <Card className="border-border/70">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold">Quality Dimensions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {renderReview.dimensions.map((d) => {
              const cfg = statusConfig[d.status as keyof typeof statusConfig] ?? statusConfig.good
              return (
                <div key={d.name} className="space-y-1.5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-sm font-medium">{d.name}</span>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className={`text-sm font-bold tabular-nums ${cfg.color}`}>{d.score}</span>
                          <Badge variant={cfg.badge} className="text-[10px] w-18 justify-center">
                            {d.status === "improve" ? "Improve" : d.status.charAt(0).toUpperCase() + d.status.slice(1)}
                          </Badge>
                        </div>
                      </div>
                      <Progress value={d.score} className="h-1.5" />
                    </div>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">{d.notes}</p>
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>

      {/* Before/after panels */}
      <div className="grid sm:grid-cols-2 gap-4">
        <Card className="overflow-hidden border-border/70">
          <CardHeader className="pb-2 pt-3 px-4">
            <CardTitle className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Current Render</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <AspectRatio ratio={16 / 9}>
              <div className="w-full h-full rounded-md bg-gradient-to-br from-stone-300 to-zinc-400 dark:from-stone-700 dark:to-zinc-800 flex items-center justify-center">
                <span className="text-xs text-muted-foreground">Render preview</span>
              </div>
            </AspectRatio>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-chart-2/30 border-border/70">
          <CardHeader className="pb-2 pt-3 px-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Improved Preview</CardTitle>
              <Badge variant="outline" className="text-[10px] bg-chart-2/10 text-chart-2 border-chart-2/20">AI Enhanced</Badge>
            </div>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <AspectRatio ratio={16 / 9}>
              <div className="w-full h-full rounded-md bg-gradient-to-br from-amber-200 to-stone-300 dark:from-amber-900/50 dark:to-stone-700 flex items-center justify-center">
                <span className="text-xs text-muted-foreground">Enhanced preview</span>
              </div>
            </AspectRatio>
          </CardContent>
        </Card>
      </div>

      {/* Annotations */}
      <Card className="border-border/70">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold">
            Improvement Annotations
            <Badge variant="outline" className="ml-2 text-[10px]">{renderReview.annotations.length} issues</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {renderReview.annotations.map((a) => {
            const cfg = priorityConfig[a.priority as keyof typeof priorityConfig]
            const Icon = cfg.icon
            return (
              <div key={a.id} className="flex gap-3 p-3.5 rounded-lg border border-border/70 hover:bg-muted/30 transition-colors">
                <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${cfg.className}`} />
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-semibold">{a.title}</p>
                    <Badge variant={cfg.badge} className="text-[10px] shrink-0 capitalize">{a.priority}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{a.description}</p>
                  <p className="text-[11px] text-muted-foreground font-mono">
                    Position: {a.x}%, {a.y}%
                  </p>
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>
    </div>
  )
}
