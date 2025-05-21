import type { Metadata } from "next"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import SettingsGeneral from "@/components/admin/settings-general"
import SettingsAppearance from "@/components/admin/settings-appearance"
import SettingsSEO from "@/components/admin/settings-seo"
import SettingsAnalytics from "@/components/admin/settings-analytics"
import SettingsBackup from "@/components/admin/settings-backup"

export const metadata: Metadata = {
  title: "Settings | Admin Dashboard",
  description: "Manage your portfolio website settings",
}

export default function SettingsPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-2">Settings</h1>
      <p className="text-muted-foreground mb-6">Configure your portfolio website settings</p>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="backup">Backup & Restore</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Configure basic information about your portfolio website</CardDescription>
            </CardHeader>
            <CardContent>
              <SettingsGeneral />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>Customize the look and feel of your portfolio website</CardDescription>
            </CardHeader>
            <CardContent>
              <SettingsAppearance />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seo">
          <Card>
            <CardHeader>
              <CardTitle>SEO Settings</CardTitle>
              <CardDescription>Optimize your portfolio for search engines</CardDescription>
            </CardHeader>
            <CardContent>
              <SettingsSEO />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Analytics Settings</CardTitle>
              <CardDescription>Configure analytics tracking for your portfolio</CardDescription>
            </CardHeader>
            <CardContent>
              <SettingsAnalytics />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backup">
          <Card>
            <CardHeader>
              <CardTitle>Backup & Restore</CardTitle>
              <CardDescription>Backup and restore your portfolio data</CardDescription>
            </CardHeader>
            <CardContent>
              <SettingsBackup />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
