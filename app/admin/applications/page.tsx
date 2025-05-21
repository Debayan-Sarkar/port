"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import {
  Briefcase,
  Calendar,
  CheckCircle,
  Clock,
  Download,
  FileText,
  Mail,
  Phone,
  Trash2,
  XCircle,
  ExternalLink,
  Search,
} from "lucide-react"
import {
  acceptApplication,
  rejectApplication,
  deleteApplication,
  getApplications,
} from "@/app/actions/admin-applications"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Application = {
  id: string
  name: string
  email: string
  phone: string
  position: string
  experience: string
  message?: string
  resumeUrl?: string
  linkedinUrl?: string
  portfolioUrl?: string
  status: "pending" | "accepted" | "rejected"
  createdAt: string
}

export default function ApplicationsPage() {
  const { toast } = useToast()
  const [applications, setApplications] = useState<Application[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [positionFilter, setPositionFilter] = useState("all")
  const [experienceFilter, setExperienceFilter] = useState("all")

  useEffect(() => {
    loadApplications()
  }, [])

  async function loadApplications() {
    setIsLoading(true)
    try {
      const data = await getApplications()
      setApplications(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load applications",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function handleAccept(id: string) {
    try {
      await acceptApplication(id)
      setApplications(applications.map((app) => (app.id === id ? { ...app, status: "accepted" } : app)))
      toast({
        title: "Application Accepted",
        description: "The applicant has been notified via email",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to accept application",
        variant: "destructive",
      })
    }
  }

  async function handleReject(id: string) {
    try {
      await rejectApplication(id)
      setApplications(applications.map((app) => (app.id === id ? { ...app, status: "rejected" } : app)))
      toast({
        title: "Application Rejected",
        description: "The application has been rejected",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reject application",
        variant: "destructive",
      })
    }
  }

  async function handleDelete(id: string) {
    if (confirm("Are you sure you want to delete this application? This action cannot be undone.")) {
      try {
        await deleteApplication(id)
        setApplications(applications.filter((app) => app.id !== id))
        toast({
          title: "Application Deleted",
          description: "The application has been permanently deleted",
        })
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete application",
          variant: "destructive",
        })
      }
    }
  }

  // Filter applications based on search term and filters
  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.position.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesPosition = positionFilter === "all" || app.position === positionFilter
    const matchesExperience = experienceFilter === "all" || app.experience === experienceFilter

    return matchesSearch && matchesPosition && matchesExperience
  })

  // Get unique positions and experience levels for filters
  const positions = Array.from(new Set(applications.map((app) => app.position)))
  const experienceLevels = Array.from(new Set(applications.map((app) => app.experience)))

  // Count applications by status
  const pendingCount = applications.filter((app) => app.status === "pending").length
  const acceptedCount = applications.filter((app) => app.status === "accepted").length
  const rejectedCount = applications.filter((app) => app.status === "rejected").length

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <motion.h1
          className="text-3xl font-bold"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          Job Applications
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

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Pending</p>
              <p className="text-2xl font-bold">{pendingCount}</p>
            </div>
            <div className="p-3 bg-yellow-500/10 rounded-full">
              <Clock className="h-6 w-6 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Accepted</p>
              <p className="text-2xl font-bold">{acceptedCount}</p>
            </div>
            <div className="p-3 bg-green-500/10 rounded-full">
              <CheckCircle className="h-6 w-6 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Rejected</p>
              <p className="text-2xl font-bold">{rejectedCount}</p>
            </div>
            <div className="p-3 bg-red-500/10 rounded-full">
              <XCircle className="h-6 w-6 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle>Filter Applications</CardTitle>
          <CardDescription>Search and filter job applications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search by name, email, position..."
                className="pl-9 bg-gray-800 border-gray-700"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative">
              <div className="absolute left-3 top-3 h-4 w-4 text-gray-500">
                <Briefcase className="h-4 w-4" />
              </div>
              <Select value={positionFilter} onValueChange={setPositionFilter}>
                <SelectTrigger className="pl-9 bg-gray-800 border-gray-700">
                  <SelectValue placeholder="Filter by position" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="all">All Positions</SelectItem>
                  {positions.map((position) => (
                    <SelectItem key={position} value={position}>
                      {position}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="relative">
              <div className="absolute left-3 top-3 h-4 w-4 text-gray-500">
                <Clock className="h-4 w-4" />
              </div>
              <Select value={experienceFilter} onValueChange={setExperienceFilter}>
                <SelectTrigger className="pl-9 bg-gray-800 border-gray-700">
                  <SelectValue placeholder="Filter by experience" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="all">All Experience Levels</SelectItem>
                  {experienceLevels.map((exp) => (
                    <SelectItem key={exp} value={exp}>
                      {exp}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid grid-cols-3 mb-6 bg-gray-800">
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="accepted">Accepted</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>

        {["pending", "accepted", "rejected"].map((status) => (
          <TabsContent key={status} value={status} className="space-y-4">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin h-8 w-8 border-4 border-[#ff4d4d] border-t-transparent rounded-full"></div>
              </div>
            ) : filteredApplications.filter((app) => app.status === status).length === 0 ? (
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <div className="p-4 bg-gray-800 rounded-full mb-4">
                    {status === "pending" ? (
                      <Clock className="h-8 w-8 text-yellow-500" />
                    ) : status === "accepted" ? (
                      <CheckCircle className="h-8 w-8 text-green-500" />
                    ) : (
                      <XCircle className="h-8 w-8 text-red-500" />
                    )}
                  </div>
                  <h3 className="text-xl font-medium mb-2">No {status} applications</h3>
                  <p className="text-gray-400 text-center max-w-md">
                    {status === "pending"
                      ? "There are no pending applications to review at this time."
                      : status === "accepted"
                        ? "You haven't accepted any applications yet."
                        : "You haven't rejected any applications yet."}
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredApplications
                .filter((app) => app.status === status)
                .map((application) => (
                  <ApplicationCard
                    key={application.id}
                    application={application}
                    onAccept={() => handleAccept(application.id)}
                    onReject={() => handleReject(application.id)}
                    onDelete={() => handleDelete(application.id)}
                  />
                ))
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

function ApplicationCard({
  application,
  onAccept,
  onReject,
  onDelete,
}: {
  application: Application
  onAccept: () => void
  onReject: () => void
  onDelete: () => void
}) {
  const {
    id,
    name,
    email,
    phone,
    position,
    experience,
    message,
    resumeUrl,
    linkedinUrl,
    portfolioUrl,
    status,
    createdAt,
  } = application

  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })

  const formattedTime = new Date(createdAt).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <Card className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-all">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl flex items-center gap-2">
              {name}
              <Badge
                className={
                  status === "pending"
                    ? "bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30"
                    : status === "accepted"
                      ? "bg-green-500/20 text-green-500 hover:bg-green-500/30"
                      : "bg-red-500/20 text-red-500 hover:bg-red-500/30"
                }
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Badge>
            </CardTitle>
            <CardDescription className="flex items-center mt-1">
              <Briefcase className="h-3.5 w-3.5 mr-1.5" />
              {position} • {experience} experience
            </CardDescription>
          </div>
          <div className="text-right text-sm text-gray-400">
            <div className="flex items-center justify-end">
              <Calendar className="h-3.5 w-3.5 mr-1.5" />
              {formattedDate}
            </div>
            <div className="flex items-center justify-end mt-1">
              <Clock className="h-3.5 w-3.5 mr-1.5" />
              {formattedTime}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center text-sm">
              <Mail className="h-4 w-4 mr-2 text-gray-400" />
              <a href={`mailto:${email}`} className="text-blue-400 hover:underline">
                {email}
              </a>
            </div>
            <div className="flex items-center text-sm">
              <Phone className="h-4 w-4 mr-2 text-gray-400" />
              <a href={`tel:${phone}`} className="text-blue-400 hover:underline">
                {phone}
              </a>
            </div>
          </div>
          <div className="space-y-2">
            {linkedinUrl && (
              <div className="flex items-center text-sm">
                <svg className="h-4 w-4 mr-2 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline flex items-center"
                >
                  LinkedIn Profile
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </div>
            )}
            {portfolioUrl && (
              <div className="flex items-center text-sm">
                <Globe className="h-4 w-4 mr-2 text-gray-400" />
                <a
                  href={portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline flex items-center"
                >
                  Portfolio Website
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </div>
            )}
            {resumeUrl && (
              <div className="flex items-center text-sm">
                <FileText className="h-4 w-4 mr-2 text-gray-400" />
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline flex items-center"
                >
                  View Resume
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </div>
            )}
          </div>
        </div>

        {message && (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-300 mb-1">Cover Letter / Additional Information:</h4>
            <div className="bg-gray-800 p-3 rounded-md text-sm text-gray-300 max-h-32 overflow-y-auto">{message}</div>
          </div>
        )}

        <div className="flex flex-wrap gap-2 pt-2">
          {status === "pending" && (
            <>
              <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white" onClick={onAccept}>
                <CheckCircle className="h-4 w-4 mr-1" /> Accept
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-red-500 text-red-500 hover:bg-red-500/10"
                onClick={onReject}
              >
                <XCircle className="h-4 w-4 mr-1" /> Reject
              </Button>
            </>
          )}
          {resumeUrl && (
            <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800" asChild>
              <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                <Download className="h-4 w-4 mr-1" /> Download Resume
              </a>
            </Button>
          )}
          <Button
            size="sm"
            variant="outline"
            className="border-red-500 text-red-500 hover:bg-red-500/10 ml-auto"
            onClick={onDelete}
          >
            <Trash2 className="h-4 w-4 mr-1" /> Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function Globe(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" x2="22" y1="12" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
}
