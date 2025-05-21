"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RefreshCw, Save } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { initializeFirebaseData } from "@/app/actions/init-firebase"

export default function InstagramAccountManager() {
  const [isInitializing, setIsInitializing] = useState(false)
  const { toast } = useToast()

  const handleInitializeData = async () => {
    if (!confirm("This will initialize sample Instagram data. Continue?")) return

    setIsInitializing(true)
    try {
      const result = await initializeFirebaseData()

      if (result.success) {
        toast({
          title: "Success",
          description: result.message,
        })
      } else {
        throw new Error(result.error)
      }
    } catch (error: any) {
      console.error("Error initializing data:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to initialize data",
        variant: "destructive",
      })
    } finally {
      setIsInitializing(false)
    }
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="settings" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="settings">Account Settings</TabsTrigger>
          <TabsTrigger value="tools">Tools</TabsTrigger>
        </TabsList>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Instagram Account Settings</CardTitle>
              <CardDescription>Configure your Instagram account settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="business-name">Business Name</Label>
                <Input id="business-name" placeholder="Your Business Name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="bio">Bio</Label>
                <Input id="bio" placeholder="Your Instagram bio" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="website">Website</Label>
                <Input id="website" placeholder="https://yourwebsite.com" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Save Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="tools">
          <Card>
            <CardHeader>
              <CardTitle>Instagram Tools</CardTitle>
              <CardDescription>Helpful tools for managing your Instagram account.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-md p-4">
                <h3 className="text-lg font-medium mb-2">Initialize Sample Data</h3>
                <p className="text-sm text-gray-500 mb-4">
                  This will populate your Firebase database with sample Instagram posts. Use this to quickly set up your
                  Instagram management system.
                </p>
                <Button onClick={handleInitializeData} disabled={isInitializing}>
                  {isInitializing ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Initializing...
                    </>
                  ) : (
                    "Initialize Sample Data"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
