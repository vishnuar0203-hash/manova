export type ProjectStatus = "completed" | "in-progress" | "draft"
export type Discipline = "Architecture" | "Interior Design" | "Landscape Architecture"
export type DesignStage =
  | "Concept Design"
  | "Schematic Design"
  | "Design Development"
  | "Visualization Stage"
  | "Presentation Stage"

export interface Project {
  id: string
  name: string
  discipline: Discipline
  type: string
  scope: string
  stage: DesignStage
  stageProgress: number
  color: string
  createdAt: string
  lastAnalyzed: string
  status: ProjectStatus
  location: string
  client: string
  area: string
  designScore: number
  detectedStyle: string
  climateZone: string
}

export const mockProjects: Project[] = [
  {
    id: "1",
    name: "Riyadh Villa",
    discipline: "Architecture",
    type: "Villa",
    scope: "Exterior",
    stage: "Design Development",
    stageProgress: 65,
    color: "from-amber-400 to-orange-500",
    createdAt: "2026-05-10",
    lastAnalyzed: "2026-06-14",
    status: "in-progress",
    location: "Riyadh, Saudi Arabia",
    client: "Al-Rashid Family",
    area: "850 m²",
    designScore: 87,
    detectedStyle: "Desert Contemporary",
    climateZone: "Hot Arid",
  },
  {
    id: "2",
    name: "Mixed-Use Tower",
    discipline: "Architecture",
    type: "Office",
    scope: "Interior + Exterior",
    stage: "Schematic Design",
    stageProgress: 35,
    color: "from-slate-500 to-slate-700",
    createdAt: "2026-04-22",
    lastAnalyzed: "2026-06-10",
    status: "in-progress",
    location: "Dubai, UAE",
    client: "Emaar Properties",
    area: "12,400 m²",
    designScore: 74,
    detectedStyle: "High-Tech Modernism",
    climateZone: "Hot Humid",
  },
  {
    id: "3",
    name: "Hotel Lobby Renovation",
    discipline: "Interior Design",
    type: "Hotel",
    scope: "Interior",
    stage: "Visualization Stage",
    stageProgress: 80,
    color: "from-stone-400 to-stone-600",
    createdAt: "2026-03-15",
    lastAnalyzed: "2026-06-12",
    status: "in-progress",
    location: "Abu Dhabi, UAE",
    client: "Rotana Hotels",
    area: "620 m²",
    designScore: 82,
    detectedStyle: "Warm Luxury",
    climateZone: "Hot Humid",
  },
  {
    id: "4",
    name: "Showroom Interior",
    discipline: "Interior Design",
    type: "Showroom",
    scope: "Interior",
    stage: "Presentation Stage",
    stageProgress: 95,
    color: "from-zinc-400 to-zinc-600",
    createdAt: "2026-02-08",
    lastAnalyzed: "2026-06-01",
    status: "completed",
    location: "Jeddah, Saudi Arabia",
    client: "Al-Futtaim Retail",
    area: "340 m²",
    designScore: 91,
    detectedStyle: "Contemporary Minimal",
    climateZone: "Hot Arid",
  },
  {
    id: "5",
    name: "Urban Master Plan",
    discipline: "Architecture",
    type: "Urban Design",
    scope: "Exterior",
    stage: "Concept Design",
    stageProgress: 15,
    color: "from-teal-500 to-cyan-600",
    createdAt: "2026-06-01",
    lastAnalyzed: "2026-06-13",
    status: "draft",
    location: "NEOM, Saudi Arabia",
    client: "NEOM Authority",
    area: "4.2 km²",
    designScore: 68,
    detectedStyle: "Futurist Urban",
    climateZone: "Coastal Arid",
  },
  {
    id: "6",
    name: "Landscape Retreat",
    discipline: "Landscape Architecture",
    type: "Landscape",
    scope: "Exterior",
    stage: "Design Development",
    stageProgress: 55,
    color: "from-emerald-400 to-green-600",
    createdAt: "2026-04-05",
    lastAnalyzed: "2026-06-08",
    status: "in-progress",
    location: "AlUla, Saudi Arabia",
    client: "Royal Commission for AlUla",
    area: "2.1 ha",
    designScore: 79,
    detectedStyle: "Desert Biophilic",
    climateZone: "Hot Arid",
  },
]
