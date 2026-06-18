import { useNavigate } from "react-router-dom"
import { useRef, useState, useCallback } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { Upload, Building2, Palette, Trees, Sparkles, ArrowRight, MapPin, Wind, Ruler, FileImage, X, CheckCircle2, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"

const formSchema = z.object({
  name: z.string().min(2, "Project name must be at least 2 characters"),
  discipline: z.string().min(1, "Select a discipline"),
  type: z.string().min(1, "Select a project type"),
  scope: z.string().min(1, "Select a design scope"),
  stage: z.string().min(1, "Select a design stage"),
  location: z.string().optional(),
  climateZone: z.string().optional(),
  area: z.string().optional(),
  uploadType: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

const disciplineIcons = {
  Architecture: Building2,
  "Interior Design": Palette,
  "Landscape Architecture": Trees,
}

const projectTypes: Record<string, string[]> = {
  Architecture: ["Villa", "Apartment", "Office", "Showroom", "Retail", "Restaurant", "Hotel", "Hospitality", "Institutional", "Urban Design", "Master Planning"],
  "Interior Design": ["Residential", "Showroom", "Retail", "Restaurant", "Hotel Lobby", "Office Interior", "Hospitality"],
  "Landscape Architecture": ["Landscape", "Urban Park", "Garden", "Public Plaza", "Campus", "Masterplan Landscape"],
}

const stages = [
  "Concept Design",
  "Schematic Design",
  "Design Development",
  "Visualization Stage",
  "Presentation Stage",
]

const climateZones = [
  "Hot Arid",
  "Hot Humid",
  "Coastal Arid",
  "Tropical",
  "Mediterranean",
  "Continental",
  "Temperate",
  "Cold",
]

const uploadTypes = [
  { value: "sketch", label: "Sketch" },
  { value: "floor-plan", label: "Floor Plan" },
  { value: "sketchup", label: "SketchUp Screenshot" },
  { value: "render", label: "Render" },
  { value: "multiple", label: "Multiple Images" },
]

function SummaryPanel({ values, previewUrl }: { values: Partial<FormValues>; previewUrl: string | null }) {
  const DisciplineIcon = values.discipline
    ? disciplineIcons[values.discipline as keyof typeof disciplineIcons]
    : Building2
  const isReady = values.name && values.discipline && values.type && values.scope && values.stage

  return (
    <Card className="sticky top-6 border-border/70">
      <CardHeader className="pb-4">
        <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Project Preview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Thumbnail */}
        <div className="aspect-video rounded-lg bg-gradient-to-br from-muted to-muted/60 border border-border flex items-center justify-center relative overflow-hidden">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Upload preview"
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <ImageIcon className="w-7 h-7" />
              <span className="text-xs">Upload images to preview</span>
            </div>
          )}
          {values.discipline && (
            <div className="absolute top-2 right-2">
              <div className="flex items-center justify-center w-7 h-7 rounded-full bg-background/80 backdrop-blur-sm border border-border">
                <DisciplineIcon className="w-3.5 h-3.5" />
              </div>
            </div>
          )}
        </div>

        {/* Summary fields */}
        <div className="space-y-3">
          <div className="space-y-1">
            <span className="text-[10px] text-muted-foreground uppercase tracking-wide">Project Name</span>
            <p className="text-sm font-semibold truncate">
              {values.name || <span className="text-muted-foreground italic font-normal">Untitled project</span>}
            </p>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-x-3 gap-y-2.5">
            {[
              { label: "Discipline", value: values.discipline },
              { label: "Type", value: values.type },
              { label: "Scope", value: values.scope },
              { label: "Stage", value: values.stage },
              { label: "Location", value: values.location },
              { label: "Climate", value: values.climateZone },
              { label: "Area", value: values.area ? `${values.area} m²` : undefined },
              { label: "Upload Type", value: values.uploadType },
            ].map(({ label, value }) => (
              <div key={label} className="space-y-0.5">
                <span className="text-[10px] text-muted-foreground uppercase tracking-wide">{label}</span>
                {value ? (
                  <p className="text-xs font-medium truncate">{value}</p>
                ) : (
                  <p className="text-xs text-muted-foreground italic">—</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* AI readiness */}
        {isReady && (
          <div className="flex items-start gap-2 rounded-lg bg-muted/60 p-3 animate-in fade-in duration-300">
            <Sparkles className="w-3.5 h-3.5 text-chart-2 mt-0.5 shrink-0" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              Ready for AI analysis. Upload design images for most accurate results.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export function NewProjectPage() {
  const navigate = useNavigate()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "", discipline: "", type: "", scope: "", stage: "",
      location: "", climateZone: "", area: "", uploadType: "",
    },
  })

  const watchedValues = watch()

  const addFiles = useCallback((files: FileList | null) => {
    if (!files) return
    const accepted = Array.from(files).filter((f) =>
      ["image/png", "image/jpeg", "image/webp", "application/pdf"].includes(f.type) || f.name.match(/\.(dwg|rvt)$/i)
    )
    if (!accepted.length) {
      toast.error("Unsupported file type. Use PNG, JPG, PDF, DWG, or RVT.")
      return
    }
    setUploadedFiles((prev) => {
      const next = [...prev, ...accepted].slice(0, 10)
      const firstImage = next.find((f) => f.type.startsWith("image/"))
      if (firstImage) {
        const url = URL.createObjectURL(firstImage)
        setPreviewUrl(url)
      }
      return next
    })
  }, [])

  const removeFile = useCallback((index: number) => {
    setUploadedFiles((prev) => {
      const next = prev.filter((_, i) => i !== index)
      const firstImage = next.find((f) => f.type.startsWith("image/"))
      setPreviewUrl(firstImage ? URL.createObjectURL(firstImage) : null)
      return next
    })
  }, [])

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const onDragLeave = useCallback(() => setIsDragging(false), [])

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    addFiles(e.dataTransfer.files)
  }, [addFiles])

  function onSubmit(data: FormValues) {
    if (uploadedFiles.length === 0) {
      toast.error("Upload at least one design file before running analysis.")
      return
    }
    toast.success(`"${data.name}" created — starting analysis...`, { duration: 1500 })
    setTimeout(() => navigate("/projects/proj-1/loading"), 300)
  }

  const availableTypes = watchedValues.discipline
    ? projectTypes[watchedValues.discipline] ?? []
    : []

  const acceptedExts = ".png,.jpg,.jpeg,.webp,.pdf,.dwg,.rvt"

  return (
    <div className="p-6 space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">New Project</h1>
        <p className="text-sm text-muted-foreground">Set up your project details before running an AI analysis.</p>
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-8 items-start">
        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          {/* Section: Project Information */}
          <Card className="border-border/70">
            <CardHeader className="pb-4">
              <CardTitle className="text-sm font-semibold">Project Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Project Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Project Name</Label>
                <Input
                  id="name"
                  placeholder="e.g. Riyadh Villa, Hotel Lobby Renovation"
                  {...register("name")}
                  aria-invalid={!!errors.name}
                  className={errors.name ? "border-destructive" : ""}
                />
                {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
              </div>

              {/* Discipline */}
              <div className="space-y-2">
                <Label>Discipline</Label>
                <Controller
                  name="discipline"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className={errors.discipline ? "border-destructive" : ""}>
                        <SelectValue placeholder="Select discipline" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Architecture">Architecture</SelectItem>
                        <SelectItem value="Interior Design">Interior Design</SelectItem>
                        <SelectItem value="Landscape Architecture">Landscape Architecture</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              {/* Project Type */}
              <div className="space-y-2">
                <Label>Project Type</Label>
                <Controller
                  name="type"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value} disabled={!watchedValues.discipline}>
                      <SelectTrigger className={errors.type ? "border-destructive" : ""}>
                        <SelectValue placeholder={watchedValues.discipline ? "Select type" : "Select discipline first"} />
                      </SelectTrigger>
                      <SelectContent>
                        {availableTypes.map((t) => (
                          <SelectItem key={t} value={t}>{t}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              {/* Design Scope */}
              <div className="space-y-2">
                <Label>Design Scope</Label>
                <Controller
                  name="scope"
                  control={control}
                  render={({ field }) => (
                    <ToggleGroup
                      type="single"
                      value={field.value}
                      onValueChange={(v) => v && field.onChange(v)}
                      className="justify-start flex-wrap"
                    >
                      {["Interior", "Exterior", "Interior + Exterior"].map((s) => (
                        <ToggleGroupItem key={s} value={s} className="text-xs px-4">
                          {s}
                        </ToggleGroupItem>
                      ))}
                    </ToggleGroup>
                  )}
                />
                {errors.scope && <p className="text-xs text-destructive">{errors.scope.message}</p>}
              </div>

              {/* Design Stage */}
              <div className="space-y-2">
                <Label>Design Stage</Label>
                <Controller
                  name="stage"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className={errors.stage ? "border-destructive" : ""}>
                        <SelectValue placeholder="Select stage" />
                      </SelectTrigger>
                      <SelectContent>
                        {stages.map((s) => (
                          <SelectItem key={s} value={s}>{s}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Section: Project Context */}
          <Card className="border-border/70">
            <CardHeader className="pb-4">
              <CardTitle className="text-sm font-semibold">Project Context</CardTitle>
              <p className="text-xs text-muted-foreground">Help MANOVA tailor its analysis to your project's specific conditions.</p>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location" className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  Location
                </Label>
                <Input
                  id="location"
                  placeholder="e.g. Riyadh, Saudi Arabia"
                  {...register("location")}
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                {/* Climate Zone */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-1.5">
                    <Wind className="w-3.5 h-3.5" />
                    Climate Zone
                  </Label>
                  <Controller
                    name="climateZone"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select climate" />
                        </SelectTrigger>
                        <SelectContent>
                          {climateZones.map((c) => (
                            <SelectItem key={c} value={c}>{c}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                {/* Project Area */}
                <div className="space-y-2">
                  <Label htmlFor="area" className="flex items-center gap-1.5">
                    <Ruler className="w-3.5 h-3.5" />
                    Project Area (m²)
                  </Label>
                  <Input
                    id="area"
                    placeholder="e.g. 850"
                    type="number"
                    {...register("area")}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section: Upload Type */}
          <Card className="border-border/70">
            <CardHeader className="pb-4">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <FileImage className="w-4 h-4" />
                Upload Type
              </CardTitle>
              <p className="text-xs text-muted-foreground">Tell MANOVA what kind of images you're uploading for more accurate analysis.</p>
            </CardHeader>
            <CardContent>
              <Controller
                name="uploadType"
                control={control}
                render={({ field }) => (
                  <ToggleGroup
                    type="single"
                    value={field.value}
                    onValueChange={(v) => v && field.onChange(v)}
                    className="justify-start flex-wrap"
                  >
                    {uploadTypes.map((t) => (
                      <ToggleGroupItem key={t.value} value={t.value} className="text-xs px-4">
                        {t.label}
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                )}
              />
            </CardContent>
          </Card>

          {/* Section: Upload Files */}
          <Card className="border-border/70">
            <CardHeader className="pb-4">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <FileImage className="w-4 h-4" />
                Design Files
              </CardTitle>
              <p className="text-xs text-muted-foreground">Upload your design images for AI analysis. Supports PNG, JPG, PDF, DWG, RVT — up to 50 MB each.</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Drop zone */}
              <div
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                onClick={() => fileInputRef.current?.click()}
                className={[
                  "relative flex flex-col items-center justify-center gap-4 py-10 rounded-xl border-2 border-dashed cursor-pointer transition-all duration-200",
                  isDragging
                    ? "border-primary bg-primary/5 scale-[1.01]"
                    : uploadedFiles.length > 0
                    ? "border-border/60 hover:border-primary/40"
                    : "border-border/60 hover:border-primary/40 hover:bg-muted/40",
                ].join(" ")}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept={acceptedExts}
                  className="sr-only"
                  onChange={(e) => addFiles(e.target.files)}
                />
                {uploadedFiles.length === 0 ? (
                  <>
                    <div className={[
                      "flex h-14 w-14 items-center justify-center rounded-full transition-colors",
                      isDragging ? "bg-primary/10" : "bg-muted",
                    ].join(" ")}>
                      <Upload className={["w-6 h-6 transition-colors", isDragging ? "text-primary" : "text-muted-foreground"].join(" ")} />
                    </div>
                    <div className="text-center space-y-1">
                      <p className="text-sm font-semibold">
                        {isDragging ? "Drop files to upload" : "Drop your design files here"}
                      </p>
                      <p className="text-xs text-muted-foreground">or click to browse</p>
                    </div>
                    <div className="flex flex-wrap gap-1.5 justify-center">
                      {["PNG", "JPG", "PDF", "DWG", "RVT"].map((ext) => (
                        <Badge key={ext} variant="outline" className="text-[10px]">{ext}</Badge>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                    </div>
                    <p className="text-sm font-medium text-foreground">
                      {uploadedFiles.length} file{uploadedFiles.length > 1 ? "s" : ""} ready
                    </p>
                    <p className="text-xs text-muted-foreground">Drop more or click to add</p>
                  </div>
                )}
              </div>

              {/* File list */}
              {uploadedFiles.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-muted-foreground">{uploadedFiles.length} / 10 files</span>
                    <Progress value={(uploadedFiles.length / 10) * 100} className="w-24 h-1.5" />
                  </div>
                  <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                    {uploadedFiles.map((file, i) => (
                      <div key={i} className="flex items-center gap-3 rounded-lg border border-border/60 bg-muted/30 px-3 py-2 group">
                        {file.type.startsWith("image/") ? (
                          <div className="w-8 h-8 rounded overflow-hidden shrink-0 border border-border/40">
                            <img
                              src={URL.createObjectURL(file)}
                              alt={file.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-8 h-8 rounded bg-muted flex items-center justify-center shrink-0">
                            <FileImage className="w-4 h-4 text-muted-foreground" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium truncate">{file.name}</p>
                          <p className="text-[10px] text-muted-foreground">
                            {(file.size / 1024 / 1024).toFixed(1)} MB
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); removeFile(i) }}
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-muted"
                          aria-label="Remove file"
                        >
                          <X className="w-3.5 h-3.5 text-muted-foreground" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Button
            type="submit"
            size="lg"
            className="w-full gap-2"
            disabled={isSubmitting || uploadedFiles.length === 0}
          >
            Run AI Analysis
            <ArrowRight className="w-4 h-4" />
          </Button>
        </form>

        {/* Preview panel */}
        <SummaryPanel values={watchedValues} previewUrl={previewUrl} />
      </div>
    </div>
  )
}
