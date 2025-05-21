"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Trash2, Save, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface TimelineFormProps {
  initialData?: any
  onSave: (data: any) => void
  onDelete?: () => void
  isLoading?: boolean
}

export function TimelineForm({ initialData, onSave, onDelete, isLoading = false }: TimelineFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    description: "",
    icon: "briefcase",
    color: "blue",
  })

  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
    } else {
      setFormData({
        title: "",
        date: "",
        description: "",
        icon: "briefcase",
        color: "blue",
      })
    }
  }, [initialData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  const iconOptions = [
    { value: "briefcase", label: "Briefcase" },
    { value: "rocket", label: "Rocket" },
    { value: "graduation-cap", label: "Graduation Cap" },
    { value: "award", label: "Award" },
    { value: "users", label: "Team" },
    { value: "code", label: "Code" },
    { value: "lightbulb", label: "Idea" },
    { value: "expand", label: "Expand" },
  ]

  const colorOptions = [
    { value: "blue", label: "Blue" },
    { value: "green", label: "Green" },
    { value: "red", label: "Red" },
    { value: "purple", label: "Purple" },
    { value: "orange", label: "Orange" },
    { value: "pink", label: "Pink" },
    { value: "yellow", label: "Yellow" },
    { value: "indigo", label: "Indigo" },
  ]

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <h2 className="text-xl font-semibold mb-4">{initialData ? "Edit Timeline Event" : "Add New Timeline Event"}</h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="space-y-4"
      >
        <div>
          <Label htmlFor="title">Event Title</Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter the event title"
            className="bg-gray-800 border-gray-700"
            required
          />
        </div>

        <div>
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            className="bg-gray-800 border-gray-700"
            required
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter a description of the event"
            className="bg-gray-800 border-gray-700 min-h-[100px]"
            required
          />
        </div>

        <div>
          <Label htmlFor="icon">Icon</Label>
          <Select value={formData.icon} onValueChange={(value) => handleSelectChange("icon", value)}>
            <SelectTrigger className="bg-gray-800 border-gray-700">
              <SelectValue placeholder="Select an icon" />
            </SelectTrigger>
            <SelectContent>
              {iconOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Color</Label>
          <RadioGroup
            value={formData.color}
            onValueChange={(value) => handleSelectChange("color", value)}
            className="grid grid-cols-4 gap-2 mt-2"
          >
            {colorOptions.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={`color-${option.value}`} className="sr-only" />
                <Label
                  htmlFor={`color-${option.value}`}
                  className={`flex items-center justify-center h-8 w-full rounded-md cursor-pointer border-2 transition-all ${
                    formData.color === option.value
                      ? `border-${option.value}-500 bg-${option.value}-500/20`
                      : "border-gray-700 bg-gray-800 hover:border-gray-600"
                  }`}
                >
                  <div className={`h-4 w-4 rounded-full bg-${option.value}-500`} />
                  <span className="ml-2 text-xs">{option.label}</span>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="flex flex-col sm:flex-row justify-between gap-4"
      >
        <div className="flex-1">
          {onDelete && (
            <Button type="button" variant="destructive" onClick={onDelete} disabled={isLoading} className="w-full">
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Trash2 className="h-4 w-4 mr-2" />}
              Delete Event
            </Button>
          )}
        </div>
        <div className="flex-1">
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
            {initialData ? "Update Event" : "Save Event"}
          </Button>
        </div>
      </motion.div>
    </form>
  )
}
