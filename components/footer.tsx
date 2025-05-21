"use client"

import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowRight, ArrowUp, Facebook, Instagram, Linkedin, Twitter } from "lucide-react"
import Link from "next/link"

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="bg-[#0a0a0a] pt-20 pb-6 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-to-tl from-[#ff4d4d]/5 to-transparent rounded-full blur-[100px] -z-10" />

      <div className="container px-4 md:px-6">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-6"
          >
            <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-white">
              <span className="text-[#ff4d4d] font-black">J</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">OMIEZ</span>
            </Link>
            <p className="text-white/70">
              JOMIEZ is a cutting-edge digital agency specializing in web development, mobile applications, and custom
              software solutions. Our mission is to transform your ideas into powerful digital experiences with
              innovative technology.
            </p>
            <div className="flex gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="bg-[#151515] text-white hover:bg-[#ff4d4d] rounded-none h-10 w-10 transition-colors duration-300"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="bg-[#151515] text-white hover:bg-[#ff4d4d] rounded-none h-10 w-10 transition-colors duration-300"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="bg-[#151515] text-white hover:bg-[#ff4d4d] rounded-none h-10 w-10 transition-colors duration-300"
              >
                <Link href="https://instagram.com/Jomiez_innovation">
                  <Instagram className="h-5 w-5" />
                </Link>
                <span className="sr-only">Instagram</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="bg-[#151515] text-white hover:bg-[#ff4d4d] rounded-none h-10 w-10 transition-colors duration-300"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-bold">Quick Links</h3>
            <ul className="space-y-4">
              {[
                { name: "Home", path: "/" },
                { name: "About", path: "/about" },
                { name: "Services", path: "/services" },
                { name: "Projects", path: "/projects" },
                { name: "Team", path: "/team" },
                { name: "Contact", path: "/contact" },
              ].map((item, index) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <Link
                    href={item.path}
                    className="text-white/70 hover:text-[#ff4d4d] transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-0 h-px bg-[#ff4d4d] mr-0 group-hover:w-4 group-hover:mr-2 transition-all duration-300"></span>
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-bold">Services</h3>
            <ul className="space-y-4">
              {[
                "Web Development",
                "Mobile App Development",
                "Custom Software",
                "UI/UX Design",
                "Digital Marketing",
              ].map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <Link
                    href="/services"
                    className="text-white/70 hover:text-[#ff4d4d] transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-0 h-px bg-[#ff4d4d] mr-0 group-hover:w-4 group-hover:mr-2 transition-all duration-300"></span>
                    {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-bold">Newsletter</h3>
            <p className="text-white/70">
              Subscribe to our newsletter to receive updates on our latest projects and services.
            </p>
            <div className="flex">
              <Input
                type="email"
                placeholder="Your email"
                className="bg-[#151515] border-[#333] focus-visible:ring-[#ff4d4d] focus-visible:border-[#ff4d4d] rounded-none"
              />
              <Button
                onClick={() => {
                  // Simple newsletter subscription logic
                  const emailInput = document.querySelector('input[type="email"]') as HTMLInputElement
                  if (emailInput && emailInput.value) {
                    alert("Thank you for subscribing to our newsletter!")
                    emailInput.value = ""
                  } else {
                    alert("Please enter a valid email address.")
                  }
                }}
                className="bg-[#ff4d4d] hover:bg-[#ff3333] text-white rounded-none"
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="mt-6 p-6 bg-[#151515]">
              <h4 className="font-semibold mb-2">Contact Information</h4>
              <p className="text-white/70 text-sm">
                Email:{" "}
                <a href="mailto:templeton@jomiez.com" className="hover:underline hover:text-[#ff4d4d]">
                  templeton@jomiez.com
                </a>
              </p>
              <p className="text-white/70 text-sm">
                Phone:{" "}
                <a href="tel:+2347030454298" className="hover:underline hover:text-[#ff4d4d]">
                  +2347030454298
                </a>
              </p>
              <p className="text-white/70 text-sm">
                WhatsApp:{" "}
                <a
                  href="https://wa.me/2349119404716?text=Welcome%20to%20Jomiez%20Digital%20Innovation.%20How%20may%20we%20be%20of%20service%3F"
                  className="hover:underline hover:text-[#ff4d4d]"
                >
                  click here
                </a>
              </p>
            </div>
          </motion.div>
        </div>

        <div className="border-t border-[#333] pt-6 flex flex-col md:flex-col justify-center items-center">
          <p className="text-white/50 text-sm text-center">© {new Date().getFullYear()} JOMIEZ. All rights reserved.</p>

          <Button
            variant="ghost"
            size="icon"
            onClick={scrollToTop}
            className="mt-4 bg-[#151515] hover:bg-[#ff4d4d] text-white rounded-none h-10 w-10 transition-colors duration-300"
          >
            <ArrowUp className="h-5 w-5" />
            <span className="sr-only">Back to top</span>
          </Button>
        </div>
      </div>
    </footer>
  )
}

export default Footer
