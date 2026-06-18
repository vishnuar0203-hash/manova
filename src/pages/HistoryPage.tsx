import { Link } from "react-router-dom"
import { useState } from "react"
import { Search, ArrowUpRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { mockProjects, type ProjectStatus } from "@/data/mock-projects"

const statusConfig: Record<ProjectStatus, { label: string; variant: "default" | "secondary" | "outline" }> = {
  completed: { label: "Completed", variant: "default" },
  "in-progress": { label: "In Progress", variant: "secondary" },
  draft: { label: "Draft", variant: "outline" },
}

const ALL_VALUE = "all"

export function HistoryPage() {
  const [search, setSearch] = useState("")
  const [disciplineFilter, setDisciplineFilter] = useState(ALL_VALUE)
  const [stageFilter, setStageFilter] = useState(ALL_VALUE)

  const filtered = mockProjects.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase())
    const matchesDiscipline = disciplineFilter === ALL_VALUE || p.discipline === disciplineFilter
    const matchesStage = stageFilter === ALL_VALUE || p.stage === stageFilter
    return matchesSearch && matchesDiscipline && matchesStage
  })

  return (
    <div className="p-6 space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">Project History</h1>
        <p className="text-sm text-muted-foreground">{mockProjects.length} projects total</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={disciplineFilter} onValueChange={setDisciplineFilter}>
          <SelectTrigger className="w-full sm:w-52">
            <SelectValue placeholder="All Disciplines" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL_VALUE}>All Disciplines</SelectItem>
            <SelectItem value="Architecture">Architecture</SelectItem>
            <SelectItem value="Interior Design">Interior Design</SelectItem>
            <SelectItem value="Landscape Architecture">Landscape Architecture</SelectItem>
          </SelectContent>
        </Select>
        <Select value={stageFilter} onValueChange={setStageFilter}>
          <SelectTrigger className="w-full sm:w-52">
            <SelectValue placeholder="All Stages" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL_VALUE}>All Stages</SelectItem>
            <SelectItem value="Concept Stage">Concept Stage</SelectItem>
            <SelectItem value="Schematic Design">Schematic Design</SelectItem>
            <SelectItem value="Design Development">Design Development</SelectItem>
            <SelectItem value="Visualization Stage">Visualization Stage</SelectItem>
            <SelectItem value="Presentation Stage">Presentation Stage</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              <TableHead>Project Name</TableHead>
              <TableHead>Discipline</TableHead>
              <TableHead className="hidden sm:table-cell">Type</TableHead>
              <TableHead className="hidden md:table-cell">Stage</TableHead>
              <TableHead className="hidden lg:table-cell">Last Analysis</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                  No projects match your filters.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((project) => {
                const status = statusConfig[project.status]
                return (
                  <TableRow key={project.id} className="hover:bg-muted/20">
                    <TableCell>
                      <div className="space-y-0.5">
                        <p className="text-sm font-medium">{project.name}</p>
                        <p className="text-xs text-muted-foreground">{project.location}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="text-[10px] whitespace-nowrap">
                        {project.discipline}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">
                      {project.type}
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-xs text-muted-foreground">
                      {project.stage}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-xs text-muted-foreground">
                      {new Date(project.lastAnalyzed).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </TableCell>
                    <TableCell>
                      <Badge variant={status.variant} className="text-[10px]">{status.label}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="gap-1.5 h-7 text-xs" asChild>
                        <Link to={`/projects/${project.id}/analysis`}>
                          View
                          <ArrowUpRight className="w-3 h-3" />
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
