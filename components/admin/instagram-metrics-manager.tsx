"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getInstagramPosts } from "@/app/actions/instagram"
import type { InstagramPost } from "@/app/actions/instagram"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

export default function InstagramMetricsManager() {
  const [posts, setPosts] = useState<InstagramPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [userStats, setUserStats] = useState<any[]>([])
  const [engagementData, setEngagementData] = useState<any[]>([])
  const [timelineData, setTimelineData] = useState<any[]>([])

  useEffect(() => {
    async function loadData() {
      setIsLoading(true)
      try {
        const postsData = await getInstagramPosts()
        setPosts(postsData)

        // Process data for charts
        processUserStats(postsData)
        processEngagementData(postsData)
        processTimelineData(postsData)
      } catch (error) {
        console.error("Error loading Instagram metrics:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  const processUserStats = (postsData: InstagramPost[]) => {
    const userMap = new Map()

    postsData.forEach((post) => {
      if (!userMap.has(post.username)) {
        userMap.set(post.username, {
          username: post.username,
          posts: 0,
          likes: 0,
          comments: 0,
          saves: 0,
        })
      }

      const userData = userMap.get(post.username)
      userData.posts += 1
      userData.likes += post.likes
      userData.comments += post.comments
      userData.saves += post.saves
    })

    setUserStats(Array.from(userMap.values()))
  }

  const processEngagementData = (postsData: InstagramPost[]) => {
    const totalLikes = postsData.reduce((sum, post) => sum + post.likes, 0)
    const totalComments = postsData.reduce((sum, post) => sum + post.comments, 0)
    const totalSaves = postsData.reduce((sum, post) => sum + post.saves, 0)

    setEngagementData([
      { name: "Likes", value: totalLikes },
      { name: "Comments", value: totalComments },
      { name: "Saves", value: totalSaves },
    ])
  }

  const processTimelineData = (postsData: InstagramPost[]) => {
    // Group posts by month
    const monthMap = new Map()

    postsData.forEach((post) => {
      const date = new Date(post.date)
      const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`

      if (!monthMap.has(monthYear)) {
        monthMap.set(monthYear, {
          month: monthYear,
          posts: 0,
          likes: 0,
          comments: 0,
          saves: 0,
        })
      }

      const monthData = monthMap.get(monthYear)
      monthData.posts += 1
      monthData.likes += post.likes
      monthData.comments += post.comments
      monthData.saves += post.saves
    })

    // Sort by date
    const sortedData = Array.from(monthMap.values()).sort((a, b) => {
      const [aMonth, aYear] = a.month.split("/")
      const [bMonth, bYear] = b.month.split("/")

      if (aYear !== bYear) return Number.parseInt(aYear) - Number.parseInt(bYear)
      return Number.parseInt(aMonth) - Number.parseInt(bMonth)
    })

    setTimelineData(sortedData)
  }

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D"]

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-64 bg-gray-200 dark:bg-gray-800 rounded-md animate-pulse"></div>
        <div className="h-64 bg-gray-200 dark:bg-gray-800 rounded-md animate-pulse"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="engagement" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="users">User Stats</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
        </TabsList>

        <TabsContent value="engagement">
          <Card>
            <CardHeader>
              <CardTitle>Engagement Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={engagementData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {engagementData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={userStats}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="username" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="posts" fill="#8884d8" name="Posts" />
                    <Bar dataKey="likes" fill="#82ca9d" name="Likes" />
                    <Bar dataKey="comments" fill="#ffc658" name="Comments" />
                    <Bar dataKey="saves" fill="#ff8042" name="Saves" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeline">
          <Card>
            <CardHeader>
              <CardTitle>Engagement Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={timelineData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="likes" fill="#82ca9d" name="Likes" />
                    <Bar dataKey="comments" fill="#ffc658" name="Comments" />
                    <Bar dataKey="saves" fill="#ff8042" name="Saves" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
