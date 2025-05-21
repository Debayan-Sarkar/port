"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Users,
  FileEdit,
  Eye,
  MessageSquare,
  ArrowUpRight,
  TrendingUp,
  Clock,
  Calendar,
  Award,
  HelpCircle,
  Briefcase,
  Code,
} from "lucide-react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { initializeFirebase } from "@/app/actions/firebase-init"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    subscribers: 0,
    blogPosts: 0,
    pageViews: 0,
    messages: 0,
  })

  const [initializing, setInitializing] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setStats({
        subscribers: 128,
        blogPosts: 24,
        pageViews: 3452,
        messages: 17,
      })
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

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

  async function handleInitialize() {
    setInitializing(true)
    try {
      const result = await initializeFirebase()

      if (result.success) {
        toast({
          title: "Success",
          description: result.message,
        })
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to initialize Firebase",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Initialization error:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setInitializing(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <motion.h1
          className="text-3xl font-bold"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          Dashboard
        </motion.h1>
        <motion.div
          className="flex items-center text-sm text-gray-400 bg-gray-900 px-4 py-2 rounded-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Calendar className="h-4 w-4 mr-2" />
          Last updated: {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
        </motion.div>
      </div>

      <div className="mt-4">
        <Button
          onClick={handleInitialize}
          disabled={initializing}
          variant="outline"
          className="bg-red-500/10 text-red-500 hover:bg-red-500/20 border-red-500/20"
        >
          {initializing ? "Initializing..." : "Initialize Firebase Data"}
        </Button>
      </div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item}>
          <StatCard
            title="New Subscribers"
            value={stats.subscribers}
            icon={<Users className="h-6 w-6 text-blue-400" />}
            change={+12}
            href="/admin/newsletter"
          />
        </motion.div>

        <motion.div variants={item}>
          <StatCard
            title="Blog Posts"
            value={stats.blogPosts}
            icon={<FileEdit className="h-6 w-6 text-green-400" />}
            change={+3}
            href="/admin/blog"
          />
        </motion.div>

        <motion.div variants={item}>
          <StatCard
            title="Page Views"
            value={stats.pageViews}
            icon={<Eye className="h-6 w-6 text-purple-400" />}
            change={+254}
            href="#"
          />
        </motion.div>

        <motion.div variants={item}>
          <StatCard
            title="New Messages"
            value={stats.messages}
            icon={<MessageSquare className="h-6 w-6 text-yellow-400" />}
            change={-2}
            href="/admin/contact"
          />
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Recent Activity</h2>
                <button className="text-sm text-red-500 hover:text-red-400 transition-colors">View All</button>
              </div>

              <div className="space-y-4">
                {[
                  { action: "New subscriber", time: "2 minutes ago", icon: <Users size={16} /> },
                  { action: "Blog post published", time: "1 hour ago", icon: <FileEdit size={16} /> },
                  { action: "Project updated", time: "3 hours ago", icon: <TrendingUp size={16} /> },
                  { action: "New contact message", time: "5 hours ago", icon: <MessageSquare size={16} /> },
                  { action: "Service added", time: "1 day ago", icon: <Briefcase size={16} /> },
                  { action: "Award received", time: "2 days ago", icon: <Award size={16} /> },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.3 }}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center">
                      <div className="p-2 bg-gray-800 rounded-full mr-3">{item.icon}</div>
                      <div>
                        <p className="font-medium">{item.action}</p>
                        <p className="text-sm text-gray-400 flex items-center">
                          <Clock size={12} className="mr-1" /> {item.time}
                        </p>
                      </div>
                    </div>
                    <button className="p-2 hover:bg-gray-700 rounded-full transition-colors">
                      <ArrowUpRight size={16} />
                    </button>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <Card className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-all duration-300 h-full">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Quick Actions</h2>
              </div>

              <div className="space-y-3">
                {[
                  { title: "Add New Blog Post", icon: <FileEdit size={18} />, href: "/admin/blog" },
                  { title: "Update Services", icon: <Briefcase size={18} />, href: "/admin/services" },
                  { title: "Manage FAQ", icon: <HelpCircle size={18} />, href: "/admin/faq" },
                  { title: "Upload Media", icon: <Eye size={18} />, href: "/admin/media" },
                  { title: "Edit Tech Stack", icon: <Code size={18} />, href: "/admin/technologies" },
                ].map((action, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index + 0.5, duration: 0.3 }}
                  >
                    <Link href={action.href}>
                      <div className="p-3 rounded-lg bg-gray-800 hover:bg-gray-750 transition-colors flex items-center justify-between cursor-pointer">
                        <div className="flex items-center">
                          <div className="p-2 bg-gray-700 rounded-full mr-3">{action.icon}</div>
                          <span>{action.title}</span>
                        </div>
                        <ArrowUpRight size={16} />
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

interface StatCardProps {
  title: string
  value: number
  icon: React.ReactNode
  change: number
  href: string
}

function StatCard({ title, value, icon, change, href }: StatCardProps) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    // Animate the counter
    const duration = 1500
    const frameDuration = 1000 / 60
    const totalFrames = Math.round(duration / frameDuration)
    let frame = 0

    const counter = setInterval(() => {
      frame++
      const progress = frame / totalFrames
      const currentCount = Math.round(value * progress)

      setDisplayValue(currentCount)

      if (frame === totalFrames) {
        clearInterval(counter)
      }
    }, frameDuration)

    return () => clearInterval(counter)
  }, [value])

  return (
    <Link href={href}>
      <Card className="bg-gray-900 border-gray-800 hover:shadow-xl transition-all duration-300 hover:translate-y-[-5px] hover:border-gray-700 h-full group">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-400 font-medium group-hover:text-white transition-colors">{title}</h3>
            <div className="transform group-hover:scale-110 transition-transform">{icon}</div>
          </div>
          <div className="flex items-end justify-between">
            <div className="text-3xl font-bold">{displayValue.toLocaleString()}</div>
            <div className={`flex items-center text-sm ${change >= 0 ? "text-green-500" : "text-red-500"}`}>
              {change >= 0 ? "+" : ""}
              {change}%
              <TrendingUp size={16} className="ml-1" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
