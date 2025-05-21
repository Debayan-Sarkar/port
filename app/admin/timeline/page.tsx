"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Plus, Loader2, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "@/hooks/use-toast"
import { TimelineForm } from "@/components/admin/timeline-form"

// Mock data for demonstration
const MOCK_TIMELINE = [
  {
    id: "1",
    title: "Started Freelance Career",
    date: "2020-01-15",
    description:
      "Began working as a freelance web developer, focusing on creating custom websites for small businesses.",
    icon: "briefcase",
    color: "blue",
  },
  {
    id: "2",
    title: "Launched First Major Project",
    date: "2020-06-22",
    description:
      "Successfully delivered a comprehensive e-commerce platform for a retail client, resulting in a 40% increase in online sales.",
    icon: "rocket",
    color: "green",
  },
  {
    id: "3",
    title: "Expanded Services",
    date: "2021-03-10",
    description:
      "Added UI/UX design and mobile app development to service offerings, broadening client base and project scope.",
    icon: "expand",
    color: "purple",
  },
  {
    id: "4",
    title: "Formed Development Team",
    date: "2022-02-05",
    description:
      "Assembled a team of skilled developers and designers to handle larger projects and provide more comprehensive solutions.",
    icon: "users",
    color: "orange",
  },
]

export default function TimelinePage() {
  const [timelineItems, setTimelineItems] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedItem, setSelectedItem] = useState<any | null>(null)

  useEffect(() => {
    // Simulate API call
    const loadTimeline = async () => {
      setIsLoading(true)
      try {
        // In a real app, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 800))
        setTimelineItems(MOCK_TIMELINE)
      } catch (error) {
        toast({
          title: "Error loading timeline",
          description: "There was a problem loading the timeline items.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadTimeline()
  }, [])

  const handleAddNew = () => {
    setSelectedItem(null)
  }

  const handleEdit = (item: any) => {
    setSelectedItem(item)
  }

  const handleSave = async (itemData: any) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800))

      if (selectedItem) {
        // Update existing item
        setTimelineItems(
          timelineItems.map((item) => (item.id === selectedItem.id ? { ...itemData, id: selectedItem.id } : item)),
        )
        toast({
          title: "Timeline item updated",
          description: "The timeline item has been updated successfully.",
        })
      } else {
        // Add new item
        const newItem = {
          ...itemData,
          id: Math.random().toString(36).substring(2, 9),
        }
        setTimelineItems([...timelineItems, newItem])
        toast({
          title: "Timeline item added",
          description: "The new timeline item has been added successfully.",
        })
      }
      setSelectedItem(null)
    } catch (error) {
      toast({
        title: "Error saving timeline item",
        description: "There was a problem saving the timeline item.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this timeline item?")) return

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800))
      setTimelineItems(timelineItems.filter((item) => item.id !== id))
      toast({
        title: "Timeline item deleted",
        description: "The timeline item has been deleted successfully.",
      })
      if (selectedItem?.id === id) {
        setSelectedItem(null)
      }
    } catch (error) {
      toast({
        title: "Error deleting timeline item",
        description: "There was a problem deleting the timeline item.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Sort timeline items by date (newest first)
  const sortedTimelineItems = [...timelineItems].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <motion.h1
          className="text-3xl font-bold"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          Timeline Management
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Button onClick={handleAddNew} className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" /> Add New Event
          </Button>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-red-500" />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <motion.div className="lg:col-span-1" variants={container} initial="hidden" animate="show">
              {sortedTimelineItems.length === 0 ? (
                <Card className="bg-gray-900 border-gray-800">
                  <CardContent className="p-6 text-center text-gray-400">
                    No timeline events found. Add your first event.
                  </CardContent>
                </Card>
              ) : (
                <div className="relative space-y-0">
                  {/* Vertical line */}
                  <div className="absolute left-4 top-6 bottom-0 w-0.5 bg-gray-800" />

                  {sortedTimelineItems.map((timelineItem, index) => (
                    <motion.div key={timelineItem.id} variants={item}>
                      <Card
                        className={`bg-gray-900 border-gray-800 hover:border-gray-700 transition-all cursor-pointer mb-4 relative z-10 ${
                          selectedItem?.id === timelineItem.id ? "border-red-500" : ""
                        }`}
                        onClick={() => handleEdit(timelineItem)}
                      >
                        <CardContent className="p-4 pl-12">
                          {/* Timeline dot */}
                          <div
                            className={`absolute left-4 top-1/2 -translate-y-1/2 -translate-x-1/2 h-4 w-4 rounded-full bg-${timelineItem.color}-500`}
                          />
                          <div className="font-medium">{timelineItem.title}</div>
                          <div className="text-sm text-gray-400 flex items-center mt-1">
                            <Clock className="h-3 w-3 mr-1" />
                            {new Date(timelineItem.date).toLocaleDateString()}
                          </div>
                          <div className="text-sm text-gray-500 mt-2 line-clamp-2">{timelineItem.description}</div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>

            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <Card className="bg-gray-900 border-gray-800">
                  <CardContent className="p-6">
                    <TimelineForm
                      initialData={selectedItem}
                      onSave={handleSave}
                      onDelete={selectedItem ? () => handleDelete(selectedItem.id) : undefined}
                      isLoading={isLoading}
                    />
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}
