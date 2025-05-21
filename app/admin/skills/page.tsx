"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusCircle, Trash2, Save, Loader2, MoveUp, MoveDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"

// Mock data - in a real app, this would come from your database
const initialSkills = [
  {
    id: "1",
    category: "Frontend",
    skills: [
      { name: "React", proficiency: 95 },
      { name: "Next.js", proficiency: 90 },
      { name: "TypeScript", proficiency: 85 },
      { name: "Tailwind CSS", proficiency: 90 },
    ],
  },
  {
    id: "2",
    category: "Backend",
    skills: [
      { name: "Node.js", proficiency: 85 },
      { name: "Express", proficiency: 80 },
      { name: "MongoDB", proficiency: 75 },
      { name: "PostgreSQL", proficiency: 70 },
    ],
  },
  {
    id: "3",
    category: "Other",
    skills: [
      { name: "Git", proficiency: 90 },
      { name: "Docker", proficiency: 70 },
      { name: "AWS", proficiency: 65 },
      { name: "GraphQL", proficiency: 75 },
    ],
  },
]

export default function SkillsPage() {
  const [skillCategories, setSkillCategories] = useState(initialSkills)
  const [newCategory, setNewCategory] = useState({
    id: "",
    category: "",
    skills: [{ name: "", proficiency: 80 }],
  })
  const [isEditing, setIsEditing] = useState(false)
  const [editingId, setEditingId] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("list")
  const { toast } = useToast()

  const handleAddNew = () => {
    setIsEditing(false)
    setNewCategory({
      id: Date.now().toString(),
      category: "",
      skills: [{ name: "", proficiency: 80 }],
    })
    setActiveTab("form")
  }

  const handleEdit = (id: string) => {
    const categoryToEdit = skillCategories.find((cat) => cat.id === id)
    if (categoryToEdit) {
      setNewCategory(categoryToEdit)
      setIsEditing(true)
      setEditingId(id)
      setActiveTab("form")
    }
  }

  const handleDelete = async (id: string) => {
    setIsLoading(true)
    try {
      // In a real app, you would make an API call to delete the category
      // await fetch(`/api/skills/${id}`, { method: 'DELETE' })

      // For now, we'll just update the state
      setSkillCategories(skillCategories.filter((cat) => cat.id !== id))
      toast({
        title: "Category deleted",
        description: "The skill category has been successfully deleted.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete the skill category. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // In a real app, you would make an API call to save the category
      // const response = await fetch('/api/skills', {
      //   method: isEditing ? 'PUT' : 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(newCategory)
      // })
      // const data = await response.json()

      // For now, we'll just update the state
      if (isEditing) {
        setSkillCategories(skillCategories.map((cat) => (cat.id === editingId ? newCategory : cat)))
        toast({
          title: "Category updated",
          description: "The skill category has been successfully updated.",
        })
      } else {
        setSkillCategories([...skillCategories, newCategory])
        toast({
          title: "Category added",
          description: "The new skill category has been successfully added.",
        })
      }

      setActiveTab("list")
      setNewCategory({
        id: "",
        category: "",
        skills: [{ name: "", proficiency: 80 }],
      })
      setIsEditing(false)
      setEditingId("")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save the skill category. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSkillChange = (index: number, field: "name" | "proficiency", value: string | number) => {
    const updatedSkills = [...newCategory.skills]
    updatedSkills[index] = {
      ...updatedSkills[index],
      [field]: field === "proficiency" ? Number(value) : value,
    }
    setNewCategory({
      ...newCategory,
      skills: updatedSkills,
    })
  }

  const addSkill = () => {
    setNewCategory({
      ...newCategory,
      skills: [...newCategory.skills, { name: "", proficiency: 80 }],
    })
  }

  const removeSkill = (index: number) => {
    const updatedSkills = [...newCategory.skills]
    updatedSkills.splice(index, 1)
    setNewCategory({
      ...newCategory,
      skills: updatedSkills,
    })
  }

  const moveSkill = (index: number, direction: "up" | "down") => {
    if ((direction === "up" && index === 0) || (direction === "down" && index === newCategory.skills.length - 1)) {
      return
    }

    const updatedSkills = [...newCategory.skills]
    const newIndex = direction === "up" ? index - 1 : index + 1
    const temp = updatedSkills[index]
    updatedSkills[index] = updatedSkills[newIndex]
    updatedSkills[newIndex] = temp

    setNewCategory({
      ...newCategory,
      skills: updatedSkills,
    })
  }

  const moveCategory = (index: number, direction: "up" | "down") => {
    if ((direction === "up" && index === 0) || (direction === "down" && index === skillCategories.length - 1)) {
      return
    }

    const updatedCategories = [...skillCategories]
    const newIndex = direction === "up" ? index - 1 : index + 1
    const temp = updatedCategories[index]
    updatedCategories[index] = updatedCategories[newIndex]
    updatedCategories[newIndex] = temp

    setSkillCategories(updatedCategories)
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Skills</h1>
        <Button onClick={handleAddNew} className="flex items-center gap-2">
          <PlusCircle size={16} />
          Add New Category
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="list">Skills List</TabsTrigger>
          <TabsTrigger value="form">{isEditing ? "Edit Category" : "Add New Category"}</TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          <div className="grid gap-4">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="w-full">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-xl font-semibold">{category.category}</h3>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleEdit(category.id)}>
                              Edit
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDelete(category.id)}
                              disabled={isLoading}
                            >
                              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 size={16} />}
                            </Button>
                            <div className="flex flex-col">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => moveCategory(categoryIndex, "up")}
                                disabled={categoryIndex === 0}
                              >
                                <MoveUp size={16} />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => moveCategory(categoryIndex, "down")}
                                disabled={categoryIndex === skillCategories.length - 1}
                              >
                                <MoveDown size={16} />
                              </Button>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          {category.skills.map((skill) => (
                            <div key={skill.name} className="flex flex-col">
                              <div className="flex justify-between items-center mb-1">
                                <span className="font-medium">{skill.name}</span>
                                <span className="text-sm">{skill.proficiency}%</span>
                              </div>
                              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                                <div
                                  className="bg-primary h-2.5 rounded-full"
                                  style={{ width: `${skill.proficiency}%` }}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="form">
          <Card>
            <CardHeader>
              <CardTitle>{isEditing ? "Edit Skill Category" : "Add New Skill Category"}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="category" className="text-sm font-medium">
                    Category Name
                  </label>
                  <Input
                    id="category"
                    value={newCategory.category}
                    onChange={(e) => setNewCategory({ ...newCategory, category: e.target.value })}
                    placeholder="e.g. Frontend, Backend, DevOps"
                    required
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Skills</label>
                    <Button type="button" variant="outline" size="sm" onClick={addSkill}>
                      Add Skill
                    </Button>
                  </div>

                  {newCategory.skills.map((skill, index) => (
                    <div key={index} className="space-y-2 p-4 border rounded-md">
                      <div className="flex justify-between">
                        <h4 className="font-medium">Skill #{index + 1}</h4>
                        <div className="flex gap-1">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => moveSkill(index, "up")}
                            disabled={index === 0}
                          >
                            <MoveUp size={16} />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => moveSkill(index, "down")}
                            disabled={index === newCategory.skills.length - 1}
                          >
                            <MoveDown size={16} />
                          </Button>
                          {newCategory.skills.length > 1 && (
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => removeSkill(index)}
                            >
                              <Trash2 size={16} />
                            </Button>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor={`skill-name-${index}`} className="text-sm font-medium">
                            Skill Name
                          </label>
                          <Input
                            id={`skill-name-${index}`}
                            value={skill.name}
                            onChange={(e) => handleSkillChange(index, "name", e.target.value)}
                            placeholder="e.g. React"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor={`skill-proficiency-${index}`} className="text-sm font-medium">
                            Proficiency ({skill.proficiency}%)
                          </label>
                          <Input
                            id={`skill-proficiency-${index}`}
                            type="range"
                            min="0"
                            max="100"
                            value={skill.proficiency}
                            onChange={(e) => handleSkillChange(index, "proficiency", e.target.value)}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Button type="submit" disabled={isLoading} className="w-full flex items-center justify-center gap-2">
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save size={16} />}
                  {isEditing ? "Update Category" : "Save Category"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
