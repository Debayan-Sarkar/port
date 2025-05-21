"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Plus, Pencil, Trash2 } from "lucide-react"
import PlanForm from "@/components/admin/plan-form"

// Sample data for demonstration
const plans = [
  { id: 1, name: "Basic Plan", price: "$99" },
  { id: 2, name: "Professional", price: "$199" },
  { id: 3, name: "Enterprise", price: "$499" },
]

export default function PlansPage() {
  const [showForm, setShowForm] = useState(false)
  const [editingPlan, setEditingPlan] = useState<any>(null)

  const handleEdit = (plan: any) => {
    setEditingPlan(plan)
    setShowForm(true)
  }

  const handleAddNew = () => {
    setEditingPlan(null)
    setShowForm(true)
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setEditingPlan(null)
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  if (showForm) {
    return <PlanForm plan={editingPlan} onClose={handleCloseForm} />
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold tracking-tight"
        >
          Plan Packages
        </motion.h1>
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
          <Button onClick={handleAddNew} className="bg-red-500 hover:bg-red-600 text-white">
            <Plus className="mr-2 h-4 w-4" /> Add New Plan
          </Button>
        </motion.div>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="rounded-lg border border-zinc-800 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-zinc-900/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800 bg-black/20">
              {plans.map((plan) => (
                <motion.tr key={plan.id} variants={item} className="hover:bg-zinc-900/30 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{plan.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{plan.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => handleEdit(plan)}
                        size="sm"
                        variant="outline"
                        className="border-zinc-700 hover:border-blue-500 hover:text-blue-500"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-zinc-700 hover:border-red-500 hover:text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}
