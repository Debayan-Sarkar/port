"use client"

import type React from "react"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Trash2, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

const teamMemberSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  role: z.string().min(2, { message: "Role must be at least 2 characters" }),
  bio: z.string().min(10, { message: "Bio must be at least 10 characters" }),
  image: z.string().min(1, { message: "Image is required" }),
  linkedin: z.string().url({ message: "Must be a valid URL" }).optional().or(z.literal("")),
  twitter: z.string().url({ message: "Must be a valid URL" }).optional().or(z.literal("")),
  github: z.string().url({ message: "Must be a valid URL" }).optional().or(z.literal("")),
})

type TeamMember = z.infer<typeof teamMemberSchema>

// Mock data - in a real app, this would come from your database
const initialTeamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Jane Smith",
    role: "Lead Developer",
    bio: "Jane is a full-stack developer with over 8 years of experience in building web applications.",
    image: "/team-member-1.jpg",
    linkedin: "https://linkedin.com/in/janesmith",
    twitter: "https://twitter.com/janesmith",
    github: "https://github.com/janesmith",
  },
  {
    id: "2",
    name: "John Doe",
    role: "UI/UX Designer",
    bio: "John specializes in creating beautiful and intuitive user interfaces with a focus on user experience.",
    image: "/team-member-2.jpg",
    linkedin: "https://linkedin.com/in/johndoe",
    twitter: "https://twitter.com/johndoe",
    github: "https://github.com/johndoe",
  },
  {
    id: "3",
    name: "Emily Johnson",
    role: "Project Manager",
    bio: "Emily ensures projects are delivered on time and within scope, with excellent communication skills.",
    image: "/team-member-3.jpg",
    linkedin: "https://linkedin.com/in/emilyjohnson",
    twitter: "https://twitter.com/emilyjohnson",
    github: "",
  },
  {
    id: "4",
    name: "Michael Brown",
    role: "Backend Developer",
    bio: "Michael specializes in building robust and scalable backend systems with a focus on performance.",
    image: "/team-member-4.jpg",
    linkedin: "https://linkedin.com/in/michaelbrown",
    twitter: "",
    github: "https://github.com/michaelbrown",
  },
]

export function TeamForm() {
  const { toast } = useToast()
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(initialTeamMembers)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const form = useForm<TeamMember>({
    resolver: zodResolver(teamMemberSchema),
    defaultValues: {
      name: "",
      role: "",
      bio: "",
      image: "",
      linkedin: "",
      twitter: "",
      github: "",
    },
  })

  const onSubmit = (data: TeamMember) => {
    if (editingId) {
      // Update existing team member
      setTeamMembers(teamMembers.map((member) => (member.id === editingId ? { ...data, id: editingId } : member)))
      toast({
        title: "Team member updated",
        description: `${data.name}'s information has been updated successfully.`,
      })
    } else {
      // Add new team member
      const newMember = {
        ...data,
        id: Date.now().toString(),
      }
      setTeamMembers([...teamMembers, newMember])
      toast({
        title: "Team member added",
        description: `${data.name} has been added to your team.`,
      })
    }

    // Reset form
    form.reset({
      name: "",
      role: "",
      bio: "",
      image: "",
      linkedin: "",
      twitter: "",
      github: "",
    })
    setEditingId(null)
    setImagePreview(null)
  }

  const handleEdit = (member: TeamMember) => {
    setEditingId(member.id)
    form.reset({
      name: member.name,
      role: member.role,
      bio: member.bio,
      image: member.image,
      linkedin: member.linkedin || "",
      twitter: member.twitter || "",
      github: member.github || "",
    })
    setImagePreview(member.image)
  }

  const handleDelete = (id: string) => {
    setTeamMembers(teamMembers.filter((member) => member.id !== id))
    if (editingId === id) {
      form.reset()
      setEditingId(null)
      setImagePreview(null)
    }
    toast({
      title: "Team member removed",
      description: "The team member has been removed successfully.",
    })
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real app, you would upload this file to your server or cloud storage
      // For now, we'll just create a local URL for preview
      const imageUrl = URL.createObjectURL(file)
      setImagePreview(imageUrl)
      form.setValue("image", file.name) // In real app, this would be the URL from your server
    }
  }

  const handleCancel = () => {
    form.reset()
    setEditingId(null)
    setImagePreview(null)
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter role" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter a short bio" className="min-h-[120px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Profile Image</FormLabel>
                      <FormControl>
                        <div className="flex flex-col space-y-4">
                          <div className="flex items-center gap-4">
                            <Input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              id="image-upload"
                              onChange={handleImageChange}
                            />
                            <Input {...field} placeholder="Image path or URL" className="flex-1" />
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              onClick={() => document.getElementById("image-upload")?.click()}
                            >
                              <Upload className="h-4 w-4" />
                            </Button>
                          </div>
                          {imagePreview && (
                            <div className="relative w-24 h-24">
                              <img
                                src={imagePreview || "/placeholder.svg"}
                                alt="Preview"
                                className="w-full h-full object-cover rounded-md"
                              />
                            </div>
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="linkedin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>LinkedIn URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://linkedin.com/in/..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="twitter"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Twitter URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://twitter.com/..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="github"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>GitHub URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://github.com/..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end gap-2">
                {editingId && (
                  <Button type="button" variant="outline" onClick={handleCancel}>
                    Cancel
                  </Button>
                )}
                <Button type="submit">{editingId ? "Update Team Member" : "Add Team Member"}</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-bold mt-8 mb-4">Current Team Members</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {teamMembers.map((member) => (
          <Card key={member.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/3 h-48 md:h-auto">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 flex-1">
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-muted-foreground mb-2">{member.role}</p>
                  <p className="text-sm mb-4 line-clamp-2">{member.bio}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(member)}>
                        Edit
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(member.id!)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
