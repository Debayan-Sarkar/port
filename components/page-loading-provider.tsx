"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { usePathname } from "next/navigation"

type PageLoadingContextType = {
  isLoading: boolean
  startLoading: () => void
  stopLoading: () => void
}

const PageLoadingContext = createContext<PageLoadingContextType>({
  isLoading: true,
  startLoading: () => {},
  stopLoading: () => {},
})

export const usePageLoading = () => useContext(PageLoadingContext)

export function PageLoadingProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const pathname = usePathname()

  const startLoading = () => setIsLoading(true)
  const stopLoading = () => {
    // Add a small delay to make the transition smoother
    setTimeout(() => setIsLoading(false), 800)
  }

  // Simulate initial page load
  useEffect(() => {
    const timer = setTimeout(() => {
      stopLoading()
    }, 1500) // Adjust timing as needed

    return () => clearTimeout(timer)
  }, [])

  // Handle route changes using Next.js router
  useEffect(() => {
    // Start loading when route changes
    startLoading()

    // Stop loading after a delay to show the skeleton
    const timer = setTimeout(() => {
      stopLoading()
    }, 1000)

    return () => clearTimeout(timer)
  }, [pathname]) // Only depend on pathname

  return (
    <PageLoadingContext.Provider value={{ isLoading, startLoading, stopLoading }}>
      {children}
    </PageLoadingContext.Provider>
  )
}
