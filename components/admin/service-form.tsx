"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Upload, X } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

interface ServiceFormProps {
  service?: any
  onClose: () => void
  onSave: (serviceData: any) => void
}

export default function ServiceForm({ service, onClose, onSave }: ServiceFormProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    title: service?.title || "",
    slug: service?.slug || "",
    description: service?.description || "",
    shortDescription: service?.shortDescription || "",
    price: service?.price || "",
    active: service?.active || false,
  })

  const [iconImage, setIconImage] = useState<File | null>(null)
  const [iconPreview, setIconPreview] = useState<string>(service?.icon || "")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Auto-generate slug from title
    if (name === "title" && !formData.slug) {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
      setFormData((prev) => ({ ...prev, slug }))
    }

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, active: checked }))
  }

  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setIconImage(file)

      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          setIconPreview(e.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) {
      newErrors.title = "Title is required"
    }

    if (!formData.slug.trim()) {
      newErrors.slug = "Slug is required"
    } else if (!/^[a-z0-9-]+$/.test(formData.slug)) {
      newErrors.slug = "Slug can only contain lowercase letters, numbers, and hyphens"
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required"
    }

    if (!formData.shortDescription.trim()) {
      newErrors.shortDescription = "Short description is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // In a real application, you would upload the icon to a storage service
      // and save the service data to a database
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call

      onSave({
        ...formData,
        icon: iconPreview,
      })

      toast({
        title: "Service saved",
        description: `${formData.title} has been successfully saved.`,
      })

      onClose()
    } catch (error) {
      console.error("Error saving service:", error)
      toast({
        title: "Error",
        description: "Failed to save service. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <Button onClick={onClose} variant="ghost" size="icon" className="rounded-full hover:bg-zinc-800">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">{service ? "Edit Service" : "Add New Service"}</h1>
        </div>

        <div className="flex space-x-2">
          <Button variant="outline" onClick={onClose} className="border-zinc-700 hover:bg-zinc-800">
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-red-500 hover:bg-red-600 text-white" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Service"}
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className={errors.title ? "text-red-400" : ""}>
                    Service Title
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter service title"
                    className={`bg-zinc-900/50 border-zinc-800 focus:border-red-500 ${
                      errors.title ? "border-red-400" : ""
                    }`}
                  />
                  {errors.title && <p className="text-sm text-red-400">{errors.title}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug" className={errors.slug ? "text-red-400" : ""}>
                    Slug/URL
                  </Label>
                  <Input
                    id="slug"
                    name="slug"
                    value={formData.slug}
                    onChange={handleInputChange}
                    placeholder="service-url-slug"
                    className={`bg-zinc-900/50 border-zinc-800 focus:border-red-500 ${
                      errors.slug ? "border-red-400" : ""
                    }`}
                  />
                  {errors.slug ? (
                    <p className="text-sm text-red-400">{errors.slug}</p>
                  ) : (
                    <p className="text-xs text-gray-400">Will be used in the URL</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="icon-image">Service Icon</Label>
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <div className="relative flex items-center justify-center border-2 border-dashed border-zinc-700 rounded-lg p-4 hover:border-red-500/50 transition-colors cursor-pointer">
                        <input
                          type="file"
                          id="icon-image"
                          onChange={handleIconChange}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          accept="image/*"
                        />
                        <div className="text-center">
                          <Upload className="mx-auto h-8 w-8 text-gray-400" />
                          <p className="mt-2 text-sm text-gray-400">Choose Icon</p>
                        </div>
                      </div>
                    </div>

                    {iconPreview && (
                      <div className="relative h-16 w-16 rounded-lg overflow-hidden bg-zinc-800">
                        <img
                          src={iconPreview || "/placeholder.svg"}
                          alt="Icon Preview"
                          className="h-full w-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => setIconPreview("")}
                          className="absolute top-1 right-1 bg-black/60 rounded-full p-1 hover:bg-red-500/80 transition-colors"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="$99 or 'Starting at $99'"
                    className="bg-zinc-900/50 border-zinc-800 focus:border-red-500"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="shortDescription" className={errors.shortDescription ? "text-red-400" : ""}>
                    Short Description
                  </Label>
                  <Textarea
                    id="shortDescription"
                    name="shortDescription"
                    value={formData.shortDescription}
                    onChange={handleInputChange}
                    placeholder="Brief description (displayed in cards)"
                    className={`h-24 bg-zinc-900/50 border-zinc-800 focus:border-red-500 ${
                      errors.shortDescription ? "border-red-400" : ""
                    }`}
                  />
                  {errors.shortDescription && <p className="text-sm text-red-400">{errors.shortDescription}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className={errors.description ? "text-red-400" : ""}>
                    Full Description
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Detailed service description"
                    className={`min-h-[150px] bg-zinc-900/50 border-zinc-800 focus:border-red-500 ${
                      errors.description ? "border-red-400" : ""
                    }`}
                  />
                  {errors.description && <p className="text-sm text-red-400">{errors.description}</p>}
                </div>

                <div className="flex items-center space-x-2 pt-4">
                  <Checkbox id="active" checked={formData.active} onCheckedChange={handleCheckboxChange} />
                  <Label
                    htmlFor="active"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Active service
                  </Label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </motion.div>
  )
}
