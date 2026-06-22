import { mockAnalysis } from "@/data/mock-analysis"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { GripVertical, FileText, FileImage, Globe, Download, Sparkles, CheckCircle2 } from "lucide-react"
import { toast } from "sonner"

const formatIcons = {
  PDF: FileText,
  PowerPoint: FileImage,
  Web: Globe,
}

const slideTypeColors: Record<string, string> = {
  "Title Slide": "bg-chart-2/15 text-chart-2 border-chart-2/20",
  Analysis: "bg-chart-1/15 text-chart-1 border-chart-1/20",
  Concept: "bg-chart-4/15 text-chart-4 border-chart-4/20",
  Plans: "bg-muted text-muted-foreground",
  Elevation: "bg-muted text-muted-foreground",
  Materials: "bg-chart-3/15 text-chart-3 border-chart-3/20",
  Render: "bg-primary/10 text-primary",
  Technical: "bg-muted text-muted-foreground",
  Schedule: "bg-muted text-muted-foreground",
}

export function PresentationTab() {
  const { presentation } = mockAnalysis
  const [tone, setTone] = useState("Formal")
  const [format, setFormat] = useState("PDF")

  function handleExport() {
    toast.success(`Exporting as ${format} in ${tone} tone...`)
  }

  return (
    <div className="space-y-6">
      {/* Presentation title + narrative */}
      <Card className="border-border/70 bg-muted/20">
        <CardContent className="pt-5 pb-5 space-y-4">
          <div className="flex items-start gap-3">
            <Sparkles className="w-4 h-4 text-chart-2 mt-0.5 shrink-0" />
            <div className="space-y-1">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wide font-medium">Presentation Title</p>
              <p className="text-base font-bold">{presentation.title}</p>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wide font-medium">Design Narrative</p>
            <p className="text-sm text-muted-foreground leading-relaxed">{presentation.narrative}</p>
          </div>
        </CardContent>
      </Card>

      {/* Key Selling Points */}
      <Card className="border-border/70">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold">Key Selling Points</CardTitle>
          <p className="text-xs text-muted-foreground">Client-facing headline statements for the presentation.</p>
        </CardHeader>
        <CardContent className="space-y-3">
          {presentation.sellingPoints.map((point, i) => (
            <div key={i} className="flex gap-3 p-3 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
              <CheckCircle2 className="w-4 h-4 text-chart-2 mt-0.5 shrink-0" />
              <p className="text-sm text-muted-foreground leading-relaxed">{point}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-[1fr_280px] gap-6">
        {/* Slide outline */}
        <Card className="border-border/70">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold">Slide Structure ({presentation.slides.length} slides)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-0 p-0">
            {presentation.slides.map((slide, i) => (
              <div key={slide.id}>
                <div className="flex items-start gap-3 px-4 py-3 hover:bg-muted/40 transition-colors">
                  <GripVertical className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0 cursor-grab" />
                  <span className="text-xs tabular-nums text-muted-foreground font-mono w-5 shrink-0 mt-0.5">{i + 1}</span>
                  <div className="flex-1 min-w-0 space-y-1">
                    <p className="text-sm font-semibold">{slide.title}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{slide.notes}</p>
                  </div>
                  <Badge
                    variant="outline"
                    className={`text-[10px] shrink-0 border ${slideTypeColors[slide.type] ?? "bg-muted text-muted-foreground"}`}
                  >
                    {slide.type}
                  </Badge>
                </div>
                {i < presentation.slides.length - 1 && <Separator />}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Controls */}
        <div className="space-y-4">
          <Card className="border-border/70">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold">Presentation Tone</CardTitle>
            </CardHeader>
            <CardContent>
              <ToggleGroup
                type="single"
                value={tone}
                onValueChange={(v) => v && setTone(v)}
                className="flex-col items-stretch gap-2"
              >
                {presentation.tones.map((t) => (
                  <ToggleGroupItem key={t} value={t} className="justify-start text-sm h-9">
                    {t}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </CardContent>
          </Card>

          <Card className="border-border/70">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold">Export Format</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {presentation.formats.map((f) => {
                const Icon = formatIcons[f as keyof typeof formatIcons] ?? FileText
                return (
                  <button
                    key={f}
                    onClick={() => setFormat(f)}
                    className={`w-full flex items-center gap-3 rounded-md border px-3 py-2.5 text-sm transition-colors cursor-pointer ${
                      format === f
                        ? "border-primary bg-primary/5 font-semibold"
                        : "border-border hover:bg-muted/40"
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    {f}
                  </button>
                )
              })}
            </CardContent>
          </Card>

          <Button className="w-full gap-2" onClick={handleExport}>
            <Download className="w-4 h-4" />
            Export Presentation
          </Button>
        </div>
      </div>
    </div>
  )
}
