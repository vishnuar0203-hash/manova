import { mockAnalysis } from "@/data/mock-analysis"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, User } from "lucide-react"
import { AspectRatio } from "@/components/ui/aspect-ratio"

interface ReferenceItem {
  id: string
  name: string
  style: string
  location: string
  architect: string
  color: string
}

function ReferenceCard({ item }: { item: ReferenceItem }) {
  return (
    <Card className="overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 min-w-0 border-border/70 cursor-pointer group">
      <AspectRatio ratio={4 / 3}>
        <div className={`w-full h-full bg-gradient-to-br ${item.color} relative`}>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          <div className="absolute top-2 left-2">
            <Badge variant="secondary" className="text-[10px] bg-black/40 text-white border-0 backdrop-blur-sm">
              {item.style}
            </Badge>
          </div>
        </div>
      </AspectRatio>
      <CardContent className="p-3 space-y-1.5">
        <p className="text-sm font-semibold leading-tight group-hover:text-primary transition-colors truncate">{item.name}</p>
        <div className="space-y-1">
          <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
            <User className="w-3 h-3 shrink-0" />
            <span className="truncate">{item.architect}</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
            <MapPin className="w-3 h-3 shrink-0" />
            <span className="truncate">{item.location}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface CategorySectionProps {
  title: string
  description: string
  items: ReferenceItem[]
}

function CategorySection({ title, description, items }: CategorySectionProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold">{title}</h3>
        <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <ReferenceCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}

const categoryDescriptions: Record<string, string> = {
  architecture: "Built precedents that informed the massing, typology, and spatial organisation of this project.",
  interior: "Interior environments that influenced the material language, lighting approach, and spatial atmosphere.",
  material: "Material precedents demonstrating the finish quality, application, and sourcing relevant to this project.",
  landscape: "Landscape references that shaped the site treatment, planting strategy, and outdoor spatial design.",
}

export function ReferencesTab() {
  const { references } = mockAnalysis

  return (
    <div className="space-y-10">
      <div className="space-y-1">
        <h3 className="text-base font-semibold">Reference Library</h3>
        <p className="text-sm text-muted-foreground">
          Curated reference boards across four categories, automatically sourced to match your project's style, location, and design intent.
        </p>
      </div>

      <CategorySection title="Architecture References" description={categoryDescriptions.architecture} items={references.architecture} />
      <CategorySection title="Interior References" description={categoryDescriptions.interior} items={references.interior} />
      <CategorySection title="Material References" description={categoryDescriptions.material} items={references.material} />
      <CategorySection title="Landscape References" description={categoryDescriptions.landscape} items={references.landscape} />
    </div>
  )
}
