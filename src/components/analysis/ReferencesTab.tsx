import { useState } from "react"
import { mockAnalysis } from "@/data/mock-analysis"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, User, Sparkles, ExternalLink, Building2, Sofa, Layers, Trees } from "lucide-react"

interface ReferenceItem {
  id: string
  name: string
  style: string
  location: string
  architect: string
  color: string
  image?: string
  similarity: number
  year: string
}

const CATEGORIES = [
  { id: "all", label: "All", icon: Sparkles },
  { id: "architecture", label: "Architecture", icon: Building2 },
  { id: "interior", label: "Interior", icon: Sofa },
  { id: "material", label: "Materials", icon: Layers },
  { id: "landscape", label: "Landscape", icon: Trees },
]

function similarityColor(score: number): string {
  if (score >= 90) return "text-chart-2 border-chart-2/30 bg-chart-2/10"
  if (score >= 80) return "text-chart-4 border-chart-4/30 bg-chart-4/10"
  return "text-muted-foreground border-border bg-muted/40"
}

function ReferenceCard({ item, size = "default" }: { item: ReferenceItem; size?: "default" | "large" }) {
  const [hovered, setHovered] = useState(false)
  const sc = similarityColor(item.similarity)

  return (
    <div
      className="group relative overflow-hidden rounded-xl border border-border/60 bg-card cursor-pointer hover:border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 break-inside-avoid mb-4"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image zone */}
      <div className={`relative w-full ${size === "large" ? "h-64" : "h-44"} overflow-hidden bg-muted`}>
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${item.color}`} />
        )}
        {/* Dark overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

        {/* Similarity score — always visible */}
        <div className="absolute top-3 right-3">
          <div className={`flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-full border backdrop-blur-sm ${sc}`}>
            <Sparkles className="w-2.5 h-2.5" />
            {item.similarity}%
          </div>
        </div>

        {/* Style badge */}
        <div className="absolute top-3 left-3">
          <Badge className="text-[10px] bg-black/40 text-white border-0 backdrop-blur-sm hover:bg-black/50">
            {item.style}
          </Badge>
        </div>

        {/* Hover overlay with external link */}
        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${hovered ? "opacity-100" : "opacity-0"}`}>
          <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-medium px-3 py-1.5 rounded-full">
            <ExternalLink className="w-3 h-3" />
            View Reference
          </div>
        </div>
      </div>

      {/* Card body */}
      <div className="p-3.5 space-y-2.5">
        <p className="text-sm font-semibold leading-tight group-hover:text-primary transition-colors">{item.name}</p>

        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <User className="w-3 h-3 shrink-0 text-muted-foreground/70" />
            <span className="truncate font-medium">{item.architect}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <MapPin className="w-3 h-3 shrink-0 text-muted-foreground/70" />
              <span className="truncate">{item.location}</span>
            </div>
            <span className="text-[10px] text-muted-foreground/60 shrink-0">{item.year}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export function ReferencesTab() {
  const { references } = mockAnalysis
  const [activeCategory, setActiveCategory] = useState("all")

  const allItems: { item: ReferenceItem; category: string }[] = [
    ...references.architecture.map((item) => ({ item, category: "architecture" })),
    ...references.interior.map((item) => ({ item, category: "interior" })),
    ...references.material.map((item) => ({ item, category: "material" })),
    ...references.landscape.map((item) => ({ item, category: "landscape" })),
  ]

  const filtered = activeCategory === "all"
    ? allItems
    : allItems.filter((r) => r.category === activeCategory)

  const totalCount = allItems.length

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end gap-4">
        <div className="flex-1 space-y-1">
          <h3 className="text-base font-semibold">Reference Library</h3>
          <p className="text-sm text-muted-foreground">
            {totalCount} curated references sourced to match your project's style, location, and design intent.
            <span className="ml-1 text-primary font-medium">Similarity scored by AI.</span>
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Sparkles className="w-3.5 h-3.5 text-chart-2" />
          <span>Sorted by similarity</span>
        </div>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon
          const count = cat.id === "all"
            ? totalCount
            : allItems.filter((r) => r.category === cat.id).length
          const isActive = activeCategory === cat.id

          return (
            <Button
              key={cat.id}
              variant={isActive ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(cat.id)}
              className={`gap-1.5 text-xs h-8 ${isActive ? "" : "text-muted-foreground hover:text-foreground"}`}
            >
              <Icon className="w-3.5 h-3.5" />
              {cat.label}
              <span className={`ml-0.5 text-[10px] tabular-nums ${isActive ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                {count}
              </span>
            </Button>
          )
        })}
      </div>

      {/* Category label when filtered */}
      {activeCategory !== "all" && (
        <div className="space-y-1">
          <h4 className="text-sm font-semibold capitalize">
            {CATEGORIES.find((c) => c.id === activeCategory)?.label} References
          </h4>
          <p className="text-xs text-muted-foreground">
            {
              {
                architecture: "Built precedents that informed the massing, typology, and spatial organisation.",
                interior: "Interior environments that influenced the material language and spatial atmosphere.",
                material: "Material precedents demonstrating finish quality, application, and sourcing.",
                landscape: "Landscape references that shaped the site treatment and outdoor spatial design.",
              }[activeCategory]
            }
          </p>
        </div>
      )}

      {/* Masonry grid */}
      <div className="columns-2 sm:columns-3 lg:columns-4 gap-4">
        {filtered.map(({ item }, i) => (
          <ReferenceCard key={item.id} item={item} size={i === 0 && activeCategory === "all" ? "large" : "default"} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center gap-2 py-16 text-muted-foreground">
          <Layers className="w-8 h-8 opacity-30" />
          <p className="text-sm">No references in this category.</p>
        </div>
      )}
    </div>
  )
}
