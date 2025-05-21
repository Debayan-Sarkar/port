"use client"

import type React from "react"

import { useState } from "react"
import {
  type InstagramPost,
  updateInstagramPost,
  deleteInstagramPost,
  publishInstagramPost,
  createInstagramPost,
} from "@/app/actions/social-media"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Heart, MessageCircle, Trash2, Edit, Eye, Plus, Calendar, MoreVertical } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Image from "next/image"
import { toast } from "@/hooks/use-toast"

interface InstagramFeedProps {
  initialPosts: InstagramPost[]
  onPostsChange: (posts: InstagramPost[]) => void
}

export function InstagramFeed({ initialPosts, onPostsChange }: InstagramFeedProps) {
  const [posts, setPosts] = useState<InstagramPost[]>(initialPosts)
  const [activeTab, setActiveTab] = useState<"published" | "drafts">("published")
  const [isCreating, setIsCreating] = useState(false)
  const [isEditing, setIsEditing] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const publishedPosts = posts.filter((post) => post.isPublished)
  const draftPosts = posts.filter((post) => !post.isPublished)

  // Handle post update
  const handleUpdatePost = async (updatedPost: InstagramPost) => {
    setIsLoading(true)

    try {
      const { success, message } = await updateInstagramPost(updatedPost)

      if (success) {
        const updatedPosts = posts.map((post) => (post.id === updatedPost.id ? updatedPost : post))
        setPosts(updatedPosts)
        onPostsChange(updatedPosts)
        toast({ title: "Success", description: message })
        setIsEditing(null)
      } else {
        toast({ title: "Error", description: message, variant: "destructive" })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Handle post deletion
  const handleDeletePost = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post? This action cannot be undone.")) {
      return
    }

    setIsLoading(true)

    try {
      const { success, message } = await deleteInstagramPost(id)

      if (success) {
        const updatedPosts = posts.filter((post) => post.id !== id)
        setPosts(updatedPosts)
        onPostsChange(updatedPosts)
        toast({ title: "Success", description: message })
      } else {
        toast({ title: "Error", description: message, variant: "destructive" })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Handle post publication
  const handlePublishPost = async (id: string) => {
    setIsLoading(true)

    try {
      const { success, message } = await publishInstagramPost(id)

      if (success) {
        const updatedPosts = posts.map((post) =>
          post.id === id ? { ...post, isPublished: true, date: "Just now" } : post,
        )
        setPosts(updatedPosts)
        onPostsChange(updatedPosts)
        toast({ title: "Success", description: message })
      } else {
        toast({ title: "Error", description: message, variant: "destructive" })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Handle post creation
  const handleCreatePost = async (newPost: Omit<InstagramPost, "id">) => {
    setIsLoading(true)

    try {
      const { success, post, message } = await createInstagramPost(newPost)

      if (success && post) {
        const updatedPosts = [post, ...posts]
        setPosts(updatedPosts)
        onPostsChange(updatedPosts)
        toast({ title: "Success", description: message })
        setIsCreating(false)
      } else {
        toast({ title: "Error", description: message, variant: "destructive" })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Instagram Posts</h2>
        <Button onClick={() => setIsCreating(true)}>
          <Plus className="h-4 w-4 mr-2" /> New Post
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "published" | "drafts")}>
        <TabsList className="grid w-[400px] grid-cols-2">
          <TabsTrigger value="published">Published ({publishedPosts.length})</TabsTrigger>
          <TabsTrigger value="drafts">Drafts & Scheduled ({draftPosts.length})</TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="published" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {publishedPosts.length === 0 ? (
              <div className="col-span-full bg-gray-800 rounded-lg p-8 text-center">
                <p className="text-gray-400">No published posts yet. Create a new post to get started.</p>
              </div>
            ) : (
              publishedPosts.map((post) => (
                <InstagramPostCard
                  key={post.id}
                  post={post}
                  onEdit={() => setIsEditing(post.id)}
                  onDelete={() => handleDeletePost(post.id)}
                  isLoading={isLoading}
                />
              ))
            )}
          </TabsContent>

          <TabsContent value="drafts" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {draftPosts.length === 0 ? (
              <div className="col-span-full bg-gray-800 rounded-lg p-8 text-center">
                <p className="text-gray-400">No draft posts yet. Create a new post to get started.</p>
              </div>
            ) : (
              draftPosts.map((post) => (
                <InstagramPostCard
                  key={post.id}
                  post={post}
                  onEdit={() => setIsEditing(post.id)}
                  onDelete={() => handleDeletePost(post.id)}
                  onPublish={() => handlePublishPost(post.id)}
                  isLoading={isLoading}
                />
              ))
            )}
          </TabsContent>
        </div>
      </Tabs>

      {/* Create Post Dialog */}
      <Dialog open={isCreating} onOpenChange={setIsCreating}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Instagram Post</DialogTitle>
            <DialogDescription>
              Create a new post for your Instagram feed. You can publish it immediately or save it as a draft.
            </DialogDescription>
          </DialogHeader>
          <InstagramPostForm onSubmit={handleCreatePost} onCancel={() => setIsCreating(false)} isLoading={isLoading} />
        </DialogContent>
      </Dialog>

      {/* Edit Post Dialog */}
      {isEditing && (
        <Dialog open={!!isEditing} onOpenChange={() => setIsEditing(null)}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Edit Instagram Post</DialogTitle>
              <DialogDescription>
                Make changes to your Instagram post. You can update the image, caption, or publishing status.
              </DialogDescription>
            </DialogHeader>
            <InstagramPostForm
              post={posts.find((post) => post.id === isEditing)}
              onSubmit={handleUpdatePost}
              onCancel={() => setIsEditing(null)}
              isLoading={isLoading}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

// Instagram Post Card Component
function InstagramPostCard({
  post,
  onEdit,
  onDelete,
  onPublish,
  isLoading,
}: {
  post: InstagramPost
  onEdit: () => void
  onDelete: () => void
  onPublish?: () => void
  isLoading: boolean
}) {
  return (
    <Card className="overflow-hidden bg-gray-900 border-gray-800">
      <div className="relative aspect-square">
        <Image src={post.imageUrl || "/placeholder.svg"} alt={post.caption} fill className="object-cover" />
      </div>
      <CardHeader className="p-4 pb-0">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-base line-clamp-1">{post.caption.split("#")[0]}</CardTitle>
            <CardDescription className="text-sm">{post.date}</CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" disabled={isLoading}>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onEdit}>
                <Edit className="h-4 w-4 mr-2" /> Edit
              </DropdownMenuItem>
              {!post.isPublished && onPublish && (
                <DropdownMenuItem onClick={onPublish}>
                  <Eye className="h-4 w-4 mr-2" /> Publish Now
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={onDelete} className="text-red-500">
                <Trash2 className="h-4 w-4 mr-2" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <p className="text-sm text-gray-300 line-clamp-3">{post.caption}</p>
      </CardContent>
      <CardFooter className="p-4 pt-2 flex justify-between">
        <div className="flex items-center text-gray-400 text-sm">
          <Heart className="h-4 w-4 mr-1" /> {post.likes.toLocaleString()}
        </div>
        <div className="flex items-center text-gray-400 text-sm">
          <MessageCircle className="h-4 w-4 mr-1" /> {post.comments.toLocaleString()}
        </div>
        {post.scheduledFor && (
          <div className="flex items-center text-gray-400 text-sm">
            <Calendar className="h-4 w-4 mr-1" />
            {new Date(post.scheduledFor).toLocaleDateString()}
          </div>
        )}
      </CardFooter>
    </Card>
  )
}

// Instagram Post Form Component
function InstagramPostForm({
  post,
  onSubmit,
  onCancel,
  isLoading,
}: {
  post?: InstagramPost
  onSubmit: (post: any) => void
  onCancel: () => void
  isLoading: boolean
}) {
  const [formData, setFormData] = useState<{
    caption: string
    imageUrl: string
    isPublished: boolean
    scheduledFor?: string
  }>({
    caption: post?.caption || "",
    imageUrl: post?.imageUrl || "/placeholder.svg",
    isPublished: post?.isPublished ?? false,
    scheduledFor: post?.scheduledFor || "",
  })

  const [imagePreview, setImagePreview] = useState<string>(post?.imageUrl || "/placeholder.svg")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      isPublished: checked,
      // If publishing, clear scheduled date
      scheduledFor: checked ? "" : prev.scheduledFor,
    }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setFormData((prev) => ({ ...prev, imageUrl: value }))
    setImagePreview(value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const { caption, imageUrl, isPublished, scheduledFor } = formData

    if (!caption.trim()) {
      toast({ title: "Error", description: "Caption is required", variant: "destructive" })
      return
    }

    if (!imageUrl.trim()) {
      toast({ title: "Error", description: "Image URL is required", variant: "destructive" })
      return
    }

    const newPost = {
      id: post?.id || "",
      caption,
      imageUrl,
      likes: post?.likes || 0,
      comments: post?.comments || 0,
      date: post?.date || "Just now",
      isPublished,
      scheduledFor: scheduledFor || undefined,
    }

    onSubmit(newPost)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-5 gap-4">
          <div className="col-span-2">
            <Label htmlFor="imageUrl" className="mb-2 block">
              Image URL
            </Label>
            <Input
              id="imageUrl"
              name="imageUrl"
              placeholder="URL to image"
              value={formData.imageUrl}
              onChange={handleImageChange}
              className="bg-gray-800 border-gray-700"
            />

            <div className="mt-4 relative aspect-square rounded-md overflow-hidden bg-gray-800">
              <Image src={imagePreview || "/placeholder.svg"} alt="Preview" fill className="object-cover" />
            </div>
          </div>

          <div className="col-span-3">
            <Label htmlFor="caption" className="mb-2 block">
              Caption
            </Label>
            <Textarea
              id="caption"
              name="caption"
              placeholder="Write your caption here..."
              rows={8}
              value={formData.caption}
              onChange={handleChange}
              className="bg-gray-800 border-gray-700 resize-none"
            />

            <div className="mt-4 flex space-x-2 items-center">
              <Label htmlFor="isPublished" className="text-sm">
                Publish immediately
              </Label>
              <Switch id="isPublished" checked={formData.isPublished} onCheckedChange={handleSwitchChange} />
            </div>

            {!formData.isPublished && (
              <div className="mt-4">
                <Label htmlFor="scheduledFor" className="mb-2 block text-sm">
                  Schedule for (optional)
                </Label>
                <Input
                  id="scheduledFor"
                  name="scheduledFor"
                  type="datetime-local"
                  value={formData.scheduledFor}
                  onChange={handleChange}
                  className="bg-gray-800 border-gray-700"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <DialogFooter>
        <Button variant="outline" onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : post ? "Update Post" : "Create Post"}
        </Button>
      </DialogFooter>
    </form>
  )
}
