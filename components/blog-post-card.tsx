"use client"

import { motion } from "framer-motion"
import { Calendar, User, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import CursorBorder from "@/components/cursor-border"

interface BlogPostCardProps {
  post: {
    id: number
    title: string
    excerpt: string
    image: string
    date: string
    author: string
    category: string
    slug: string
  }
  index: number
}

export default function BlogPostCard({ post, index }: BlogPostCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
    >
      <CursorBorder borderColor="#ff4d4d" borderWidth={2} borderRadius={8}>
        <Link href={`/blog/${post.slug}`}>
          <motion.div
            whilehover={{ y: -5 }}
            transition={{ duration: 0.3 }}
            className="bg-[#151515] dark:bg-[#151515] rounded-lg overflow-hidden shadow-lg shadow-black/20 h-full"
          >
            <div className="relative h-48 overflow-hidden">
              <Image
                src={post.image || "/placeholder.svg"}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute top-4 left-4 bg-[#ff4d4d] text-white text-xs px-3 py-1 uppercase tracking-wider rounded-full">
                {post.category}
              </div>
            </div>

            <div className="p-6">
              <div className="flex justify-between items-center text-white/60 text-xs mb-4">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" /> {post.date}
                </span>
                <span className="flex items-center gap-1">
                  <User className="h-3 w-3" /> {post.author}
                </span>
              </div>

              <h3 className="text-xl font-bold mb-3 group-hover:text-[#ff4d4d] transition-colors duration-300">
                {post.title}
              </h3>

              <p className="text-white/70 dark:text-white/70 text-sm mb-6">{post.excerpt}</p>

              <div className="flex items-center text-[#ff4d4d] text-sm font-medium transition-transform duration-300 hover:translate-x-2">
                Read More
                <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            </div>
          </motion.div>
        </Link>
      </CursorBorder>
    </motion.div>
  )
}
