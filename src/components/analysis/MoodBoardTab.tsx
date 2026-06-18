import { mockAnalysis } from "@/data/mock-analysis"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Armchair, Lightbulb } from "lucide-react"

export function MoodBoardTab() {
  const { moodBoard } = mockAnalysis

  return (
    <div className="space-y-8">
      {/* Mood Header */}
      <Card className="border-border/70 overflow-hidden">
        <CardContent className="pt-6 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-start gap-6">
            <div className="space-y-1">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Overall Mood</p>
              <p className="text-2xl font-bold">{moodBoard.mood}</p>
            </div>
            <div className="sm:border-l sm:border-border sm:pl-6 flex-1 space-y-3">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Mood Narrative</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{moodBoard.narrative}</p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {moodBoard.textures.map((t) => (
              <Badge key={t} variant="outline" className="text-[10px]">{t}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Colour Palette */}
      <Card className="border-border/70">
        <CardHeader className="pb-4">
          <CardTitle className="text-sm font-semibold">Colour Palette</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-3">
            {moodBoard.palette.map((c) => (
              <div key={c.hex} className="space-y-2">
                <div
                  className="w-full aspect-[3/4] rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow"
                  style={{ backgroundColor: c.hex }}
                />
                <div className="space-y-0.5">
                  <p className="text-[11px] font-semibold text-center">{c.name}</p>
                  <p className="text-[9px] text-muted-foreground text-center font-mono">{c.hex}</p>
                  <p className="text-[9px] text-muted-foreground text-center uppercase tracking-wide">{c.role}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main image masonry */}
      <div>
        <h3 className="text-sm font-semibold mb-4">Mood Board Images</h3>
        <div className="columns-2 sm:columns-3 gap-4 space-y-4">
          {moodBoard.images.map((img) => {
            const [w, h] = img.aspect.split("/").map(Number)
            return (
              <div key={img.label} className="break-inside-avoid mb-4">
                <Card className="overflow-hidden border-border/70 hover:shadow-md transition-shadow">
                  <AspectRatio ratio={w / h}>
                    <div className={`w-full h-full bg-gradient-to-br ${img.color}`} />
                  </AspectRatio>
                  <div className="px-3 py-2 bg-muted/30">
                    <p className="text-[11px] text-muted-foreground font-medium">{img.label}</p>
                  </div>
                </Card>
              </div>
            )
          })}
        </div>
      </div>

      {/* Furniture + Lighting references */}
      <div className="grid sm:grid-cols-2 gap-6">
        {/* Furniture */}
        <Card className="border-border/70">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <Armchair className="w-4 h-4 text-muted-foreground" />
              Furniture References
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {moodBoard.furnitureRefs.map((ref) => (
              <div key={ref.name} className="flex gap-3">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${ref.color} shrink-0 border border-border/60`} />
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">{ref.name}</p>
                  <p className="text-xs text-muted-foreground">{ref.style}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Lighting */}
        <Card className="border-border/70">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-muted-foreground" />
              Lighting References
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {moodBoard.lightingRefs.map((ref) => (
              <div key={ref.name} className="flex gap-3">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${ref.color} shrink-0 border border-border/60`} />
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">{ref.name}</p>
                  <p className="text-xs text-muted-foreground">{ref.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
