"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Plus, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/hooks/use-toast"
import { FaqForm } from "@/components/admin/faq-form"

// Mock data for demonstration
const MOCK_FAQS = [
  {
    id: "1",
    question: "What services do you offer?",
    answer: "I offer web development, app development, UI/UX design, and digital marketing services.",
    category: "services",
    isActive: true,
  },
  {
    id: "2",
    question: "How much do your services cost?",
    answer: "Pricing depends on the project scope and requirements. Contact me for a custom quote.",
    category: "pricing",
    isActive: true,
  },
  {
    id: "3",
    question: "What is your typical project timeline?",
    answer: "Most projects take 4-8 weeks depending on complexity and requirements.",
    category: "process",
    isActive: true,
  },
]

export default function FaqPage() {
  const [faqs, setFaqs] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedFaq, setSelectedFaq] = useState<any | null>(null)
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    // Simulate API call
    const loadFaqs = async () => {
      setIsLoading(true)
      try {
        // In a real app, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 800))
        setFaqs(MOCK_FAQS)
      } catch (error) {
        toast({
          title: "Error loading FAQs",
          description: "There was a problem loading the FAQs.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadFaqs()
  }, [])

  const handleAddNew = () => {
    setSelectedFaq(null)
  }

  const handleEdit = (faq: any) => {
    setSelectedFaq(faq)
  }

  const handleSave = async (faqData: any) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800))

      if (selectedFaq) {
        // Update existing FAQ
        setFaqs(faqs.map((f) => (f.id === selectedFaq.id ? { ...faqData, id: selectedFaq.id } : f)))
        toast({
          title: "FAQ updated",
          description: "The FAQ has been updated successfully.",
        })
      } else {
        // Add new FAQ
        const newFaq = {
          ...faqData,
          id: Math.random().toString(36).substring(2, 9),
        }
        setFaqs([...faqs, newFaq])
        toast({
          title: "FAQ added",
          description: "The new FAQ has been added successfully.",
        })
      }
      setSelectedFaq(null)
    } catch (error) {
      toast({
        title: "Error saving FAQ",
        description: "There was a problem saving the FAQ.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this FAQ?")) return

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800))
      setFaqs(faqs.filter((f) => f.id !== id))
      toast({
        title: "FAQ deleted",
        description: "The FAQ has been deleted successfully.",
      })
      if (selectedFaq?.id === id) {
        setSelectedFaq(null)
      }
    } catch (error) {
      toast({
        title: "Error deleting FAQ",
        description: "There was a problem deleting the FAQ.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const filteredFaqs = activeTab === "all" ? faqs : faqs.filter((faq) => faq.category === activeTab)

  const categories = ["all", ...Array.from(new Set(faqs.map((faq) => faq.category)))]

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
          FAQ Management
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Button onClick={handleAddNew} className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" /> Add New FAQ
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
                  {filteredFaqs.length === 0 ? (
                    <Card className="bg-gray-900 border-gray-800">
                      <CardContent className="p-6 text-center text-gray-400">
                        No FAQs found in this category.
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="space-y-4">
                      {filteredFaqs.map((faq) => (
                        <motion.div key={faq.id} variants={item}>
                          <Card
                            className={`bg-gray-900 border-gray-800 hover:border-gray-700 transition-all cursor-pointer ${
                              selectedFaq?.id === faq.id ? "border-red-500" : ""
                            }`}
                            onClick={() => handleEdit(faq)}
                          >
                            <CardContent className="p-4">
                              <div className="font-medium mb-1">{faq.question}</div>
                              <div className="text-sm text-gray-400 truncate">{faq.answer}</div>
                              <div className="flex justify-between items-center mt-2">
                                <span className="text-xs px-2 py-1 bg-gray-800 rounded-full capitalize">
                                  {faq.category}
                                </span>
                                <span className={`text-xs ${faq.isActive ? "text-green-500" : "text-gray-500"}`}>
                                  {faq.isActive ? "Active" : "Inactive"}
                                </span>
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
                        <FaqForm
                          initialData={selectedFaq}
                          onSave={handleSave}
                          onDelete={selectedFaq ? () => handleDelete(selectedFaq.id) : undefined}
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
