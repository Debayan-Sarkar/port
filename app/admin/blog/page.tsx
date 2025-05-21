"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Plus, Pencil, Eye, Trash2 } from "lucide-react"
import BlogForm from "@/components/admin/blog-form"

// Sample data for demonstration
const blogPosts = [
  { id: 1, title: "Web Development Trends 2023", date: "2023-05-15" },
  { id: 2, title: "Optimizing React Performance", date: "2023-06-22" },
  { id: 3, title: "UX Design Principles", date: "2023-07-10" },
]

export default function BlogPage() {
  const [showForm, setShowForm] = useState(false)
  const [editingPost, setEditingPost] = useState<any>(null)

  const handleEdit = (post: any) => {
    setEditingPost(post)
    setShowForm(true)
  }

  const handleAddNew = () => {
    setEditingPost(null)
    setShowForm(true)
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setEditingPost(null)
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
    return <BlogForm post={editingPost} onClose={handleCloseForm} />
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold tracking-tight"
        >
          Blog Posts
        </motion.h1>
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
          <Button onClick={handleAddNew} className="bg-red-500 hover:bg-red-600 text-white">
            <Plus className="mr-2 h-4 w-4" /> Add New Post
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Publication Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800 bg-black/20">
              {blogPosts.map((post) => (
                <motion.tr key={post.id} variants={item} className="hover:bg-zinc-900/30 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{post.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{post.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => handleEdit(post)}
                        size="sm"
                        variant="outline"
                        className="border-zinc-700 hover:border-blue-500 hover:text-blue-500"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-zinc-700 hover:border-green-500 hover:text-green-500"
                      >
                        <Eye className="h-4 w-4" />
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
