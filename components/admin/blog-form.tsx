"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Upload, X, Bold, Italic, Link, List, ListOrdered, ImageIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

interface BlogFormProps {
  post?: any
  onClose: () => void
  onSave: (postData: any) => void
}

export default function BlogForm({ post, onClose, onSave }: BlogFormProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    title: post?.title || "",
    slug: post?.slug || "",
    content: post?.content || "",
    excerpt: post?.excerpt || "",
    tags: post?.tags || "",
    publishDate: post?.publishDate || new Date().toISOString().split("T")[0],
    published: post?.published || false,
    featured: post?.featured || false,
  })

  const [featuredImage, setFeaturedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>(post?.image || "")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const contentRef = useRef<HTMLTextAreaElement>(null)

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

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setFeaturedImage(file)

      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          setImagePreview(e.target.result as string)
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

    if (!formData.content.trim()) {
      newErrors.content = "Content is required"
    }

    if (!formData.excerpt.trim()) {
      newErrors.excerpt = "Excerpt is required"
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
      // In a real application, you would upload the image to a storage service
      // and save the blog post data to a database
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call

      onSave({
        ...formData,
        image: imagePreview,
      })

      toast({
        title: "Blog post saved",
        description: `${formData.title} has been successfully saved.`,
      })

      onClose()
    } catch (error) {
      console.error("Error saving blog post:", error)
      toast({
        title: "Error",
        description: "Failed to save blog post. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Rich text editor functions
  const insertText = (before: string, after = "") => {
    if (!contentRef.current) return

    const textarea = contentRef.current
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = textarea.value.substring(start, end)
    const newText = textarea.value.substring(0, start) + before + selectedText + after + textarea.value.substring(end)

    setFormData((prev) => ({ ...prev, content: newText }))

    // Set cursor position after insertion
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + before.length, end + before.length)
    }, 0)
  }

  const formatBold = () => insertText("**", "**")
  const formatItalic = () => insertText("*", "*")
  const formatLink = () => insertText("[", "](url)")
  const formatList = () => insertText("\n- ")
  const formatOrderedList = () => insertText("\n1. ")
  const formatImage = () => insertText("![alt text](", ")")

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
          <h1 className="text-3xl font-bold tracking-tight">{post ? "Edit Post" : "Add New Post"}</h1>
        </div>

        <div className="flex space-x-2">
          <Button variant="outline" onClick={onClose} className="border-zinc-700 hover:bg-zinc-800">
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-red-500 hover:bg-red-600 text-white" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Post"}
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
                    Post Title
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter post title"
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
                    placeholder="post-url-slug"
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
                  <Label htmlFor="excerpt" className={errors.excerpt ? "text-red-400" : ""}>
                    Excerpt
                  </Label>
                  <Textarea
                    id="excerpt"
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleInputChange}
                    placeholder="Brief summary of the post"
                    className={`h-24 bg-zinc-900/50 border-zinc-800 focus:border-red-500 ${
                      errors.excerpt ? "border-red-400" : ""
                    }`}
                  />
                  {errors.excerpt && <p className="text-sm text-red-400">{errors.excerpt}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags</Label>
                  <Input
                    id="tags"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    placeholder="web-development, react, nextjs"
                    className="bg-zinc-900/50 border-zinc-800 focus:border-red-500"
                  />
                  <p className="text-xs text-gray-400">Separate tags with commas</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="publishDate">Publish Date</Label>
                  <Input
                    id="publishDate"
                    name="publishDate"
                    type="date"
                    value={formData.publishDate}
                    onChange={handleInputChange}
                    className="bg-zinc-900/50 border-zinc-800 focus:border-red-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="featured-image">Featured Image</Label>
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <div className="relative flex items-center justify-center border-2 border-dashed border-zinc-700 rounded-lg p-4 hover:border-red-500/50 transition-colors cursor-pointer">
                        <input
                          type="file"
                          id="featured-image"
                          onChange={handleImageChange}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          accept="image/*"
                        />
                        <div className="text-center">
                          <Upload className="mx-auto h-8 w-8 text-gray-400" />
                          <p className="mt-2 text-sm text-gray-400">Choose Image</p>
                        </div>
                      </div>
                    </div>

                    {imagePreview && (
                      <div className="relative h-24 w-24 rounded-lg overflow-hidden bg-zinc-800">
                        <img
                          src={imagePreview || "/placeholder.svg"}
                          alt="Featured Image Preview"
                          className="h-full w-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => setImagePreview("")}
                          className="absolute top-1 right-1 bg-black/60 rounded-full p-1 hover:bg-red-500/80 transition-colors"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="published"
                      checked={formData.published}
                      onCheckedChange={(checked) => handleCheckboxChange("published", checked === true)}
                    />
                    <Label htmlFor="published">Published</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="featured"
                      checked={formData.featured}
                      onCheckedChange={(checked) => handleCheckboxChange("featured", checked === true)}
                    />
                    <Label htmlFor="featured">Featured Post</Label>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="content" className={errors.content ? "text-red-400" : ""}>
                    Content (Markdown)
                  </Label>

                  <div className="flex flex-wrap gap-2 mb-2 bg-zinc-800 p-2 rounded-t-md border-b border-zinc-700">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={formatBold}
                      className="h-8 px-2 text-gray-300 hover:text-white"
                    >
                      <Bold className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={formatItalic}
                      className="h-8 px-2 text-gray-300 hover:text-white"
                    >
                      <Italic className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={formatLink}
                      className="h-8 px-2 text-gray-300 hover:text-white"
                    >
                      <Link className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={formatList}
                      className="h-8 px-2 text-gray-300 hover:text-white"
                    >
                      <List className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={formatOrderedList}
                      className="h-8 px-2 text-gray-300 hover:text-white"
                    >
                      <ListOrdered className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={formatImage}
                      className="h-8 px-2 text-gray-300 hover:text-white"
                    >
                      <ImageIcon className="h-4 w-4" />
                    </Button>
                  </div>

                  <Textarea
                    id="content"
                    name="content"
                    ref={contentRef}
                    value={formData.content}
                    onChange={handleInputChange}
                    placeholder="Write your post content in Markdown format"
                    className={`min-h-[400px] bg-zinc-900/50 border-zinc-800 focus:border-red-500 font-mono text-sm ${
                      errors.content ? "border-red-400" : ""
                    }`}
                  />
                  {errors.content && <p className="text-sm text-red-400">{errors.content}</p>}
                  <p className="text-xs text-gray-400">
                    Use Markdown for formatting. You can use the toolbar above or write Markdown directly.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </motion.div>
  )
}
