"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import { Download, Calendar, Clock, RotateCw } from "lucide-react"

export default function SettingsBackup() {
  const [isLoading, setIsLoading] = useState(false)
  const [autoBackup, setAutoBackup] = useState(true)
  const [backupFrequency, setBackupFrequency] = useState("weekly")
  const [lastBackup, setLastBackup] = useState("2023-04-15 09:30:22")
  const [uploadLoading, setUploadLoading] = useState(false)

  const handleBackup = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const now = new Date()
      const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`

      setLastBackup(formattedDate)

      toast({
        title: "Backup created",
        description: "Your portfolio data has been backed up successfully.",
      })
    } catch (error) {
      toast({
        title: "Backup failed",
        description: "There was an error creating your backup. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRestore = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Restore successful",
        description: "Your portfolio data has been restored successfully.",
      })
    } catch (error) {
      toast({
        title: "Restore failed",
        description: "There was an error restoring your backup. Please try again.",
        variant: "destructive",
      })
    } finally {
      setUploadLoading(false)
      // Reset the file input
      e.target.value = ""
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Backup & Restore</CardTitle>
          <CardDescription>Manage backups of your portfolio data and restore from previous backups</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">Manual Backup</h3>
                <p className="text-sm text-muted-foreground">Create a backup of your portfolio data</p>
              </div>
              <Button onClick={handleBackup} disabled={isLoading} className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                {isLoading ? "Creating Backup..." : "Create Backup"}
              </Button>
            </div>

            {lastBackup && (
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="mr-2 h-4 w-4" />
                Last backup: {lastBackup}
              </div>
            )}
          </div>

          <div className="border-t pt-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-medium">Automatic Backups</h3>
                <p className="text-sm text-muted-foreground">Schedule regular backups of your portfolio data</p>
              </div>
              <Switch checked={autoBackup} onCheckedChange={setAutoBackup} />
            </div>

            {autoBackup && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="backupFrequency">Backup Frequency</Label>
                  <Select value={backupFrequency} onValueChange={setBackupFrequency}>
                    <SelectTrigger id="backupFrequency">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="retentionPeriod">Retention Period</Label>
                  <Select defaultValue="30">
                    <SelectTrigger id="retentionPeriod">
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7">7 days</SelectItem>
                      <SelectItem value="30">30 days</SelectItem>
                      <SelectItem value="90">90 days</SelectItem>
                      <SelectItem value="365">1 year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>

          <div className="border-t pt-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-medium">Restore from Backup</h3>
                <p className="text-sm text-muted-foreground">Restore your portfolio data from a previous backup</p>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="flex flex-col space-y-2">
                <Label htmlFor="backupFile">Upload Backup File</Label>
                <div className="flex items-center gap-4">
                  <div className="relative flex-1">
                    <Input
                      id="backupFile"
                      type="file"
                      accept=".json,.zip"
                      onChange={handleRestore}
                      disabled={uploadLoading}
                      className="cursor-pointer"
                    />
                  </div>
                  {uploadLoading && (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <RotateCw className="mr-2 h-4 w-4 animate-spin" />
                      Restoring...
                    </div>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">Accepted formats: .json, .zip</p>
              </div>

              <div className="bg-muted/50 p-4 rounded-md">
                <h4 className="text-sm font-medium mb-2 flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  Recent Backups
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>portfolio-backup-2023-04-15.json</span>
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>portfolio-backup-2023-04-08.json</span>
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>portfolio-backup-2023-04-01.json</span>
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
