"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Instagram } from "lucide-react"
import type { InstagramPost } from "@/app/actions/social-media"
import { InstagramFeed } from "@/components/admin/instagram-feed"
import { SocialMediaAccounts } from "@/components/admin/social-media-accounts"
import { SocialMediaStats } from "@/components/admin/social-media-stats"
import { SocialMediaScheduler } from "@/components/admin/social-media-scheduler"

interface SocialMediaClientPageProps {
  initialUsername: string
  initialPosts: InstagramPost[]
}

export default function SocialMediaClientPage({ initialUsername, initialPosts }: SocialMediaClientPageProps) {
  const [username, setUsername] = useState(initialUsername)
  const [posts, setPosts] = useState(initialPosts)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">Social Media Management</h1>
        <div className="flex items-center space-x-2 text-sm text-gray-400 bg-gray-900 px-4 py-2 rounded-lg">
          <Instagram className="h-4 w-4 mr-2" />
          Active Account: @{username}
        </div>
      </div>

      <Tabs defaultValue="feed" className="w-full">
        <TabsList className="grid grid-cols-4 mb-6 bg-gray-800">
          <TabsTrigger value="feed">Instagram Feed</TabsTrigger>
          <TabsTrigger value="accounts">Accounts</TabsTrigger>
          <TabsTrigger value="stats">Analytics</TabsTrigger>
          <TabsTrigger value="scheduler">Scheduler</TabsTrigger>
        </TabsList>

        <TabsContent value="feed" className="space-y-4">
          <InstagramFeed initialPosts={posts} onPostsChange={setPosts} />
        </TabsContent>

        <TabsContent value="accounts" className="space-y-4">
          <SocialMediaAccounts username={username} onUsernameChange={setUsername} />
        </TabsContent>

        <TabsContent value="stats" className="space-y-4">
          <SocialMediaStats posts={posts} />
        </TabsContent>

        <TabsContent value="scheduler" className="space-y-4">
          <SocialMediaScheduler posts={posts} onPostsChange={setPosts} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
