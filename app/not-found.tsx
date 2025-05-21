"use client"

import { Suspense, useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

function NotFoundContent() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-900 text-white pt-24 pb-16">
        <div className="container px-4 md:px-6 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-3xl mx-auto text-center"
          >
            <div className="mb-8 w-full max-w-lg mx-auto">
              <motion.h1
                className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-4"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                404
              </motion.h1>
              <div className="relative w-full h-64 mb-8">
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ rotate: -5, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 0.2 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-full h-full text-gray-700"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M16 16s-1.5-2-4-2-4 2-4 2"></path>
                    <line x1="9" y1="9" x2="9.01" y2="9"></line>
                    <line x1="15" y1="9" x2="15.01" y2="9"></line>
                  </svg>
                </motion.div>
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <div className="text-center">
                    <h2 className="text-2xl font-bold mb-2">Page Not Found</h2>
                    <p className="text-gray-400 mb-6">
                      The page you are looking for might have been removed, had its name changed, or is temporarily
                      unavailable.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 text-sm font-medium text-white shadow transition-colors hover:from-blue-600 hover:to-purple-700"
              >
                Go to Home
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-md border border-gray-700 bg-transparent px-6 py-3 text-sm font-medium text-white shadow transition-colors hover:bg-gray-800"
              >
                Contact Support
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default function NotFound() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <NotFoundContent />
    </Suspense>
  )
}
