"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Clock, Plus } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function InstagramScheduler() {
  const [scheduledPosts, setScheduledPosts] = useState<any[]>([])

  // This is a placeholder component since we'll need to implement scheduling functionality
  // with a more complex backend service
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Instagram Scheduler</h3>
        <p className="text-sm text-muted-foreground">Schedule posts for automatic publishing</p>
      </div>

      <Tabs defaultValue="upcoming">
        <TabsList className="mb-4">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
          <TabsTrigger value="published">Published</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming">
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Scheduled Posts</h4>
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Schedule Post
                </Button>
              </div>

              <div className="rounded-md border border-dashed p-12 text-center">
                <h3 className="font-medium mb-2">No Scheduled Posts</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Start scheduling posts to automatically publish them
                </p>
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Schedule Your First Post
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="drafts">
          <Card className="p-6">
            <div className="rounded-md border border-dashed p-12 text-center">
              <h3 className="font-medium mb-2">No Drafts</h3>
              <p className="text-sm text-muted-foreground mb-4">You don't have any drafts yet</p>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Create Draft
              </Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="published">
          <Card className="p-6">
            <div className="rounded-md border border-dashed p-12 text-center">
              <h3 className="font-medium mb-2">No Published Posts</h3>
              <p className="text-sm text-muted-foreground mb-4">You haven't published any scheduled posts yet</p>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="p-6">
        <h4 className="font-medium mb-4">Schedule Preview</h4>
        <div className="border rounded-md p-6">
          <div className="mb-6 flex items-center justify-center">
            <div className="text-center w-40">
              <p className="text-sm font-medium">May</p>
              <div className="text-3xl font-bold mb-1">14</div>
              <p className="text-xs text-muted-foreground">Tuesday</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center px-4 py-2 rounded-md border">
              <div className="flex items-center gap-3">
                <div className="bg-gray-100 h-10 w-10 rounded-md"></div>
                <div>
                  <p className="text-sm font-medium">Instagram Post</p>
                  <p className="text-xs text-muted-foreground">Coming soon!</p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs">
                <Clock className="h-3 w-3" />
                <span>9:00 AM</span>
              </div>
            </div>

            <div className="flex justify-between items-center px-4 py-2 rounded-md border">
              <div className="flex items-center gap-3">
                <div className="bg-gray-100 h-10 w-10 rounded-md"></div>
                <div>
                  <p className="text-sm font-medium">Instagram Post</p>
                  <p className="text-xs text-muted-foreground">Coming soon!</p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs">
                <Clock className="h-3 w-3" />
                <span>2:00 PM</span>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">This is a preview. Schedule posts to see them here.</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
