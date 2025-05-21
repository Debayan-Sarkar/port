"use client"

import { usePageLoading } from "./page-loading-provider"
import { motion, AnimatePresence } from "framer-motion"

export default function LoadingIndicator() {
  const { isLoading } = usePageLoading()

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-0 left-0 right-0 z-50 h-1 bg-gradient-to-r from-[#ff4d4d] via-[#f9cb28] to-[#ff4d4d]"
        >
          <motion.div
            className="h-full bg-[#ff4d4d]"
            initial={{ width: "0%" }}
            animate={{
              width: ["0%", "40%", "60%", "80%", "100%"],
              transition: {
                times: [0, 0.4, 0.6, 0.8, 1],
                duration: 1.5,
                ease: "easeInOut",
                repeat: Number.POSITIVE_INFINITY,
              },
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
