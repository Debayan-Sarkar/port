"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowRight, ArrowLeft, Calendar, Clock, Share2, Facebook, Twitter, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import CursorBorder from "@/components/cursor-border"
import { Skeleton } from "@/components/ui/skeleton"
import PageSpecificWrapper from "@/components/page-specific-wrapper"

// Define the blog post type
type BlogPost = {
  slug: string
  title: string
  excerpt: string
  content: string
  image: string
  date: string
  author: {
    name: string
    image: string
    role: string
  }
  category: string
  readTime: string
  tags: string[]
}

// Mock data for the blog post
const blogPostData: Record<string, BlogPost> = {
  "future-web-development-trends-2025": {
    slug: "future-web-development-trends-2025",
    title: "The Future of Web Development: Trends to Watch in 2025",
    excerpt: "Explore emerging technologies and methodologies shaping the future of the web development landscape.",
    content: `
      <p>The web development landscape is constantly evolving, with new technologies, frameworks, and methodologies emerging at a rapid pace. As we look ahead to 2025, several key trends are poised to reshape how we build and interact with web applications.</p>
      
      <h2>1. WebAssembly Will Become Mainstream</h2>
      <p>WebAssembly (Wasm) has been gaining traction for its ability to run high-performance code in the browser. By 2025, we expect Wasm to become a standard part of web development, enabling more complex applications like video editing, 3D modeling, and advanced games to run natively in browsers.</p>
      
      <h2>2. AI-Driven Development</h2>
      <p>Artificial intelligence is already transforming how developers write code, with tools like GitHub Copilot and similar AI assistants. By 2025, AI will be integrated into every aspect of the development workflow, from code generation to testing and deployment. Developers will spend less time on repetitive tasks and more time on creative problem-solving.</p>
      
      <h2>3. Edge Computing Will Dominate</h2>
      <p>The shift toward edge computing will continue, with more applications running code closer to the user rather than in centralized data centers. This approach reduces latency and improves performance, especially for global applications. Frameworks and platforms that support edge computing will become the standard for new projects.</p>
      
      <h2>4. Web3 and Decentralized Applications</h2>
      <p>While the initial hype around Web3 has settled, the underlying technologies will mature and find practical applications. By 2025, we'll see more mainstream applications leveraging blockchain for specific features like identity verification, digital ownership, and transparent supply chains.</p>
      
      <h2>5. Micro-Frontends Architecture</h2>
      <p>As applications grow in complexity, micro-frontends will gain popularity as a way to manage large-scale web applications. This architectural approach allows teams to work independently on different parts of an application, improving development velocity and maintainability.</p>
      
      <h2>6. Serverless and Low-Code Solutions</h2>
      <p>Serverless architectures will continue to evolve, making it easier for developers to build scalable applications without managing infrastructure. Alongside this, low-code and no-code platforms will become more powerful, enabling non-developers to create sophisticated web applications.</p>
      
      <h2>7. Immersive Web Experiences</h2>
      <p>With advancements in WebXR and related technologies, immersive web experiences will become more common. Virtual and augmented reality features will be integrated into standard websites, creating new ways for users to interact with content and services.</p>
      
      <h2>Conclusion</h2>
      <p>The future of web development is exciting, with technologies that will make applications faster, more powerful, and more accessible. Developers who stay ahead of these trends will be well-positioned to create innovative solutions that meet the evolving needs of users and businesses.</p>
    `,
    image: "/blog-web-dev-trends.jpg",
    date: "April 15, 2025",
    author: {
      name: "John Smith",
      image: "/team-member-1.jpg",
      role: "Senior Developer",
    },
    category: "Web Development",
    readTime: "8 min read",
    tags: ["Web Development", "Future Tech", "WebAssembly", "AI", "Edge Computing"],
  },
  "optimizing-performance-react-applications": {
    slug: "optimizing-performance-react-applications",
    title: "Optimizing Performance in React Applications",
    excerpt: "Learn advanced techniques to boost your React application's performance and user experience.",
    content: `
      <p>Performance optimization is crucial for delivering a smooth user experience in React applications. As applications grow in complexity, performance issues can arise that affect loading times, responsiveness, and overall user satisfaction.</p>
      
      <h2>1. Component Optimization</h2>
      <p>One of the most effective ways to improve React performance is to optimize how components render. This includes using React.memo for functional components and PureComponent for class components to prevent unnecessary re-renders. Additionally, the useCallback and useMemo hooks can help memoize functions and computed values.</p>
      
      <h2>2. Code Splitting and Lazy Loading</h2>
      <p>Large React applications can benefit significantly from code splitting, which allows you to split your bundle into smaller chunks that load on demand. React.lazy and Suspense make it easy to implement lazy loading for components, reducing the initial load time of your application.</p>
      
      <h2>3. Virtual List Optimization</h2>
      <p>When rendering large lists of data, virtualization techniques can dramatically improve performance. Libraries like react-window and react-virtualized help by only rendering items that are currently visible in the viewport, reducing DOM nodes and memory usage.</p>
      
      <h2>4. State Management Optimization</h2>
      <p>Efficient state management is essential for React performance. Consider using more granular state structures to prevent unnecessary re-renders. For complex applications, evaluate whether global state management solutions like Redux or Zustand are being used optimally.</p>
      
      <h2>5. Network Optimization</h2>
      <p>Implementing effective data fetching strategies can significantly improve perceived performance. This includes techniques like request batching, caching with React Query or SWR, and optimistic UI updates to make your application feel more responsive.</p>
      
      <h2>6. Build Optimization</h2>
      <p>Optimizing your build process can reduce bundle sizes and improve loading times. This includes tree shaking to eliminate unused code, compression techniques, and leveraging modern image formats and loading strategies.</p>
      
      <h2>7. Performance Monitoring</h2>
      <p>Implementing performance monitoring tools like Lighthouse, Web Vitals, and React Profiler can help identify performance bottlenecks in your application. Regular performance audits should be part of your development workflow.</p>
      
      <h2>Conclusion</h2>
      <p>Performance optimization in React is an ongoing process that requires attention to detail and a good understanding of how React works under the hood. By implementing these techniques, you can create React applications that not only look good but also provide a fast and responsive user experience.</p>
    `,
    image: "/blog-react-performance.jpg",
    date: "April 8, 2025",
    author: {
      name: "Sarah Johnson",
      image: "/team-member-2.jpg",
      role: "Lead Developer",
    },
    category: "React",
    readTime: "10 min read",
    tags: ["React", "Performance", "JavaScript", "Optimization", "Web Development"],
  },
  "mastering-ui-ux-design-web-applications": {
    slug: "mastering-ui-ux-design-web-applications",
    title: "Mastering UI/UX Design for Web Applications",
    excerpt: "Discover principles and practices that elevate user interface and experience design in modern web apps.",
    content: `
      <p>Creating exceptional user interfaces and experiences is essential for the success of any web application. A well-designed UI/UX not only makes your application visually appealing but also ensures that users can accomplish their goals efficiently and enjoyably.</p>
      
      <h2>1. User-Centered Design Approach</h2>
      <p>The foundation of effective UI/UX design is a user-centered approach. This means understanding your users' needs, goals, and pain points through research methods like interviews, surveys, and usability testing. By designing with real users in mind, you can create interfaces that truly serve their purposes.</p>
      
      <h2>2. Information Architecture</h2>
      <p>A well-structured information architecture helps users navigate your application intuitively. This involves organizing content in a logical hierarchy, creating clear navigation paths, and ensuring that users always know where they are within the application.</p>
      
      <h2>3. Visual Hierarchy and Typography</h2>
      <p>Effective visual hierarchy guides users' attention to the most important elements first. This is achieved through thoughtful use of size, color, contrast, and spacing. Typography plays a crucial role in this hierarchy, with font choices and text formatting significantly impacting readability and user experience.</p>
      
      <h2>4. Responsive and Adaptive Design</h2>
      <p>With users accessing web applications on various devices, responsive design is no longer optional. Your application should provide a consistent and optimized experience across different screen sizes and orientations, adapting layouts and interactions appropriately.</p>
      
      <h2>5. Microinteractions and Animation</h2>
      <p>Thoughtful microinteractions and animations can significantly enhance user experience by providing feedback, guiding attention, and adding personality to your application. However, these elements should be purposeful and not distract from the core functionality.</p>
      
      <h2>6. Accessibility</h2>
      <p>Designing for accessibility ensures that your application can be used by people with various abilities and disabilities. This includes considerations for color contrast, keyboard navigation, screen reader compatibility, and other accessibility standards.</p>
      
      <h2>7. Consistent Design Systems</h2>
      <p>A design system with consistent components, patterns, and guidelines helps maintain coherence across your application. This not only improves the user experience but also makes the design and development process more efficient.</p>
      
      <h2>Conclusion</h2>
      <p>Mastering UI/UX design for web applications is an ongoing journey that requires a balance of creativity, technical knowledge, and empathy for users. By applying these principles and practices, you can create web applications that not only look beautiful but also provide meaningful and enjoyable experiences for your users.</p>
    `,
    image: "/blog-ux-design.jpg",
    date: "March 30, 2025",
    author: {
      name: "Michael Chen",
      image: "/team-member-3.jpg",
      role: "UI/UX Designer",
    },
    category: "Design",
    readTime: "7 min read",
    tags: ["UI/UX", "Design", "Web Applications", "User Experience", "Accessibility"],
  },
  "rise-of-ai-web-development": {
    slug: "rise-of-ai-web-development",
    title: "The Rise of AI in Web Development",
    excerpt: "How artificial intelligence is transforming the way we build websites and applications.",
    content: `
      <p>Artificial Intelligence (AI) is revolutionizing the web development industry, transforming how developers build, optimize, and maintain websites and applications. This technological shift is not just changing the tools we use but fundamentally altering the development process itself.</p>
      
      <h2>1. AI-Powered Code Generation</h2>
      <p>Tools like GitHub Copilot, powered by OpenAI's Codex, are changing how developers write code. These AI assistants can suggest entire functions, solve complex problems, and even generate complete components based on natural language descriptions. This dramatically accelerates development time and reduces the cognitive load on developers.</p>
      
      <h2>2. Automated Testing and Quality Assurance</h2>
      <p>AI is making significant inroads in testing and quality assurance. Machine learning algorithms can now predict where bugs are likely to occur, automatically generate test cases, and even self-heal code in some instances. This leads to more robust applications with fewer defects reaching production.</p>
      
      <h2>3. Personalized User Experiences</h2>
      <p>AI enables websites and applications to deliver highly personalized experiences by analyzing user behavior and preferences in real-time. From content recommendations to interface adjustments, AI can help create experiences that adapt to individual users, increasing engagement and conversion rates.</p>
      
      <h2>4. Intelligent Design Systems</h2>
      <p>AI-powered design tools can now generate UI components, suggest design improvements, and even create entire layouts based on brand guidelines and user preferences. This democratizes design and allows developers to create visually appealing interfaces without extensive design expertise.</p>
      
      <h2>5. Natural Language Interfaces</h2>
      <p>The advancement of natural language processing has made conversational interfaces more practical and effective. Chatbots and voice assistants powered by AI can understand complex queries and provide helpful responses, enhancing user experience and reducing the need for traditional navigation.</p>
      
      <h2>6. Performance Optimization</h2>
      <p>AI algorithms can analyze application performance data to identify bottlenecks and suggest optimizations. From server resource allocation to client-side rendering strategies, AI can help make applications faster and more efficient without manual intervention.</p>
      
      <h2>7. Accessibility Improvements</h2>
      <p>AI tools can now scan websites for accessibility issues and suggest or even implement fixes automatically. This helps developers create more inclusive web experiences that comply with standards like WCAG without requiring extensive knowledge of accessibility guidelines.</p>
      
      <h2>Conclusion</h2>
      <p>The integration of AI into web development is still in its early stages, but its impact is already significant. As these technologies continue to evolve, we can expect even more profound changes in how websites and applications are built, maintained, and experienced. Developers who embrace these AI tools will be better positioned to create innovative, efficient, and user-centered digital experiences.</p>
    `,
    image: "/blog-web-dev-trends.jpg",
    date: "April 2, 2025",
    author: {
      name: "Emily Rodriguez",
      image: "/team-member-4.jpg",
      role: "AI Specialist",
    },
    category: "AI",
    readTime: "9 min read",
    tags: ["AI", "Machine Learning", "Web Development", "Future Tech", "Automation"],
  },
  "building-accessible-web-applications": {
    slug: "building-accessible-web-applications",
    title: "Building Accessible Web Applications",
    excerpt: "Best practices for creating web applications that everyone can use, regardless of ability.",
    content: `
      <p>Web accessibility is not just a legal requirement in many countries but also a moral imperative for developers. Creating applications that are usable by people of all abilities ensures that your digital products reach the widest possible audience and provide an inclusive experience for everyone.</p>
      
      <h2>1. Understanding Web Accessibility</h2>
      <p>Web accessibility means designing and developing websites and applications that can be used by people with various disabilities, including visual, auditory, physical, speech, cognitive, and neurological disabilities. The Web Content Accessibility Guidelines (WCAG) provide a framework for making web content more accessible.</p>
      
      <h2>2. Semantic HTML</h2>
      <p>Using semantic HTML elements is the foundation of accessible web development. Elements like &lt;header&gt;, &lt;nav&gt;, &lt;main&gt;, and &lt;footer&gt; provide meaningful structure to your content, making it easier for screen readers and other assistive technologies to interpret and navigate your application.</p>
      
      <h2>3. Keyboard Navigation</h2>
      <p>Many users with motor disabilities rely on keyboard navigation rather than a mouse. Ensuring that all interactive elements are keyboard accessible, with visible focus states and logical tab order, is essential for these users. Custom components should also support keyboard interactions that match their expected behavior.</p>
      
      <h2>4. Color and Contrast</h2>
      <p>Sufficient color contrast between text and background is crucial for users with low vision or color blindness. WCAG recommends a minimum contrast ratio of 4.5:1 for normal text and 3:1 for large text. Additionally, color should never be the only means of conveying information or indicating an action.</p>
      
      <h2>5. Alternative Text for Images</h2>
      <p>All images that convey information should have descriptive alternative text (alt text) that screen readers can announce. Decorative images should have empty alt attributes (alt="") to indicate that they can be safely ignored by assistive technologies.</p>
      
      <h2>6. Form Accessibility</h2>
      <p>Forms should be designed with accessibility in mind, including proper labeling of form controls, clear error messages, and sufficient time for users to complete forms. ARIA attributes can enhance form accessibility when standard HTML techniques are insufficient.</p>
      
      <h2>7. Testing with Assistive Technologies</h2>
      <p>Regular testing with screen readers, keyboard navigation, and other assistive technologies is essential to ensure your application is truly accessible. Automated testing tools can help identify many issues, but manual testing with actual assistive technologies provides the most comprehensive evaluation.</p>
      
      <h2>Conclusion</h2>
      <p>Building accessible web applications requires attention to detail and a commitment to inclusive design principles. By incorporating accessibility from the beginning of your development process, you can create applications that provide a better experience for all users, regardless of their abilities or the technologies they use to access the web.</p>
    `,
    image: "/blog-ux-design.jpg",
    date: "March 25, 2025",
    author: {
      name: "Michael Chen",
      image: "/team-member-3.jpg",
      role: "UI/UX Designer",
    },
    category: "Accessibility",
    readTime: "8 min read",
    tags: ["Accessibility", "WCAG", "Inclusive Design", "Web Development", "User Experience"],
  },
  "state-management-modern-react": {
    slug: "state-management-modern-react",
    title: "State Management in Modern React",
    excerpt: "Comparing different state management solutions for React applications in 2025.",
    content: `
      <p>State management remains one of the most important aspects of building React applications. As applications grow in complexity, managing state effectively becomes crucial for maintaining performance, developer experience, and code maintainability. In 2025, the landscape of state management in React has evolved significantly.</p>
      
      <h2>1. React's Built-in State Management</h2>
      <p>React's own state management capabilities have expanded significantly. The useState and useReducer hooks, combined with the Context API, now handle many use cases that previously required external libraries. For many applications, especially smaller ones, these built-in solutions provide all the state management needed.</p>
      
      <h2>2. Redux and Redux Toolkit</h2>
      <p>Redux continues to be a popular choice for complex applications with extensive state management needs. Redux Toolkit has significantly simplified the Redux experience by reducing boilerplate code and providing utilities for common patterns. The integration with React through react-redux has also improved, with hooks like useSelector and useDispatch making component connections more straightforward.</p>
      
      <h2>3. Zustand</h2>
      <p>Zustand has gained significant popularity for its simplicity and flexibility. It provides a minimalist API that's easy to learn while still offering powerful features like middleware, selectors, and devtools integration. Its small bundle size and lack of boilerplate make it an attractive option for many projects.</p>
      
      <h2>4. Jotai and Recoil</h2>
      <p>Atomic state management libraries like Jotai and Recoil have matured, offering fine-grained reactivity and excellent performance characteristics. These libraries excel in scenarios where state dependencies are complex and components need to react to specific pieces of state without unnecessary re-renders.</p>
      
      <h2>5. TanStack Query (formerly React Query)</h2>
      <p>For server state management, TanStack Query has become the de facto standard. It handles caching, background updates, and stale data management with minimal configuration. When combined with a client state management solution, it provides a comprehensive approach to state management in modern applications.</p>
      
      <h2>6. Signals-based State Management</h2>
      <p>Inspired by frameworks like Solid.js and Angular, signals-based state management has made inroads in the React ecosystem. Libraries implementing this pattern offer excellent performance by avoiding the overhead of React's reconciliation process for certain state updates.</p>
      
      <h2>7. Framework-specific Solutions</h2>
      <p>Meta-frameworks built on top of React, such as Next.js and Remix, have introduced their own state management patterns optimized for their specific architectures. These often leverage server components and server actions to reduce the amount of client-side state management needed.</p>
      
      <h2>Conclusion</h2>
      <p>The state management landscape in React has never offered more choices, each with its own strengths and trade-offs. The best approach depends on your specific application needs, team expertise, and performance requirements. Many modern applications use a combination of these solutions, applying different tools to different aspects of state management based on their characteristics.</p>
    `,
    image: "/blog-react-performance.jpg",
    date: "March 18, 2025",
    author: {
      name: "Sarah Johnson",
      image: "/team-member-2.jpg",
      role: "Lead Developer",
    },
    category: "React",
    readTime: "11 min read",
    tags: ["React", "State Management", "Redux", "Zustand", "TanStack Query", "JavaScript"],
  },
}

// Mock data for related posts
const relatedPosts = [
  {
    id: 1,
    title: "The Rise of AI in Web Development",
    excerpt: "How artificial intelligence is transforming the way we build websites and applications.",
    image: "/blog-web-dev-trends.jpg",
    date: "April 2, 2025",
    author: "Emily Rodriguez",
    category: "AI",
    slug: "rise-of-ai-web-development",
  },
  {
    id: 2,
    title: "Building Accessible Web Applications",
    excerpt: "Best practices for creating web applications that everyone can use, regardless of ability.",
    image: "/blog-ux-design.jpg",
    date: "March 25, 2025",
    author: "Michael Chen",
    category: "Accessibility",
    slug: "building-accessible-web-applications",
  },
  {
    id: 3,
    title: "State Management in Modern React",
    excerpt: "Comparing different state management solutions for React applications in 2025.",
    image: "/blog-react-performance.jpg",
    date: "March 18, 2025",
    author: "Sarah Johnson",
    category: "React",
    slug: "state-management-modern-react",
  },
]

export default function BlogPostClient({ slug }: { slug: string }) {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // In a real application, this would be an API call
    // For now, we'll use our mock data
    setIsLoading(true)
    setTimeout(() => {
      setPost(blogPostData[slug] || null)
      setIsLoading(false)
    }, 500)
  }, [slug])

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (isLoading) {
    return (
      <PageSpecificWrapper pageType="blogPost">
        <div className="min-h-screen bg-[#0e0e0e] text-white">
          <Header />
          <main className="pt-24">
            <section className="pt-32 pb-16 relative overflow-hidden">
              <div className="container px-4 md:px-6">
                <div className="max-w-4xl mx-auto text-center">
                  <Skeleton className="h-4 w-32 mx-auto mb-4" />
                  <Skeleton className="h-12 w-3/4 mx-auto mb-6" />
                  <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                </div>
              </div>
            </section>

            <div className="container px-4 md:px-6 mb-16">
              <Skeleton className="max-w-5xl mx-auto h-[300px] md:h-[500px] rounded-xl" />
            </div>

            <section className="py-12">
              <div className="container px-4 md:px-6">
                <div className="flex flex-col lg:flex-row gap-12">
                  <div className="lg:w-2/3">
                    <div className="space-y-6">
                      {[1, 2, 3, 4, 5, 6].map((i) => (
                        <Skeleton key={i} className="h-6 w-full" />
                      ))}
                    </div>

                    <div className="mt-12">
                      <Skeleton className="h-6 w-32 mb-4" />
                      <div className="flex flex-wrap gap-2">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <Skeleton key={i} className="h-8 w-20 rounded-full" />
                        ))}
                      </div>
                    </div>

                    <div className="mt-12 border-t border-white/10 pt-8">
                      <div className="flex items-center gap-4">
                        <Skeleton className="h-4 w-32" />
                        <div className="flex gap-2">
                          <Skeleton className="h-8 w-8 rounded-full" />
                          <Skeleton className="h-8 w-8 rounded-full" />
                          <Skeleton className="h-8 w-8 rounded-full" />
                        </div>
                      </div>
                    </div>

                    <div className="mt-12 bg-[#151515] p-8 rounded-xl">
                      <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                        <Skeleton className="w-24 h-24 rounded-full" />
                        <div>
                          <Skeleton className="h-6 w-48 mb-2" />
                          <Skeleton className="h-4 w-32 mb-4" />
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-3/4" />
                        </div>
                      </div>
                    </div>

                    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Skeleton className="h-32 rounded-lg" />
                      <Skeleton className="h-32 rounded-lg" />
                    </div>
                  </div>

                  <div className="lg:w-1/3">
                    <div className="bg-[#151515] p-8 rounded-xl mb-8">
                      <Skeleton className="h-6 w-48 mb-6" />
                      <div className="space-y-6">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="flex gap-4">
                            <Skeleton className="w-20 h-20 rounded-lg" />
                            <div>
                              <Skeleton className="h-5 w-32 mb-2" />
                              <Skeleton className="h-4 w-24" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-[#151515] p-8 rounded-xl mb-8">
                      <Skeleton className="h-6 w-48 mb-6" />
                      <div className="space-y-2">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div key={i} className="flex items-center justify-between py-2 border-b border-white/5">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-6 w-8 rounded-full" />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-[#151515] p-8 rounded-xl">
                      <Skeleton className="h-6 w-48 mb-4" />
                      <Skeleton className="h-16 w-full mb-6" />
                      <Skeleton className="h-12 w-full mb-4" />
                      <Skeleton className="h-12 w-full" />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
          <Footer />
        </div>
      </PageSpecificWrapper>
    )
  }

  if (!post) {
    return (
      <PageSpecificWrapper pageType="blogPost">
        <div className="min-h-screen bg-[#0e0e0e] text-white">
          <Header />
          <main className="pt-24">
            <div className="pt-32 pb-20 flex flex-col items-center justify-center">
              <h1 className="text-3xl font-bold mb-4">Blog Post Not Found</h1>
              <p className="text-white/70 mb-8">The blog post you're looking for doesn't exist or has been removed.</p>
              <Link href="/blog">
                <Button className="bg-[#ff4d4d] hover:bg-[#ff3333] text-white">Back to Blog</Button>
              </Link>
            </div>
          </main>
          <Footer />
        </div>
      </PageSpecificWrapper>
    )
  }

  return (
    <PageSpecificWrapper pageType="blogPost">
      <div className="min-h-screen bg-[#0e0e0e] text-white overflow-hidden">
        <Header />

        <main className="pt-24">
          {/* Hero Section */}
          <section className="pt-32 pb-16 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-gradient-to-br from-[#ff4d4d]/5 to-transparent rounded-full blur-[100px] -z-10" />
            <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-to-tl from-[#ff4d4d]/5 to-transparent rounded-full blur-[100px] -z-10" />

            <div className="container px-4 md:px-6">
              <div className="max-w-4xl mx-auto text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mb-4"
                >
                  <Link href={`/blog?category=${post.category}`} className="inline-block">
                    <span className="text-sm uppercase tracking-[0.2em] text-[#ff4d4d] border-b border-[#ff4d4d] pb-1 font-medium">
                      {post.category}
                    </span>
                  </Link>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-4xl md:text-5xl font-bold mb-6"
                >
                  {post.title}
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex flex-wrap items-center justify-center gap-4 text-white/70 mb-8"
                >
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-[#ff4d4d]" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-[#ff4d4d]" />
                    <span>{post.readTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative w-6 h-6 rounded-full overflow-hidden">
                      <Image
                        src={post.author.image || "/placeholder.svg"}
                        alt={post.author.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span>By {post.author.name}</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Featured Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="container px-4 md:px-6 mb-16"
          >
            <div className="max-w-5xl mx-auto relative h-[300px] md:h-[500px] rounded-xl overflow-hidden">
              <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" priority />
            </div>
          </motion.div>

          {/* Content Section */}
          <section className="py-12">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col lg:flex-row gap-12">
                {/* Main Content */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="lg:w-2/3"
                >
                  <div className="prose prose-lg prose-invert max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                  </div>

                  {/* Tags */}
                  <div className="mt-12">
                    <h3 className="text-lg font-semibold mb-4">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag, index) => (
                        <Link key={index} href={`/blog?tag=${tag}`}>
                          <span className="bg-[#151515] hover:bg-[#ff4d4d]/20 text-white/80 hover:text-white px-4 py-2 rounded-full text-sm transition-colors duration-300">
                            {tag}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Share */}
                  <div className="mt-12 border-t border-white/10 pt-8">
                    <div className="flex items-center gap-4">
                      <span className="text-white/70 flex items-center gap-2">
                        <Share2 className="h-4 w-4" /> Share this post:
                      </span>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="bg-[#151515] text-white hover:bg-[#ff4d4d] hover:text-white rounded-full h-8 w-8"
                        >
                          <Facebook className="h-4 w-4" />
                          <span className="sr-only">Share on Facebook</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="bg-[#151515] text-white hover:bg-[#ff4d4d] hover:text-white rounded-full h-8 w-8"
                        >
                          <Twitter className="h-4 w-4" />
                          <span className="sr-only">Share on Twitter</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="bg-[#151515] text-white hover:bg-[#ff4d4d] hover:text-white rounded-full h-8 w-8"
                        >
                          <Linkedin className="h-4 w-4" />
                          <span className="sr-only">Share on LinkedIn</span>
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Author Bio */}
                  <div className="mt-12 bg-[#151515] p-8 rounded-xl">
                    <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                      <div className="relative w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
                        <Image
                          src={post.author.image || "/placeholder.svg"}
                          alt={post.author.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2">{post.author.name}</h3>
                        <p className="text-[#ff4d4d] mb-4">{post.author.role}</p>
                        <p className="text-white/70">
                          A passionate technologist with over 10 years of experience in web development and design.
                          Specializes in creating intuitive and performant digital experiences that solve real-world
                          problems.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Post Navigation */}
                  <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <CursorBorder borderColor="#ff4d4d" borderWidth={2} borderRadius={8}>
                      <Link href="/blog/optimizing-performance-react-applications" className="block">
                        <div className="bg-[#151515] p-6 h-full">
                          <div className="flex items-center gap-2 text-[#ff4d4d] mb-2">
                            <ArrowLeft className="h-4 w-4" />
                            <span className="text-sm uppercase tracking-wider">Previous Post</span>
                          </div>
                          <h4 className="font-semibold hover:text-[#ff4d4d] transition-colors duration-300">
                            Optimizing Performance in React Applications
                          </h4>
                        </div>
                      </Link>
                    </CursorBorder>

                    <CursorBorder borderColor="#ff4d4d" borderWidth={2} borderRadius={8}>
                      <Link href="/blog/mastering-ui-ux-design-web-applications" className="block">
                        <div className="bg-[#151515] p-6 h-full">
                          <div className="flex items-center justify-end gap-2 text-[#ff4d4d] mb-2">
                            <span className="text-sm uppercase tracking-wider">Next Post</span>
                            <ArrowRight className="h-4 w-4" />
                          </div>
                          <h4 className="font-semibold text-right hover:text-[#ff4d4d] transition-colors duration-300">
                            Mastering UI/UX Design for Web Applications
                          </h4>
                        </div>
                      </Link>
                    </CursorBorder>
                  </div>
                </motion.div>

                {/* Sidebar */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="lg:w-1/3"
                >
                  {/* Related Posts */}
                  <div className="bg-[#151515] p-8 rounded-xl mb-8">
                    <h3 className="text-xl font-bold mb-6 border-b border-white/10 pb-4">Related Posts</h3>
                    <div className="space-y-6">
                      {relatedPosts.map((relatedPost) => (
                        <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`}>
                          <div className="group flex gap-4">
                            <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                              <Image
                                src={relatedPost.image || "/placeholder.svg"}
                                alt={relatedPost.title}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-110"
                              />
                            </div>
                            <div>
                              <h4 className="font-semibold group-hover:text-[#ff4d4d] transition-colors duration-300">
                                {relatedPost.title}
                              </h4>
                              <p className="text-white/50 text-sm mt-1">{relatedPost.date}</p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Categories */}
                  <div className="bg-[#151515] p-8 rounded-xl mb-8">
                    <h3 className="text-xl font-bold mb-6 border-b border-white/10 pb-4">Categories</h3>
                    <div className="space-y-2">
                      {["Web Development", "React", "Design", "AI", "Accessibility"].map((category) => (
                        <Link key={category} href={`/blog?category=${category}`}>
                          <div className="flex items-center justify-between py-2 border-b border-white/5 group">
                            <span className="group-hover:text-[#ff4d4d] transition-colors duration-300">
                              {category}
                            </span>
                            <span className="bg-[#0e0e0e] text-white/50 px-2 py-1 rounded-full text-xs">
                              {Math.floor(Math.random() * 10) + 1}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Newsletter */}
                  <div className="bg-[#151515] p-8 rounded-xl">
                    <h3 className="text-xl font-bold mb-4">Subscribe to Our Newsletter</h3>
                    <p className="text-white/70 mb-6">
                      Get the latest articles, tutorials, and updates delivered straight to your inbox.
                    </p>
                    <form className="space-y-4">
                      <input
                        type="email"
                        placeholder="Your email address"
                        className="w-full bg-[#0e0e0e] border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#ff4d4d] focus:border-transparent"
                      />
                      <Button
                        onClick={() => {
                          // Simple newsletter subscription logic
                          const emailInput = document.querySelector('input[type="email"]') as HTMLInputElement
                          if (emailInput && emailInput.value) {
                            alert("Thank you for subscribing to our newsletter!")
                            emailInput.value = ""
                          } else {
                            alert("Please enter a valid email address.")
                          }
                        }}
                        className="w-full bg-[#ff4d4d] hover:bg-[#ff3333] text-white"
                      >
                        Subscribe
                      </Button>
                    </form>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </PageSpecificWrapper>
  )
}
