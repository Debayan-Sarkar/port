"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Switch } from "@/components/ui/switch"

export default function SettingsGeneral() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    siteName: "Developer Portfolio",
    siteDescription: "Professional portfolio showcasing my work as a developer",
    ownerName: "John Doe",
    ownerEmail: "john@example.com",
    ownerPhone: "+1 (555) 123-4567",
    address: "123 Tech Street, San Francisco, CA 94107",
    copyrightText: "© 2023 Developer Portfolio. All rights reserved.",
    enableBlog: true,
    enableProjects: true,
    enableServices: true,
    enableTestimonials: true,
    enableContact: true,
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
      title: "Settings saved",
      description: "Your general settings have been saved successfully.",
    })

    setIsLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Site Information</h3>

        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="siteName">Site Name</Label>
            <Input id="siteName" name="siteName" value={formData.siteName} onChange={handleChange} required />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="siteDescription">Site Description</Label>
            <Textarea
              id="siteDescription"
              name="siteDescription"
              value={formData.siteDescription}
              onChange={handleChange}
              rows={3}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Owner Information</h3>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="ownerName">Owner Name</Label>
            <Input id="ownerName" name="ownerName" value={formData.ownerName} onChange={handleChange} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="ownerEmail">Owner Email</Label>
            <Input id="ownerEmail" name="ownerEmail" type="email" value={formData.ownerEmail} onChange={handleChange} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="ownerPhone">Owner Phone</Label>
            <Input id="ownerPhone" name="ownerPhone" value={formData.ownerPhone} onChange={handleChange} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="address">Address</Label>
            <Input id="address" name="address" value={formData.address} onChange={handleChange} />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Footer Information</h3>

        <div className="grid gap-2">
          <Label htmlFor="copyrightText">Copyright Text</Label>
          <Input id="copyrightText" name="copyrightText" value={formData.copyrightText} onChange={handleChange} />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Feature Toggles</h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="enableBlog" className="block">
                Enable Blog
              </Label>
              <p className="text-sm text-muted-foreground">Show or hide the blog section on your portfolio</p>
            </div>
            <Switch
              id="enableBlog"
              checked={formData.enableBlog}
              onCheckedChange={(checked) => handleSwitchChange("enableBlog", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="enableProjects" className="block">
                Enable Projects
              </Label>
              <p className="text-sm text-muted-foreground">Show or hide the projects section on your portfolio</p>
            </div>
            <Switch
              id="enableProjects"
              checked={formData.enableProjects}
              onCheckedChange={(checked) => handleSwitchChange("enableProjects", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="enableServices" className="block">
                Enable Services
              </Label>
              <p className="text-sm text-muted-foreground">Show or hide the services section on your portfolio</p>
            </div>
            <Switch
              id="enableServices"
              checked={formData.enableServices}
              onCheckedChange={(checked) => handleSwitchChange("enableServices", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="enableTestimonials" className="block">
                Enable Testimonials
              </Label>
              <p className="text-sm text-muted-foreground">Show or hide the testimonials section on your portfolio</p>
            </div>
            <Switch
              id="enableTestimonials"
              checked={formData.enableTestimonials}
              onCheckedChange={(checked) => handleSwitchChange("enableTestimonials", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="enableContact" className="block">
                Enable Contact
              </Label>
              <p className="text-sm text-muted-foreground">Show or hide the contact section on your portfolio</p>
            </div>
            <Switch
              id="enableContact"
              checked={formData.enableContact}
              onCheckedChange={(checked) => handleSwitchChange("enableContact", checked)}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Settings"}
        </Button>
      </div>
    </form>
  )
}
