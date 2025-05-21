"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trash2, Plus, Save, MoveUp, MoveDown } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface SkillCategory {
  id: string
  name: string
  skills: Skill[]
}

interface Skill {
  id: string
  name: string
  proficiency: number
  icon?: string
}

export default function SkillsForm() {
  const { toast } = useToast()
  const [categories, setCategories] = useState<SkillCategory[]>([
    {
      id: "1",
      name: "Frontend",
      skills: [
        { id: "1-1", name: "React", proficiency: 95, icon: "/tech/react.svg" },
        { id: "1-2", name: "Next.js", proficiency: 90, icon: "/tech/nextjs.svg" },
        { id: "1-3", name: "TypeScript", proficiency: 85, icon: "/tech/typescript.svg" },
        { id: "1-4", name: "Tailwind CSS", proficiency: 90, icon: "/tech/tailwind.svg" },
      ],
    },
    {
      id: "2",
      name: "Backend",
      skills: [
        { id: "2-1", name: "Node.js", proficiency: 85, icon: "/tech/nodejs.svg" },
        { id: "2-2", name: "Express", proficiency: 80, icon: "/tech/express.svg" },
        { id: "2-3", name: "MongoDB", proficiency: 75, icon: "/tech/mongodb.svg" },
        { id: "2-4", name: "PostgreSQL", proficiency: 70, icon: "/tech/postgresql.svg" },
      ],
    },
  ])

  const [activeTab, setActiveTab] = useState("1")
  const [isLoading, setIsLoading] = useState(false)

  const handleAddCategory = () => {
    const newId = (categories.length + 1).toString()
    const newCategory: SkillCategory = {
      id: newId,
      name: "New Category",
      skills: [],
    }

    setCategories([...categories, newCategory])
    setActiveTab(newId)
  }

  const handleDeleteCategory = (id: string) => {
    const updatedCategories = categories.filter((cat) => cat.id !== id)
    setCategories(updatedCategories)

    if (activeTab === id && updatedCategories.length > 0) {
      setActiveTab(updatedCategories[0].id)
    }
  }

  const handleCategoryChange = (id: string, name: string) => {
    setCategories(categories.map((cat) => (cat.id === id ? { ...cat, name } : cat)))
  }

  const handleAddSkill = (categoryId: string) => {
    setCategories(
      categories.map((cat) => {
        if (cat.id === categoryId) {
          const newSkillId = `${categoryId}-${cat.skills.length + 1}`
          return {
            ...cat,
            skills: [...cat.skills, { id: newSkillId, name: "", proficiency: 50 }],
          }
        }
        return cat
      }),
    )
  }

  const handleDeleteSkill = (categoryId: string, skillId: string) => {
    setCategories(
      categories.map((cat) => {
        if (cat.id === categoryId) {
          return {
            ...cat,
            skills: cat.skills.filter((skill) => skill.id !== skillId),
          }
        }
        return cat
      }),
    )
  }

  const handleSkillChange = (categoryId: string, skillId: string, field: keyof Skill, value: any) => {
    setCategories(
      categories.map((cat) => {
        if (cat.id === categoryId) {
          return {
            ...cat,
            skills: cat.skills.map((skill) => (skill.id === skillId ? { ...skill, [field]: value } : skill)),
          }
        }
        return cat
      }),
    )
  }

  const moveSkill = (categoryId: string, skillId: string, direction: "up" | "down") => {
    setCategories(
      categories.map((cat) => {
        if (cat.id === categoryId) {
          const skillIndex = cat.skills.findIndex((skill) => skill.id === skillId)
          if (
            (direction === "up" && skillIndex === 0) ||
            (direction === "down" && skillIndex === cat.skills.length - 1)
          ) {
            return cat
          }

          const newSkills = [...cat.skills]
          const targetIndex = direction === "up" ? skillIndex - 1 : skillIndex + 1

          // Swap positions
          ;[newSkills[skillIndex], newSkills[targetIndex]] = [newSkills[targetIndex], newSkills[skillIndex]]

          return {
            ...cat,
            skills: newSkills,
          }
        }
        return cat
      }),
    )
  }

  const handleSubmit = async () => {
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Skills updated",
        description: "Your skills information has been successfully updated.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update skills information. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Manage Skills</h2>
        <Button onClick={handleAddCategory}>
          <Plus className="mr-2 h-4 w-4" /> Add Category
        </Button>
      </div>

      {categories.length > 0 ? (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-flow-col auto-cols-fr mb-4 overflow-x-auto">
            {categories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="truncate">
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <div className="flex-1">
                      <Input
                        value={category.name}
                        onChange={(e) => handleCategoryChange(category.id, e.target.value)}
                        placeholder="Category Name"
                        className="text-xl font-bold"
                      />
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteCategory(category.id)}
                      className="ml-4"
                    >
                      <Trash2 className="h-4 w-4 mr-2" /> Delete Category
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {category.skills.map((skill, index) => (
                    <div key={skill.id} className="border rounded-lg p-4 space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">Skill #{index + 1}</h4>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => moveSkill(category.id, skill.id, "up")}
                            disabled={index === 0}
                          >
                            <MoveUp className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => moveSkill(category.id, skill.id, "down")}
                            disabled={index === category.skills.length - 1}
                          >
                            <MoveDown className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteSkill(category.id, skill.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`skill-name-${skill.id}`}>Skill Name</Label>
                          <Input
                            id={`skill-name-${skill.id}`}
                            value={skill.name}
                            onChange={(e) => handleSkillChange(category.id, skill.id, "name", e.target.value)}
                            placeholder="e.g. React"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`skill-icon-${skill.id}`}>Icon URL</Label>
                          <Input
                            id={`skill-icon-${skill.id}`}
                            value={skill.icon || ""}
                            onChange={(e) => handleSkillChange(category.id, skill.id, "icon", e.target.value)}
                            placeholder="URL to skill icon"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor={`skill-proficiency-${skill.id}`}>Proficiency ({skill.proficiency}%)</Label>
                          <span className="text-sm text-muted-foreground">{skill.proficiency}%</span>
                        </div>
                        <Input
                          id={`skill-proficiency-${skill.id}`}
                          type="range"
                          min="0"
                          max="100"
                          value={skill.proficiency}
                          onChange={(e) =>
                            handleSkillChange(category.id, skill.id, "proficiency", Number.parseInt(e.target.value))
                          }
                          className="w-full"
                        />
                      </div>
                    </div>
                  ))}

                  <Button variant="outline" onClick={() => handleAddSkill(category.id)} className="w-full">
                    <Plus className="mr-2 h-4 w-4" /> Add Skill
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      ) : (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground mb-4">No skill categories found. Add your first category.</p>
          <Button onClick={handleAddCategory}>
            <Plus className="mr-2 h-4 w-4" /> Add Category
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
