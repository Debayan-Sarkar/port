"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trash2, Plus, Save } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ExperienceItem {
  id: string
  title: string
  company: string
  location: string
  startDate: string
  endDate: string
  current: boolean
  description: string
  technologies: string[]
  logo?: string
}

export default function ExperienceForm() {
  const { toast } = useToast()
  const [experiences, setExperiences] = useState<ExperienceItem[]>([
    {
      id: "1",
      title: "Senior Frontend Developer",
      company: "Tech Solutions Inc.",
      location: "New York, NY",
      startDate: "2021-01",
      endDate: "",
      current: true,
      description: "Led the development of multiple web applications using React, Next.js, and TypeScript.",
      technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
      logo: "/placeholder.svg?key=zjiut",
    },
    {
      id: "2",
      title: "Full Stack Developer",
      company: "Digital Innovations",
      location: "San Francisco, CA",
      startDate: "2018-03",
      endDate: "2020-12",
      current: false,
      description: "Developed and maintained full-stack applications using Node.js, Express, and React.",
      technologies: ["Node.js", "Express", "React", "MongoDB"],
      logo: "/placeholder.svg?key=05wrp",
    },
  ])

  const [activeTab, setActiveTab] = useState("1")
  const [newTechnology, setNewTechnology] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleAddExperience = () => {
    const newId = (experiences.length + 1).toString()
    const newExperience: ExperienceItem = {
      id: newId,
      title: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
      technologies: [],
      logo: "/placeholder.svg?key=idulj",
    }

    setExperiences([...experiences, newExperience])
    setActiveTab(newId)
  }

  const handleDeleteExperience = (id: string) => {
    const updatedExperiences = experiences.filter((exp) => exp.id !== id)
    setExperiences(updatedExperiences)

    if (activeTab === id && updatedExperiences.length > 0) {
      setActiveTab(updatedExperiences[0].id)
    }
  }

  const handleExperienceChange = (id: string, field: keyof ExperienceItem, value: any) => {
    setExperiences(experiences.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)))
  }

  const handleAddTechnology = (id: string) => {
    if (!newTechnology.trim()) return

    setExperiences(
      experiences.map((exp) =>
        exp.id === id
          ? {
              ...exp,
              technologies: [...exp.technologies, newTechnology.trim()],
            }
          : exp,
      ),
    )

    setNewTechnology("")
  }

  const handleRemoveTechnology = (id: string, tech: string) => {
    setExperiences(
      experiences.map((exp) =>
        exp.id === id
          ? {
              ...exp,
              technologies: exp.technologies.filter((t) => t !== tech),
            }
          : exp,
      ),
    )
  }

  const handleSubmit = async () => {
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Experience updated",
        description: "Your experience information has been successfully updated.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update experience information. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Manage Experience</h2>
        <Button onClick={handleAddExperience}>
          <Plus className="mr-2 h-4 w-4" /> Add Experience
        </Button>
      </div>

      {experiences.length > 0 ? (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-flow-col auto-cols-fr mb-4 overflow-x-auto">
            {experiences.map((exp) => (
              <TabsTrigger key={exp.id} value={exp.id} className="truncate">
                {exp.title || exp.company || `Experience ${exp.id}`}
              </TabsTrigger>
            ))}
          </TabsList>

          {experiences.map((experience) => (
            <TabsContent key={experience.id} value={experience.id} className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>Experience Details</span>
                    <Button variant="destructive" size="sm" onClick={() => handleDeleteExperience(experience.id)}>
                      <Trash2 className="h-4 w-4 mr-2" /> Delete
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`title-${experience.id}`}>Job Title</Label>
                      <Input
                        id={`title-${experience.id}`}
                        value={experience.title}
                        onChange={(e) => handleExperienceChange(experience.id, "title", e.target.value)}
                        placeholder="e.g. Senior Frontend Developer"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`company-${experience.id}`}>Company</Label>
                      <Input
                        id={`company-${experience.id}`}
                        value={experience.company}
                        onChange={(e) => handleExperienceChange(experience.id, "company", e.target.value)}
                        placeholder="e.g. Tech Solutions Inc."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`location-${experience.id}`}>Location</Label>
                      <Input
                        id={`location-${experience.id}`}
                        value={experience.location}
                        onChange={(e) => handleExperienceChange(experience.id, "location", e.target.value)}
                        placeholder="e.g. New York, NY"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`logo-${experience.id}`}>Company Logo URL</Label>
                      <Input
                        id={`logo-${experience.id}`}
                        value={experience.logo || ""}
                        onChange={(e) => handleExperienceChange(experience.id, "logo", e.target.value)}
                        placeholder="URL to company logo"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`startDate-${experience.id}`}>Start Date</Label>
                      <Input
                        id={`startDate-${experience.id}`}
                        type="month"
                        value={experience.startDate}
                        onChange={(e) => handleExperienceChange(experience.id, "startDate", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2 flex items-end gap-4">
                      <div className={`flex-1 space-y-2 ${experience.current ? "opacity-50" : ""}`}>
                        <Label htmlFor={`endDate-${experience.id}`}>End Date</Label>
                        <Input
                          id={`endDate-${experience.id}`}
                          type="month"
                          value={experience.endDate}
                          onChange={(e) => handleExperienceChange(experience.id, "endDate", e.target.value)}
                          disabled={experience.current}
                        />
                      </div>

                      <div className="flex items-center h-10 space-x-2">
                        <input
                          type="checkbox"
                          id={`current-${experience.id}`}
                          checked={experience.current}
                          onChange={(e) => {
                            handleExperienceChange(experience.id, "current", e.target.checked)
                            if (e.target.checked) {
                              handleExperienceChange(experience.id, "endDate", "")
                            }
                          }}
                          className="h-4 w-4"
                        />
                        <Label htmlFor={`current-${experience.id}`}>Current Position</Label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`description-${experience.id}`}>Description</Label>
                    <Textarea
                      id={`description-${experience.id}`}
                      value={experience.description}
                      onChange={(e) => handleExperienceChange(experience.id, "description", e.target.value)}
                      placeholder="Describe your responsibilities and achievements"
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Technologies Used</Label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {experience.technologies.map((tech, index) => (
                        <div
                          key={index}
                          className="bg-primary/10 text-primary px-3 py-1 rounded-full flex items-center gap-1"
                        >
                          {tech}
                          <button
                            onClick={() => handleRemoveTechnology(experience.id, tech)}
                            className="text-primary hover:text-primary/70 ml-1"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        value={newTechnology}
                        onChange={(e) => setNewTechnology(e.target.value)}
                        placeholder="Add technology"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            handleAddTechnology(experience.id)
                          }
                        }}
                      />
                      <Button type="button" onClick={() => handleAddTechnology(experience.id)} variant="outline">
                        Add
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      ) : (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground mb-4">No experience entries found. Add your first experience.</p>
          <Button onClick={handleAddExperience}>
            <Plus className="mr-2 h-4 w-4" /> Add Experience
          </Button>
        </Card>
      )}

      <div className="flex justify-end">
        <Button onClick={handleSubmit} disabled={isLoading} className="w-full md:w-auto">
          {isLoading ? (
            <>Saving...</>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" /> Save All Changes
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
