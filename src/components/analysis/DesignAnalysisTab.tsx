import { mockAnalysis } from "@/data/mock-analysis"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { CheckCircle2, XCircle } from "lucide-react"
import { useEffect, useState } from "react"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts"

const barConfig = {
  project: { label: "Your Project", color: "var(--chart-2)" },
  benchmark: { label: "Benchmark", color: "var(--chart-3)" },
}

const severityConfig: Record<string, { variant: "default" | "secondary" | "outline" | "destructive"; label: string }> = {
  excellent: { variant: "default", label: "Excellent" },
  good: { variant: "secondary", label: "Good" },
  improve: { variant: "destructive", label: "Needs Work" },
}

export function DesignAnalysisTab() {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700)
    return () => clearTimeout(t)
  }, [])

  const { designAnalysis } = mockAnalysis

  return (
    <div className="space-y-6">
      {/* Principle ratings */}
      <Card className="border-border/70">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold">Design Principle Scores</CardTitle>
          <p className="text-xs text-muted-foreground">Evaluated across six architecture-specific dimensions.</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <Skeleton className="h-4 w-36" />
                  <Skeleton className="h-2 flex-1" />
                  <Skeleton className="h-5 w-20" />
                </div>
              ))
            : designAnalysis.principles.map((p) => {
                const cfg = severityConfig[p.severity]
                return (
                  <div key={p.name} className="space-y-1.5">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-sm font-medium truncate">{p.name}</span>
                        <Badge variant="outline" className="text-[9px] px-1.5 text-muted-foreground shrink-0">{p.category}</Badge>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xs text-muted-foreground tabular-nums">vs {p.benchmark}</span>
                        <span className="text-sm font-bold tabular-nums w-8 text-right">{p.score}</span>
                        <Badge variant={cfg.variant} className="text-[10px] w-20 justify-center">{cfg.label}</Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 relative">
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-700"
                            style={{
                              width: `${p.score}%`,
                              backgroundColor: p.score >= p.benchmark ? "var(--chart-2)" : "var(--chart-1)",
                            }}
                          />
                        </div>
                        <div
                          className="absolute top-0 h-2 w-px bg-muted-foreground/40"
                          style={{ left: `${p.benchmark}%` }}
                        />
                      </div>
                    </div>
                  </div>
                )
              })}
        </CardContent>
      </Card>

      {/* Strengths + Weaknesses */}
      <div className="grid sm:grid-cols-2 gap-4">
        <Card className="border-chart-2/20 border-border/70">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-chart-2" />
              Strengths
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {loading
              ? Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-12 rounded-lg" />)
              : designAnalysis.strengths.map((s, i) => (
                  <div key={i} className="flex gap-2.5">
                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-chart-2 shrink-0" />
                    <p className="text-sm text-muted-foreground leading-relaxed">{s}</p>
                  </div>
                ))}
          </CardContent>
        </Card>

        <Card className="border-chart-1/20 border-border/70">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <XCircle className="w-4 h-4 text-chart-1" />
              Areas to Improve
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {loading
              ? Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-12 rounded-lg" />)
              : designAnalysis.weaknesses.map((w, i) => (
                  <div key={i} className="flex gap-2.5">
                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-chart-1 shrink-0" />
                    <p className="text-sm text-muted-foreground leading-relaxed">{w}</p>
                  </div>
                ))}
          </CardContent>
        </Card>
      </div>

      {/* Bar chart */}
      <Card className="border-border/70">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold">Your Project vs. Industry Benchmark</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <Skeleton className="h-56 w-full rounded-lg" />
          ) : (
            <ChartContainer config={barConfig} className="h-56 w-full">
              <BarChart data={designAnalysis.barData} barGap={4}>
                <CartesianGrid vertical={false} stroke="var(--border)" />
                <XAxis dataKey="principle" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} />
                <YAxis domain={[0, 100]} tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="project" fill="var(--color-project)" radius={[3, 3, 0, 0]} />
                <Bar dataKey="benchmark" fill="var(--color-benchmark)" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ChartContainer>
          )}
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card className="border-border/70">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold">Recommendations</CardTitle>
          <p className="text-xs text-muted-foreground">Actionable improvements ranked by impact.</p>
        </CardHeader>
        <CardContent className="space-y-3">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="p-3 rounded-lg border border-border space-y-2">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-3 w-full" />
                </div>
              ))
            : designAnalysis.recommendations.map((rec, i) => (
                <div key={rec.id} className="flex gap-4 p-3.5 rounded-lg border border-border/70 hover:bg-muted/30 transition-colors">
                  <span className="text-xs tabular-nums text-muted-foreground font-mono w-5 shrink-0 mt-0.5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-semibold">{rec.title}</p>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <Badge
                          variant={rec.severity === "high" ? "destructive" : rec.severity === "medium" ? "secondary" : "outline"}
                          className="text-[10px]"
                        >
                          {rec.severity}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{rec.description}</p>
                    <div className="flex items-center gap-3 text-[11px]">
                      <span className="text-muted-foreground">Impact: <span className="font-medium text-foreground">{rec.impact}</span></span>
                      <span className="text-muted-foreground">·</span>
                      <span className="text-muted-foreground">Est. effort: <span className="font-medium text-foreground">{rec.effort}</span></span>
                    </div>
                  </div>
                </div>
              ))}
        </CardContent>
      </Card>
    </div>
  )
}
