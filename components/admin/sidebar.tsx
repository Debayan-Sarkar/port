"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Code,
  Settings,
  Menu,
  X,
  Award,
  Clock,
  Users,
  ImageIcon,
  MessageSquare,
  FileQuestion,
  Newspaper,
  Palette,
  Layers,
  BookOpen,
  Cpu,
  User,
} from "lucide-react"

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  // Update the menuItems array to include Instagram
  const menuItems = [
    { name: "Dashboard", href: "/admin", icon: <LayoutDashboard size={20} /> },
    { name: "Blog", href: "/admin/blog", icon: <FileText size={20} /> },
    { name: "Projects", href: "/admin/projects", icon: <Code size={20} /> },
    { name: "Services", href: "/admin/services", icon: <Briefcase size={20} /> },
    { name: "Team", href: "/admin/team", icon: <Users size={20} /> },
    { name: "Instagram", href: "/admin/instagram", icon: <ImageIcon size={20} /> },
    { name: "Applications", href: "/admin/applications", icon: <User size={20} /> },
    { name: "Experience", href: "/admin/experience", icon: <Clock size={20} /> },
    { name: "Skills", href: "/admin/skills", icon: <Cpu size={20} /> },
    { name: "Technologies", href: "/admin/technologies", icon: <Layers size={20} /> },
    { name: "Awards", href: "/admin/awards", icon: <Award size={20} /> },
    { name: "Timeline", href: "/admin/timeline", icon: <Clock size={20} /> },
    { name: "FAQ", href: "/admin/faq", icon: <FileQuestion size={20} /> },
    { name: "Media", href: "/admin/media", icon: <ImageIcon size={20} /> },
    { name: "Contact", href: "/admin/contact", icon: <MessageSquare size={20} /> },
    { name: "Resume", href: "/admin/resume", icon: <BookOpen size={20} /> },
    { name: "Newsletter", href: "/admin/newsletter", icon: <Newspaper size={20} /> },
    { name: "Plans", href: "/admin/plans", icon: <Palette size={20} /> },
    { name: "Settings", href: "/admin/settings", icon: <Settings size={20} /> },
  ]

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 p-2 bg-gray-800 rounded-md lg:hidden"
        aria-label="Toggle Sidebar"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleSidebar}
      ></div>

      <aside
        className={`fixed top-0 left-0 z-40 h-screen bg-gray-900 border-r border-gray-800 transition-all duration-300 ease-in-out ${
          isOpen ? "w-64 translate-x-0" : "w-64 -translate-x-full lg:translate-x-0"
        } lg:w-64`}
      >
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-center h-16 border-b border-gray-800">
            <Link href="/admin" className="text-xl font-bold text-white">
              Admin Dashboard
            </Link>
          </div>

          <nav className="flex-1 overflow-y-auto py-4 px-3">
            <ul className="space-y-1">
              {menuItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`flex items-center px-4 py-3 text-sm rounded-md transition-colors ${
                        isActive ? "bg-[#ff4d4d] text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"
                      }`}
                    >
                      <span className="mr-3">{item.icon}</span>
                      <span>{item.name}</span>
                      {item.name === "Applications" && (
                        <span className="ml-auto bg-red-500 text-white text-xs font-medium px-2 py-0.5 rounded-full">
                          2
                        </span>
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="p-4 border-t border-gray-800">
            <Link href="/" className="flex items-center text-sm text-gray-400 hover:text-white transition-colors">
              <span className="mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </span>
              <span>Back to Website</span>
            </Link>
          </div>
        </div>
      </aside>
    </>
  )
}
