import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import NewsletterForm from "@/components/admin/newsletter-form"
import NewsletterSubscribers from "@/components/admin/newsletter-subscribers"

export const metadata: Metadata = {
  title: "Newsletter Management | Admin Dashboard",
  description: "Manage your newsletter settings and subscribers",
}

export default function NewsletterPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-2">Newsletter Management</h1>
      <p className="text-muted-foreground mb-6">Manage your newsletter settings and subscribers</p>

      <Tabs defaultValue="settings" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="subscribers">Subscribers</TabsTrigger>
        </TabsList>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Newsletter Settings</CardTitle>
              <CardDescription>Configure your newsletter appearance and functionality</CardDescription>
            </CardHeader>
            <CardContent>
              <NewsletterForm />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subscribers">
          <Card>
            <CardHeader>
              <CardTitle>Subscriber Management</CardTitle>
              <CardDescription>View and manage your newsletter subscribers</CardDescription>
            </CardHeader>
            <CardContent>
              <NewsletterSubscribers />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
