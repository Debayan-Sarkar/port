import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { DashboardLayout } from "@/components/admin/dashboard-layout"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Admin Dashboard | Portfolio Management",
  description: "Manage your portfolio website content",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DashboardLayout>{children}</DashboardLayout>
      </body>
    </html>
  )
}
