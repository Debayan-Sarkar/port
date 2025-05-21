"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Calendar, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import CursorBorder from "@/components/cursor-border"

export default function BlogSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const blogPosts = [
    {
      id: 1,
      title: "The Future of Web Development: Trends to Watch in 2025",
      excerpt: "Explore emerging technologies and methodologies shaping the future of the web development landscape.",
      image: "/blog-web-dev-trends.jpg",
      date: "April 15, 2025",
      author: "Templeton DC",
      category: "Web Development",
      readTime: "8 min read",
      slug: "future-web-development-trends-2025",
    },
    {
      id: 2,
      title: "Optimizing Performance in React Applications",
      excerpt: "Learn advanced techniques to boost your React application's performance and user experience.",
      image: "/blog-react-performance.jpg",
      date: "April 8, 2025",
      author: "Sarah Johnson",
      category: "React",
      readTime: "10 min read",
      slug: "optimizing-performance-react-applications",
    },
    {
      id: 3,
      title: "Mastering UI/UX Design for Web Applications",
      excerpt:
        "Discover principles and practices that elevate user interface and experience design in modern web apps.",
      image: "/blog-ux-design.jpg",
      date: "March 30, 2025",
      author: "Michael Chen",
      category: "Design",
      readTime: "7 min read",
      slug: "mastering-ui-ux-design-web-applications",
    },
  ]

  return (
    <section className="py-24 bg-[#0a0a0a] dark:bg-[#0a0a0a] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-[#0e0e0e] to-transparent -z-10" />
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-to-tl from-[#ff4d4d]/5 to-transparent rounded-full blur-[100px] -z-10" />

      <div className="container px-4 md:px-6 relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
            className="inline-block mb-4"
          >
            <span className="text-sm uppercase tracking-[0.2em] text-[#ff4d4d] border-b border-[#ff4d4d] pb-1 font-medium">
              Our Blog
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: -30, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Latest{" "}
            <span className="text-[#ff4d4d] relative inline-block">
              Insights
              <motion.svg
                className="absolute -bottom-1 left-0 w-full"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{
                  pathLength: 1,
                  opacity: 1,
                  transition: {
                    pathLength: { type: "spring", duration: 1.5, bounce: 0 },
                    opacity: { duration: 0.5 },
                  },
                }}
                viewport={{ once: true }}
                viewBox="0 0 100 5"
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.path d="M0,2.5 Q25,4.5 50,2.5 Q75,0.5 100,2.5" fill="none" stroke="#ff4d4d" strokeWidth="1" />
              </motion.svg>
            </span>{" "}
            & News
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ type: "spring", damping: 20, stiffness: 100, delay: 0.1 }}
            className="text-white/70 dark:text-white/70 text-lg"
          >
            Stay updated with our latest articles, insights, and news about web development, design, and technology
            trends.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ type: "spring", damping: 20, stiffness: 90, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
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
                      <div className="absolute top-4 left-4 bg-[#ff4d4d] text-white text-xs px-3 py-1 uppercase tracking-wider">
                        {post.category}
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex justify-between items-center text-white/60 text-xs mb-4">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" /> {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {post.readTime}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold mb-3 group-hover:text-[#ff4d4d] transition-colors duration-300">
                        {post.title}
                      </h3>

                      <p className="text-white/70 dark:text-white/70 text-sm mb-6">{post.excerpt}</p>

                      <div
                        className={`flex items-center text-[#ff4d4d] text-sm font-medium transition-transform duration-300 ${
                          hoveredIndex === index ? "translate-x-2" : ""
                        }`}
                      >
                        Read More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </CursorBorder>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ type: "spring", damping: 20, stiffness: 90, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link href="/blog">
            <Button
              variant="outline"
              className="border-white/20 dark:border-white/20 text-white hover:bg-[#ff4d4d] hover:text-white hover:border-[#ff4d4d] rounded-none px-8 py-6 text-sm uppercase font-medium tracking-wider"
            >
              View All Posts
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
