"use client"

import type React from "react"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Plus, Trash2, FileText } from "lucide-react"
import { Switch } from "@/components/ui/switch"

const resumeSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters" }),
  subtitle: z.string().min(2, { message: "Subtitle must be at least 2 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  resumeFile: z.string().min(1, { message: "Resume file is required" }),
  cvFile: z.string().optional(),
  showDownloadButtons: z.boolean(),
  education: z.array(
    z.object({
      id: z.string().optional(),
      degree: z.string().min(2, { message: "Degree must be at least 2 characters" }),
      institution: z.string().min(2, { message: "Institution must be at least 2 characters" }),
      location: z.string().min(2, { message: "Location must be at least 2 characters" }),
      startDate: z.string().min(4, { message: "Start date is required" }),
      endDate: z.string().min(4, { message: "End date is required" }),
      description: z.string().optional(),
    }),
  ),
  certifications: z.array(
    z.object({
      id: z.string().optional(),
      name: z.string().min(2, { message: "Name must be at least 2 characters" }),
      issuer: z.string().min(2, { message: "Issuer must be at least 2 characters" }),
      date: z.string().min(4, { message: "Date is required" }),
      url: z
        .string()
        .url({ message: "Please enter a valid URL" })
        .optional()
        .or(z.literal('")),r a valid URL" }).optional().or(z.literal("')),
    }),
  ),
})

type ResumeData = z.infer<typeof resumeSchema>

// Mock data - in a real app, this would come from your database
const initialResumeData: ResumeData = {
  title: "Professional Resume",
  subtitle: "Full Stack Developer & UI/UX Designer",
  description:
    "Experienced developer with a passion for creating beautiful, functional, and user-friendly applications. Specialized in modern web technologies and frameworks.",
  resumeFile: "/resume.pdf",
  cvFile: "/cv.pdf",
  showDownloadButtons: true,
  education: [
    {
      id: "1",
      degree: "Master of Computer Science",
      institution: "Stanford University",
      location: "Stanford, CA",
      startDate: "2018",
      endDate: "2020",
      description: "Specialized in Artificial Intelligence and Machine Learning",
    },
    {
      id: "2",
      degree: "Bachelor of Science in Computer Engineering",
      institution: "MIT",
      location: "Cambridge, MA",
      startDate: "2014",
      endDate: "2018",
      description: "Focus on Software Engineering and Data Structures",
    },
  ],
  certifications: [
    {
      id: "1",
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2022",
      url: "https://aws.amazon.com/certification/",
    },
    {
      id: "2",
      name: "Google Professional Cloud Developer",
      issuer: "Google Cloud",
      date: "2021",
      url: "https://cloud.google.com/certification/cloud-developer",
    },
  ],
}

export function ResumeForm() {
  const { toast } = useToast()
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData)
  const [newEducation, setNewEducation] = useState({
    degree: "",
    institution: "",
    location: "",
    startDate: "",
    endDate: "",
    description: "",
  })
  const [newCertification, setNewCertification] = useState({
    name: "",
    issuer: "",
    date: "",
    url: "",
  })
  const [resumePreview, setResumePreview] = useState<string | null>(null)
  const [cvPreview, setCvPreview] = useState<string | null>(null)

  const form = useForm<ResumeData>({
    resolver: zodResolver(resumeSchema),
    defaultValues: initialResumeData,
  })

  const onSubmit = (data: ResumeData) => {
    setResumeData(data)
    toast({
      title: "Resume updated",
      description: "Your resume information has been updated successfully.",
    })
  }

  const handleResumeFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real app, you would upload this file to your server or cloud storage
      // For now, we'll just create a local URL for preview
      form.setValue("resumeFile", file.name) // In real app, this would be the URL from your server
      setResumePreview(URL.createObjectURL(file))
    }
  }

  const handleCVFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      form.setValue("cvFile", file.name) // In real app, this would be the URL from your server
      setCvPreview(URL.createObjectURL(file))
    }
  }

  const addEducation = () => {
    const education = form.getValues("education") || []
    form.setValue("education", [
      ...education,
      {
        id: Date.now().toString(),
        ...newEducation,
      },
    ])
    setNewEducation({
      degree: "",
      institution: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
    })
  }

  const removeEducation = (id: string) => {
    const education = form.getValues("education")
    form.setValue(
      "education",
      education.filter((item) => item.id !== id),
    )
  }

  const addCertification = () => {
    const certifications = form.getValues("certifications") || []
    form.setValue("certifications", [
      ...certifications,
      {
        id: Date.now().toString(),
        ...newCertification,
      },
    ])
    setNewCertification({
      name: "",
      issuer: "",
      date: "",
      url: "",
    })
  }

  const removeCertification = (id: string) => {
    const certifications = form.getValues("certifications")
    form.setValue(
      "certifications",
      certifications.filter((item) => item.id !== id),
    )
  }

  return (
    <Tabs defaultValue="general" className="space-y-6">
      <TabsList>
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="education">Education</TabsTrigger>
        <TabsTrigger value="certifications">Certifications</TabsTrigger>
      </TabsList>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <TabsContent value="general">
            <Card>
              <CardContent className="pt-6 space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Resume Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Professional Resume" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="subtitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Resume Subtitle</FormLabel>
                      <FormControl>
                        <Input placeholder="Your profession or title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Resume Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Brief description of your professional profile"
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="resumeFile"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Resume File (PDF)</FormLabel>
                        <FormControl>
                          <div className="flex flex-col space-y-4">
                            <div className="flex items-center gap-4">
                              <Input
                                type="file"
                                accept=".pdf"
                                className="hidden"
                                id="resume-upload"
                                onChange={handleResumeFileChange}
                              />
                              <Input {...field} placeholder="Resume file path" className="flex-1" />
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={() => document.getElementById("resume-upload")?.click()}
                              >
                                <Upload className="h-4 w-4" />
                              </Button>
                            </div>
                            {field.value && (
                              <div className="flex items-center gap-2 text-sm">
                                <FileText className="h-4 w-4" />
                                <span>{field.value}</span>
                              </div>
                            )}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="cvFile"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CV File (PDF, Optional)</FormLabel>
                        <FormControl>
                          <div className="flex flex-col space-y-4">
                            <div className="flex items-center gap-4">
                              <Input
                                type="file"
                                accept=".pdf"
                                className="hidden"
                                id="cv-upload"
                                onChange={handleCVFileChange}
                              />
                              <Input {...field} placeholder="CV file path (optional)" className="flex-1" />
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={() => document.getElementById("cv-upload")?.click()}
                              >
                                <Upload className="h-4 w-4" />
                              </Button>
                            </div>
                            {field.value && (
                              <div className="flex items-center gap-2 text-sm">
                                <FileText className="h-4 w-4" />
                                <span>{field.value}</span>
                              </div>
                            )}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="showDownloadButtons"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between">
                      <div>
                        <FormLabel>Show Download Buttons</FormLabel>
                        <FormDescription>Display buttons for visitors to download your resume/CV</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="education">
            <Card>
              <CardContent className="pt-6 space-y-6">
                <h3 className="text-lg font-medium">Add Education</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <FormLabel>Degree</FormLabel>
                    <Input
                      placeholder="Master of Computer Science"
                      value={newEducation.degree}
                      onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
                    />
                  </div>
                  <div>
                    <FormLabel>Institution</FormLabel>
                    <Input
                      placeholder="Stanford University"
                      value={newEducation.institution}
                      onChange={(e) => setNewEducation({ ...newEducation, institution: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <FormLabel>Location</FormLabel>
                    <Input
                      placeholder="Stanford, CA"
                      value={newEducation.location}
                      onChange={(e) => setNewEducation({ ...newEducation, location: e.target.value })}
                    />
                  </div>
                  <div>
                    <FormLabel>Start Date</FormLabel>
                    <Input
                      placeholder="2018"
                      value={newEducation.startDate}
                      onChange={(e) => setNewEducation({ ...newEducation, startDate: e.target.value })}
                    />
                  </div>
                  <div>
                    <FormLabel>End Date</FormLabel>
                    <Input
                      placeholder="2020"
                      value={newEducation.endDate}
                      onChange={(e) => setNewEducation({ ...newEducation, endDate: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <FormLabel>Description (Optional)</FormLabel>
                  <Textarea
                    placeholder="Specialized in Artificial Intelligence and Machine Learning"
                    value={newEducation.description}
                    onChange={(e) => setNewEducation({ ...newEducation, description: e.target.value })}
                  />
                </div>

                <Button
                  type="button"
                  onClick={addEducation}
                  disabled={
                    !newEducation.degree ||
                    !newEducation.institution ||
                    !newEducation.location ||
                    !newEducation.startDate ||
                    !newEducation.endDate
                  }
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Education
                </Button>

                <div className="space-y-4 mt-6">
                  <h3 className="text-lg font-medium">Current Education</h3>
                  {form.watch("education")?.map((edu, index) => (
                    <Card key={edu.id || index} className="relative">
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={() => removeEducation(edu.id!)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <CardContent className="pt-6">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <h4 className="font-bold">{edu.degree}</h4>
                            <p className="text-muted-foreground">
                              {edu.startDate} - {edu.endDate}
                            </p>
                          </div>
                          <p>{edu.institution}</p>
                          <p className="text-muted-foreground">{edu.location}</p>
                          {edu.description && <p className="text-sm">{edu.description}</p>}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="certifications">
            <Card>
              <CardContent className="pt-6 space-y-6">
                <h3 className="text-lg font-medium">Add Certification</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <FormLabel>Certification Name</FormLabel>
                    <Input
                      placeholder="AWS Certified Solutions Architect"
                      value={newCertification.name}
                      onChange={(e) => setNewCertification({ ...newCertification, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <FormLabel>Issuer</FormLabel>
                    <Input
                      placeholder="Amazon Web Services"
                      value={newCertification.issuer}
                      onChange={(e) => setNewCertification({ ...newCertification, issuer: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <FormLabel>Date</FormLabel>
                    <Input
                      placeholder="2022"
                      value={newCertification.date}
                      onChange={(e) => setNewCertification({ ...newCertification, date: e.target.value })}
                    />
                  </div>
                  <div>
                    <FormLabel>URL (Optional)</FormLabel>
                    <Input
                      placeholder="https://aws.amazon.com/certification/"
                      value={newCertification.url}
                      onChange={(e) => setNewCertification({ ...newCertification, url: e.target.value })}
                    />
                  </div>
                </div>

                <Button
                  type="button"
                  onClick={addCertification}
                  disabled={!newCertification.name || !newCertification.issuer || !newCertification.date}
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Certification
                </Button>

                <div className="space-y-4 mt-6">
                  <h3 className="text-lg font-medium">Current Certifications</h3>
                  {form.watch("certifications")?.map((cert, index) => (
                    <Card key={cert.id || index} className="relative">
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={() => removeCertification(cert.id!)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <CardContent className="pt-6">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <h4 className="font-bold">{cert.name}</h4>
                            <p className="text-muted-foreground">{cert.date}</p>
                          </div>
                          <p>{cert.issuer}</p>
                          {cert.url && (
                            <a
                              href={cert.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-blue-600 hover:underline"
                            >
                              View Certificate
                            </a>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <div className="flex justify-end mt-6">
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </Form>
    </Tabs>
  )
}
