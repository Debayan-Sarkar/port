"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Upload, X, Star, StarOff } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

interface Testimonial {
  id: string
  name: string
  position: string
  company: string
  content: string
  rating: number
  image: string
}

interface TestimonialFormProps {
  onClose: () => void
  onSave: (testimonials: Testimonial[]) => void
}

export default function TestimonialForm({ onClose, onSave }: TestimonialFormProps) {
  const { toast } = useToast()
  const [testimonials, setTestimonials] = useState<Testimonial[]>([
    {
      id: "1",
      name: "John Smith",
      position: "CTO",
      company: "Tech Innovations",
      content:
        "Working with this developer was an absolute pleasure. They delivered high-quality code on time and was very responsive to our needs.",
      rating: 5,
      image: "/testimonial-1.jpg",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      position: "Product Manager",
      company: "Digital Solutions",
      content:
        "Exceptional work! The developer understood our requirements perfectly and implemented features that exceeded our expectations.",
      rating: 5,
      image: "/testimonial-2.jpg",
    },
    {
      id: "3",
      name: "Michael Brown",
      position: "CEO",
      company: "StartUp Inc.",
      content:
        "I highly recommend this developer for any web project. Their technical skills and attention to detail are outstanding.",
      rating: 4,
      image: "/testimonial-3.jpg",
    },
  ])

  const [activeTab, setActiveTab] = useState("1")
  const [isLoading, setIsLoading] = useState(false)
  const [imageUploads, setImageUploads] = useState<Record<string, File | null>>({})

  const handleAddTestimonial = () => {
    const newId = (testimonials.length + 1).toString()
    const newTestimonial: Testimonial = {
      id: newId,
      name: "",
      position: "",
      company: "",
      content: "",
      rating: 5,
      image: "/diverse-group.png",
    }

    setTestimonials([...testimonials, newTestimonial])
    setActiveTab(newId)
  }

  const handleDeleteTestimonial = (id: string) => {
    const updatedTestimonials = testimonials.filter((t) => t.id !== id)
    setTestimonials(updatedTestimonials)

    if (activeTab === id && updatedTestimonials.length > 0) {
      setActiveTab(updatedTestimonials[0].id)
    }
  }

  const handleTestimonialChange = (id: string, field: keyof Testimonial, value: any) => {
    setTestimonials(testimonials.map((t) => (t.id === id ? { ...t, [field]: value } : t)))
  }

  const handleImageChange = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setImageUploads({ ...imageUploads, [id]: file })

      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          handleTestimonialChange(id, "image", e.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)

    try {
      // In a real application, you would upload the images to a storage service
      // and save the testimonial data to a database
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call

      onSave(testimonials)

      toast({
        title: "Testimonials updated",
        description: "Your testimonials have been successfully updated.",
      })

      onClose()
    } catch (error) {
      console.error("Error saving testimonials:", error)
      toast({
        title: "Error",
        description: "Failed to update testimonials. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const renderStarRating = (id: string, rating: number) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => handleTestimonialChange(id, "rating", star)}
            className="focus:outline-none"
          >
            {star <= rating ? (
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            ) : (
              <StarOff className="h-5 w-5 text-gray-400" />
            )}
          </button>
        ))}
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <Button onClick={onClose} variant="ghost" size="icon" className="rounded-full hover:bg-zinc-800">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Manage Testimonials</h1>
        </div>

        <div className="flex space-x-2">
          <Button variant="outline" onClick={onClose} className="border-zinc-700 hover:bg-zinc-800">
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-red-500 hover:bg-red-600 text-white" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Testimonials"}
          </Button>
        </div>
      </div>

      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Client Testimonials</h2>
            <Button onClick={handleAddTestimonial} className="bg-red-500 hover:bg-red-600 text-white">
              Add Testimonial
            </Button>
          </div>

          {testimonials.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <p>No testimonials yet. Click "Add Testimonial" to create your first one.</p>
            </div>
          ) : (
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-6 bg-gray-800 overflow-x-auto flex-wrap">
                {testimonials.map((testimonial) => (
                  <TabsTrigger
                    key={testimonial.id}
                    value={testimonial.id}
                    className="data-[state=active]:bg-red-500 data-[state=active]:text-white"
                  >
                    {testimonial.name || `Testimonial ${testimonial.id}`}
                  </TabsTrigger>
                ))}
              </TabsList>

              {testimonials.map((testimonial) => (
                <TabsContent key={testimonial.id} value={testimonial.id} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor={`name-${testimonial.id}`}>Name</Label>
                        <Input
                          id={`name-${testimonial.id}`}
                          value={testimonial.name}
                          onChange={(e) => handleTestimonialChange(testimonial.id, "name", e.target.value)}
                          placeholder="Client Name"
                          className="bg-zinc-900/50 border-zinc-800 focus:border-red-500"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`position-${testimonial.id}`}>Position</Label>
                        <Input
                          id={`position-${testimonial.id}`}
                          value={testimonial.position}
                          onChange={(e) => handleTestimonialChange(testimonial.id, "position", e.target.value)}
                          placeholder="Job Title"
                          className="bg-zinc-900/50 border-zinc-800 focus:border-red-500"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`company-${testimonial.id}`}>Company</Label>
                        <Input
                          id={`company-${testimonial.id}`}
                          value={testimonial.company}
                          onChange={(e) => handleTestimonialChange(testimonial.id, "company", e.target.value)}
                          placeholder="Company Name"
                          className="bg-zinc-900/50 border-zinc-800 focus:border-red-500"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Rating</Label>
                        {renderStarRating(testimonial.id, testimonial.rating)}
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor={`content-${testimonial.id}`}>Testimonial</Label>
                        <Textarea
                          id={`content-${testimonial.id}`}
                          value={testimonial.content}
                          onChange={(e) => handleTestimonialChange(testimonial.id, "content", e.target.value)}
                          placeholder="What the client said about your work"
                          className="min-h-[150px] bg-zinc-900/50 border-zinc-800 focus:border-red-500"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`image-${testimonial.id}`}>Client Photo</Label>
                        <div className="flex items-center space-x-4">
                          <div className="flex-1">
                            <div className="relative flex items-center justify-center border-2 border-dashed border-zinc-700 rounded-lg p-4 hover:border-red-500/50 transition-colors cursor-pointer">
                              <input
                                type="file"
                                id={`image-${testimonial.id}`}
                                onChange={(e) => handleImageChange(testimonial.id, e)}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                accept="image/*"
                              />
                              <div className="text-center">
                                <Upload className="mx-auto h-8 w-8 text-gray-400" />
                                <p className="mt-2 text-sm text-gray-400">Choose Photo</p>
                              </div>
                            </div>
                          </div>

                          {testimonial.image && (
                            <div className="relative h-24 w-24 rounded-full overflow-hidden bg-zinc-800">
                              <img
                                src={testimonial.image || "/placeholder.svg"}
                                alt={`${testimonial.name} profile`}
                                className="h-full w-full object-cover"
                              />
                              <button
                                type="button"
                                onClick={() => handleTestimonialChange(testimonial.id, "image", "")}
                                className="absolute top-1 right-1 bg-black/60 rounded-full p-1 hover:bg-red-500/80 transition-colors"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="pt-4">
                        <Button
                          variant="destructive"
                          onClick={() => handleDeleteTestimonial(testimonial.id)}
                          disabled={testimonials.length <= 1}
                          className="w-full"
                        >
                          Delete Testimonial
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
