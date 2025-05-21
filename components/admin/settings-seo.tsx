"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SettingsSEO() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    metaTitle: "Developer Portfolio | Professional Web Developer",
    metaDescription:
      "Professional portfolio showcasing web development projects, services, and skills. Hire me for your next web project.",
    keywords: "web developer, frontend developer, react developer, portfolio, web development",
    ogTitle: "Developer Portfolio | Professional Web Developer",
    ogDescription:
      "Professional portfolio showcasing web development projects, services, and skills. Hire me for your next web project.",
    ogImage: "/og-image.jpg",
    twitterTitle: "Developer Portfolio | Professional Web Developer",
    twitterDescription:
      "Professional portfolio showcasing web development projects, services, and skills. Hire me for your next web project.",
    twitterImage: "/twitter-image.jpg",
    canonicalUrl: "https://yourportfolio.com",
    robotsTxt: "User-agent: *\nAllow: /",
    sitemapEnabled: true,
    structuredDataEnabled: true,
    googleSiteVerification: "",
    bingSiteVerification: "",
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

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "SEO settings saved",
      description: "Your SEO settings have been saved successfully.",
    })

    setIsLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Tabs defaultValue="meta">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="meta">Meta Tags</TabsTrigger>
          <TabsTrigger value="og">Open Graph</TabsTrigger>
          <TabsTrigger value="twitter">Twitter Cards</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="meta" className="space-y-4 mt-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="metaTitle">Meta Title</Label>
              <Input id="metaTitle" name="metaTitle" value={formData.metaTitle} onChange={handleChange} />
              <p className="text-xs text-muted-foreground">Recommended length: 50-60 characters</p>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="metaDescription">Meta Description</Label>
              <Textarea
                id="metaDescription"
                name="metaDescription"
                value={formData.metaDescription}
                onChange={handleChange}
                rows={3}
              />
              <p className="text-xs text-muted-foreground">Recommended length: 150-160 characters</p>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="keywords">Keywords</Label>
              <Input id="keywords" name="keywords" value={formData.keywords} onChange={handleChange} />
              <p className="text-xs text-muted-foreground">Comma-separated keywords</p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="og" className="space-y-4 mt-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="ogTitle">OG Title</Label>
              <Input id="ogTitle" name="ogTitle" value={formData.ogTitle} onChange={handleChange} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="ogDescription">OG Description</Label>
              <Textarea
                id="ogDescription"
                name="ogDescription"
                value={formData.ogDescription}
                onChange={handleChange}
                rows={3}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="ogImage">OG Image URL</Label>
              <Input id="ogImage" name="ogImage" value={formData.ogImage} onChange={handleChange} />
              <div className="mt-2">
                <p className="text-sm font-medium mb-2">Preview:</p>
                {formData.ogImage && (
                  <Card className="overflow-hidden">
                    <CardContent className="p-0">
                      <img
                        src={formData.ogImage.startsWith("/") ? formData.ogImage : `/${formData.ogImage}`}
                        alt="OG Preview"
                        className="w-full h-48 object-cover"
                        onError={(e) => {
                          ;(e.target as HTMLImageElement).src = "/image-preview-concept.png"
                        }}
                      />
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="twitter" className="space-y-4 mt-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="twitterTitle">Twitter Title</Label>
              <Input id="twitterTitle" name="twitterTitle" value={formData.twitterTitle} onChange={handleChange} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="twitterDescription">Twitter Description</Label>
              <Textarea
                id="twitterDescription"
                name="twitterDescription"
                value={formData.twitterDescription}
                onChange={handleChange}
                rows={3}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="twitterImage">Twitter Image URL</Label>
              <Input id="twitterImage" name="twitterImage" value={formData.twitterImage} onChange={handleChange} />
              <div className="mt-2">
                <p className="text-sm font-medium mb-2">Preview:</p>
                {formData.twitterImage && (
                  <Card className="overflow-hidden">
                    <CardContent className="p-0">
                      <img
                        src={
                          formData.twitterImage.startsWith("/") ? formData.twitterImage : `/${formData.twitterImage}`
                        }
                        alt="Twitter Preview"
                        className="w-full h-48 object-cover"
                        onError={(e) => {
                          ;(e.target as HTMLImageElement).src = "/image-preview-concept.png"
                        }}
                      />
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4 mt-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="canonicalUrl">Canonical URL</Label>
              <Input id="canonicalUrl" name="canonicalUrl" value={formData.canonicalUrl} onChange={handleChange} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="robotsTxt">Robots.txt Content</Label>
              <Textarea
                id="robotsTxt"
                name="robotsTxt"
                value={formData.robotsTxt}
                onChange={handleChange}
                rows={5}
                className="font-mono text-sm"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="sitemapEnabled"
                checked={formData.sitemapEnabled}
                onCheckedChange={(checked) => handleSwitchChange("sitemapEnabled", checked)}
              />
              <Label htmlFor="sitemapEnabled">Enable XML Sitemap</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="structuredDataEnabled"
                checked={formData.structuredDataEnabled}
                onCheckedChange={(checked) => handleSwitchChange("structuredDataEnabled", checked)}
              />
              <Label htmlFor="structuredDataEnabled">Enable Structured Data</Label>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="googleSiteVerification">Google Site Verification</Label>
              <Input
                id="googleSiteVerification"
                name="googleSiteVerification"
                value={formData.googleSiteVerification}
                onChange={handleChange}
                placeholder="Enter Google verification code"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="bingSiteVerification">Bing Site Verification</Label>
              <Input
                id="bingSiteVerification"
                name="bingSiteVerification"
                value={formData.bingSiteVerification}
                onChange={handleChange}
                placeholder="Enter Bing verification code"
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Saving..." : "Save SEO Settings"}
      </Button>
    </form>
  )
}
