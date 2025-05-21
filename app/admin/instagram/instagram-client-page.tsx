"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import InstagramPostManager from "@/components/admin/instagram-post-manager"
import InstagramMetricsManager from "@/components/admin/instagram-metrics-manager"
import InstagramAccountManager from "@/components/admin/instagram-account-manager"
import { getInstagramPosts } from "@/app/actions/instagram"

export default function InstagramClientPage() {
  const [totalPosts, setTotalPosts] = useState(0)
  const [totalLikes, setTotalLikes] = useState(0)
  const [totalComments, setTotalComments] = useState(0)
  const [totalSaves, setTotalSaves] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadStats() {
      setIsLoading(true)
      try {
        const posts = await getInstagramPosts()

        setTotalPosts(posts.length)
        setTotalLikes(posts.reduce((sum, post) => sum + post.likes, 0))
        setTotalComments(posts.reduce((sum, post) => sum + post.comments, 0))
        setTotalSaves(posts.reduce((sum, post) => sum + post.saves, 0))
      } catch (error) {
        console.error("Error loading Instagram stats:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadStats()
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Instagram Management</h1>
        <p className="text-gray-500">
          Manage your Instagram posts, track engagement metrics, and update account settings.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? (
                <div className="h-8 w-16 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
              ) : (
                totalPosts
              )}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Likes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? (
                <div className="h-8 w-16 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
              ) : (
                totalLikes
              )}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Comments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? (
                <div className="h-8 w-16 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
              ) : (
                totalComments
              )}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Saves</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? (
                <div className="h-8 w-16 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
              ) : (
                totalSaves
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="metrics">Metrics</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>

        <TabsContent value="posts">
          <InstagramPostManager />
        </TabsContent>

        <TabsContent value="metrics">
          <InstagramMetricsManager />
        </TabsContent>

        <TabsContent value="account">
          <InstagramAccountManager />
        </TabsContent>
      </Tabs>
    </div>
  )
}
