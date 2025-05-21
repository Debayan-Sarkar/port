"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Upload, Loader2, Search, Grid, List, Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/hooks/use-toast"
import { MediaUpload } from "@/components/admin/media-upload"
import { MediaGrid } from "@/components/admin/media-grid"

// Mock data for demonstration
const MOCK_MEDIA = [
  {
    id: "1",
    name: "hero-image.jpg",
    url: "/diverse-group-celebrating.png",
    type: "image",
    size: 1024000,
    dimensions: "1920x1080",
    uploadedAt: "2023-04-15T10:30:00Z",
    tags: ["hero", "banner"],
  },
  {
    id: "2",
    name: "profile-photo.jpg",
    url: "/abstract-profile.png",
    type: "image",
    size: 512000,
    dimensions: "800x800",
    uploadedAt: "2023-04-10T14:20:00Z",
    tags: ["profile", "portrait"],
  },
  {
    id: "3",
    name: "project-thumbnail.png",
    url: "/project-management-team.png",
    type: "image",
    size: 768000,
    dimensions: "1200x800",
    uploadedAt: "2023-04-05T09:15:00Z",
    tags: ["project", "thumbnail"],
  },
  {
    id: "4",
    name: "service-icon.svg",
    url: "/generic-icon.png",
    type: "svg",
    size: 24000,
    dimensions: "64x64",
    uploadedAt: "2023-03-28T11:45:00Z",
    tags: ["icon", "service"],
  },
  {
    id: "5",
    name: "background-pattern.jpg",
    url: "/repeating-geometric-pattern.png",
    type: "image",
    size: 1536000,
    dimensions: "2400x1600",
    uploadedAt: "2023-03-20T16:30:00Z",
    tags: ["background", "pattern"],
  },
  {
    id: "6",
    name: "team-photo.jpg",
    url: "/diverse-professional-team.png",
    type: "image",
    size: 2048000,
    dimensions: "2000x1200",
    uploadedAt: "2023-03-15T13:10:00Z",
    tags: ["team", "group"],
  },
]

export default function MediaLibraryPage() {
  const [media, setMedia] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)

  useEffect(() => {
    // Simulate API call
    const loadMedia = async () => {
      setIsLoading(true)
      try {
        // In a real app, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 800))
        setMedia(MOCK_MEDIA)
      } catch (error) {
        toast({
          title: "Error loading media",
          description: "There was a problem loading the media files.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadMedia()
  }, [])

  const handleUpload = async (files: File[]) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Create new media items from the uploaded files
      const newMediaItems = files.map((file) => ({
        id: Math.random().toString(36).substring(2, 9),
        name: file.name,
        url: URL.createObjectURL(file),
        type: file.type.split("/")[0],
        size: file.size,
        dimensions: "1200x800", // This would be determined server-side
        uploadedAt: new Date().toISOString(),
        tags: [],
      }))

      setMedia([...newMediaItems, ...media])
      setIsUploadModalOpen(false)

      toast({
        title: "Files uploaded",
        description: `Successfully uploaded ${files.length} file(s).`,
      })
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "There was a problem uploading your files.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this file?")) return

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800))
      setMedia(media.filter((item) => item.id !== id))
      toast({
        title: "File deleted",
        description: "The file has been deleted successfully.",
      })
    } catch (error) {
      toast({
        title: "Error deleting file",
        description: "There was a problem deleting the file.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Filter media based on search query and selected type
  const filteredMedia = media.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.tags && item.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())))
    const matchesType = selectedType === "all" || item.type === selectedType
    return matchesSearch && matchesType
  })

  // Get unique media types for filtering
  const mediaTypes = ["all", ...Array.from(new Set(media.map((item) => item.type)))]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <motion.h1
          className="text-3xl font-bold"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          Media Library
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Button onClick={() => setIsUploadModalOpen(true)} className="w-full sm:w-auto">
            <Upload className="mr-2 h-4 w-4" /> Upload Files
          </Button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-4"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-800 border-gray-700"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2">
                <X className="h-4 w-4 text-gray-400 hover:text-white" />
              </button>
            )}
          </div>
          <div className="flex gap-2">
            <Tabs value={selectedType} onValueChange={setSelectedType} className="w-full sm:w-auto">
              <TabsList className="bg-gray-800">
                {mediaTypes.map((type) => (
                  <TabsTrigger key={type} value={type} className="capitalize">
                    {type}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
            <div className="flex bg-gray-800 rounded-md">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("grid")}
                className="rounded-r-none"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("list")}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-red-500" />
          </div>
        ) : (
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-6">
              {filteredMedia.length === 0 ? (
                <div className="text-center py-12">
                  <div className="mx-auto w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center mb-4">
                    <Filter className="h-6 w-6 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium">No files found</h3>
                  <p className="text-gray-400 mt-1">
                    {searchQuery ? "Try adjusting your search or filters" : "Upload some files to get started"}
                  </p>
                  <Button onClick={() => setIsUploadModalOpen(true)} variant="outline" className="mt-4">
                    <Upload className="mr-2 h-4 w-4" /> Upload Files
                  </Button>
                </div>
              ) : (
                <MediaGrid media={filteredMedia} viewMode={viewMode} onDelete={handleDelete} />
              )}
            </CardContent>
          </Card>
        )}
      </motion.div>

      <MediaUpload
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={handleUpload}
        isLoading={isLoading}
      />
    </div>
  )
}
