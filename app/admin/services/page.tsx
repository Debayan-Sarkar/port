"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Plus, Pencil, Trash2 } from "lucide-react"
import ServiceForm from "@/components/admin/service-form"
import { Card } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"

// Sample data for demonstration
const services = [
  { id: 1, title: "Web Development", active: true },
  { id: 2, title: "UI/UX Design", active: true },
  { id: 3, title: "Mobile App Development", active: true },
  { id: 4, title: "AI Integration", active: false },
]

export default function ServicesPage() {
  const [showForm, setShowForm] = useState(false)
  const [editingService, setEditingService] = useState<any>(null)
  const { toast } = useToast()

  const handleEdit = (service: any) => {
    setEditingService(service)
    setShowForm(true)
  }

  const handleAddNew = () => {
    setEditingService(null)
    setShowForm(true)
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setEditingService(null)
  }

  const handleSaveService = (serviceData: any) => {
    // In a real application, you would call an API to save the service
    toast({
      title: editingService ? "Service updated" : "Service created",
      description: editingService
        ? "The service has been successfully updated."
        : "The service has been successfully created.",
    })
    setShowForm(false)
  }

  const handleDeleteService = (serviceId: number) => {
    // In a real application, you would call an API to delete the service
    toast({
      title: "Service deleted",
      description: "The service has been successfully deleted.",
    })
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
    return <ServiceForm service={editingService} onClose={handleCloseForm} onSave={handleSaveService} />
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold tracking-tight"
        >
          Services
        </motion.h1>
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
          <Button onClick={handleAddNew} className="bg-red-500 hover:bg-red-600 text-white">
            <Plus className="mr-2 h-4 w-4" /> Add New Service
          </Button>
        </motion.div>
      </div>

      <Card className="bg-gray-900 border-gray-800 overflow-hidden">
        <motion.div variants={container} initial="hidden" animate="show">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-zinc-900/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800 bg-black/20">
                {services.map((service) => (
                  <motion.tr key={service.id} variants={item} className="hover:bg-zinc-900/30 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{service.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          service.active ? "bg-green-900 text-green-200" : "bg-yellow-900 text-yellow-200"
                        }`}
                      >
                        {service.active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex space-x-2">
                        <Button
                          onClick={() => handleEdit(service)}
                          size="sm"
                          variant="outline"
                          className="border-zinc-700 hover:border-blue-500 hover:text-blue-500"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          onClick={() => handleDeleteService(service.id)}
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
      </Card>
    </div>
  )
}
