"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Mail, MapPin, Phone, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import CursorBorder from "@/components/cursor-border"
import { sendEmail } from "@/app/actions/email"

export default function ContactSection() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["50px", "-50px"])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Use the server action to send email
      const result = await sendEmail(formData)

      if (result.success) {
        toast({
          title: "Message sent!",
          description: "Thank you for your message. We'll get back to you soon.",
        })

        // Reset the form
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        })
      } else {
        throw new Error(result.message || "Failed to send message")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message. Please try again later.",
        variant: "destructive",
      })
      console.error("Error sending email:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" ref={sectionRef} className="py-32 bg-[#0a0a0a] relative overflow-visible">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-[#0e0e0e] to-transparent -z-10" />
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-to-tl from-[#ff4d4d]/5 to-transparent rounded-full blur-[100px] -z-10" />

      <motion.div style={{ y }} className="container px-4 md:px-6 relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
            className="inline-block mb-4"
          >
            <span className="text-sm uppercase tracking-[0.2em] text-[#ff4d4d] border-b border-[#ff4d4d] pb-1 font-medium">
              Contact Us
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: -30, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Get In{" "}
            <span className="text-[#ff4d4d] relative inline-block">
              Touch
              <motion.svg
                className="absolute -bottom-1 left-0 w-full"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{
                  pathLength: 1,
                  opacity: 1,
                  transition: {
                    pathLength: { type: "spring", duration: 1.5, bounce: 0 },
                    opacity: { duration: 0.5 },
                  },
                }}
                viewport={{ once: true }}
                viewBox="0 0 100 5"
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.path d="M0,2.5 Q25,4.5 50,2.5 Q75,0.5 100,2.5" fill="none" stroke="#ff4d4d" strokeWidth="1" />
              </motion.svg>
            </span>{" "}
            With Us
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ type: "spring", damping: 20, stiffness: 100, delay: 0.1 }}
            className="text-white/70 text-lg"
          >
            Have a project in mind or want to learn more about our services? We'd love to hear from you. Reach out to us
            and let's start a conversation.
          </motion.p>

          {/* Shorter buttons placed side by side */}
          <div className="flex justify-center gap-4 mt-6">
            <motion.a
              href="/contact"
              whilehover={{ scale: 1.05 }}
              whiletap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-[#ff4d4d] to-[#ff6b6b] hover:from-[#ff3333] hover:to-[#ff5555] text-white rounded-md shadow-lg shadow-[#ff4d4d]/20 transition-all duration-300"
            >
              Contact Me
            </motion.a>

            <motion.a
              href="/projects"
              whilehover={{ scale: 1.05 }}
              whiletap={{ scale: 0.95 }}
              className="px-6 py-3 bg-transparent border border-white/20 hover:bg-white/10 text-white rounded-md transition-all duration-300"
            >
              View Projects
            </motion.a>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ type: "spring", damping: 20, stiffness: 90 }}
          >
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                <p className="text-white/70 mb-8 text-lg">
                  Feel free to reach out through any of these channels. We're always open to discussing new projects,
                  creative ideas, or opportunities to be part of your vision.
                </p>
              </div>

              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ type: "spring", damping: 20, stiffness: 90, delay: 0.1 }}
                  className="flex items-start gap-6 group"
                >
                  <CursorBorder borderColor="#ff4d4d" borderWidth={2}>
                    <div className="p-4 bg-[#151515] text-[#ff4d4d] group-hover:bg-[#ff4d4d] group-hover:text-white transition-all duration-300">
                      <Mail className="h-6 w-6" />
                    </div>
                  </CursorBorder>
                  <div>
                    <h4 className="font-medium text-lg group-hover:text-[#ff4d4d] transition-colors duration-300">
                      Email
                    </h4>
                    <a
                      href="mailto:timtemple2024@gmail.com"
                      className="text-white/70 group-hover:text-white/90 transition-colors duration-300 hover:underline"
                    >
                      timtemple2024@gmail.com
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ type: "spring", damping: 20, stiffness: 90, delay: 0.2 }}
                  className="flex items-start gap-6 group"
                >
                  <CursorBorder borderColor="#ff4d4d" borderWidth={2}>
                    <div className="p-4 bg-[#151515] text-[#ff4d4d] group-hover:bg-[#ff4d4d] group-hover:text-white transition-all duration-300">
                      <Phone className="h-6 w-6" />
                    </div>
                  </CursorBorder>
                  <div>
                    <h4 className="font-medium text-lg group-hover:text-[#ff4d4d] transition-colors duration-300">
                      Phone
                    </h4>
                    <a
                      href="tel:+2347030454298"
                      className="text-white/70 group-hover:text-white/90 transition-colors duration-300 hover:underline"
                    >
                      +(234) 703-045-4298
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ type: "spring", damping: 20, stiffness: 90, delay: 0.3 }}
                  className="flex items-start gap-6 group"
                >
                  <CursorBorder borderColor="#ff4d4d" borderWidth={2}>
                    <div className="p-4 bg-[#151515] text-[#ff4d4d] group-hover:bg-[#ff4d4d] group-hover:text-white transition-all duration-300">
                      <MapPin className="h-6 w-6" />
                    </div>
                  </CursorBorder>
                  <div>
                    <h4 className="font-medium text-lg group-hover:text-[#ff4d4d] transition-colors duration-300">
                      Location
                    </h4>
                    <p className="text-white/70 group-hover:text-white/90 transition-colors duration-300">
                      Enugu State, Nigeria
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Google Map */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ type: "spring", damping: 20, stiffness: 90, delay: 0.4 }}
                className="mt-8 h-[200px] relative overflow-hidden"
              >
                <CursorBorder borderColor="#ff4d4d" borderWidth={2} className="h-full">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.30591910525!2d-74.25986432970718!3d40.697149422113014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1682956642057!5m2!1sen!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Google Map"
                    className="grayscale contrast-125 opacity-80 hover:opacity-100 transition-opacity duration-300"
                  ></iframe>
                </CursorBorder>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ type: "spring", damping: 20, stiffness: 90 }}
          >
            <CursorBorder borderColor="#ff4d4d" borderWidth={2} borderRadius={8} className="h-full">
              <form
                onSubmit={handleSubmit}
                className="space-y-6 bg-[#151515] p-8 shadow-xl shadow-black/20 h-full rounded-lg"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ type: "spring", damping: 20, stiffness: 90, delay: 0.1 }}
                    className="space-y-2"
                  >
                    <label htmlFor="name" className="text-sm font-medium">
                      Your Name
                    </label>
                    <CursorBorder borderColor="#ff4d4d" borderWidth={2} borderRadius={8}>
                      <Input
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="bg-[#0e0e0e] border-[#333] focus-visible:ring-[#ff4d4d] focus-visible:border-[#ff4d4d] rounded-md"
                      />
                    </CursorBorder>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ type: "spring", damping: 20, stiffness: 90, delay: 0.2 }}
                    className="space-y-2"
                  >
                    <label htmlFor="email" className="text-sm font-medium">
                      Your Email
                    </label>
                    <CursorBorder borderColor="#ff4d4d" borderWidth={2} borderRadius={8}>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-[#0e0e0e] border-[#333] focus-visible:ring-[#ff4d4d] focus-visible:border-[#ff4d4d] rounded-md"
                      />
                    </CursorBorder>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ type: "spring", damping: 20, stiffness: 90, delay: 0.3 }}
                  className="space-y-2"
                >
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <CursorBorder borderColor="#ff4d4d" borderWidth={2} borderRadius={8}>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="Project Inquiry"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="bg-[#0e0e0e] border-[#333] focus-visible:ring-[#ff4d4d] focus-visible:border-[#ff4d4d] rounded-md"
                    />
                  </CursorBorder>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ type: "spring", damping: 20, stiffness: 90, delay: 0.4 }}
                  className="space-y-2"
                >
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <CursorBorder borderColor="#ff4d4d" borderWidth={2} borderRadius={8}>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us about your project..."
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="bg-[#0e0e0e] border-[#333] focus-visible:ring-[#ff4d4d] focus-visible:border-[#ff4d4d] rounded-md resize-none"
                    />
                  </CursorBorder>
                </motion.div>

                <div className="flex gap-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ type: "spring", damping: 20, stiffness: 90, delay: 0.5 }}
                    className="w-1/2"
                  >
                    <CursorBorder borderColor="#ff4d4d" borderWidth={2} borderRadius={8}>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-[#ff4d4d] to-[#ff6b6b] hover:from-[#ff3333] hover:to-[#ff5555] text-white rounded-md py-2 shadow-lg shadow-[#ff4d4d]/20"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <svg
                              className="animate-spin h-4 w-4 text-white"
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
                            Sending...
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            <Send className="h-4 w-4" /> Send Message
                          </span>
                        )}
                      </Button>
                    </CursorBorder>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ type: "spring", damping: 20, stiffness: 90, delay: 0.5 }}
                    className="w-1/2"
                  >
                    <CursorBorder borderColor="#ff4d4d" borderWidth={2} borderRadius={8}>
                      <Button
                        type="button"
                        className="w-full bg-transparent border border-[#333] hover:bg-[#222] text-white rounded-md py-2"
                      >
                        <span className="flex items-center gap-2">Clear Form</span>
                      </Button>
                    </CursorBorder>
                  </motion.div>
                </div>
              </form>
            </CursorBorder>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
