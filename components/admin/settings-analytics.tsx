"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"

export default function SettingsAnalytics() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    googleAnalyticsId: "G-XXXXXXXXXX",
    enableGoogleAnalytics: true,
    facebookPixelId: "",
    enableFacebookPixel: false,
    hotjarId: "",
    enableHotjar: false,
    customHeadScripts: "",
    customBodyScripts: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Settings saved",
        description: "Your analytics settings have been saved successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save analytics settings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Analytics & Tracking</CardTitle>
          <CardDescription>Configure analytics and tracking tools for your portfolio website</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs defaultValue="google" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="google">Google Analytics</TabsTrigger>
              <TabsTrigger value="facebook">Facebook Pixel</TabsTrigger>
              <TabsTrigger value="hotjar">Hotjar</TabsTrigger>
              <TabsTrigger value="custom">Custom Scripts</TabsTrigger>
            </TabsList>

            <TabsContent value="google" className="space-y-4 pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">Google Analytics</h3>
                  <p className="text-sm text-muted-foreground">Track website traffic and user behavior</p>
                </div>
                <Switch
                  checked={formData.enableGoogleAnalytics}
                  onCheckedChange={(checked) => handleSwitchChange("enableGoogleAnalytics", checked)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="googleAnalyticsId">Measurement ID</Label>
                <Input
                  id="googleAnalyticsId"
                  name="googleAnalyticsId"
                  placeholder="G-XXXXXXXXXX"
                  value={formData.googleAnalyticsId}
                  onChange={handleChange}
                  disabled={!formData.enableGoogleAnalytics}
                />
                <p className="text-xs text-muted-foreground">
                  Enter your Google Analytics 4 Measurement ID (starts with G-)
                </p>
              </div>
            </TabsContent>

            <TabsContent value="facebook" className="space-y-4 pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">Facebook Pixel</h3>
                  <p className="text-sm text-muted-foreground">Track conversions from Facebook ads</p>
                </div>
                <Switch
                  checked={formData.enableFacebookPixel}
                  onCheckedChange={(checked) => handleSwitchChange("enableFacebookPixel", checked)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="facebookPixelId">Pixel ID</Label>
                <Input
                  id="facebookPixelId"
                  name="facebookPixelId"
                  placeholder="XXXXXXXXXXXXXXXXXX"
                  value={formData.facebookPixelId}
                  onChange={handleChange}
                  disabled={!formData.enableFacebookPixel}
                />
              </div>
            </TabsContent>

            <TabsContent value="hotjar" className="space-y-4 pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">Hotjar</h3>
                  <p className="text-sm text-muted-foreground">Visualize user behavior with heatmaps and recordings</p>
                </div>
                <Switch
                  checked={formData.enableHotjar}
                  onCheckedChange={(checked) => handleSwitchChange("enableHotjar", checked)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hotjarId">Site ID</Label>
                <Input
                  id="hotjarId"
                  name="hotjarId"
                  placeholder="XXXXXXX"
                  value={formData.hotjarId}
                  onChange={handleChange}
                  disabled={!formData.enableHotjar}
                />
              </div>
            </TabsContent>

            <TabsContent value="custom" className="space-y-4 pt-4">
              <div>
                <h3 className="text-lg font-medium">Custom Scripts</h3>
                <p className="text-sm text-muted-foreground mb-4">Add custom tracking or analytics scripts</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="customHeadScripts">
                    Head Scripts <span className="text-xs text-muted-foreground">(placed in &lt;head&gt;)</span>
                  </Label>
                  <Textarea
                    id="customHeadScripts"
                    name="customHeadScripts"
                    placeholder="<!-- Paste your scripts here -->"
                    value={formData.customHeadScripts}
                    onChange={handleChange}
                    className="font-mono text-sm h-32"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customBodyScripts">
                    Body Scripts <span className="text-xs text-muted-foreground">(placed before &lt;/body&gt;)</span>
                  </Label>
                  <Textarea
                    id="customBodyScripts"
                    name="customBodyScripts"
                    placeholder="<!-- Paste your scripts here -->"
                    value={formData.customBodyScripts}
                    onChange={handleChange}
                    className="font-mono text-sm h-32"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
