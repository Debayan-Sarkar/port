import type { Metadata } from "next"
import SocialMediaClientPage from "./social-media-client-page"
import { getInstagramUsername, getInstagramPosts } from "@/app/actions/social-media"

export const metadata: Metadata = {
  title: "Social Media Management | Admin Dashboard",
  description: "Manage your social media profiles and content",
}

export default async function SocialMediaPage() {
  // Fetch data server-side
  const username = await getInstagramUsername()
  const posts = await getInstagramPosts()

  return <SocialMediaClientPage initialUsername={username} initialPosts={posts} />
}
