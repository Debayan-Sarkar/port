"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Pencil, Trash2, Plus, Heart, MessageCircle, Bookmark, RefreshCw, User } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import NextImage from "next/image"
import {
  getInstagramPosts,
  createInstagramPost,
  updateInstagramPost,
  deleteInstagramPost,
  updateInstagramUsername,
  type InstagramPost,
} from "@/app/actions/instagram"

export default function InstagramPostManager() {
  const [posts, setPosts] = useState<InstagramPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [editingPost, setEditingPost] = useState<InstagramPost | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isUsernameDialogOpen, setIsUsernameDialogOpen] = useState(false)
  const [newUsername, setNewUsername] = useState("")
  const [currentUsername, setCurrentUsername] = useState("")
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    loadPosts()
  }, [])

  async function loadPosts() {
    setIsLoading(true)
    try {
      const postsData = await getInstagramPosts()
      setPosts(postsData)

      // Set current username if posts exist
      if (postsData.length > 0) {
        setCurrentUsername(postsData[0].username)
      }
    } catch (error) {
      console.error("Error loading posts:", error)
      toast({
        title: "Error",
        description: "Failed to load Instagram posts",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, isEdit = false) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCreateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData(e.currentTarget)
      const result = await createInstagramPost(formData)

      if (result.success) {
        toast({
          title: "Success",
          description: "Instagram post created successfully",
        })
        setIsCreateDialogOpen(false)
        setImagePreview(null)
        loadPosts()
      } else {
        throw new Error(result.error)
      }
    } catch (error: any) {
      console.error("Error creating post:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to create Instagram post",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData(e.currentTarget)
      const result = await updateInstagramPost(formData)

      if (result.success) {
        toast({
          title: "Success",
          description: "Instagram post updated successfully",
        })
        setIsEditDialogOpen(false)
        setEditingPost(null)
        setImagePreview(null)
        loadPosts()
      } else {
        throw new Error(result.error)
      }
    } catch (error: any) {
      console.error("Error updating post:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to update Instagram post",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return

    try {
      const result = await deleteInstagramPost(id)

      if (result.success) {
        toast({
          title: "Success",
          description: "Instagram post deleted successfully",
        })
        loadPosts()
      } else {
        throw new Error(result.error)
      }
    } catch (error: any) {
      console.error("Error deleting post:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to delete Instagram post",
        variant: "destructive",
      })
    }
  }

  const handleUsernameChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      if (!currentUsername || !newUsername) {
        throw new Error("Username cannot be empty")
      }

      const result = await updateInstagramUsername(currentUsername, newUsername)

      if (result.success) {
        toast({
          title: "Success",
          description: result.message || "Username updated successfully",
        })
        setIsUsernameDialogOpen(false)
        setCurrentUsername(newUsername)
        setNewUsername("")
        loadPosts()
      } else {
        throw new Error(result.error)
      }
    } catch (error: any) {
      console.error("Error updating username:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to update username",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Instagram Posts</h2>
        <div className="flex gap-2">
          <Dialog open={isUsernameDialogOpen} onOpenChange={setIsUsernameDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <User className="mr-2 h-4 w-4" />
                Change Username
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Change Instagram Username</DialogTitle>
                <DialogDescription>This will update the username for all Instagram posts.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleUsernameChange}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="current-username">Current Username</Label>
                    <Input id="current-username" value={currentUsername} readOnly />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="new-username">New Username</Label>
                    <Input
                      id="new-username"
                      name="new-username"
                      value={newUsername}
                      onChange={(e) => setNewUsername(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsUsernameDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      "Update Username"
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Post
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add New Instagram Post</DialogTitle>
                <DialogDescription>Create a new post for your Instagram feed.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreateSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" name="username" defaultValue={currentUsername} required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="caption">Caption</Label>
                    <Textarea id="caption" name="caption" rows={3} required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="image">Image</Label>
                    <div className="flex items-center gap-4">
                      <Input
                        id="image"
                        name="image"
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e)}
                        required
                      />
                    </div>
                    {imagePreview && (
                      <div className="mt-2">
                        <p className="text-sm text-gray-500 mb-1">Preview:</p>
                        <div className="relative h-48 w-full overflow-hidden rounded-md">
                          <NextImage
                            src={imagePreview || "/placeholder.svg"}
                            alt="Preview"
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsCreateDialogOpen(false)
                      setImagePreview(null)
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      "Create Post"
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="grid" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="grid">Grid View</TabsTrigger>
          <TabsTrigger value="table">Table View</TabsTrigger>
        </TabsList>

        <TabsContent value="grid">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="animate-pulse">
                  <div className="h-64 bg-gray-200 dark:bg-gray-800"></div>
                  <CardContent className="p-4">
                    <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : posts.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-lg text-gray-500 mb-4">No Instagram posts found</p>
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Post
              </Button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Card key={post.id} className="overflow-hidden">
                  <div className="relative h-64 w-full">
                    <NextImage
                      src={post.image || "/placeholder.svg"}
                      alt={post.caption}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <p className="font-medium">@{post.username}</p>
                      <p className="text-sm text-gray-500">{new Date(post.date).toLocaleDateString()}</p>
                    </div>
                    <p className="text-sm line-clamp-2">{post.caption}</p>
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center">
                          <Heart className="h-4 w-4 mr-1" />
                          <span className="text-sm">{post.likes}</span>
                        </div>
                        <div className="flex items-center">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          <span className="text-sm">{post.comments}</span>
                        </div>
                        <div className="flex items-center">
                          <Bookmark className="h-4 w-4 mr-1" />
                          <span className="text-sm">{post.saves}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditingPost(post)
                        setIsEditDialogOpen(true)
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(post.id)}>
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="table">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableCaption>
                  {isLoading
                    ? "Loading Instagram posts..."
                    : posts.length === 0
                      ? "No Instagram posts found"
                      : `A list of your Instagram posts (${posts.length} total)`}
                </TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Username</TableHead>
                    <TableHead>Caption</TableHead>
                    <TableHead className="text-center">Likes</TableHead>
                    <TableHead className="text-center">Comments</TableHead>
                    <TableHead className="text-center">Saves</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    [1, 2, 3, 4, 5].map((i) => (
                      <TableRow key={i} className="animate-pulse">
                        <TableCell>
                          <div className="h-12 w-12 bg-gray-200 dark:bg-gray-800 rounded"></div>
                        </TableCell>
                        <TableCell>
                          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-24"></div>
                        </TableCell>
                        <TableCell>
                          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-48"></div>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-8 mx-auto"></div>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-8 mx-auto"></div>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-8 mx-auto"></div>
                        </TableCell>
                        <TableCell>
                          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-24"></div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-20 ml-auto"></div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : posts.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8">
                        <p className="text-lg text-gray-500 mb-4">No Instagram posts found</p>
                        <Button onClick={() => setIsCreateDialogOpen(true)}>
                          <Plus className="mr-2 h-4 w-4" />
                          Add Your First Post
                        </Button>
                      </TableCell>
                    </TableRow>
                  ) : (
                    posts.map((post) => (
                      <TableRow key={post.id}>
                        <TableCell>
                          <div className="relative h-12 w-12 rounded overflow-hidden">
                            <NextImage
                              src={post.image || "/placeholder.svg"}
                              alt={post.caption}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </TableCell>
                        <TableCell>@{post.username}</TableCell>
                        <TableCell className="max-w-xs truncate">{post.caption}</TableCell>
                        <TableCell className="text-center">{post.likes}</TableCell>
                        <TableCell className="text-center">{post.comments}</TableCell>
                        <TableCell className="text-center">{post.saves}</TableCell>
                        <TableCell>{new Date(post.date).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setEditingPost(post)
                                setIsEditDialogOpen(true)
                              }}
                            >
                              <Pencil className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleDelete(post.id)}>
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Instagram Post</DialogTitle>
            <DialogDescription>Make changes to your Instagram post.</DialogDescription>
          </DialogHeader>
          {editingPost && (
            <form onSubmit={handleEditSubmit}>
              <input type="hidden" name="id" value={editingPost.id} />
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-username">Username</Label>
                  <Input id="edit-username" name="username" defaultValue={editingPost.username} required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-caption">Caption</Label>
                  <Textarea id="edit-caption" name="caption" rows={3} defaultValue={editingPost.caption} required />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-likes">Likes</Label>
                    <Input
                      id="edit-likes"
                      name="likes"
                      type="number"
                      min="0"
                      defaultValue={editingPost.likes}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-comments">Comments</Label>
                    <Input
                      id="edit-comments"
                      name="comments"
                      type="number"
                      min="0"
                      defaultValue={editingPost.comments}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-saves">Saves</Label>
                    <Input
                      id="edit-saves"
                      name="saves"
                      type="number"
                      min="0"
                      defaultValue={editingPost.saves}
                      required
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-image">Image (Optional)</Label>
                  <div className="flex items-center gap-4">
                    <Input
                      id="edit-image"
                      name="image"
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, true)}
                    />
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 mb-1">Current Image:</p>
                    <div className="relative h-48 w-full overflow-hidden rounded-md">
                      <NextImage src={imagePreview || editingPost.image} alt="Preview" fill className="object-cover" />
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsEditDialogOpen(false)
                    setEditingPost(null)
                    setImagePreview(null)
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
