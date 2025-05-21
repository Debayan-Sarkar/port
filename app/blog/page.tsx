import type { Metadata } from "next"
import { Suspense } from "react"
import BlogPageClient from "./BlogPageClient"
import PageSpecificWrapper from "@/components/page-specific-wrapper"

export const metadata: Metadata = {
  title: "Blog | Modern Developer Portfolio",
  description: "Read our latest articles on web development, design, and technology",
}

export default function BlogPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  // Extract search parameters
  const category = typeof searchParams.category === "string" ? searchParams.category : undefined
  const tag = typeof searchParams.tag === "string" ? searchParams.tag : undefined

  return (
    <PageSpecificWrapper pageType="blog">
      <Suspense
        fallback={
          <div className="min-h-screen bg-[#0e0e0e] flex items-center justify-center">
            <div className="animate-spin h-8 w-8 border-4 border-[#ff4d4d] border-t-transparent rounded-full"></div>
          </div>
        }
      >
        <BlogPageClient initialCategory={category} initialTag={tag} />
      </Suspense>
    </PageSpecificWrapper>
  )
}
