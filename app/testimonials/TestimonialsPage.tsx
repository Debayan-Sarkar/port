"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Quote, Search, Filter } from "lucide-react"
import PageWrapper from "@/components/page-wrapper"

// Define the testimonial type
type Testimonial = {
  id: number
  name: string
  position: string
  company?: string
  image: string
  content: string
  rating: number
  date?: string
}

export default function TestimonialsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRating, setFilterRating] = useState<number | null>(null)

  // Initial testimonials data
  const [testimonials, setTestimonials] = useState<Testimonial[]>([
    {
      id: 1,
      name: "David Wilson",
      position: "CEO, TechStart Inc.",
      company: "TechStart Inc.",
      image: "/testimonial-1.jpg",
      content:
        "JOMIEZ transformed our digital presence with a stunning website and AI-powered CRM solution. Their team's expertise and dedication to our project exceeded our expectations at every stage.",
      rating: 5,
      date: "March 15, 2025",
    },
    {
      id: 2,
      name: "Jennifer Lee",
      position: "Marketing Director, GrowthHub",
      company: "GrowthHub",
      image: "/testimonial-2.jpg",
      content:
        "Working with JOMIEZ was a game-changer for our business. Their mobile app development skills are unmatched, and they delivered a product with cutting-edge features that our customers love. The attention to detail was impressive.",
      rating: 5,
      date: "February 22, 2025",
    },
    {
      id: 3,
      name: "Robert Martinez",
      position: "Founder, EcoSolutions",
      company: "EcoSolutions",
      image: "/testimonial-3.jpg",
      content:
        "The team at JOMIEZ brought our vision to life with their innovative approach and technical expertise. They integrated blockchain solutions that revolutionized our business model. They were responsive, professional, and delivered on time.",
      rating: 5,
      date: "January 10, 2025",
    },
    {
      id: 4,
      name: "Sarah Johnson",
      position: "CTO, InnovateTech",
      company: "InnovateTech",
      image: "/professional-woman-diverse.png",
      content:
        "We hired JOMIEZ to develop our company's e-commerce platform, and they delivered an exceptional product. The website is not only visually stunning but also highly functional and user-friendly. Their team was communicative throughout the entire process.",
      rating: 4,
      date: "April 5, 2025",
    },
    {
      id: 5,
      name: "Michael Brown",
      position: "Product Manager, DataFlow",
      company: "DataFlow",
      image: "/confident-businessman.png",
      content:
        "JOMIEZ helped us implement a complex data visualization dashboard that has significantly improved our decision-making process. Their technical knowledge and problem-solving abilities are outstanding. I highly recommend their services.",
      rating: 5,
      date: "March 28, 2025",
    },
    {
      id: 6,
      name: "Emily Chen",
      position: "UX Director, DesignWorks",
      company: "DesignWorks",
      image: "/asian-woman-professional.png",
      content:
        "As a design agency, we have high standards for UI/UX work. JOMIEZ not only met but exceeded our expectations with their frontend development. The code was clean, well-documented, and the animations were smooth and elegant.",
      rating: 4,
      date: "February 15, 2025",
    },
  ])

  // Check for new testimonials in localStorage on component mount
  useEffect(() => {
    try {
      const storedTestimonials = localStorage.getItem("userTestimonials")
      if (storedTestimonials) {
        const parsedTestimonials = JSON.parse(storedTestimonials) as Testimonial[]
        // Add the stored testimonials to our existing ones
        setTestimonials((prev) => [...prev, ...parsedTestimonials])
      }
    } catch (error) {
      console.error("Error loading testimonials from localStorage:", error)
    }
  }, [])

  // Filter testimonials based on search term and rating
  const filteredTestimonials = testimonials.filter((testimonial) => {
    const matchesSearch =
      searchTerm === "" ||
      testimonial.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (testimonial.company && testimonial.company.toLowerCase().includes(searchTerm.toLowerCase())) ||
      testimonial.content.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesRating = filterRating === null || testimonial.rating === filterRating

    return matchesSearch && matchesRating
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <PageWrapper>
      <div className="bg-[#0a0a0a] min-h-screen py-20">
        <div className="container px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-12">
            <Link href="/#testimonials">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center text-white/70 hover:text-white transition-colors mb-6"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                <span>Back to Home</span>
              </motion.div>
            </Link>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Client{" "}
              <span className="text-[#ff4d4d] relative">
                Testimonials
                <svg
                  className="absolute -bottom-1 left-0 w-full"
                  viewBox="0 0 100 5"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0,2.5 Q25,4.5 50,2.5 Q75,0.5 100,2.5" fill="none" stroke="#ff4d4d" strokeWidth="1" />
                </svg>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-white/70 text-lg max-w-3xl"
            >
              Read what our clients have to say about their experience working with JOMIEZ Technologies. We pride
              ourselves on delivering exceptional results and building lasting relationships.
            </motion.p>
          </div>

          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-12 flex flex-col md:flex-row gap-4 items-center justify-between"
          >
            <div className="relative w-full md:w-auto md:min-w-[320px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
              <input
                type="text"
                placeholder="Search testimonials..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#151515] border border-white/10 rounded-full focus:outline-none focus:ring-2 focus:ring-[#ff4d4d] focus:border-transparent"
              />
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              <Filter className="h-4 w-4 text-white/70" />
              <span className="text-sm text-white/70 mr-2">Filter by rating:</span>
              <div className="flex gap-1">
                {[null, 5, 4, 3, 2, 1].map((rating) => (
                  <button
                    key={rating === null ? "all" : rating}
                    onClick={() => setFilterRating(rating)}
                    className={`px-3 py-1 text-sm rounded-full transition-all ${
                      filterRating === rating
                        ? "bg-[#ff4d4d] text-white"
                        : "bg-[#151515] text-white/70 hover:bg-[#252525]"
                    }`}
                  >
                    {rating === null ? "All" : `${rating}★`}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Testimonials Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredTestimonials.length > 0 ? (
              filteredTestimonials.map((testimonial) => (
                <motion.div
                  key={testimonial.id}
                  variants={itemVariants}
                  className="backdrop-blur-md bg-gradient-to-r from-[#151515]/80 to-[#1a1a1a]/80 border border-white/10 rounded-[20px] p-6 shadow-lg hover:border-[#ff4d4d]/20 transition-all duration-300"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="relative w-14 h-14 overflow-hidden rounded-full border-2 border-[#ff4d4d]/20">
                      <Image
                        src={testimonial.image || "/generic-icon.png"}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{testimonial.name}</h3>
                      <p className="text-[#ff4d4d] text-sm">{testimonial.position}</p>
                      <div className="flex mt-1 gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-3.5 h-3.5 ${i < testimonial.rating ? "text-[#ff4d4d]" : "text-gray-500"}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="relative mb-4">
                    <Quote className="absolute -top-2 -left-2 h-5 w-5 text-[#ff4d4d]/20" />
                    <p className="text-white/90 text-sm italic pl-3">{testimonial.content}</p>
                  </div>

                  <div className="text-xs text-white/50 mt-4 text-right">{testimonial.date}</div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-white/70 text-lg">No testimonials match your search criteria.</p>
                <button
                  onClick={() => {
                    setSearchTerm("")
                    setFilterRating(null)
                  }}
                  className="mt-4 px-4 py-2 bg-[#ff4d4d] text-white rounded-full text-sm"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </motion.div>

          {/* Leave Feedback CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-16 text-center"
          >
            <h2 className="text-2xl font-bold mb-4">Share Your Experience</h2>
            <p className="text-white/70 mb-6 max-w-2xl mx-auto">
              Have you worked with us? We'd love to hear about your experience. Your feedback helps us improve our
              services and share your success story with others.
            </p>
            <Link href="/#testimonials">
              <motion.button
                whilehover={{ scale: 1.03 }}
                whiletap={{ scale: 0.97 }}
                className="px-8 py-3 bg-gradient-to-r from-[#ff4d4d] to-[#ff6b6b] hover:from-[#ff3333] hover:to-[#ff5555] text-white rounded-full shadow-md transition-all duration-300 text-sm font-medium"
              >
                Leave Your Feedback
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </PageWrapper>
  )
}
