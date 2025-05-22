"use client"

import { motion } from "framer-motion"
import {
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Mail,
  MapPin,
  Calendar,
  GraduationCap,
  Languages,
  Award,
  Briefcase,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import InstagramFeed from "@/components/instagram-feed"
import type { TeamMember } from "@/lib/team-data"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useEffect } from "react"

export default function TeamMemberProfile({ member }: { member: TeamMember }) {
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white">
      <Header />
      <div className="pt-24 pb-16">
        <div className="container px-4 md:px-6">
          <Link href="/team" className="inline-flex items-center text-sm text-white/60 hover:text-white mb-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-4 w-4"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            Back to Team
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="sticky top-24"
              >
                <Card className="overflow-hidden bg-[#151515] border-white/10">
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                  <CardContent className="p-6">
                    <h1 className="text-2xl font-bold mb-1">{member.name}</h1>
                    <p className="text-[#ff4d4d] mb-4">{member.position}</p>

                    <div className="space-y-4">
                      <div className="flex items-center text-white/70">
                        <Calendar className="h-5 w-5 mr-3 text-white/40" />
                        <span>{member.age} years old</span>
                      </div>
                      <div className="flex items-center text-white/70">
                        <MapPin className="h-5 w-5 mr-3 text-white/40" />
                        <span>{member.location}</span>
                      </div>
                      <div className="flex items-center text-white/70">
                        <Mail className="h-5 w-5 mr-3 text-white/40" />
                        <span>
                          {member.name.toLowerCase() === "young josh" && "nwekeifenayi2018@gmail.com"}
                          {member.name.toLowerCase() === "templeton dc" && "timtemple2024@gmail.com"}
                          </span>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h3 className="text-sm uppercase tracking-wider text-white/50 mb-3">Connect</h3>
                      <div className="flex space-x-2">
                        <Button
                          size="icon"
                          variant="outline"
                          className="rounded-full border-white/10 hover:bg-[#ff4d4d] hover:text-white hover:border-transparent"
                          asChild
                        >
                          <Link href={member.social.linkedin} target="_blank">
                            <Linkedin className="h-4 w-4" />
                            <span className="sr-only">LinkedIn</span>
                          </Link>
                        </Button>
                        <Button
                          size="icon"
                          variant="outline"
                          className="rounded-full border-white/10 hover:bg-[#ff4d4d] hover:text-white hover:border-transparent"
                          asChild
                        >
                          <Link href={member.social.twitter} target="_blank">
                            <Twitter className="h-4 w-4" />
                            <span className="sr-only">Twitter</span>
                          </Link>
                        </Button>
                        <Button
                          size="icon"
                          variant="outline"
                          className="rounded-full border-white/10 hover:bg-[#ff4d4d] hover:text-white hover:border-transparent"
                          asChild
                        >
                          <Link href={member.social.github} target="_blank">
                            <Github className="h-4 w-4" />
                            <span className="sr-only">GitHub</span>
                          </Link>
                        </Button>
                        <Button
                          size="icon"
                          variant="outline"
                          className="rounded-full border-white/10 hover:bg-[#ff4d4d] hover:text-white hover:border-transparent"
                          asChild
                        >
                          <Link href={member.social.instagram} target="_blank">
                            <Instagram className="h-4 w-4" />
                            <span className="sr-only">Instagram</span>
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Tabs defaultValue="about" className="w-full">
                  <TabsList className="grid w-full grid-cols-5 bg-[#151515] rounded-lg mb-8">
                    <TabsTrigger
                      value="about"
                      className="data-[state=active]:bg-[#ff4d4d] data-[state=active]:text-white"
                    >
                      About
                    </TabsTrigger>
                    <TabsTrigger
                      value="skills"
                      className="data-[state=active]:bg-[#ff4d4d] data-[state=active]:text-white"
                    >
                      Skills
                    </TabsTrigger>
                    <TabsTrigger
                      value="education"
                      className="data-[state=active]:bg-[#ff4d4d] data-[state=active]:text-white"
                    >
                      Education
                    </TabsTrigger>
                    <TabsTrigger
                      value="projects"
                      className="data-[state=active]:bg-[#ff4d4d] data-[state=active]:text-white"
                    >
                      Projects
                    </TabsTrigger>
                    <TabsTrigger
                      value="instagram"
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:via-pink-500 data-[state=active]:to-orange-500 data-[state=active]:text-white"
                    >
                      Instagram
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="about" className="mt-0">
                    <Card className="bg-[#151515] border-white/10">
                      <CardContent className="p-6">
                        <h2 className="text-xl font-semibold mb-4 flex items-center">
                          <span className="bg-[#ff4d4d]/10 text-[#ff4d4d] p-2 rounded-md mr-3">
                            <Briefcase className="h-5 w-5" />
                          </span>
                          Biography
                        </h2>
                        <p className="text-white/80 leading-relaxed">{member.bio}</p>

                        <div className="mt-8">
                          <h3 className="text-lg font-medium mb-4 flex items-center">
                            <span className="bg-[#ff4d4d]/10 text-[#ff4d4d] p-2 rounded-md mr-3">
                              <Languages className="h-5 w-5" />
                            </span>
                            Languages
                          </h3>
                          <div className="space-y-2">
                            {member.languages.map((language, index) => (
                              <div key={index} className="text-white/70">
                                {language}
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="skills" className="mt-0">
                    <Card className="bg-[#151515] border-white/10">
                      <CardContent className="p-6">
                        <h2 className="text-xl font-semibold mb-6 flex items-center">
                          <span className="bg-[#ff4d4d]/10 text-[#ff4d4d] p-2 rounded-md mr-3">
                            <Award className="h-5 w-5" />
                          </span>
                          Professional Skills
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {member.skills.map((skill, index) => (
                            <div key={index} className="bg-[#1a1a1a] rounded-lg p-4 border border-white/5">
                              <div className="text-white/90">{skill}</div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="education" className="mt-0">
                    <Card className="bg-[#151515] border-white/10">
                      <CardContent className="p-6">
                        <h2 className="text-xl font-semibold mb-6 flex items-center">
                          <span className="bg-[#ff4d4d]/10 text-[#ff4d4d] p-2 rounded-md mr-3">
                            <GraduationCap className="h-5 w-5" />
                          </span>
                          Education & Qualifications
                        </h2>
                        <div className="space-y-6">
                          {member.education.map((edu, index) => (
                            <div
                              key={index}
                              className="relative pl-8 pb-6 border-l border-white/10 last:border-0 last:pb-0"
                            >
                              <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-[#ff4d4d]"></div>
                              <div className="text-lg font-medium">{edu.degree}</div>
                              <div className="text-white/70">{edu.institution}</div>
                              <div className="text-white/50 text-sm mt-1">{edu.year}</div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="projects" className="mt-0">
                    <Card className="bg-[#151515] border-white/10">
                      <CardContent className="p-6">
                        <h2 className="text-xl font-semibold mb-6 flex items-center">
                          <span className="bg-[#ff4d4d]/10 text-[#ff4d4d] p-2 rounded-md mr-3">
                            <Briefcase className="h-5 w-5" />
                          </span>
                          Key Projects
                        </h2>
                        <div className="space-y-6">
                          {member.projects.map((project, index) => (
                            <div key={index} className="bg-[#1a1a1a] rounded-lg p-5 border border-white/5">
                              <div className="flex justify-between items-start mb-2">
                                <h3 className="text-lg font-medium">{project.name}</h3>
                                <span className="text-[#ff4d4d] text-sm">{project.year}</span>
                              </div>
                              <p className="text-white/70">{project.description}</p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="instagram" className="mt-0">
                    <Card className="bg-[#151515] border-white/10">
                      <CardContent className="p-6">
                        <InstagramFeed posts={member.instagramPosts} />
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
