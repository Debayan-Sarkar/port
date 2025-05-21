"use client"

import { useState } from "react"
import { type InstagramPost, publishInstagramPost } from "@/app/actions/social-media"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Eye, EyeOff, CalendarIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/hooks/use-toast"
import Image from "next/image"

interface SocialMediaSchedulerProps {
  posts: InstagramPost[]
  onPostsChange: (posts: InstagramPost[]) => void
}

export function SocialMediaScheduler({ posts, onPostsChange }: SocialMediaSchedulerProps) {
  const [isLoading, setIsLoading] = useState(false)

  // Filter scheduled posts
  const scheduledPosts = posts
    .filter((post) => !post.isPublished && post.scheduledFor)
    .sort((a, b) => new Date(a.scheduledFor!).getTime() - new Date(b.scheduledFor!).getTime())

  // Filter drafts without schedule
  const drafts = posts.filter((post) => !post.isPublished && !post.scheduledFor)

  const handlePublishNow = async (id: string) => {
    setIsLoading(true)

    try {
      const { success, message } = await publishInstagramPost(id)

      if (success) {
        const updatedPosts = posts.map((post) =>
          post.id === id ? { ...post, isPublished: true, date: "Just now", scheduledFor: undefined } : post,
        )
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

  const formatScheduledDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  const isScheduledForToday = (dateString: string) => {
    const date = new Date(dateString)
    const today = new Date()
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Content Calendar</h2>

      {scheduledPosts.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-medium flex items-center">
            <Calendar className="h-5 w-5 mr-2" /> Scheduled Posts
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {scheduledPosts.map((post) => (
              <Card key={post.id} className="bg-gray-900 border-gray-800 overflow-hidden">
                <div className="flex">
                  <div className="w-24 h-24 relative">
                    <Image src={post.imageUrl || "/placeholder.svg"} alt={post.caption} fill className="object-cover" />
                  </div>
                  <div className="flex-1 p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium line-clamp-1">{post.caption.split("#")[0]}</p>
                        <div className="flex items-center mt-1 text-gray-400 text-sm">
                          <CalendarIcon className="h-3 w-3 mr-1" />
                          {formatScheduledDate(post.scheduledFor!)}
                          {isScheduledForToday(post.scheduledFor!) && (
                            <Badge className="ml-2 bg-yellow-500/20 text-yellow-400 text-xs" variant="outline">
                              Today
                            </Badge>
                          )}
                        </div>
                      </div>
                      <Button size="sm" onClick={() => handlePublishNow(post.id)} disabled={isLoading}>
                        <Eye className="h-3 w-3 mr-1" /> Publish Now
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {drafts.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-medium flex items-center">
            <EyeOff className="h-5 w-5 mr-2" /> Drafts
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {drafts.map((post) => (
              <Card key={post.id} className="bg-gray-900 border-gray-800 overflow-hidden">
                <div className="flex">
                  <div className="w-24 h-24 relative">
                    <Image src={post.imageUrl || "/placeholder.svg"} alt={post.caption} fill className="object-cover" />
                  </div>
                  <div className="flex-1 p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium line-clamp-1">{post.caption.split("#")[0]}</p>
                        <p className="text-gray-400 text-sm mt-1">Draft - Not scheduled</p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handlePublishNow(post.id)}
                        disabled={isLoading}
                      >
                        <Eye className="h-3 w-3 mr-1" /> Publish Now
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {scheduledPosts.length === 0 && drafts.length === 0 && (
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="p-4 bg-gray-800 rounded-full mb-4">
              <Calendar className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-medium mb-2">No scheduled content</h3>
            <p className="text-gray-400 text-center max-w-md">
              You don't have any scheduled posts or drafts. Create new posts and schedule them for future publication.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
