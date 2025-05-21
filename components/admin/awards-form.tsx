"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Trash2, Save, Loader2, Upload, Award, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"

interface AwardsFormProps {
  initialData?: any
  onSave: (data: any) => void
  onDelete?: () => void
  isLoading?: boolean
}

export function AwardsForm({ initialData, onSave, onDelete, isLoading = false }: AwardsFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    organization: "",
    date: "",
    description: "",
    imageUrl: "",
    category: "professional",
    featured: false,
  })
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
      setPreviewImage(initialData.imageUrl || null)
    } else {
      setFormData({
        title: "",
        organization: "",
        date: "",
        description: "",
        imageUrl: "",
        category: "professional",
        featured: false,
      })
      setPreviewImage(null)
    }
  }, [initialData])

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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real app, you would upload the file to a server and get a URL back
      // For this demo, we'll create a local object URL
      const objectUrl = URL.createObjectURL(file)
      setPreviewImage(objectUrl)
      setFormData((prev) => ({ ...prev, imageUrl: objectUrl }))
    }
  }

  const handleRemoveImage = () => {
    setPreviewImage(null)
    setFormData((prev) => ({ ...prev, imageUrl: "" }))
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <h2 className="text-xl font-semibold mb-4">{initialData ? "Edit Award" : "Add New Award"}</h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="space-y-4"
      >
        <div>
          <Label htmlFor="title">Award Title</Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter the award title"
            className="bg-gray-800 border-gray-700"
            required
          />
        </div>

        <div>
          <Label htmlFor="organization">Organization</Label>
          <Input
            id="organization"
            name="organization"
            value={formData.organization}
            onChange={handleChange}
            placeholder="Enter the awarding organization"
            className="bg-gray-800 border-gray-700"
            required
          />
        </div>

        <div>
          <Label htmlFor="date">Date Received</Label>
          <Input
            id="date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            className="bg-gray-800 border-gray-700"
            required
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter a description of the award"
            className="bg-gray-800 border-gray-700 min-h-[100px]"
            required
          />
        </div>

        <div>
          <Label htmlFor="category">Category</Label>
          <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
            <SelectTrigger className="bg-gray-800 border-gray-700">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="professional">Professional</SelectItem>
              <SelectItem value="academic">Academic</SelectItem>
              <SelectItem value="innovation">Innovation</SelectItem>
              <SelectItem value="design">Design</SelectItem>
              <SelectItem value="community">Community</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="image">Award Image</Label>
          <div className="mt-2 flex items-center gap-4">
            <div className="relative h-24 w-24 rounded-md overflow-hidden bg-gray-800 flex items-center justify-center">
              {previewImage ? (
                <Image src={previewImage || "/placeholder.svg"} alt="Award preview" fill className="object-cover" />
              ) : (
                <Award className="h-8 w-8 text-gray-400" />
              )}
            </div>
            <div className="flex flex-col gap-2">
              <input
                ref={fileInputRef}
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="bg-gray-800 border-gray-700"
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload Image
              </Button>
              {previewImage && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleRemoveImage}
                  className="bg-gray-800 border-gray-700"
                >
                  <X className="h-4 w-4 mr-2" />
                  Remove Image
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="featured"
            checked={formData.featured}
            onCheckedChange={(checked) => handleSwitchChange("featured", checked)}
          />
          <Label htmlFor="featured">Featured Award</Label>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="flex flex-col sm:flex-row justify-between gap-4"
      >
        <div className="flex-1">
          {onDelete && (
            <Button type="button" variant="destructive" onClick={onDelete} disabled={isLoading} className="w-full">
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Trash2 className="h-4 w-4 mr-2" />}
              Delete Award
            </Button>
          )}
        </div>
        <div className="flex-1">
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
            {initialData ? "Update Award" : "Save Award"}
          </Button>
        </div>
      </motion.div>
    </form>
  )
}
