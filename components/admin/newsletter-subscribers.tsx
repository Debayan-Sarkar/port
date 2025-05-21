"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"
import { Search, Download, Trash2, UserPlus } from "lucide-react"

// Mock data for subscribers
const mockSubscribers = [
  { id: 1, email: "john.doe@example.com", name: "John Doe", status: "active", date: "2023-05-15" },
  { id: 2, email: "jane.smith@example.com", name: "Jane Smith", status: "active", date: "2023-06-22" },
  { id: 3, email: "robert.johnson@example.com", name: "Robert Johnson", status: "unsubscribed", date: "2023-04-10" },
  { id: 4, email: "emily.wilson@example.com", name: "Emily Wilson", status: "active", date: "2023-07-05" },
  { id: 5, email: "michael.brown@example.com", name: "Michael Brown", status: "bounced", date: "2023-03-18" },
]

export default function NewsletterSubscribers() {
  const { toast } = useToast()
  const [subscribers, setSubscribers] = useState(mockSubscribers)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddingSubscriber, setIsAddingSubscriber] = useState(false)
  const [newSubscriber, setNewSubscriber] = useState({ email: "", name: "" })

  const filteredSubscribers = subscribers.filter(
    (subscriber) =>
      subscriber.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subscriber.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDeleteSubscriber = (id: number) => {
    setSubscribers(subscribers.filter((subscriber) => subscriber.id !== id))
    toast({
      title: "Subscriber removed",
      description: "The subscriber has been removed from your list.",
    })
  }

  const handleAddSubscriber = () => {
    if (!newSubscriber.email) {
      toast({
        title: "Error",
        description: "Email is required.",
        variant: "destructive",
      })
      return
    }

    const newId = Math.max(...subscribers.map((s) => s.id)) + 1
    const today = new Date().toISOString().split("T")[0]

    setSubscribers([
      ...subscribers,
      {
        id: newId,
        email: newSubscriber.email,
        name: newSubscriber.name || "",
        status: "active",
        date: today,
      },
    ])

    setNewSubscriber({ email: "", name: "" })
    setIsAddingSubscriber(false)

    toast({
      title: "Subscriber added",
      description: "The new subscriber has been added to your list.",
    })
  }

  const handleExportCSV = () => {
    // In a real application, this would generate and download a CSV file
    toast({
      title: "Export started",
      description: "Your subscriber list is being exported as CSV.",
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>
      case "unsubscribed":
        return <Badge variant="outline">Unsubscribed</Badge>
      case "bounced":
        return <Badge variant="destructive">Bounced</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search subscribers..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" onClick={handleExportCSV} className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Export CSV</span>
          </Button>

          <Button onClick={() => setIsAddingSubscriber(true)} className="flex items-center gap-1">
            <UserPlus className="h-4 w-4" />
            <span className="hidden sm:inline">Add Subscriber</span>
          </Button>
        </div>
      </div>

      {isAddingSubscriber && (
        <div className="bg-muted p-4 rounded-md space-y-4">
          <h3 className="font-medium">Add New Subscriber</h3>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Input
                placeholder="Email address *"
                value={newSubscriber.email}
                onChange={(e) => setNewSubscriber({ ...newSubscriber, email: e.target.value })}
              />
            </div>

            <div>
              <Input
                placeholder="Name (optional)"
                value={newSubscriber.name}
                onChange={(e) => setNewSubscriber({ ...newSubscriber, name: e.target.value })}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsAddingSubscriber(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddSubscriber}>Add Subscriber</Button>
          </div>
        </div>
      )}

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date Subscribed</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSubscribers.length > 0 ? (
              filteredSubscribers.map((subscriber) => (
                <TableRow key={subscriber.id}>
                  <TableCell className="font-medium">{subscriber.email}</TableCell>
                  <TableCell>{subscriber.name || "-"}</TableCell>
                  <TableCell>{getStatusBadge(subscriber.status)}</TableCell>
                  <TableCell>{subscriber.date}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteSubscriber(subscriber.id)}>
                      <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                  No subscribers found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="text-sm text-muted-foreground">
        Showing {filteredSubscribers.length} of {subscribers.length} subscribers
      </div>
    </div>
  )
}
