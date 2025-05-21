"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Plus, Loader2, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/hooks/use-toast"
import { AwardsForm } from "@/components/admin/awards-form"
import Image from "next/image"

// Mock data for demonstration
const MOCK_AWARDS = [
  {
    id: "1",
    title: "Best Web Developer",
    organization: "Web Design Awards",
    date: "2023-05-15",
    description: "Recognized for excellence in web development and innovative design solutions.",
    imageUrl: "/golden-trophy-on-pedestal.png",
    category: "professional",
    featured: true,
  },
  {
    id: "2",
    title: "Innovation in Technology",
    organization: "Tech Innovators",
    date: "2022-11-10",
    description: "Awarded for creating innovative technology solutions that solve real-world problems.",
    imageUrl: "/abstract-innovation.png",
    category: "innovation",
    featured: true,
  },
  {
    id: "3",
    title: "Excellence in UI/UX Design",
    organization: "Design Association",
    date: "2022-03-22",
    description: "Recognized for creating exceptional user experiences and interface designs.",
    imageUrl: "/abstract-design-elements.png",
    category: "design",
    featured: false,
  },
]

export default function AwardsPage() {
  const [awards, setAwards] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedAward, setSelectedAward] = useState<any | null>(null)
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    // Simulate API call
    const loadAwards = async () => {
      setIsLoading(true)
      try {
        // In a real app, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 800))
        setAwards(MOCK_AWARDS)
      } catch (error) {
        toast({
          title: "Error loading awards",
          description: "There was a problem loading the awards.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadAwards()
  }, [])

  const handleAddNew = () => {
    setSelectedAward(null)
  }

  const handleEdit = (award: any) => {
    setSelectedAward(award)
  }

  const handleSave = async (awardData: any) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800))

      if (selectedAward) {
        // Update existing award
        setAwards(awards.map((a) => (a.id === selectedAward.id ? { ...awardData, id: selectedAward.id } : a)))
        toast({
          title: "Award updated",
          description: "The award has been updated successfully.",
        })
      } else {
        // Add new award
        const newAward = {
          ...awardData,
          id: Math.random().toString(36).substring(2, 9),
        }
        setAwards([...awards, newAward])
        toast({
          title: "Award added",
          description: "The new award has been added successfully.",
        })
      }
      setSelectedAward(null)
    } catch (error) {
      toast({
        title: "Error saving award",
        description: "There was a problem saving the award.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this award?")) return

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800))
      setAwards(awards.filter((a) => a.id !== id))
      toast({
        title: "Award deleted",
        description: "The award has been deleted successfully.",
      })
      if (selectedAward?.id === id) {
        setSelectedAward(null)
      }
    } catch (error) {
      toast({
        title: "Error deleting award",
        description: "There was a problem deleting the award.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const filteredAwards = activeTab === "all" ? awards : awards.filter((award) => award.category === activeTab)

  const categories = ["all", ...Array.from(new Set(awards.map((award) => award.category)))]

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
          Awards & Recognition
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Button onClick={handleAddNew} className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" /> Add New Award
          </Button>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4 w-full sm:w-auto overflow-x-auto flex-nowrap">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category} className="capitalize">
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={activeTab} className="mt-0">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-red-500" />
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <motion.div className="lg:col-span-1" variants={container} initial="hidden" animate="show">
                  {filteredAwards.length === 0 ? (
                    <Card className="bg-gray-900 border-gray-800">
                      <CardContent className="p-6 text-center text-gray-400">
                        No awards found in this category.
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="space-y-4">
                      {filteredAwards.map((award) => (
                        <motion.div key={award.id} variants={item}>
                          <Card
                            className={`bg-gray-900 border-gray-800 hover:border-gray-700 transition-all cursor-pointer ${
                              selectedAward?.id === award.id ? "border-red-500" : ""
                            }`}
                            onClick={() => handleEdit(award)}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-center gap-3">
                                <div className="relative h-12 w-12 rounded-md overflow-hidden bg-gray-800 flex-shrink-0">
                                  {award.imageUrl ? (
                                    <Image
                                      src={award.imageUrl || "/placeholder.svg"}
                                      alt={award.title}
                                      fill
                                      className="object-cover"
                                    />
                                  ) : (
                                    <div className="flex items-center justify-center h-full w-full">
                                      <Award className="h-6 w-6 text-gray-400" />
                                    </div>
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="font-medium truncate">{award.title}</div>
                                  <div className="text-sm text-gray-400">{award.organization}</div>
                                  <div className="text-xs text-gray-500">
                                    {new Date(award.date).toLocaleDateString()}
                                  </div>
                                </div>
                              </div>
                              <div className="flex justify-between items-center mt-2">
                                <span className="text-xs px-2 py-1 bg-gray-800 rounded-full capitalize">
                                  {award.category}
                                </span>
                                {award.featured && (
                                  <span className="text-xs px-2 py-1 bg-red-900/30 text-red-400 rounded-full">
                                    Featured
                                  </span>
                                )}
                              </div>
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
                        <AwardsForm
                          initialData={selectedAward}
                          onSave={handleSave}
                          onDelete={selectedAward ? () => handleDelete(selectedAward.id) : undefined}
                          isLoading={isLoading}
                        />
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}
