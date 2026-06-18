import { useState } from "react"
import { toast } from "sonner"
import { User, Building2, Globe, Bell, Palette, Ruler } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"

export function ProfilePage() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [analysisAlerts, setAnalysisAlerts] = useState(true)

  function handleSave() {
    toast.success("Profile saved successfully.")
  }

  return (
    <div className="p-6 space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">Profile</h1>
        <p className="text-sm text-muted-foreground">Manage your account details and preferences.</p>
      </div>

      <div className="grid lg:grid-cols-[1fr_340px] gap-6 items-start">
        {/* Left column */}
        <div className="space-y-6">
          {/* Personal Info */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-base flex items-center gap-2">
                <User className="w-4 h-4" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Avatar row */}
              <div className="flex items-center gap-4 pb-2">
                <Avatar className="h-14 w-14">
                  <AvatarFallback className="bg-primary text-primary-foreground text-lg font-bold">
                    AM
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-base">Alex Mercer</p>
                  <p className="text-sm text-muted-foreground">alex.mercer@studio.com</p>
                  <Badge variant="secondary" className="text-[10px] mt-1">Pro Plan</Badge>
                </div>
              </div>

              <Separator />

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input id="first-name" defaultValue="Alex" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" defaultValue="Mercer" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="alex.mercer@studio.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input id="role" defaultValue="Principal Architect" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="firm" className="flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5" />
                  Firm / Studio
                </Label>
                <Input id="firm" defaultValue="Mercer Design Studio" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5" />
                  Location
                </Label>
                <Input id="location" defaultValue="Riyadh, Saudi Arabia" />
              </div>
            </CardContent>
          </Card>

          {/* Preferences */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-base flex items-center gap-2">
                <Palette className="w-4 h-4" />
                Design Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Default Discipline</Label>
                  <Select defaultValue="Architecture">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Architecture">Architecture</SelectItem>
                      <SelectItem value="Interior Design">Interior Design</SelectItem>
                      <SelectItem value="Landscape Architecture">Landscape Architecture</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-1.5">
                    <Ruler className="w-3.5 h-3.5" />
                    Default Units
                  </Label>
                  <Select defaultValue="metric">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="metric">Metric (m²)</SelectItem>
                      <SelectItem value="imperial">Imperial (ft²)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <Label className="flex items-center gap-1.5">
                  <Bell className="w-3.5 h-3.5" />
                  Notifications
                </Label>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="text-sm">Email Notifications</p>
                    <p className="text-xs text-muted-foreground">Weekly digest and updates</p>
                  </div>
                  <Switch
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="text-sm">Analysis Alerts</p>
                    <p className="text-xs text-muted-foreground">When an analysis completes</p>
                  </div>
                  <Switch
                    checked={analysisAlerts}
                    onCheckedChange={setAnalysisAlerts}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Button onClick={handleSave} className="w-full sm:w-auto">
            Save Changes
          </Button>
        </div>

        {/* Right column — usage stats */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold">Plan & Usage</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold">Pro Plan</p>
                  <p className="text-xs text-muted-foreground">Renews Jul 18, 2026</p>
                </div>
                <Badge>Active</Badge>
              </div>

              <Separator />

              {[
                { label: "Analyses Used", used: 24, total: 50, unit: "analyses" },
                { label: "Renders Reviewed", used: 47, total: 100, unit: "renders" },
                { label: "Storage Used", used: 3.2, total: 10, unit: "GB" },
              ].map((item) => (
                <div key={item.label} className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{item.label}</span>
                    <span className="text-xs font-medium tabular-nums">
                      {item.used} / {item.total} {item.unit}
                    </span>
                  </div>
                  <Progress value={(item.used / item.total) * 100} className="h-1.5" />
                </div>
              ))}

              <Button variant="outline" size="sm" className="w-full">
                Upgrade Plan
              </Button>
            </CardContent>
          </Card>

          {/* Stats */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold">Activity Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { label: "Total Projects", value: "6" },
                { label: "Member Since", value: "Jan 2026" },
                { label: "Avg. Design Score", value: "85" },
                { label: "Presentations Exported", value: "12" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{item.label}</span>
                  <span className="text-sm font-semibold tabular-nums">{item.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
