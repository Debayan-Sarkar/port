"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import { ColorPicker } from "./color-picker"

export default function NewsletterForm() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "Join Our Newsletter",
    description: "Stay updated with our latest news and updates. No spam, we promise!",
    buttonText: "Subscribe",
    successMessage: "Thank you for subscribing to our newsletter!",
    backgroundColor: "#f8fafc",
    accentColor: "#3b82f6",
    textColor: "#1e293b",
    enableDoubleOptIn: true,
    enableWelcomeEmail: true,
    mailchimpApiKey: "",
    mailchimpListId: "",
    sendgridApiKey: "",
    sendgridListId: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
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
      title: "Settings saved",
      description: "Your newsletter settings have been saved successfully.",
    })

    setIsLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Display Settings</h3>

        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Newsletter Title</Label>
            <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="buttonText">Button Text</Label>
            <Input id="buttonText" name="buttonText" value={formData.buttonText} onChange={handleChange} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="successMessage">Success Message</Label>
            <Textarea
              id="successMessage"
              name="successMessage"
              value={formData.successMessage}
              onChange={handleChange}
              rows={2}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Color Settings</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <Label className="block mb-2">Background Color</Label>
            <ColorPicker
              color={formData.backgroundColor}
              onChange={(color) => handleColorChange("backgroundColor", color)}
            />
          </div>

          <div>
            <Label className="block mb-2">Accent Color</Label>
            <ColorPicker color={formData.accentColor} onChange={(color) => handleColorChange("accentColor", color)} />
          </div>

          <div>
            <Label className="block mb-2">Text Color</Label>
            <ColorPicker color={formData.textColor} onChange={(color) => handleColorChange("textColor", color)} />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Behavior Settings</h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="enableDoubleOptIn" className="block">
                Enable Double Opt-in
              </Label>
              <p className="text-sm text-muted-foreground">Subscribers will need to confirm their email address</p>
            </div>
            <Switch
              id="enableDoubleOptIn"
              checked={formData.enableDoubleOptIn}
              onCheckedChange={(checked) => handleSwitchChange("enableDoubleOptIn", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="enableWelcomeEmail" className="block">
                Send Welcome Email
              </Label>
              <p className="text-sm text-muted-foreground">Send an automated welcome email to new subscribers</p>
            </div>
            <Switch
              id="enableWelcomeEmail"
              checked={formData.enableWelcomeEmail}
              onCheckedChange={(checked) => handleSwitchChange("enableWelcomeEmail", checked)}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Integration Settings</h3>

        <div className="space-y-6">
          <div className="space-y-4 border p-4 rounded-md">
            <h4 className="font-medium">Mailchimp Integration</h4>

            <div className="grid gap-2">
              <Label htmlFor="mailchimpApiKey">Mailchimp API Key</Label>
              <Input
                id="mailchimpApiKey"
                name="mailchimpApiKey"
                value={formData.mailchimpApiKey}
                onChange={handleChange}
                type="password"
                placeholder="Enter your Mailchimp API key"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="mailchimpListId">Mailchimp List ID</Label>
              <Input
                id="mailchimpListId"
                name="mailchimpListId"
                value={formData.mailchimpListId}
                onChange={handleChange}
                placeholder="Enter your Mailchimp List ID"
              />
            </div>
          </div>

          <div className="space-y-4 border p-4 rounded-md">
            <h4 className="font-medium">SendGrid Integration</h4>

            <div className="grid gap-2">
              <Label htmlFor="sendgridApiKey">SendGrid API Key</Label>
              <Input
                id="sendgridApiKey"
                name="sendgridApiKey"
                value={formData.sendgridApiKey}
                onChange={handleChange}
                type="password"
                placeholder="Enter your SendGrid API key"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="sendgridListId">SendGrid List ID</Label>
              <Input
                id="sendgridListId"
                name="sendgridListId"
                value={formData.sendgridListId}
                onChange={handleChange}
                placeholder="Enter your SendGrid List ID"
              />
            </div>
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
