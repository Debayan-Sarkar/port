"use client"

import type { InstagramPost } from "@/app/actions/social-media"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
} from "recharts"
import { Heart, MessageCircle, Users, Activity } from "lucide-react"

interface SocialMediaStatsProps {
  posts: InstagramPost[]
}

export function SocialMediaStats({ posts }: SocialMediaStatsProps) {
  // Calculate total metrics
  const totalLikes = posts.reduce((sum, post) => sum + post.likes, 0)
  const totalComments = posts.reduce((sum, post) => sum + post.comments, 0)
  const publishedPostsCount = posts.filter((post) => post.isPublished).length
  const avgEngagement = publishedPostsCount > 0 ? ((totalLikes + totalComments) / publishedPostsCount).toFixed(0) : 0

  // Format posts data for charts
  const engagementData = posts
    .filter((post) => post.isPublished)
    .slice(0, 10)
    .map((post) => ({
      name: post.caption.split(" ").slice(0, 2).join(" ") + "...",
      likes: post.likes,
      comments: post.comments,
      total: post.likes + post.comments,
    }))
    .sort((a, b) => b.total - a.total)

  // Generate growth data (this would be real data in a production app)
  const growthData = Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
    followers: 1000 + Math.floor(Math.random() * 100) + i * 10,
    engagement: 30 + Math.floor(Math.random() * 10) + i * 0.5,
  }))

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Instagram Analytics</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-400">Total Likes</p>
                <p className="text-3xl font-bold mt-1">{totalLikes.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-red-500/10 rounded-full">
                <Heart className="h-6 w-6 text-red-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-400">Total Comments</p>
                <p className="text-3xl font-bold mt-1">{totalComments.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-blue-500/10 rounded-full">
                <MessageCircle className="h-6 w-6 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-400">Avg. Engagement</p>
                <p className="text-3xl font-bold mt-1">{avgEngagement}</p>
              </div>
              <div className="p-3 bg-green-500/10 rounded-full">
                <Activity className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-400">Followers</p>
                <p className="text-3xl font-bold mt-1">2,458</p>
              </div>
              <div className="p-3 bg-purple-500/10 rounded-full">
                <Users className="h-6 w-6 text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle>Top Posts by Engagement</CardTitle>
            <CardDescription>Posts with the highest number of likes and comments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={engagementData} margin={{ top: 10, right: 30, left: 0, bottom: 30 }}>
                  <XAxis
                    dataKey="name"
                    angle={-45}
                    textAnchor="end"
                    height={70}
                    tick={{ fill: "#9ca3af", fontSize: 12 }}
                  />
                  <YAxis tick={{ fill: "#9ca3af" }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#1f2937", border: "none", borderRadius: "4px" }}
                    itemStyle={{ color: "#f3f4f6" }}
                    cursor={{ fill: "rgba(255, 255, 255, 0.1)" }}
                  />
                  <Legend />
                  <Bar dataKey="likes" fill="#f87171" name="Likes" barSize={20} />
                  <Bar dataKey="comments" fill="#60a5fa" name="Comments" barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle>Follower Growth</CardTitle>
            <CardDescription>Trend of followers and engagement over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={growthData} margin={{ top: 10, right: 30, left: 0, bottom: 30 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis
                    dataKey="date"
                    angle={-45}
                    textAnchor="end"
                    height={70}
                    tick={{ fill: "#9ca3af", fontSize: 12 }}
                  />
                  <YAxis yAxisId="left" tick={{ fill: "#9ca3af" }} />
                  <YAxis yAxisId="right" orientation="right" tick={{ fill: "#9ca3af" }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#1f2937", border: "none", borderRadius: "4px" }}
                    itemStyle={{ color: "#f3f4f6" }}
                  />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="followers"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                    name="Followers"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="engagement"
                    stroke="#10b981"
                    strokeWidth={2}
                    name="Engagement Rate (%)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
