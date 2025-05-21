"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Heart, MessageCircle, Bookmark } from "lucide-react"
import { getInstagramPosts } from "@/app/actions/instagram"
import type { InstagramPost } from "@/app/actions/instagram"

interface CompanyInstagramFeedProps {
  limit?: number
}

export default function CompanyInstagramFeed({ limit = 6 }: CompanyInstagramFeedProps) {
  const [posts, setPosts] = useState<InstagramPost[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadPosts() {
      setIsLoading(true)
      try {
        const postsData = await getInstagramPosts()
        setPosts(postsData.slice(0, limit))
      } catch (error) {
        console.error("Error loading Instagram posts:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadPosts()
  }, [limit])

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {Array.from({ length: limit }).map((_, index) => (
          <div key={index} className="aspect-square bg-gray-200 dark:bg-gray-800 rounded-md animate-pulse"></div>
        ))}
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No Instagram posts found</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {posts.map((post) => (
        <div key={post.id} className="group relative aspect-square overflow-hidden rounded-md">
          <Image
            src={post.image || "/placeholder.svg"}
            alt={post.caption}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100">
            <p className="text-white text-sm font-medium mb-2">@{post.username}</p>
            <div className="flex items-center space-x-4 text-white">
              <div className="flex items-center">
                <Heart className="h-5 w-5 mr-1" />
                <span>{post.likes}</span>
              </div>
              <div className="flex items-center">
                <MessageCircle className="h-5 w-5 mr-1" />
                <span>{post.comments}</span>
              </div>
              <div className="flex items-center">
                <Bookmark className="h-5 w-5 mr-1" />
                <span>{post.saves}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
