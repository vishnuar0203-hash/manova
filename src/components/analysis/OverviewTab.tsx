import { mockAnalysis } from "@/data/mock-analysis"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"
import { CheckCircle2, Clock, Circle, Sparkles, TrendingUp, TrendingDown } from "lucide-react"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts"
import { useEffect, useState } from "react"

const radarConfig = {
  score: { label: "Score", color: "var(--chart-2)" },
}

export function OverviewTab() {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700)
    return () => clearTimeout(t)
  }, [])

  const { overview } = mockAnalysis

  return (
    <div className="space-y-6">
      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {overview.kpis.map((kpi) => (
          <Card key={kpi.label} className="border-border/70">
            <CardContent className="pt-4 pb-4 px-4">
              <p className="text-xs text-muted-foreground mb-1">{kpi.label}</p>
              {loading ? (
                <>
                  <Skeleton className="h-8 w-16 mb-1" />
                  <Skeleton className="h-3 w-10" />
                </>
              ) : (
                <>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold tabular-nums">{kpi.value}</span>
                    <span className="text-sm text-muted-foreground">{kpi.unit}</span>
                  </div>
                  <Badge variant="secondary" className="text-[10px] mt-1 gap-1">
                    <span className="text-chart-2">↑</span> {kpi.trend}
                  </Badge>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Style Detection */}
      <Card className="border-border/70">
        <CardContent className="pt-5 pb-5">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-2/10 border border-chart-2/20">
                <Sparkles className="w-4.5 h-4.5 text-chart-2" />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wide mb-0.5">Style Detected</p>
                <p className="text-lg font-bold">{overview.styleDetection.style}</p>
                <p className="text-xs text-muted-foreground">{overview.styleDetection.subStyle}</p>
              </div>
            </div>

            <Separator orientation="vertical" className="hidden sm:block h-12" />

            <div className="flex items-center gap-3">
              <div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wide mb-0.5">Confidence</p>
                <p className="text-2xl font-bold tabular-nums">{overview.styleDetection.confidence}<span className="text-sm font-normal text-muted-foreground">%</span></p>
              </div>
            </div>

            <Separator orientation="vertical" className="hidden sm:block h-12" />

            <div className="flex-1">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wide mb-2">Detected Influences</p>
              <div className="flex flex-wrap gap-1.5">
                {overview.styleDetection.influences.map((inf) => (
                  <Badge key={inf} variant="secondary" className="text-[10px]">{inf}</Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Radar chart */}
        <Card className="border-border/70">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Design Dimension Scores</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-64 w-full rounded-lg" />
            ) : (
              <ChartContainer config={radarConfig} className="h-64 w-full">
                <RadarChart data={overview.radarData}>
                  <PolarGrid stroke="var(--border)" />
                  <PolarAngleAxis dataKey="dimension" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} />
                  <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar
                    dataKey="score"
                    stroke="var(--chart-2)"
                    fill="var(--chart-2)"
                    fillOpacity={0.2}
                    strokeWidth={2}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                </RadarChart>
              </ChartContainer>
            )}
          </CardContent>
        </Card>

        {/* Timeline */}
        <Card className="border-border/70">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Project Stage Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Skeleton className="h-6 w-6 rounded-full" />
                    <Skeleton className="h-4 flex-1" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-1">
                {overview.timeline.map((item, i) => (
                  <div key={item.stage}>
                    <div className="flex items-center gap-3 py-2.5">
                      <div className="shrink-0">
                        {item.completed ? (
                          <CheckCircle2 className="w-5 h-5 text-chart-2" />
                        ) : item.current ? (
                          <Clock className="w-5 h-5 text-chart-1" />
                        ) : (
                          <Circle className="w-5 h-5 text-border" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium ${item.current ? "text-chart-1" : item.completed ? "text-foreground" : "text-muted-foreground"}`}>
                          {item.stage}
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground shrink-0">{item.date}</span>
                      {item.current && (
                        <Badge className="text-[10px] bg-chart-1/10 text-chart-1 border-chart-1/20">Current</Badge>
                      )}
                    </div>
                    {i < overview.timeline.length - 1 && (
                      <div className={`ml-[9px] w-px h-3 ${item.completed ? "bg-chart-2/40" : "bg-border"}`} />
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Key Insights */}
      <Card className="border-border/70">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold">Key Insights</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-16 rounded-lg" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {overview.keyInsights.map((insight) => (
                <div
                  key={insight.label}
                  className={`rounded-lg border p-3 space-y-1 ${
                    insight.positive
                      ? "border-chart-2/20 bg-chart-2/5"
                      : "border-chart-1/20 bg-chart-1/5"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wide">{insight.label}</p>
                    {insight.positive ? (
                      <TrendingUp className="w-3.5 h-3.5 text-chart-2 shrink-0" />
                    ) : (
                      <TrendingDown className="w-3.5 h-3.5 text-chart-1 shrink-0" />
                    )}
                  </div>
                  <p className={`text-sm font-semibold ${insight.positive ? "text-chart-2" : "text-chart-1"}`}>
                    {insight.value}
                  </p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* AI Summary */}
      <Card className="bg-muted/30 border-muted">
        <CardContent className="flex gap-3 pt-5 pb-5">
          <Sparkles className="w-4 h-4 text-chart-2 mt-0.5 shrink-0" />
          <div className="space-y-1">
            <p className="text-sm font-semibold">AI Design Summary</p>
            {loading ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ) : (
              <p className="text-sm text-muted-foreground leading-relaxed">{overview.aiSummary}</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
