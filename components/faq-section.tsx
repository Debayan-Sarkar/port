"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { Plus, Minus } from "lucide-react"
import CursorBorder from "@/components/cursor-border"

interface FaqItemProps {
  question: string
  answer: string
  isOpen: boolean
  onClick: () => void
  index: number
}

const FaqItem = ({ question, answer, isOpen, onClick, index }: FaqItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="mb-6"
    >
      <CursorBorder borderColor="#ff4d4d" borderWidth={2} borderRadius={4}>
        <div className="bg-[#151515] group overflow-hidden">
          <motion.button
            className="flex items-center justify-between w-full text-left p-6 focus:outline-none"
            onClick={onClick}
            whilehover={{ backgroundColor: "rgba(255, 77, 77, 0.05)" }}
            transition={{ duration: 0.2 }}
          >
            <h3 className="text-lg font-semibold pr-8 group-hover:text-[#ff4d4d] transition-colors duration-300">
              {question}
            </h3>
            <div className="flex-shrink-0 text-[#ff4d4d]">
              {isOpen ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
            </div>
          </motion.button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <div className="px-6 pb-6 text-white/70">
                  <div className="border-l-2 border-[#ff4d4d] pl-6">{answer}</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </CursorBorder>
    </motion.div>
  )
}

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["150px", "-150px"])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  const faqs = [
    {
      question: "What technologies do you specialize in?",
      answer:
        "We specialize in a wide range of technologies including React, Next.js, Node.js, TypeScript, MongoDB, PostgreSQL, AWS, and more. Our team stays up-to-date with the latest advancements to ensure we're using the most efficient and effective tools for each project.",
    },
    {
      question: "How long does a typical project take to complete?",
      answer:
        "Project timelines vary depending on complexity, scope, and specific requirements. A small website might take 2-4 weeks, while a complex web application could take 3-6 months. During our initial consultation, we'll provide a detailed timeline based on your specific project needs.",
    },
    {
      question: "Do you offer ongoing support and maintenance?",
      answer:
        "Yes, we offer various support and maintenance packages to ensure your digital solutions continue to perform optimally after launch. These can include regular updates, security monitoring, performance optimization, content updates, and technical support.",
    },
    {
      question: "What is your development process like?",
      answer:
        "Our development process follows an agile methodology with five key phases: Discovery & Planning, Design, Development, Testing & QA, and Deployment & Support. We maintain transparent communication throughout, with regular updates and opportunities for feedback.",
    },
    {
      question: "How do you handle project pricing?",
      answer:
        "We offer flexible pricing models including fixed-price quotes, hourly rates, and retainer agreements depending on the nature of your project. Following an initial consultation where we understand your requirements, we provide a detailed proposal outlining the scope, timeline, and associated costs.",
    },
  ]

  const toggleFaq = (index: number) => {
    setOpenIndex(index === openIndex ? null : index)
  }

  return (
    <section ref={sectionRef} className="py-24 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-[#ff4d4d]/5 to-transparent rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-[#ff4d4d]/5 to-transparent rounded-full blur-[100px] -z-10" />

      <motion.div style={{ y, opacity }} className="container px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-sm uppercase tracking-[0.2em] text-[#ff4d4d] border-b border-[#ff4d4d] pb-1 font-medium">
            Questions & Answers
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-6 mb-4">Frequently Asked Questions</h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Find answers to common questions about our services, process, and how we can help with your digital needs.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <FaqItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={index === openIndex}
              onClick={() => toggleFaq(index)}
              index={index}
            />
          ))}
        </div>
      </motion.div>
    </section>
  )
}
