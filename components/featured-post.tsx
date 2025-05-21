"use client"

import { motion } from "framer-motion"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface FeaturedPostProps {
  post: {
    slug: string
    title: string
    excerpt: string
    image: string
    date: string
    author: string
    category: string
    readTime: string
  }
}

export default function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5 }}
      className="group"
    >
      <Link href={`/blog/${post.slug}`}>
        <div className="grid md:grid-cols-2 gap-8 bg-[#151515] dark:bg-[#151515] rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <div className="relative h-64 md:h-full overflow-hidden">
            <Image
              src={post.image || "/placeholder.svg"}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute top-4 left-4 bg-[#ff4d4d] text-white text-xs px-3 py-1 uppercase tracking-wider rounded-full">
              {post.category}
            </div>
          </div>

          <div className="p-8 flex flex-col justify-center">
            <div className="flex justify-between items-center text-white/60 text-xs mb-4">
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" /> {post.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" /> {post.readTime}
              </span>
            </div>

            <h3 className="text-2xl font-bold mb-4 group-hover:text-[#ff4d4d] transition-colors duration-300">
              {post.title}
            </h3>

            <p className="text-white/70 dark:text-white/70 mb-6">{post.excerpt}</p>

            <div className="mt-auto flex items-center text-[#ff4d4d] text-sm font-medium transition-transform duration-300 group-hover:translate-x-2">
              Read Article
              <ArrowRight className="ml-2 h-4 w-4" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
