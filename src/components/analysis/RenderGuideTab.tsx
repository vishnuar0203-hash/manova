import { mockAnalysis } from "@/data/mock-analysis"
import { Badge } from "@/components/ui/badge"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Clock, Monitor, Zap } from "lucide-react"

const difficultyConfig: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  Beginner: "secondary",
  Intermediate: "default",
  Advanced: "destructive",
}

const impactConfig: Record<string, string> = {
  High: "bg-chart-1/10 text-chart-1 border-chart-1/20",
  Medium: "bg-chart-4/10 text-chart-4 border-chart-4/20",
  Low: "bg-muted text-muted-foreground",
}

export function RenderGuideTab() {
  const { renderGuide } = mockAnalysis

  return (
    <div className="space-y-5">
      <div className="space-y-1">
        <h3 className="text-base font-semibold">Render Improvement Guide</h3>
        <p className="text-sm text-muted-foreground">
          Step-by-step techniques to elevate your render quality, ordered by impact. Each guide includes estimated time, difficulty level, and applicable software.
        </p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Total Techniques", value: renderGuide.length, sub: "in this guide" },
          { label: "High Impact", value: renderGuide.filter((g) => g.impact === "High").length, sub: "priority fixes" },
          { label: "Quick Wins", value: renderGuide.filter((g) => g.difficulty === "Beginner").length, sub: "beginner level" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-lg border border-border/70 p-3 text-center space-y-0.5">
            <p className="text-2xl font-bold tabular-nums">{stat.value}</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wide">{stat.label}</p>
            <p className="text-[10px] text-muted-foreground">{stat.sub}</p>
          </div>
        ))}
      </div>

      <Accordion type="multiple" defaultValue={["0"]} className="space-y-2">
        {renderGuide.map((item, i) => (
          <AccordionItem
            key={item.id}
            value={String(i)}
            className="rounded-lg border border-border/70 bg-card overflow-hidden"
          >
            <AccordionTrigger className="px-4 py-3.5 hover:no-underline hover:bg-muted/30 [&[data-state=open]]:bg-muted/20">
              <div className="flex items-center gap-3 text-left w-full">
                <span className="text-xs tabular-nums text-muted-foreground font-mono w-5 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold">{item.technique}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0 mr-2">
                  <Badge variant="outline" className={`text-[10px] border ${impactConfig[item.impact] ?? impactConfig.Low}`}>
                    <Zap className="w-2.5 h-2.5 mr-1" />
                    {item.impact}
                  </Badge>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>{item.timeEstimate}</span>
                  </div>
                  <Badge variant={difficultyConfig[item.difficulty] ?? "outline"} className="text-[10px]">
                    {item.difficulty}
                  </Badge>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 pt-2 space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>

              {/* Steps */}
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Steps</p>
                <ol className="space-y-2">
                  {item.steps.map((step, si) => (
                    <li key={si} className="flex gap-3">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted text-[11px] font-semibold">
                        {si + 1}
                      </span>
                      <p className="text-sm text-muted-foreground leading-relaxed">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Software */}
              <div className="space-y-2">
                <div className="flex items-center gap-1.5">
                  <Monitor className="w-3.5 h-3.5 text-muted-foreground" />
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Applicable Software</p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {item.software.map((s) => (
                    <Badge key={s} variant="outline" className="text-[10px]">{s}</Badge>
                  ))}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
