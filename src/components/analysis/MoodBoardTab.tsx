import { mockAnalysis } from "@/data/mock-analysis"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Armchair, Lightbulb, Palette, Quote } from "lucide-react"

export function MoodBoardTab() {
  const { moodBoard } = mockAnalysis

  const heroImage = moodBoard.images[0]
  const supportingImages = moodBoard.images.slice(1)

  return (
    <div className="space-y-8">

      {/* ── Hero Panel ── */}
      <div className="relative overflow-hidden rounded-2xl border border-border/60">
        <AspectRatio ratio={21 / 8}>
          <div className="w-full h-full bg-muted">
            {heroImage.image ? (
              <img
                src={heroImage.image}
                alt={heroImage.label}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className={`w-full h-full bg-gradient-to-br ${heroImage.color}`} />
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
          </div>
        </AspectRatio>
        {/* Overlay text */}
        <div className="absolute inset-0 flex flex-col justify-end p-8">
          <div className="max-w-xl space-y-3">
            <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-white/60">Mood Direction</p>
            <h2 className="text-3xl font-bold text-white tracking-tight">{moodBoard.mood}</h2>
            <div className="flex items-start gap-2">
              <Quote className="w-4 h-4 text-white/40 shrink-0 mt-0.5" />
              <p className="text-sm text-white/75 leading-relaxed italic max-w-md">
                {moodBoard.narrative}
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {moodBoard.textures.map((t) => (
                <span key={t} className="text-[10px] text-white/60 border border-white/20 px-2 py-0.5 rounded-full backdrop-blur-sm">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Colour Palette ── */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Palette className="w-4 h-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold">Colour Palette</h3>
          <Badge variant="outline" className="text-[10px] ml-auto">{moodBoard.palette.length} colours</Badge>
        </div>

        {/* Continuous colour strip */}
        <div className="flex h-10 rounded-xl overflow-hidden border border-border/60 shadow-sm">
          {moodBoard.palette.map((c) => (
            <div
              key={c.hex}
              className="flex-1 transition-all duration-200 hover:flex-[2] cursor-pointer"
              style={{ backgroundColor: c.hex }}
              title={`${c.name} — ${c.hex}`}
            />
          ))}
        </div>

        {/* Colour chips */}
        <div className="grid grid-cols-5 gap-3">
          {moodBoard.palette.map((c) => (
            <div key={c.hex} className="space-y-2 group cursor-pointer">
              <div
                className="w-full aspect-[2/3] rounded-lg border border-border/50 shadow-sm group-hover:shadow-md group-hover:-translate-y-0.5 transition-all duration-200"
                style={{ backgroundColor: c.hex }}
              />
              <div className="space-y-0.5 text-center">
                <p className="text-[11px] font-semibold truncate">{c.name}</p>
                <p className="text-[9px] font-mono text-muted-foreground uppercase">{c.hex}</p>
                <Badge variant="outline" className="text-[9px] h-4 px-1.5 w-full justify-center">{c.role}</Badge>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* ── Supporting Board ── */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold">Inspiration Board</h3>
        <div className="grid grid-cols-12 gap-3">
          {/* Row 1: 5 + 4 + 3 */}
          {supportingImages.slice(0, 3).map((img, i) => {
            const colSpans = [5, 4, 3]
            return (
              <div key={img.label} className="group" style={{ gridColumn: `span ${colSpans[i]}` }}>
                <div className={`relative overflow-hidden rounded-xl border border-border/60 h-40 bg-muted hover:shadow-md transition-all duration-200`}>
                  {img.image ? (
                    <img
                      src={img.image}
                      alt={img.label}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${img.color}`} />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  <div className="absolute bottom-2 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <p className="text-[10px] text-white font-medium">{img.label}</p>
                  </div>
                </div>
                <p className="text-[11px] text-muted-foreground mt-1.5 px-0.5">{img.label}</p>
              </div>
            )
          })}

          {/* Row 2: 7 + 5 */}
          {supportingImages.slice(3).map((img, i) => {
            const colSpans = [7, 5]
            return (
              <div key={img.label} className="group" style={{ gridColumn: `span ${colSpans[i]}` }}>
                <div className={`relative overflow-hidden rounded-xl border border-border/60 h-48 bg-muted hover:shadow-md transition-all duration-200`}>
                  {img.image ? (
                    <img
                      src={img.image}
                      alt={img.label}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${img.color}`} />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  <div className="absolute bottom-2 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <p className="text-[10px] text-white font-medium">{img.label}</p>
                  </div>
                </div>
                <p className="text-[11px] text-muted-foreground mt-1.5 px-0.5">{img.label}</p>
              </div>
            )
          })}
        </div>
      </div>

      <Separator />

      {/* ── Material Textures ── */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold">Material & Texture References</h3>
        <div className="grid grid-cols-5 gap-3">
          {[
            { name: "Honed Limestone", image: "/tex-limestone.webp", sub: "Floor & Facade" },
            { name: "Oiled Oud Timber", image: "/tex-oud-timber.webp", sub: "Ceiling & Frames" },
            { name: "Polished Plaster", image: "/tex-plaster.webp", sub: "Interior Walls" },
            { name: "Oxidized Bronze", image: "/tex-bronze.webp", sub: "Fixtures & Rails" },
            { name: "Terracotta Accent", image: "/tex-terracotta.webp", sub: "Roof & Accents" },
          ].map((mat) => (
            <div key={mat.name} className="group cursor-pointer space-y-2">
              <div className="w-full h-16 rounded-lg border border-border/50 group-hover:shadow-md group-hover:-translate-y-0.5 transition-all duration-200 overflow-hidden bg-muted">
                <img src={mat.image} alt={mat.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-[11px] font-semibold truncate">{mat.name}</p>
                <p className="text-[10px] text-muted-foreground">{mat.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* ── Furniture + Lighting ── */}
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
              <div key={ref.name} className="flex gap-3 p-2.5 rounded-lg hover:bg-muted/40 transition-colors group cursor-pointer">
                <div className="w-14 h-14 rounded-lg shrink-0 border border-border/40 overflow-hidden bg-muted">
                  {ref.image ? (
                    <img src={ref.image} alt={ref.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${ref.color}`} />
                  )}
                </div>
                <div className="flex-1 min-w-0 space-y-0.5 self-center">
                  <p className="text-sm font-semibold group-hover:text-primary transition-colors">{ref.name}</p>
                  <Badge variant="outline" className="text-[10px]">{ref.style}</Badge>
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
              <div key={ref.name} className="flex gap-3 p-2.5 rounded-lg hover:bg-muted/40 transition-colors group cursor-pointer">
                <div className="w-14 h-14 rounded-lg shrink-0 border border-border/40 overflow-hidden bg-muted relative">
                  {ref.image ? (
                    <img src={ref.image} alt={ref.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${ref.color}`} />
                  )}
                  <div className="absolute bottom-1 right-1">
                    <Lightbulb className="w-3 h-3 text-white/70 drop-shadow" />
                  </div>
                </div>
                <div className="flex-1 min-w-0 space-y-0.5 self-center">
                  <p className="text-sm font-semibold group-hover:text-primary transition-colors">{ref.name}</p>
                  <Badge variant="outline" className="text-[10px]">{ref.time}</Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
