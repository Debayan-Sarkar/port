import type { Metadata } from "next"
import BlogPostClient from "./BlogPostClient"
import PageSpecificWrapper from "@/components/page-specific-wrapper"

type Props = {
  params: {
    slug: string
  }
}

export const metadata: Metadata = {
  title: "Blog Post | Modern Developer Portfolio",
  description: "Read our latest articles on web development, design, and technology",
}

export default function BlogPostPage({ params }: Props) {
  return (
    <PageSpecificWrapper pageType="blogPost">
      <BlogPostClient slug={params.slug} />
    </PageSpecificWrapper>
  )
}
