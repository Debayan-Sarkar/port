"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Instagram, Check, X, AtSign, ExternalLink } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { updateInstagramUsername } from "@/app/actions/social-media"

interface SocialMediaAccountsProps {
  username: string
  onUsernameChange: (username: string) => void
}

export function SocialMediaAccounts({ username, onUsernameChange }: SocialMediaAccountsProps) {
  const [editingUsername, setEditingUsername] = useState(username)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = async () => {
    if (!editingUsername.trim()) {
      toast({ title: "Error", description: "Username cannot be empty", variant: "destructive" })
      return
    }

    setIsLoading(true)

    try {
      const { success, message } = await updateInstagramUsername(editingUsername)

      if (success) {
        onUsernameChange(editingUsername)
        setIsEditing(false)
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

  const handleCancel = () => {
    setEditingUsername(username)
    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Manage Social Media Accounts</h2>

      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Instagram className="h-5 w-5" />
            Instagram Account
            <Badge variant="outline" className="ml-2 bg-blue-500/20 text-blue-400">
              Connected
            </Badge>
          </CardTitle>
          <CardDescription>Manage your Instagram account settings and profile information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-300">Username</h3>
              {isEditing ? (
                <div className="mt-1 flex items-center">
                  <AtSign className="h-4 w-4 text-gray-400 mr-1" />
                  <Input
                    value={editingUsername}
                    onChange={(e) => setEditingUsername(e.target.value)}
                    className="bg-gray-800 border-gray-700 h-8"
                    placeholder="Enter username"
                    autoFocus
                  />
                </div>
              ) : (
                <p className="text-lg font-medium flex items-center mt-1">
                  <AtSign className="h-4 w-4 text-gray-400 mr-1" />
                  {username}
                </p>
              )}
            </div>

            <div>
              {isEditing ? (
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={handleCancel} disabled={isLoading}>
                    <X className="h-4 w-4 mr-1" /> Cancel
                  </Button>
                  <Button size="sm" onClick={handleSave} disabled={isLoading}>
                    {isLoading ? (
                      "Saving..."
                    ) : (
                      <>
                        <Check className="h-4 w-4 mr-1" /> Save
                      </>
                    )}
                  </Button>
                </div>
              ) : (
                <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                  Edit Username
                </Button>
              )}
            </div>
          </div>

          <div className="pt-4">
            <h3 className="text-sm font-medium text-gray-300 mb-2">Profile Preview</h3>
            <div className="bg-gray-800 rounded-lg p-4 flex items-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-gray-900 flex items-center justify-center text-white font-bold text-xl">
                  {username.charAt(0).toUpperCase()}
                </div>
              </div>
              <div className="ml-4">
                <h4 className="font-bold">Jomiez_innovation</h4>
                <p className="text-sm text-gray-400">Your Company Name</p>
                <a
                  href={`https://instagram.com/${username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-400 flex items-center mt-1 hover:underline"
                >
                  View on Instagram <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
