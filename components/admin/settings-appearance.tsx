"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ColorPicker } from "./color-picker"

export default function SettingsAppearance() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    theme: "system",
    primaryColor: "#3b82f6",
    secondaryColor: "#10b981",
    accentColor: "#8b5cf6",
    backgroundColor: "#ffffff",
    textColor: "#1e293b",
    fontFamily: "Inter",
    enableDarkMode: true,
    enableAnimations: true,
    enableParallaxEffects: true,
    enableGradients: true,
    borderRadius: "0.5rem",
    customCss: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleColorChange = (name: string, color: string) => {
    setFormData((prev) => ({ ...prev, [name]: color }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Appearance settings saved",
      description: "Your appearance settings have been saved successfully.",
    })

    setIsLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Theme Settings</h3>

        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="theme">Default Theme</Label>
            <Select value={formData.theme} onValueChange={(value) => handleSelectChange("theme", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="enableDarkMode" className="block">
                Enable Dark Mode Toggle
              </Label>
              <p className="text-sm text-muted-foreground">Allow users to switch between light and dark mode</p>
            </div>
            <Switch
              id="enableDarkMode"
              checked={formData.enableDarkMode}
              onCheckedChange={(checked) => handleSwitchChange("enableDarkMode", checked)}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Color Settings</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label className="block mb-2">Primary Color</Label>
            <ColorPicker color={formData.primaryColor} onChange={(color) => handleColorChange("primaryColor", color)} />
          </div>

          <div>
            <Label className="block mb-2">Secondary Color</Label>
            <ColorPicker
              color={formData.secondaryColor}
              onChange={(color) => handleColorChange("secondaryColor", color)}
            />
          </div>

          <div>
            <Label className="block mb-2">Accent Color</Label>
            <ColorPicker color={formData.accentColor} onChange={(color) => handleColorChange("accentColor", color)} />
          </div>

          <div>
            <Label className="block mb-2">Background Color</Label>
            <ColorPicker
              color={formData.backgroundColor}
              onChange={(color) => handleColorChange("backgroundColor", color)}
            />
          </div>

          <div>
            <Label className="block mb-2">Text Color</Label>
            <ColorPicker color={formData.textColor} onChange={(color) => handleColorChange("textColor", color)} />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Typography</h3>

        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="fontFamily">Font Family</Label>
            <Select value={formData.fontFamily} onValueChange={(value) => handleSelectChange("fontFamily", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select font family" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Inter">Inter</SelectItem>
                <SelectItem value="Roboto">Roboto</SelectItem>
                <SelectItem value="Poppins">Poppins</SelectItem>
                <SelectItem value="Montserrat">Montserrat</SelectItem>
                <SelectItem value="Open Sans">Open Sans</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Visual Effects</h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="enableAnimations" className="block">
                Enable Animations
              </Label>
              <p className="text-sm text-muted-foreground">Enable or disable animations throughout the portfolio</p>
            </div>
            <Switch
              id="enableAnimations"
              checked={formData.enableAnimations}
              onCheckedChange={(checked) => handleSwitchChange("enableAnimations", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="enableParallaxEffects" className="block">
                Enable Parallax Effects
              </Label>
              <p className="text-sm text-muted-foreground">Enable or disable parallax scrolling effects</p>
            </div>
            <Switch
              id="enableParallaxEffects"
              checked={formData.enableParallaxEffects}
              onCheckedChange={(checked) => handleSwitchChange("enableParallaxEffects", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="enableGradients" className="block">
                Enable Gradients
              </Label>
              <p className="text-sm text-muted-foreground">Enable or disable gradient effects</p>
            </div>
            <Switch
              id="enableGradients"
              checked={formData.enableGradients}
              onCheckedChange={(checked) => handleSwitchChange("enableGradients", checked)}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Layout Settings</h3>

        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="borderRadius">Border Radius</Label>
            <Input
              id="borderRadius"
              name="borderRadius"
              value={formData.borderRadius}
              onChange={handleChange}
              placeholder="0.5rem"
            />
            <p className="text-xs text-muted-foreground">CSS value for border radius (e.g., 0.5rem, 8px)</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Custom CSS</h3>

        <div className="grid gap-2">
          <Label htmlFor="customCss">Custom CSS</Label>
          <textarea
            id="customCss"
            name="customCss"
            value={formData.customCss}
            onChange={handleChange}
            rows={6}
            className="min-h-[150px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 font-mono"
            placeholder=".custom-class { color: red; }"
          />
          <p className="text-xs text-muted-foreground">Add custom CSS to override default styles</p>
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
