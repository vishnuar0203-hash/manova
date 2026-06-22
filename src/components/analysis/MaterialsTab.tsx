import { mockAnalysis } from "@/data/mock-analysis"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Leaf, Layers, SquareDashedBottom, LayoutTemplate, Armchair, Sparkles } from "lucide-react"

const costTierBg: Record<string, string> = {
  Low: "bg-chart-2/10 text-chart-2 border-chart-2/20",
  Mid: "bg-chart-4/10 text-chart-4 border-chart-4/20",
  Premium: "bg-chart-1/10 text-chart-1 border-chart-1/20",
}

const zoneIcons: Record<string, React.ElementType> = {
  Floor: Layers,
  Wall: SquareDashedBottom,
  Ceiling: LayoutTemplate,
  Furniture: Armchair,
  Accent: Sparkles,
}

function SustainabilityDots({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Leaf
          key={i}
          className={`w-3 h-3 ${i < rating ? "text-chart-2 fill-chart-2" : "text-border"}`}
        />
      ))}
    </div>
  )
}

export function MaterialsTab() {
  const { materialZones, materialPairings } = mockAnalysis

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h3 className="text-base font-semibold">Material Board</h3>
        <p className="text-sm text-muted-foreground">
          A curated material palette organized by zone — each swatch shows finish type, cost tier, and sustainability rating.
        </p>
      </div>

      {/* Zone-based material boards */}
      {materialZones.map((zone) => {
        const ZoneIcon = zoneIcons[zone.zone] ?? Layers
        return (
          <Card key={zone.zone} className="border-border/70">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <ZoneIcon className="w-4 h-4 text-muted-foreground" />
                {zone.zone} Materials
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
                {zone.materials.map((m) => (
                  <div key={m.id} className="space-y-2.5">
                    <div className="aspect-square rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow overflow-hidden bg-muted">
                      {m.image ? (
                        <img
                          src={m.image}
                          alt={m.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full" style={{ backgroundColor: m.color }} />
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <p className="text-xs font-semibold leading-tight">{m.name}</p>
                      <p className="text-[10px] text-muted-foreground">{m.finish}</p>
                      <div className="flex items-center justify-between gap-1">
                        <Badge
                          variant="outline"
                          className={`text-[10px] px-1.5 border ${costTierBg[m.costTier]}`}
                        >
                          {m.costTier}
                        </Badge>
                        <SustainabilityDots rating={m.sustainability} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )
      })}

      {/* Pairings table */}
      <Card className="border-border/70">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold">Recommended Material Pairings</CardTitle>
          <p className="text-xs text-muted-foreground">Curated combinations that work well together by context and application zone.</p>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Primary Material</TableHead>
                <TableHead>Secondary Material</TableHead>
                <TableHead>Application Context</TableHead>
                <TableHead>Rating</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {materialPairings.map((pair, i) => (
                <TableRow key={i} className="hover:bg-muted/30">
                  <TableCell className="text-sm font-medium">{pair.primary}</TableCell>
                  <TableCell className="text-sm">{pair.secondary}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{pair.context}</TableCell>
                  <TableCell>
                    <Badge
                      variant={pair.score === "Excellent" ? "default" : "secondary"}
                      className="text-[10px]"
                    >
                      {pair.score}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
