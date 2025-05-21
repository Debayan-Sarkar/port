"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import ThemeToggle from "@/components/theme-toggle"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Projects", path: "/projects" },
    { name: "Resume", path: "/resume" },
    { name: "Team", path: "/team" },
    { name: "Contact", path: "/contact" },
    { name: "Join Our Team", path: "/join-our-team" },
  ]

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname.startsWith(path)) return true
    return false
  }

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled ? "bg-[#0e0e0e]/90 backdrop-blur-md py-3 shadow-lg shadow-black/20" : "bg-transparent py-5",
        )}
      >
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <Link href="/" className="flex items-center gap-0 text-2xl font-bold text-white">
                <span className="text-[#ff4d4d] font-black">J</span>
                <span className="text-white">OMIEZ</span>
              </Link>
            </motion.div>

            {/* Desktop Navigation - Always visible on md+ screens */}
            <nav className="hidden md:flex items-center justify-center flex-1 px-4">
              <div className="flex items-center justify-center gap-4 lg:gap-6 xl:gap-8">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link
                      href={item.path}
                      className={cn(
                        "text-sm uppercase font-medium tracking-wider transition-all duration-300 relative whitespace-nowrap",
                        isActive(item.path) ? "text-[#ff4d4d]" : "text-white/80 hover:text-white",
                      )}
                    >
                      {item.name}
                      {isActive(item.path) && (
                        <motion.span
                          layoutId="activeSection"
                          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#ff4d4d]"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </nav>

            {/* Right side actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-4"
            >
              <div className="hidden md:block">
                <ThemeToggle />
              </div>

              <Link href="/contact" className="hidden md:block">
                <Button className="bg-gradient-to-r from-[#ff4d4d] to-[#ff6b6b] hover:from-[#ff3333] hover:to-[#ff5555] text-white rounded-none px-6 py-2 text-sm uppercase font-medium tracking-wider shadow-lg shadow-[#ff4d4d]/20">
                  Get Started
                </Button>
              </Link>

              {/* Mobile menu button - Only visible on small screens */}
              <motion.div whilehover={{ scale: 1.1 }} whiletap={{ scale: 0.9 }} className="md:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10"
                  onClick={() => setIsOpen(true)}
                >
                  <motion.div
                    initial={{ rotate: 0 }}
                    animate={{ rotate: isOpen ? 90 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Menu className="h-6 w-6" />
                  </motion.div>
                  <span className="sr-only">Open menu</span>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Mobile menu - Only appears on small screens */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
            className="fixed inset-0 bg-[#0e0e0e] z-[100] flex flex-col p-6 md:hidden"
          >
            <div className="flex justify-between items-center mb-10">
              <Link href="/" className="flex items-center gap-0 text-2xl font-bold text-white">
                <span className="text-[#ff4d4d] font-black">J</span>
                <span className="text-white">OMIEZ</span>
              </Link>
              <motion.div whilehover={{ scale: 1.1 }} whiletap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10"
                  onClick={() => setIsOpen(false)}
                >
                  <motion.div initial={{ rotate: 0 }} animate={{ rotate: -90 }} transition={{ duration: 0.3 }}>
                    <X className="h-6 w-6" />
                  </motion.div>
                  <span className="sr-only">Close menu</span>
                </Button>
              </motion.div>
            </div>

            <nav className="flex flex-col gap-6">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link
                    href={item.path}
                    className={cn(
                      "text-lg uppercase font-medium tracking-wider transition-all duration-300 relative",
                      isActive(item.path) ? "text-[#ff4d4d]" : "text-white/80 hover:text-white",
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="mt-auto flex flex-col gap-4">
              <ThemeToggle />
              <Link href="/contact" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-gradient-to-r from-[#ff4d4d] to-[#ff6b6b] hover:from-[#ff3333] hover:to-[#ff5555] text-white rounded-none px-6 py-6 text-sm uppercase font-medium tracking-wider">
                  Get Started
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Header
