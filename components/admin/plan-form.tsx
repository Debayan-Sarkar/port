"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Plus, X } from "lucide-react"

export default function PlanForm({ plan, onClose }: { plan?: any; onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: plan?.name || "",
    price: plan?.price || "",
    description: plan?.description || "",
    popular: plan?.popular || false,
  })

  const [features, setFeatures] = useState<string[]>(plan?.features || [""])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, popular: checked }))
  }

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...features]
    newFeatures[index] = value
    setFeatures(newFeatures)
  }

  const addFeature = () => {
    setFeatures([...features, ""])
  }

  const removeFeature = (index: number) => {
    const newFeatures = features.filter((_, i) => i !== index)
    setFeatures(newFeatures)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would handle the form submission
    console.log("Form submitted:", { ...formData, features })
    onClose()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button onClick={onClose} variant="ghost" size="icon" className="rounded-full hover:bg-zinc-800">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">{plan ? "Edit Plan" : "Add New Plan"}</h1>
        </div>

        <div className="flex space-x-2">
          <Button variant="outline" onClick={onClose} className="border-zinc-700 hover:bg-zinc-800">
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-red-500 hover:bg-red-600 text-white">
            Save Plan
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Plan Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter plan name"
                className="bg-zinc-900/50 border-zinc-800 focus:border-red-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="$99/mo"
                className="bg-zinc-900/50 border-zinc-800 focus:border-red-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Brief plan description"
                className="h-24 bg-zinc-900/50 border-zinc-800 focus:border-red-500"
              />
            </div>

            <div className="flex items-center space-x-2 pt-4">
              <Checkbox id="popular" checked={formData.popular} onCheckedChange={handleCheckboxChange} />
              <Label
                htmlFor="popular"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Mark as popular plan
              </Label>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Plan Features</Label>
                <Button
                  type="button"
                  onClick={addFeature}
                  variant="outline"
                  size="sm"
                  className="border-zinc-700 hover:border-red-500 hover:text-red-500"
                >
                  <Plus className="h-4 w-4 mr-1" /> Add Feature
                </Button>
              </div>

              <div className="space-y-2">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      value={feature}
                      onChange={(e) => handleFeatureChange(index, e.target.value)}
                      placeholder="Enter feature"
                      className="bg-zinc-900/50 border-zinc-800 focus:border-red-500"
                    />
                    <Button
                      type="button"
                      onClick={() => removeFeature(index)}
                      variant="ghost"
                      size="icon"
                      className="hover:bg-red-500/20 hover:text-red-500"
                      disabled={features.length === 1}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </form>
    </motion.div>
  )
}
