"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Upload, Trash2, MoveVertical } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for technologies
const initialTechnologies = [
  { id: 1, name: "React", icon: "/tech/react.svg", category: "frontend", proficiency: 90, featured: true },
  { id: 2, name: "Next.js", icon: "/tech/nextjs.svg", category: "frontend", proficiency: 85, featured: true },
  { id: 3, name: "TypeScript", icon: "/tech/typescript.svg", category: "language", proficiency: 80, featured: true },
  { id: 4, name: "Tailwind CSS", icon: "/tech/tailwind.svg", category: "frontend", proficiency: 95, featured: true },
  { id: 5, name: "Node.js", icon: "/tech/nodejs.svg", category: "backend", proficiency: 75, featured: true },
  { id: 6, name: "MongoDB", icon: "/tech/mongodb.svg", category: "database", proficiency: 70, featured: false },
]

const categories = [
  { value: "frontend", label: "Frontend" },
  { value: "backend", label: "Backend" },
  { value: "database", label: "Database" },
  { value: "language", label: "Programming Language" },
  { value: "devops", label: "DevOps" },
  { value: "tool", label: "Tool" },
  { value: "other", label: "Other" },
]

export default function TechnologiesForm() {
  const { toast } = useToast()
  const [technologies, setTechnologies] = useState(initialTechnologies)
  const [activeTab, setActiveTab] = useState("all")
  const [newTech, setNewTech] = useState({
    name: "",
    icon: "",
    category: "",
    proficiency: 80,
    featured: false,
  })
  const [editingId, setEditingId] = useState<number | null>(null)
  const [draggedTechId, setDraggedTechId] = useState<number | null>(null)

  const filteredTechnologies =
    activeTab === "all"
      ? technologies
      : activeTab === "featured"
        ? technologies.filter((tech) => tech.featured)
        : technologies.filter((tech) => tech.category === activeTab)

  const handleAddTechnology = () => {
    if (!newTech.name || !newTech.category) {
      toast({
        title: "Missing information",
        description: "Please provide at least a name and category.",
        variant: "destructive",
      })
      return
    }

    if (editingId !== null) {
      // Update existing technology
      setTechnologies(technologies.map((tech) => (tech.id === editingId ? { ...newTech, id: tech.id } : tech)))
      toast({
        title: "Technology updated",
        description: `${newTech.name} has been updated successfully.`,
      })
    } else {
      // Add new technology
      const newId = Math.max(0, ...technologies.map((tech) => tech.id)) + 1
      setTechnologies([...technologies, { ...newTech, id: newId }])
      toast({
        title: "Technology added",
        description: `${newTech.name} has been added to your tech stack.`,
      })
    }

    // Reset form
    setNewTech({
      name: "",
      icon: "",
      category: "",
      proficiency: 80,
      featured: false,
    })
    setEditingId(null)
  }

  const handleEditTechnology = (tech: any) => {
    setNewTech({ ...tech })
    setEditingId(tech.id)
  }

  const handleDeleteTechnology = (id: number) => {
    setTechnologies(technologies.filter((tech) => tech.id !== id))

    if (editingId === id) {
      setNewTech({
        name: "",
        icon: "",
        category: "",
        proficiency: 80,
        featured: false,
      })
      setEditingId(null)
    }

    toast({
      title: "Technology removed",
      description: "The technology has been removed from your stack.",
    })
  }

  const handleToggleFeatured = (id: number) => {
    setTechnologies(technologies.map((tech) => (tech.id === id ? { ...tech, featured: !tech.featured } : tech)))
  }

  const handleDragStart = (id: number) => {
    setDraggedTechId(id)
  }

  const handleDragOver = (e: React.DragEvent, id: number) => {
    e.preventDefault()
    if (draggedTechId === null || draggedTechId === id) return

    // Reorder the technologies
    const draggedTechIndex = technologies.findIndex((tech) => tech.id === draggedTechId)
    const targetTechIndex = technologies.findIndex((tech) => tech.id === id)

    if (draggedTechIndex === -1 || targetTechIndex === -1) return

    const newTechnologies = [...technologies]
    const [draggedTech] = newTechnologies.splice(draggedTechIndex, 1)
    newTechnologies.splice(targetTechIndex, 0, draggedTech)

    setTechnologies(newTechnologies)
  }

  const handleDragEnd = () => {
    setDraggedTechId(null)
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingId !== null ? "Edit Technology" : "Add New Technology"}
          </h2>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Technology Name</Label>
              <Input
                id="name"
                value={newTech.name}
                onChange={(e) => setNewTech({ ...newTech, name: e.target.value })}
                placeholder="e.g., React, Python, Docker"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={newTech.category} onValueChange={(value) => setNewTech({ ...newTech, category: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="icon">Icon Path</Label>
              <div className="flex gap-2">
                <Input
                  id="icon"
                  value={newTech.icon}
                  onChange={(e) => setNewTech({ ...newTech, icon: e.target.value })}
                  placeholder="/tech/technology-name.svg"
                />
                <Button variant="outline" size="icon" type="button">
                  <Upload className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">Path to the technology icon (SVG recommended)</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="proficiency">Proficiency ({newTech.proficiency}%)</Label>
              <Input
                id="proficiency"
                type="range"
                min="0"
                max="100"
                value={newTech.proficiency}
                onChange={(e) => setNewTech({ ...newTech, proficiency: Number.parseInt(e.target.value) })}
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="featured"
                checked={newTech.featured}
                onChange={(e) => setNewTech({ ...newTech, featured: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300"
              />
              <Label
                htmlFor="featured"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Featured Technology (shown in highlights)
              </Label>
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            {editingId !== null && (
              <Button
                variant="outline"
                onClick={() => {
                  setNewTech({
                    name: "",
                    icon: "",
                    category: "",
                    proficiency: 80,
                    featured: false,
                  })
                  setEditingId(null)
                }}
              >
                Cancel
              </Button>
            )}
            <Button onClick={handleAddTechnology}>{editingId !== null ? "Update Technology" : "Add Technology"}</Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Technologies</TabsTrigger>
            <TabsTrigger value="featured">Featured</TabsTrigger>
            {categories.map((category) => (
              <TabsTrigger key={category.value} value={category.value} className="hidden md:inline-flex">
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={activeTab} className="mt-0">
            <Card>
              <CardContent className="p-6">
                {filteredTechnologies.length > 0 ? (
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Drag to reorder. {filteredTechnologies.length} technologies shown.
                    </p>
                    <ul className="space-y-2">
                      {filteredTechnologies.map((tech) => (
                        <li
                          key={tech.id}
                          draggable
                          onDragStart={() => handleDragStart(tech.id)}
                          onDragOver={(e) => handleDragOver(e, tech.id)}
                          onDragEnd={handleDragEnd}
                          className="flex items-center justify-between p-3 bg-muted/40 rounded-md hover:bg-muted cursor-grab"
                        >
                          <div className="flex items-center gap-3">
                            <MoveVertical className="h-4 w-4 text-muted-foreground" />

                            {tech.icon && (
                              <div className="w-8 h-8 flex items-center justify-center bg-background rounded-md p-1">
                                <img
                                  src={tech.icon || "/placeholder.svg"}
                                  alt={tech.name}
                                  className="max-w-full max-h-full"
                                />
                              </div>
                            )}

                            <div>
                              <div className="font-medium">{tech.name}</div>
                              <div className="text-xs text-muted-foreground flex items-center gap-2">
                                <Badge variant="outline" className="text-xs">
                                  {categories.find((c) => c.value === tech.category)?.label || tech.category}
                                </Badge>
                                <span>{tech.proficiency}% proficiency</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleToggleFeatured(tech.id)}
                              className={tech.featured ? "text-amber-500" : "text-muted-foreground"}
                            >
                              {tech.featured ? "Featured" : "Not Featured"}
                            </Button>

                            <Button variant="ghost" size="icon" onClick={() => handleEditTechnology(tech)}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-pencil"
                              >
                                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                                <path d="m15 5 4 4" />
                              </svg>
                            </Button>

                            <Button variant="ghost" size="icon" onClick={() => handleDeleteTechnology(tech.id)}>
                              <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                            </Button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <p className="text-muted-foreground">No technologies found in this category</p>
                    <Button variant="outline" className="mt-4" onClick={() => setActiveTab("all")}>
                      View all technologies
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
