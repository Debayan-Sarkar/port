"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Quote, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { useSwipeable } from "react-swipeable"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { saveTestimonial, type Testimonial as TestimonialType } from "@/lib/testimonials"

// Define the testimonial type
// type Testimonial = {
//   id: number
//   name: string
//   position: string
//   company?: string
//   image: string
//   content: string
//   rating: number
//   date?: string
// }

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const [showFeedbackForm, setShowFeedbackForm] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const { toast } = useToast()

  // Initial testimonials
  const [testimonials, setTestimonials] = useState<TestimonialType[]>([
    {
      id: 1,
      name: "David Wilson",
      position: "CEO, TechStart Inc.",
      image: "/testimonial-1.jpg",
      content:
        "JOMIEZ transformed our digital presence with a stunning website and AI-powered CRM solution. Their team's expertise and dedication to our project exceeded our expectations at every stage.",
      rating: 5,
    },
    {
      id: 2,
      name: "Jennifer Lee",
      position: "Marketing Director, GrowthHub",
      image: "/testimonial-2.jpg",
      content:
        "Working with JOMIEZ was a game-changer for our business. Their mobile app development skills are unmatched, and they delivered a product with cutting-edge features that our customers love. The attention to detail was impressive.",
      rating: 5,
    },
    {
      id: 3,
      name: "Robert Martinez",
      position: "Founder, EcoSolutions",
      image: "/testimonial-3.jpg",
      content:
        "The team at JOMIEZ brought our vision to life with their innovative approach and technical expertise. They integrated blockchain solutions that revolutionized our business model. They were responsive, professional, and delivered on time.",
      rating: 5,
    },
  ])

  // Keep track of which position to replace next
  const [nextReplaceIndex, setNextReplaceIndex] = useState(0)

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }

  useEffect(() => {
    resetTimeout()

    if (autoplay) {
      timeoutRef.current = setTimeout(() => {
        handleNext()
      }, 5000)
    }

    return () => resetTimeout()
  }, [current, autoplay])

  const handlePrev = () => {
    setAutoplay(false)
    setDirection(-1)
    setCurrent((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  const handleNext = () => {
    setDirection(1)
    setCurrent((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const handleViewAll = () => {
    router.push("/testimonials")
  }

  const handleLeaveFeedback = () => {
    setShowFeedbackForm(true)
  }

  // Function to add a new testimonial
  const addNewTestimonial = (newTestimonial: Omit<TestimonialType, "id">) => {
    try {
      // Create a copy of the testimonials array
      const updatedTestimonials = [...testimonials]

      // Replace the testimonial at the next replacement index
      updatedTestimonials[nextReplaceIndex] = {
        ...newTestimonial,
        id: Date.now(), // Generate a unique ID
      }

      // Update the testimonials state
      setTestimonials(updatedTestimonials)

      // Update the next replacement index
      setNextReplaceIndex((nextReplaceIndex + 1) % testimonials.length)

      // Show the newly added testimonial
      setCurrent(nextReplaceIndex)
      setDirection(1)

      // Pause autoplay temporarily
      setAutoplay(false)
      setTimeout(() => setAutoplay(true), 8000)

      // Save to localStorage for persistence
      saveTestimonial(newTestimonial)

      // Show success toast
      toast({
        title: "Testimonial Added",
        description: "Your feedback has been added to the testimonials carousel.",
      })
    } catch (error) {
      console.error("Error adding testimonial:", error)
      toast({
        title: "Error",
        description: "There was a problem adding your testimonial.",
        variant: "destructive",
      })
    }
  }

  const handlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handlePrev(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  })

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.5,
      },
    }),
  }

  return (
    <section id="testimonials" className="py-20 bg-[#0a0a0a] relative overflow-visible">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-[#ff4d4d]/5 to-transparent rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-[#ff4d4d]/5 to-transparent rounded-full blur-[100px] -z-10" />

      <div className="container px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-10 max-w-3xl mx-auto"
        >
          <div className="inline-block mb-4">
            <span className="text-sm uppercase tracking-[0.2em] text-[#ff4d4d] border-b border-[#ff4d4d] pb-1 font-medium">
              Testimonials
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            What Our{" "}
            <span className="text-[#ff4d4d] relative">
              Clients
              <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 100 5" xmlns="http://www.w3.org/2000/svg">
                <path d="M0,2.5 Q25,4.5 50,2.5 Q75,0.5 100,2.5" fill="none" stroke="#ff4d4d" strokeWidth="1" />
              </svg>
            </span>{" "}
            Say
          </h2>
          <p className="text-white/70 text-lg">
            Don't just take our word for it. Hear what our clients have to say about their experience working with
            JOMIEZ Technologies.
          </p>

          {/* Interactive buttons */}
          <div className="flex justify-center gap-4 mt-6">
            <motion.button
              onClick={handleViewAll}
              whilehover={{ scale: 1.03 }}
              whiletap={{ scale: 0.97 }}
              className="px-6 py-2.5 bg-gradient-to-r from-[#ff4d4d] to-[#ff6b6b] hover:from-[#ff3333] hover:to-[#ff5555] text-white rounded-full shadow-md transition-all duration-300 text-sm font-medium"
            >
              View All
            </motion.button>

            <motion.button
              onClick={handleLeaveFeedback}
              whilehover={{ scale: 1.03 }}
              whiletap={{ scale: 0.97 }}
              className="px-6 py-2.5 bg-transparent border border-white/20 hover:border-white/40 text-white rounded-full transition-all duration-300 backdrop-blur-sm text-sm font-medium"
            >
              Leave Feedback
            </motion.button>
          </div>
        </motion.div>

        <div className="relative max-w-3xl mx-auto" ref={containerRef} {...handlers}>
          <div className="overflow-hidden">
            <div className="relative min-h-[280px] flex items-center">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={current}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute w-full"
                >
                  <motion.div
                    className="backdrop-blur-md bg-gradient-to-r from-[#151515]/80 to-[#1a1a1a]/80 border border-white/10 rounded-[20px] p-6 shadow-lg"
                    whilehover={{
                      boxShadow: "0 15px 30px -10px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 77, 77, 0.1)",
                      borderColor: "rgba(255, 77, 77, 0.2)",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex flex-col md:flex-row gap-6 items-center md:items-start relative z-10">
                      <div className="md:w-1/4 flex flex-col items-center">
                        <motion.div
                          className="relative w-20 h-20 overflow-hidden rounded-full border-2 border-[#ff4d4d]/20 shadow-md"
                          whilehover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Image
                            src={testimonials[current].image || "/placeholder.svg"}
                            alt={testimonials[current].name}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                        </motion.div>

                        <div className="flex mt-2 gap-0.5">
                          {[...Array(testimonials[current].rating)].map((_, i) => (
                            <motion.svg
                              key={i}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.3 + i * 0.1 }}
                              className="w-4 h-4 text-[#ff4d4d]"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </motion.svg>
                          ))}
                        </div>
                      </div>

                      <div className="md:w-3/4 text-center md:text-left">
                        <div className="relative mb-3">
                          <Quote className="absolute -top-3 -left-3 h-6 w-6 text-[#ff4d4d]/20" />
                          <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="text-white/90 text-sm md:text-base italic relative z-10 line-clamp-4"
                          >
                            "{testimonials[current].content}"
                          </motion.p>
                        </div>

                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4, duration: 0.5 }}
                        >
                          <h3 className="text-lg font-bold text-white">{testimonials[current].name}</h3>
                          <p className="text-[#ff4d4d] text-sm">{testimonials[current].position}</p>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Navigation controls */}
          <div className="flex justify-center mt-6 gap-4 items-center">
            <motion.button
              whilehover={{ scale: 1.1, backgroundColor: "rgba(255, 77, 77, 0.9)" }}
              whiletap={{ scale: 0.9 }}
              onClick={handlePrev}
              className="bg-[#151515]/50 backdrop-blur-sm border border-white/10 text-white hover:bg-[#ff4d4d] hover:border-[#ff4d4d] transition-all duration-300 w-8 h-8 rounded-full flex items-center justify-center shadow-md"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous</span>
            </motion.button>

            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > current ? 1 : -1)
                    setCurrent(index)
                    setAutoplay(false)
                  }}
                  className="group"
                  aria-label={`Go to slide ${index + 1}`}
                >
                  <motion.div
                    animate={{
                      width: current === index ? "1.5rem" : "0.5rem",
                      backgroundColor: current === index ? "#ff4d4d" : "rgba(255, 255, 255, 0.3)",
                    }}
                    whilehover={{
                      backgroundColor: current === index ? "#ff4d4d" : "rgba(255, 255, 255, 0.5)",
                    }}
                    className="h-2 rounded-full transition-all duration-300"
                  />
                </button>
              ))}
            </div>

            <motion.button
              whilehover={{ scale: 1.1, backgroundColor: "rgba(255, 77, 77, 0.9)" }}
              whiletap={{ scale: 0.9 }}
              onClick={handleNext}
              className="bg-[#151515]/50 backdrop-blur-sm border border-white/10 text-white hover:bg-[#ff4d4d] hover:border-[#ff4d4d] transition-all duration-300 w-8 h-8 rounded-full flex items-center justify-center shadow-md"
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Feedback Form Modal */}
      <AnimatePresence>
        {showFeedbackForm && (
          <FeedbackFormModal onClose={() => setShowFeedbackForm(false)} onSubmitSuccess={addNewTestimonial} />
        )}
      </AnimatePresence>
    </section>
  )
}

// Feedback Form Modal Component
function FeedbackFormModal({
  onClose,
  onSubmitSuccess,
}: {
  onClose: () => void
  onSubmitSuccess: (testimonial: Omit<TestimonialType, "id">) => void
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    position: "",
    company: "",
    message: "",
    rating: 5,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRatingChange = (rating: number) => {
    setFormData((prev) => ({ ...prev, rating }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Send email to the admin
      const emailResponse = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: `New Testimonial from ${formData.name}`,
          message: `
Rating: ${formData.rating}/5 stars
Position: ${formData.position}
Company: ${formData.company}

Testimonial:
${formData.message}
          `,
        }),
      })

      if (!emailResponse.ok) {
        throw new Error("Failed to send email")
      }

      // Add the testimonial to the carousel
      onSubmitSuccess({
        name: formData.name,
        position: formData.position + (formData.company ? `, ${formData.company}` : ""),
        image: "/generic-icon.png", // Default image for user-submitted testimonials
        content: formData.message,
        rating: formData.rating,
        date: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      })

      setIsSubmitting(false)
      setIsSuccess(true)

      // Close the modal after showing success message
      setTimeout(() => {
        onClose()
      }, 2000)
    } catch (error) {
      console.error("Error submitting feedback:", error)
      setIsSubmitting(false)
      toast({
        title: "Error",
        description: "There was a problem submitting your feedback. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-[#151515] border border-white/10 rounded-[20px] p-6 md:p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {isSuccess ? (
          <div className="text-center py-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 15, stiffness: 200 }}
              className="w-16 h-16 bg-[#ff4d4d] rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>
            <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
            <p className="text-white/70">
              Your feedback has been submitted successfully and added to our testimonials.
            </p>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">Leave Your Feedback</h3>
              <button onClick={onClose} className="p-1 rounded-full hover:bg-white/10 transition-colors">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-[#1a1a1a] border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff4d4d] focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-[#1a1a1a] border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff4d4d] focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="position" className="block text-sm font-medium mb-1">
                    Position
                  </label>
                  <input
                    type="text"
                    id="position"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-[#1a1a1a] border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff4d4d] focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium mb-1">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-[#1a1a1a] border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff4d4d] focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                  Your Feedback *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-[#1a1a1a] border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff4d4d] focus:border-transparent resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Rating *</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleRatingChange(star)}
                      className="focus:outline-none"
                    >
                      <svg
                        className={`w-8 h-8 ${
                          star <= formData.rating ? "text-[#ff4d4d] fill-[#ff4d4d]" : "text-gray-400"
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                        />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-gradient-to-r from-[#ff4d4d] to-[#ff6b6b] hover:from-[#ff3333] hover:to-[#ff5555] text-white rounded-lg font-medium transition-all duration-300 flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    "Submit Feedback"
                  )}
                </button>
              </div>
            </form>
          </>
        )}
      </motion.div>
    </motion.div>
  )
}
