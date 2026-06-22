import { Link, useParams } from "react-router-dom"
import { toast } from "sonner"
import { Download, Share2, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { mockProjects } from "@/data/mock-projects"
import { mockAnalysis } from "@/data/mock-analysis"
import { OverviewTab } from "@/components/analysis/OverviewTab"
import { DesignAnalysisTab } from "@/components/analysis/DesignAnalysisTab"
import { ConceptCreationTab } from "@/components/analysis/ConceptCreationTab"
import { ReferencesTab } from "@/components/analysis/ReferencesTab"
import { MaterialsTab } from "@/components/analysis/MaterialsTab"
import { MoodBoardTab } from "@/components/analysis/MoodBoardTab"
import { PresentationTab } from "@/components/analysis/PresentationTab"
import { RenderReviewTab } from "@/components/analysis/RenderReviewTab"
import { RenderGuideTab } from "@/components/analysis/RenderGuideTab"
import { SoftwareTab } from "@/components/analysis/SoftwareTab"

const tabs = [
  { id: "overview", label: "Project Overview" },
  { id: "design", label: "Design Analysis" },
  { id: "concept", label: "Concept Creation" },
  { id: "references", label: "References" },
  { id: "materials", label: "Materials" },
  { id: "moodboard", label: "Mood Board" },
  { id: "presentation", label: "Presentation" },
  { id: "render-review", label: "Render Review" },
  { id: "render-guide", label: "Render Guide" },
  { id: "software", label: "Software" },
]

export function AnalysisPage() {
  const { id } = useParams()
  const project = id && id !== "new" ? mockProjects.find((p) => p.id === id) : null
  const data = mockAnalysis

  const projectName = project?.name ?? data.projectName
  const discipline = project?.discipline ?? data.discipline
  const stage = project?.stage ?? data.stage

  function handleExport() {
    toast.success("Export started — your PDF will be ready shortly.")
  }

  function handleShare() {
    toast.success("Share link copied to clipboard.")
  }

  return (
    <div className="flex flex-col min-h-full animate-in fade-in duration-500">
      {/* Sticky page header */}
      <div className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur-sm px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          {/* Breadcrumb + title */}
          <div className="flex-1 min-w-0 space-y-1">
            <nav className="flex items-center gap-1 text-xs text-muted-foreground">
              <Link to="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-foreground font-medium truncate">{projectName}</span>
            </nav>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-lg font-bold tracking-tight truncate">{projectName}</h1>
              <Badge variant="secondary" className="text-[10px] shrink-0">{discipline}</Badge>
              <Badge variant="outline" className="text-[10px] shrink-0">{stage}</Badge>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <Button variant="outline" size="sm" onClick={handleShare} className="gap-1.5">
              <Share2 className="w-3.5 h-3.5" />
              Share
            </Button>
            <Button size="sm" onClick={handleExport} className="gap-1.5">
              <Download className="w-3.5 h-3.5" />
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="flex-1 flex flex-col">
        {/* Tab bar — scrollable on mobile */}
        <div className="border-b border-border bg-background">
          <ScrollArea className="w-full">
            <TabsList className="inline-flex h-auto w-max min-w-full rounded-none border-0 bg-transparent p-0 px-6 gap-0">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-3 text-sm font-medium text-muted-foreground data-[state=active]:text-foreground transition-colors whitespace-nowrap"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
            <ScrollBar orientation="horizontal" className="h-0" />
          </ScrollArea>
        </div>

        {/* Tab content */}
        <div className="flex-1 p-6">
          <TabsContent value="overview" className="mt-0">
            <OverviewTab />
          </TabsContent>
          <TabsContent value="design" className="mt-0">
            <DesignAnalysisTab />
          </TabsContent>
          <TabsContent value="concept" className="mt-0">
            <ConceptCreationTab />
          </TabsContent>
          <TabsContent value="references" className="mt-0">
            <ReferencesTab />
          </TabsContent>
          <TabsContent value="materials" className="mt-0">
            <MaterialsTab />
          </TabsContent>
          <TabsContent value="moodboard" className="mt-0">
            <MoodBoardTab />
          </TabsContent>
          <TabsContent value="presentation" className="mt-0">
            <PresentationTab />
          </TabsContent>
          <TabsContent value="render-review" className="mt-0">
            <RenderReviewTab />
          </TabsContent>
          <TabsContent value="render-guide" className="mt-0">
            <RenderGuideTab />
          </TabsContent>
          <TabsContent value="software" className="mt-0">
            <SoftwareTab />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
