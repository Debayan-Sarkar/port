"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Upload, X, ImageIcon, LinkIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface ProjectFormProps {
  project?: any
  onClose: () => void
  onSave: (projectData: any) => void
}

export function ProjectForm({ project, onClose, onSave }: ProjectFormProps) {
  const [formData, setFormData] = useState({
    title: project?.title || "",
    slug: project?.slug || "",
    description: project?.description || "",
    categories: project?.categories || "",
    demoLink: project?.demoLink || "",
    sourceLink: project?.sourceLink || "",
    published: project?.published || false,
    metaDescription: project?.metaDescription || "",
  })

  const [featuredImage, setFeaturedImage] = useState<string | null>(project?.image || null)
  const [galleryImages, setGalleryImages] = useState<string[]>(project?.gallery || [])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const featuredImageRef = useRef<HTMLInputElement>(null)
  const galleryImagesRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })

    // Auto-generate slug from title
    if (name === "title" && !project) {
      setFormData((prev) => ({
        ...prev,
        slug: value
          .toLowerCase()
          .replace(/[^\w\s]/gi, "")
          .replace(/\s+/g, "-"),
      }))
    }

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleFeaturedImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setFeaturedImage(event.target?.result as string)
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const handleGalleryImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages: string[] = []

      Array.from(e.target.files).forEach((file) => {
        const reader = new FileReader()
        reader.onload = (event) => {
          if (event.target?.result) {
            newImages.push(event.target.result as string)
            if (newImages.length === e.target.files!.length) {
              setGalleryImages((prev) => [...prev, ...newImages])
            }
          }
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const removeGalleryImage = (index: number) => {
    setGalleryImages((prev) => prev.filter((_, i) => i !== index))
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

    if (!featuredImage) {
      newErrors.featuredImage = "Featured image is required"
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required"
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
      // In a real application, you would upload images to a storage service
      // and save the project data to a database
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call

      onSave({
        ...formData,
        featuredImage,
        galleryImages,
      })
    } catch (error) {
      console.error("Error saving project:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <Button onClick={onClose} variant="ghost" size="icon" className="rounded-full hover:bg-zinc-800">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">{project ? "Edit Project" : "Add New Project"}</h1>
        </div>

        <div className="flex space-x-2">
          <Button variant="outline" onClick={onClose} className="border-zinc-700 hover:bg-zinc-800">
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-red-500 hover:bg-red-600 text-white" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Project"}
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
                    Project Title
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter project title"
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
                    onChange={handleChange}
                    placeholder="project-url-slug"
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
                  <Label htmlFor="featured-image" className={errors.featuredImage ? "text-red-400" : ""}>
                    Featured Image
                  </Label>
                  <div className="flex flex-col space-y-4">
                    <div className="relative flex items-center justify-center border-2 border-dashed border-zinc-700 rounded-lg p-4 hover:border-red-500/50 transition-colors cursor-pointer">
                      <input
                        type="file"
                        id="featured-image"
                        ref={featuredImageRef}
                        onChange={handleFeaturedImageChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        accept="image/*"
                      />
                      <div className="text-center">
                        <Upload className="mx-auto h-8 w-8 text-gray-400" />
                        <p className="mt-2 text-sm text-gray-400">Choose Featured Image</p>
                      </div>
                    </div>

                    {featuredImage && (
                      <div className="relative rounded-lg overflow-hidden bg-zinc-800 h-40">
                        <img
                          src={featuredImage || "/placeholder.svg"}
                          alt="Featured Preview"
                          className="h-full w-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => setFeaturedImage(null)}
                          className="absolute top-2 right-2 bg-black/60 rounded-full p-1 hover:bg-red-500/80 transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                    {errors.featuredImage && <p className="text-sm text-red-400">{errors.featuredImage}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="categories">Categories</Label>
                  <Input
                    id="categories"
                    name="categories"
                    value={formData.categories}
                    onChange={handleChange}
                    placeholder="web, design, react"
                    className="bg-zinc-900/50 border-zinc-800 focus:border-red-500"
                  />
                  <p className="text-xs text-gray-400">Enter comma-separated categories</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="description" className={errors.description ? "text-red-400" : ""}>
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Project description"
                    className={`min-h-[150px] bg-zinc-900/50 border-zinc-800 focus:border-red-500 ${
                      errors.description ? "border-red-400" : ""
                    }`}
                  />
                  {errors.description && <p className="text-sm text-red-400">{errors.description}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gallery-images">Gallery/Additional Images</Label>
                  <div className="relative flex items-center justify-center border-2 border-dashed border-zinc-700 rounded-lg p-4 hover:border-red-500/50 transition-colors cursor-pointer">
                    <input
                      type="file"
                      id="gallery-images"
                      ref={galleryImagesRef}
                      onChange={handleGalleryImagesChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      accept="image/*"
                      multiple
                    />
                    <div className="text-center">
                      <ImageIcon className="mx-auto h-8 w-8 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-400">Choose Gallery Images</p>
                      <p className="text-xs text-gray-500">Allows multiple image selection</p>
                    </div>
                  </div>

                  {galleryImages.length > 0 && (
                    <div className="grid grid-cols-3 gap-2 mt-4">
                      {galleryImages.map((image, index) => (
                        <div key={index} className="relative rounded-lg overflow-hidden bg-zinc-800 h-20">
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`Gallery ${index + 1}`}
                            className="h-full w-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => removeGalleryImage(index)}
                            className="absolute top-1 right-1 bg-black/60 rounded-full p-1 hover:bg-red-500/80 transition-colors"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="demoLink">Live Demo Link (Optional)</Label>
                    <div className="relative">
                      <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="demoLink"
                        name="demoLink"
                        value={formData.demoLink}
                        onChange={handleChange}
                        placeholder="https://demo.example.com"
                        className="pl-10 bg-zinc-900/50 border-zinc-800 focus:border-red-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sourceLink">Source Code Link (Optional)</Label>
                    <div className="relative">
                      <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="sourceLink"
                        name="sourceLink"
                        value={formData.sourceLink}
                        onChange={handleChange}
                        placeholder="https://github.com/username/repo"
                        className="pl-10 bg-zinc-900/50 border-zinc-800 focus:border-red-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="metaDescription">Meta Description (SEO)</Label>
                  <Textarea
                    id="metaDescription"
                    name="metaDescription"
                    value={formData.metaDescription}
                    onChange={handleChange}
                    placeholder="Brief description for search engines"
                    className="h-20 bg-zinc-900/50 border-zinc-800 focus:border-red-500"
                  />
                </div>

                <div className="flex items-center space-x-2 pt-4">
                  <Checkbox
                    id="published"
                    checked={formData.published}
                    onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, published: checked as boolean }))}
                  />
                  <Label
                    htmlFor="published"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Publish project
                  </Label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}
