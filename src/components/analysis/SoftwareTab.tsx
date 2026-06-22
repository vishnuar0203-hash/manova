import { mockAnalysis } from "@/data/mock-analysis"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Kbd } from "@/components/ui/kbd"
import { CheckCircle2, Lightbulb } from "lucide-react"

const ratingVariant: Record<string, "default" | "secondary" | "outline"> = {
  Essential: "default",
  Recommended: "secondary",
  Optional: "outline",
  Advanced: "outline",
}

interface SoftwareData {
  tips: string[]
  plugins: { name: string; purpose: string; rating: string }[]
  shortcuts: { key: string; action: string }[]
}

function SoftwarePanel({ data }: { data: SoftwareData }) {
  return (
    <div className="space-y-5 pt-4">
      {/* Tips */}
      <Card className="border-border/70">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-chart-4" />
            Workflow Tips
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2.5">
          {data.tips.map((tip, i) => (
            <div key={i} className="flex gap-3">
              <CheckCircle2 className="w-4 h-4 text-chart-2 mt-0.5 shrink-0" />
              <p className="text-sm text-muted-foreground leading-relaxed">{tip}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Plugins */}
      <Card className="border-border/70">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold">Recommended Plugins & Extensions</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Plugin / Extension</TableHead>
                <TableHead>Purpose</TableHead>
                <TableHead>Priority</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.plugins.map((p) => (
                <TableRow key={p.name} className="hover:bg-muted/30">
                  <TableCell className="text-sm font-medium">{p.name}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{p.purpose}</TableCell>
                  <TableCell>
                    <Badge variant={ratingVariant[p.rating] ?? "outline"} className="text-[10px]">{p.rating}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Shortcuts */}
      <Card className="border-border/70">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold">Key Shortcuts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {data.shortcuts.map((s) => (
              <div key={s.key} className="flex items-center gap-3">
                <Kbd>{s.key}</Kbd>
                <span className="text-sm text-muted-foreground">{s.action}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

const softwareTabs = [
  { id: "d5", label: "D5 Render" },
  { id: "lumion", label: "Lumion" },
  { id: "enscape", label: "Enscape" },
  { id: "vray", label: "V-Ray" },
  { id: "corona", label: "Corona" },
  { id: "photoshop", label: "Photoshop" },
]

export function SoftwareTab() {
  const { software } = mockAnalysis

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h3 className="text-base font-semibold">Software Guidance</h3>
        <p className="text-sm text-muted-foreground">
          Tailored workflow tips, plugins, and shortcuts for six major design and rendering applications.
        </p>
      </div>

      <Tabs defaultValue="d5">
        <div className="overflow-x-auto">
          <TabsList className="inline-flex w-max min-w-full sm:min-w-0 sm:w-auto">
            {softwareTabs.map((tab) => (
              <TabsTrigger key={tab.id} value={tab.id} className="text-xs sm:text-sm">
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        <TabsContent value="d5"><SoftwarePanel data={software.d5} /></TabsContent>
        <TabsContent value="lumion"><SoftwarePanel data={software.lumion} /></TabsContent>
        <TabsContent value="enscape"><SoftwarePanel data={software.enscape} /></TabsContent>
        <TabsContent value="vray"><SoftwarePanel data={software.vray} /></TabsContent>
        <TabsContent value="corona"><SoftwarePanel data={software.corona} /></TabsContent>
        <TabsContent value="photoshop"><SoftwarePanel data={software.photoshop} /></TabsContent>
      </Tabs>
    </div>
  )
}
