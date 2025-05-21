"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Trash2, Save, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface FaqFormProps {
  initialData?: any
  onSave: (data: any) => void
  onDelete?: () => void
  isLoading?: boolean
}

export function FaqForm({ initialData, onSave, onDelete, isLoading = false }: FaqFormProps) {
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    category: "general",
    isActive: true,
  })

  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
    } else {
      setFormData({
        question: "",
        answer: "",
        category: "general",
        isActive: true,
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

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <h2 className="text-xl font-semibold mb-4">{initialData ? "Edit FAQ" : "Add New FAQ"}</h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="space-y-4"
      >
        <div>
          <Label htmlFor="question">Question</Label>
          <Input
            id="question"
            name="question"
            value={formData.question}
            onChange={handleChange}
            placeholder="Enter the question"
            className="bg-gray-800 border-gray-700"
            required
          />
        </div>

        <div>
          <Label htmlFor="answer">Answer</Label>
          <Textarea
            id="answer"
            name="answer"
            value={formData.answer}
            onChange={handleChange}
            placeholder="Enter the answer"
            className="bg-gray-800 border-gray-700 min-h-[120px]"
            required
          />
        </div>

        <div>
          <Label htmlFor="category">Category</Label>
          <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
            <SelectTrigger className="bg-gray-800 border-gray-700">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="general">General</SelectItem>
              <SelectItem value="services">Services</SelectItem>
              <SelectItem value="pricing">Pricing</SelectItem>
              <SelectItem value="process">Process</SelectItem>
              <SelectItem value="technical">Technical</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="isActive"
            checked={formData.isActive}
            onCheckedChange={(checked) => handleSwitchChange("isActive", checked)}
          />
          <Label htmlFor="isActive">Active</Label>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Accordion type="single" collapsible className="border border-gray-800 rounded-md">
          <AccordionItem value="preview" className="border-b-0">
            <AccordionTrigger className="px-4 py-2 hover:bg-gray-800 rounded-t-md">Preview</AccordionTrigger>
            <AccordionContent className="px-4 py-2 bg-gray-800 rounded-b-md">
              <div className="space-y-2">
                <h3 className="font-medium">{formData.question || "Question preview"}</h3>
                <p className="text-sm text-gray-300">{formData.answer || "Answer preview"}</p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
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
              Delete FAQ
            </Button>
          )}
        </div>
        <div className="flex-1">
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
            {initialData ? "Update FAQ" : "Save FAQ"}
          </Button>
        </div>
      </motion.div>
    </form>
  )
}
