import type React from "react"
import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"
import AnimatedCursor from "@/components/animated-cursor"
import WhatsAppButton from "@/components/whatsapp-button"
import ScrollToTopButton from "@/components/scroll-to-top-button"
import { Toaster } from "@/components/ui/toaster"
import AIChatbot from "@/components/ai-chatbot"
import { PageLoadingProvider } from "@/components/page-loading-provider"
import LoadingIndicator from "@/components/loading-indicator"
import "./globals.css"

export const metadata: Metadata = {
  title: "Modern Developer Portfolio",
  description: "A modern portfolio showcasing development skills and projects",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-[#0e0e0e] dark:bg-[#0e0e0e] light:bg-gray-100 text-white dark:text-white light:text-gray-900 transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <PageLoadingProvider>
            <LoadingIndicator />
            <AnimatedCursor />
            {children}
            <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-4">
              <AIChatbot />
              <WhatsAppButton />
            </div>
            <ScrollToTopButton />
            <Toaster />
          </PageLoadingProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
