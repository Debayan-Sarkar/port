"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Plus, Pencil, Eye, Trash2, Search, Filter } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { ProjectForm } from "@/components/admin/project-form"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

// Sample data for demonstration
const projects = [
  {
    id: 1,
    title: "E-Commerce Dashboard",
    image: "/ecommerce-dashboard-overview.png",
    slug: "ecommerce-dashboard",
    published: true,
  },
  {
    id: 2,
    title: "AI Content Creator",
    image: "/ai-content-creator-dashboard.png",
    slug: "ai-content-creator",
    published: true,
  },
  {
    id: 3,
    title: "Modern Fitness App",
    image: "/modern-fitness-dashboard.png",
    slug: "modern-fitness-app",
    published: false,
  },
  {
    id: 4,
    title: "Chat Interface",
    image: "/modern-chat-interface.png",
    slug: "chat-interface",
    published: true,
  },
]

export default function ProjectsPage() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filter, setFilter] = useState("all")
  const { toast } = useToast()

  const handleAddNew = () => {
    setEditingProject(null)
    setIsFormOpen(true)
  }

  const handleEdit = (project: any) => {
    setEditingProject(project)
    setIsFormOpen(true)
  }

  const handleCloseForm = () => {
    setIsFormOpen(false)
    setEditingProject(null)
  }

  const handleDelete = (projectId: number) => {
    // In a real application, you would call an API to delete the project
    toast({
      title: "Project deleted",
      description: "The project has been successfully deleted.",
    })
  }

  const handleSaveProject = (projectData: any) => {
    // In a real application, you would call an API to save the project
    toast({
      title: editingProject ? "Project updated" : "Project created",
      description: editingProject
        ? "The project has been successfully updated."
        : "The project has been successfully created.",
    })
    setIsFormOpen(false)
  }

  // Filter projects based on search query and filter
  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter =
      filter === "all" || (filter === "published" && project.published) || (filter === "draft" && !project.published)
    return matchesSearch && matchesFilter
  })

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  if (isFormOpen) {
    return <ProjectForm project={editingProject} onClose={handleCloseForm} onSave={handleSaveProject} />
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold tracking-tight"
        >
          Projects
        </motion.h1>
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
          <Button onClick={handleAddNew} className="bg-red-500 hover:bg-red-600 text-white">
            <Plus className="mr-2 h-4 w-4" /> Add New Project
          </Button>
        </motion.div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button variant="outline" size="sm" className="border-gray-700 hover:bg-gray-700">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <select
            className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Projects</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      <Card className="bg-gray-900 border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-800/50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Project
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Slug</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <motion.tbody variants={container} initial="hidden" animate="show" className="divide-y divide-gray-800">
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project) => (
                  <motion.tr key={project.id} variants={item} className="hover:bg-gray-800/50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-md bg-gray-800">
                          <Image
                            src={project.image || "/placeholder.svg"}
                            alt={project.title}
                            width={40}
                            height={40}
                            className="h-10 w-10 object-cover"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium">{project.title}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-400">{project.slug}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          project.published ? "bg-green-900 text-green-200" : "bg-yellow-900 text-yellow-200"
                        }`}
                      >
                        {project.published ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <Button
                          onClick={() => handleEdit(project)}
                          size="sm"
                          variant="outline"
                          className="border-zinc-700 hover:border-blue-500 hover:text-blue-500"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Link href={`/projects/${project.slug}`} target="_blank">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-zinc-700 hover:border-green-500 hover:text-green-500"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          onClick={() => handleDelete(project.id)}
                          size="sm"
                          variant="outline"
                          className="border-zinc-700 hover:border-red-500 hover:text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-gray-400">
                    No projects found. Try adjusting your search or filter.
                  </td>
                </tr>
              )}
            </motion.tbody>
          </table>
        </div>

        <div className="px-6 py-4 bg-gray-800/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-400">
            Showing <span className="font-medium">{filteredProjects.length}</span> of{" "}
            <span className="font-medium">{projects.length}</span> projects
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="border-gray-700 hover:bg-gray-700" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" className="border-gray-700 hover:bg-gray-700" disabled>
              Next
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
