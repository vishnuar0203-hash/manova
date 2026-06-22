import { Link } from "react-router-dom"
import { Plus, TrendingUp, FolderOpen, Layers, Activity, MapPin, CalendarDays, ArrowRight, Star, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"
import { mockProjects, type Project } from "@/data/mock-projects"
import { useEffect, useState } from "react"

const stats = [
  { label: "Total Projects", value: "6", icon: FolderOpen, change: "+2 this month" },
  { label: "Analyses Run", value: "24", icon: Activity, change: "+8 this month" },
  { label: "Renders Reviewed", value: "47", icon: Layers, change: "+12 this month" },
  { label: "Active Stages", value: "4", icon: TrendingUp, change: "2 nearing milestone" },
]

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "outline" | "destructive" }> = {
  completed: { label: "Completed", variant: "default" },
  "in-progress": { label: "In Progress", variant: "secondary" },
  draft: { label: "Draft", variant: "outline" },
}

function scoreColor(score: number) {
  if (score >= 85) return "text-chart-2"
  if (score >= 70) return "text-chart-4"
  return "text-chart-1"
}

function ProjectCard({ project }: { project: Project }) {
  const status = statusConfig[project.status]
  return (
    <Link to={`/projects/${project.id}/analysis`}>
      <Card className="group hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer h-full border-border/70">
        {/* Thumbnail */}
        <div className={`h-40 rounded-t-lg bg-gradient-to-br ${project.color} relative overflow-hidden`}>
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

          {/* Discipline + Status */}
          <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
            <Badge variant="secondary" className="bg-black/40 text-white border-0 text-[10px] backdrop-blur-sm">
              {project.discipline}
            </Badge>
            <Badge
              variant={status.variant}
              className="text-[10px] bg-black/40 backdrop-blur-sm border-0 text-white"
            >
              {status.label}
            </Badge>
          </div>

          {/* Design Score */}
          <div className="absolute bottom-3 right-3">
            <div className="flex items-center gap-1 bg-background/90 backdrop-blur-sm rounded-full px-2.5 py-1 border border-border/60">
              <Star className="w-3 h-3 fill-chart-4 text-chart-4" />
              <span className={`text-xs font-bold tabular-nums ${scoreColor(project.designScore)}`}>
                {project.designScore}
              </span>
              <span className="text-[9px] text-muted-foreground">/100</span>
            </div>
          </div>
        </div>

        <CardHeader className="pb-2 pt-3.5 px-4">
          <h3 className="font-semibold text-sm leading-tight group-hover:text-primary transition-colors">
            {project.name}
          </h3>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="w-3 h-3 shrink-0" />
            <span className="truncate">{project.location}</span>
          </div>
        </CardHeader>

        <CardContent className="px-4 pb-4 space-y-3">
          {/* Style detected */}
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-chart-2 shrink-0" />
            <span className="text-[11px] text-muted-foreground">{project.detectedStyle}</span>
            <span className="text-[11px] text-muted-foreground ml-auto">·</span>
            <span className="text-[11px] text-muted-foreground">{project.type}</span>
          </div>

          <Separator />

          {/* Stage progress */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-muted-foreground truncate">{project.stage}</span>
              <span className="text-[11px] font-semibold tabular-nums shrink-0 ml-2">{project.stageProgress}%</span>
            </div>
            <Progress value={project.stageProgress} className="h-1" />
          </div>

          {/* Meta row */}
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-muted-foreground">{project.area}</span>
            <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
              <CalendarDays className="w-3 h-3" />
              {new Date(project.lastAnalyzed).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

function ProjectCardSkeleton() {
  return (
    <Card>
      <Skeleton className="h-40 rounded-t-lg rounded-b-none" />
      <CardHeader className="pb-2 pt-3.5 px-4">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2 mt-1" />
      </CardHeader>
      <CardContent className="px-4 pb-4 space-y-3">
        <Skeleton className="h-3 w-2/3" />
        <Skeleton className="h-px w-full" />
        <Skeleton className="h-1 w-full" />
        <Skeleton className="h-3 w-full" />
      </CardContent>
    </Card>
  )
}

export function DashboardPage() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="p-6 space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Welcome back, Alex. Here's your project overview.</p>
        </div>
        <Button asChild className="shrink-0">
          <Link to="/new-project">
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Link>
        </Button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-border/70">
            <CardContent className="pt-4 pb-4 px-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground font-medium">{stat.label}</span>
                <stat.icon className="w-4 h-4 text-muted-foreground" />
              </div>
              {loading ? (
                <>
                  <Skeleton className="h-7 w-12 mb-1" />
                  <Skeleton className="h-3 w-24" />
                </>
              ) : (
                <>
                  <div className="text-2xl font-bold tabular-nums">{stat.value}</div>
                  <p className="text-xs text-muted-foreground mt-0.5">{stat.change}</p>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Projects grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold">Recent Projects</h2>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/history">
              View all
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <ProjectCardSkeleton key={i} />)
            : mockProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
        </div>
      </div>
    </div>
  )
}
