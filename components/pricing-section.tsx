"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, X, ChevronRight, Sparkles, Mail, User, MessageSquare } from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { sendEmail } from "@/app/actions/email"

type PricingTier = {
  id: string
  name: string
  price: number
  description: string
  features: {
    text: string
    included: boolean
  }[]
  popular?: boolean
  color: string
  gradient: string
}

const pricingTiers: PricingTier[] = [
  {
    id: "bronze",
    name: "Bronze",
    price: 100,
    description: "Perfect for small personal projects and beginners",
    color: "from-amber-700 to-yellow-500",
    gradient: "bg-gradient-to-br from-amber-700/20 to-yellow-500/20",
    features: [
      { text: "3 Page Website", included: true },
      { text: "Responsive Design", included: true },
      { text: "Basic SEO Setup", included: true },
      { text: "Contact Form", included: true },
      { text: "1 Month Support", included: true },
      { text: "Custom Animations", included: false },
      { text: "CMS Integration", included: false },
      { text: "E-commerce Features", included: false },
    ],
  },
  {
    id: "silver",
    name: "Silver",
    price: 500,
    description: "Great for professional portfolios and small businesses",
    color: "from-slate-400 to-slate-200",
    gradient: "bg-gradient-to-br from-slate-400/20 to-slate-200/20",
    features: [
      { text: "5 Page Website", included: true },
      { text: "Responsive Design", included: true },
      { text: "Advanced SEO Setup", included: true },
      { text: "Contact Form", included: true },
      { text: "3 Months Support", included: true },
      { text: "Custom Animations", included: true },
      { text: "CMS Integration", included: false },
      { text: "E-commerce Features", included: false },
    ],
  },
  {
    id: "gold",
    name: "Gold",
    price: 1500,
    description: "Ideal for businesses requiring advanced functionality",
    color: "from-yellow-500 to-yellow-300",
    gradient: "bg-gradient-to-br from-yellow-500/20 to-yellow-300/20",
    popular: true,
    features: [
      { text: "10 Page Website", included: true },
      { text: "Responsive Design", included: true },
      { text: "Advanced SEO Setup", included: true },
      { text: "Contact Form", included: true },
      { text: "6 Months Support", included: true },
      { text: "Custom Animations", included: true },
      { text: "CMS Integration", included: true },
      { text: "E-commerce Features", included: false },
    ],
  },
  {
    id: "diamond",
    name: "Diamond",
    price: 5000,
    description: "Complete solution for large businesses and enterprises",
    color: "from-cyan-400 to-blue-300",
    gradient: "bg-gradient-to-br from-cyan-400/20 to-blue-300/20",
    features: [
      { text: "Unlimited Pages", included: true },
      { text: "Responsive Design", included: true },
      { text: "Advanced SEO Setup", included: true },
      { text: "Contact Form", included: true },
      { text: "12 Months Support", included: true },
      { text: "Custom Animations", included: true },
      { text: "CMS Integration", included: true },
      { text: "E-commerce Features", included: true },
    ],
  },
]

function CountUp({ end, duration = 2000 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0)
  const countRef = useRef<number>(0)
  const startTimeRef = useRef<number | null>(null)

  useEffect(() => {
    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp
      }

      const progress = timestamp - startTimeRef.current
      const percentage = Math.min(progress / duration, 1)

      countRef.current = Math.floor(percentage * end)
      setCount(countRef.current)

      if (percentage < 1) {
        requestAnimationFrame(animate)
      }
    }

    const frameId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frameId)
  }, [end, duration])

  return <span>${count}</span>
}

export default function PricingSection() {
  const [hoveredTier, setHoveredTier] = useState<string | null>(null)
  const [selectedTier, setSelectedTier] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  // Form state
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const handlePurchase = (tierId: string) => {
    setSelectedTier(tierId)
    setShowModal(true)

    // Pre-fill message with package details
    const tier = pricingTiers.find((t) => t.id === tierId)
    setMessage(`I'm interested in the ${tier?.name} package ($${tier?.price}).`)
  }

  const confirmPurchase = async () => {
    if (!name || !email) {
      toast({
        title: "Missing Information",
        description: "Please provide your name and email so we can contact you.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    const tier = pricingTiers.find((t) => t.id === selectedTier)

    try {
      // Send email with package information
      const result = await sendEmail({
        name,
        email,
        subject: `Package Selection: ${tier?.name}`,
        message: `
Package Selected: ${tier?.name}
Price: $${tier?.price}
Customer Name: ${name}
Customer Email: ${email}
Additional Message: ${message}
        `,
      })

      if (result.success) {
        toast({
          title: "Package Selected!",
          description: `You've selected the ${tier?.name} package. Our team will contact you shortly at ${email}.`,
          duration: 5000,
        })
        setShowModal(false)

        // Reset form
        setName("")
        setEmail("")
        setMessage("")
      } else {
        throw new Error(result.message)
      }
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      })
      console.error("Error sending email:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="pricing" className="py-24 bg-[#0e0e0e] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-gradient-to-br from-[#ff4d4d]/5 to-transparent rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-to-tl from-[#ff4d4d]/5 to-transparent rounded-full blur-[100px] -z-10" />

      <motion.div
        className="container px-4 md:px-6 relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-sm uppercase tracking-[0.2em] text-[#ff4d4d] border-b border-[#ff4d4d] pb-1 font-medium">
            Package Upgrades
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-6 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#ff4d4d] to-[#f9cb28]">
            Choose Your Perfect Package
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Select the ideal package that aligns with your project requirements and budget constraints
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={tier.id}
              className={cn(
                "relative rounded-2xl overflow-hidden border border-[#333] backdrop-blur-sm",
                tier.gradient,
                tier.popular ? "ring-2 ring-[#ff4d4d]" : "",
                selectedTier === tier.id ? "ring-2 ring-[#ff4d4d] transform scale-[1.02]" : "",
              )}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whilehover={{
                y: -10,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                transition: { duration: 0.2 },
              }}
              onHoverStart={() => setHoveredTier(tier.id)}
              onHoverEnd={() => setHoveredTier(null)}
            >
              {tier.popular && (
                <div className="absolute top-0 right-0 bg-[#ff4d4d] text-white text-xs font-bold px-3 py-1 rounded-bl-lg z-10 flex items-center gap-1">
                  <Sparkles className="h-3 w-3" />
                  MOST POPULAR
                </div>
              )}
              <div className="p-6">
                <h3
                  className={cn("text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r", tier.color)}
                >
                  {tier.name}
                </h3>
                <div className="flex items-baseline mb-4">
                  <div className="text-4xl font-extrabold">
                    {hoveredTier === tier.id ? <CountUp end={tier.price} /> : <span>${tier.price}</span>}
                  </div>
                </div>
                <p className="text-gray-400 mb-6">{tier.description}</p>
                <ul className="space-y-3 mb-6">
                  {tier.features.map((feature, featureIndex) => (
                    <motion.li
                      key={featureIndex}
                      className="flex items-start"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 + featureIndex * 0.05 }}
                      viewport={{ once: true }}
                    >
                      {feature.included ? (
                        <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                      ) : (
                        <X className="h-5 w-5 text-gray-500 mr-2 shrink-0 mt-0.5" />
                      )}
                      <span className={feature.included ? "text-white" : "text-gray-500"}>{feature.text}</span>
                    </motion.li>
                  ))}
                </ul>
                <motion.button
                  className={cn(
                    "w-full py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2",
                    tier.popular
                      ? "bg-[#ff4d4d] hover:bg-[#ff3333] text-white"
                      : "bg-[#333] hover:bg-[#444] text-white",
                  )}
                  whilehover={{ scale: 1.05 }}
                  whiletap={{ scale: 0.95 }}
                  onClick={() => handlePurchase(tier.id)}
                >
                  Get Started
                  <ChevronRight className="h-4 w-4" />
                </motion.button>
              </div>

              {/* Selection indicator */}
              {selectedTier === tier.id && (
                <motion.div
                  className="absolute inset-0 border-2 border-[#ff4d4d] rounded-2xl pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Purchase confirmation modal with contact form */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              className="bg-[#151515] rounded-xl p-6 max-w-md w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold mb-2">Complete Your Selection</h3>
              <p className="mb-4 text-gray-400">
                You're selecting the {pricingTiers.find((t) => t.id === selectedTier)?.name} package for $
                {pricingTiers.find((t) => t.id === selectedTier)?.price}. Please provide your contact information so our
                team can reach out to you.
              </p>

              <div className="space-y-4 mb-6">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#222] border border-[#333] rounded-lg py-2 pl-10 pr-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-[#ff4d4d] focus:border-[#ff4d4d]"
                    required
                  />
                </div>

                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#222] border border-[#333] rounded-lg py-2 pl-10 pr-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-[#ff4d4d] focus:border-[#ff4d4d]"
                    required
                  />
                </div>

                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 text-gray-500 h-4 w-4" />
                  <textarea
                    placeholder="Additional details or questions (optional)"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-[#222] border border-[#333] rounded-lg py-2 pl-10 pr-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-[#ff4d4d] focus:border-[#ff4d4d] min-h-[100px]"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  className="flex-1 py-2 px-4 bg-[#333] rounded-lg hover:bg-[#444] transition-colors"
                  onClick={() => setShowModal(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  className={cn(
                    "flex-1 py-2 px-4 bg-[#ff4d4d] rounded-lg hover:bg-[#ff3333] transition-colors flex items-center justify-center",
                    isSubmitting && "opacity-70 cursor-not-allowed",
                  )}
                  onClick={confirmPurchase}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Confirm"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
