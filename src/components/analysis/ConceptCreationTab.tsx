import { mockAnalysis } from "@/data/mock-analysis"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"
import { Quote } from "lucide-react"
import { useEffect, useState } from "react"

export function ConceptCreationTab() {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700)
    return () => clearTimeout(t)
  }, [])

  const { concepts } = mockAnalysis

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h3 className="text-base font-semibold">AI Concept Directions</h3>
        <p className="text-sm text-muted-foreground">
          Three design directions generated from your project type, climate zone, and cultural context. Each includes a design story, keywords, and compatibility score.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {concepts.map((concept, i) => (
          <Card
            key={concept.id}
            className={`overflow-hidden hover:shadow-lg transition-all duration-200 border-border/70 ${
              i === 0 ? "ring-2 ring-chart-2/30" : ""
            }`}
          >
            {/* Color thumbnail */}
            <div className={`h-40 bg-gradient-to-br ${concept.color} relative overflow-hidden`}>
              {/* Subtle architectural grid overlay */}
              <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 300 160" preserveAspectRatio="xMidYMid slice">
                {[0, 1, 2, 3, 4].map((n) => (
                  <line key={`v${n}`} x1={n * 75} y1="0" x2={n * 75} y2="160" stroke="white" strokeWidth="0.5" />
                ))}
                {[0, 1, 2, 3].map((n) => (
                  <line key={`h${n}`} x1="0" y1={n * 53} x2="300" y2={n * 53} stroke="white" strokeWidth="0.5" />
                ))}
              </svg>

              {i === 0 && (
                <div className="absolute top-3 left-3">
                  <Badge className="text-[10px] bg-background/85 text-foreground border border-border/60 backdrop-blur-sm">
                    Top Match
                  </Badge>
                </div>
              )}
              <div className="absolute bottom-3 right-3">
                <div className="flex items-center gap-1 bg-background/85 backdrop-blur-sm rounded-full px-2.5 py-1 border border-border/60">
                  <span className="text-[11px] font-bold tabular-nums">{concept.compatibility}%</span>
                  <span className="text-[10px] text-muted-foreground">match</span>
                </div>
              </div>

              {/* Mood label */}
              <div className="absolute bottom-3 left-3">
                <span className="text-[10px] text-white/80 font-medium italic">{concept.mood}</span>
              </div>
            </div>

            <CardHeader className="pb-2 pt-4 px-4">
              <div className="space-y-0.5">
                <CardTitle className="text-sm font-bold">{concept.title}</CardTitle>
                <p className="text-[11px] text-muted-foreground">{concept.subtitle}</p>
              </div>
            </CardHeader>

            <CardContent className="px-4 pb-4 space-y-4">
              {loading ? (
                <div className="space-y-2">
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-4/5" />
                  <Skeleton className="h-3 w-3/4" />
                </div>
              ) : (
                <p className="text-xs text-muted-foreground leading-relaxed">{concept.description}</p>
              )}

              {/* Design Story */}
              <div className="rounded-lg bg-muted/50 p-3 space-y-1.5">
                <div className="flex items-center gap-1.5">
                  <Quote className="w-3 h-3 text-muted-foreground" />
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wide font-medium">Design Story</span>
                </div>
                {loading ? (
                  <Skeleton className="h-10 w-full" />
                ) : (
                  <p className="text-[11px] text-muted-foreground leading-relaxed italic">{concept.story}</p>
                )}
              </div>

              <Separator />

              {/* Style Tags */}
              <div className="space-y-2">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wide font-medium">Style Tags</p>
                <div className="flex flex-wrap gap-1.5">
                  {concept.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-[10px]">{tag}</Badge>
                  ))}
                </div>
              </div>

              {/* Keywords */}
              <div className="space-y-2">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wide font-medium">Keywords</p>
                <div className="flex flex-wrap gap-1.5">
                  {concept.keywords.map((kw) => (
                    <span key={kw} className="text-[11px] text-muted-foreground border border-border rounded px-1.5 py-0.5">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              {/* Compatibility */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-muted-foreground">Compatibility Score</span>
                  <span className="text-[11px] font-bold tabular-nums">{concept.compatibility}%</span>
                </div>
                <Progress value={concept.compatibility} className="h-1.5" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
