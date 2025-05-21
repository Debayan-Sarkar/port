"use server"

import { revalidatePath } from "next/cache"

export type InstagramPost = {
  id: string
  caption: string
  imageUrl: string
  likes: number
  comments: number
  date: string
  isPublished: boolean
  scheduledFor?: string
}

// Mock data for Instagram
let instagramUsername = "Jomiez_innovation"
let instagramPosts: InstagramPost[] = [
  {
    id: "post-1",
    caption: "Our new office space is designed for collaboration and creativity! #NewBeginnings #OfficeGoals",
    imageUrl: "/instagram/company-office.jpg",
    likes: 1843,
    comments: 124,
    date: "2 days ago",
    isPublished: true,
  },
  {
    id: "post-2",
    caption: "Team building day! Nothing builds bonds like competitive laser tag 🎯 #TeamBuilding #WorkCulture",
    imageUrl: "/instagram/company-team-event.jpg",
    likes: 2156,
    comments: 98,
    date: "1 week ago",
    isPublished: true,
  },
  {
    id: "post-3",
    caption:
      "Celebrating the successful launch of our latest product! Months of hard work paid off. #ProductLaunch #Success",
    imageUrl: "/instagram/company-product-launch.jpg",
    likes: 3241,
    comments: 187,
    date: "2 weeks ago",
    isPublished: true,
  },
  {
    id: "post-4",
    caption:
      "Our internal hackathon produced some amazing innovations! Can't wait to implement these ideas. #Innovation #Hackathon",
    imageUrl: "/instagram/company-hackathon.jpg",
    likes: 1756,
    comments: 93,
    date: "3 weeks ago",
    isPublished: true,
  },
  {
    id: "post-5",
    caption:
      "Proud to represent our company at the annual Tech Summit! Great connections and insights. #TechSummit #Networking",
    imageUrl: "/instagram/company-conference.jpg",
    likes: 2089,
    comments: 112,
    date: "1 month ago",
    isPublished: true,
  },
  {
    id: "post-6",
    caption:
      "Giving back to the community through our annual charity drive. Making a difference together! #GivingBack #Community",
    imageUrl: "/instagram/company-charity.jpg",
    likes: 2567,
    comments: 143,
    date: "1 month ago",
    isPublished: true,
  },
  {
    id: "post-7",
    caption:
      "Sneak peek at our upcoming product release! We can't wait to share more details soon! #ComingSoon #ProductReveal",
    imageUrl: "/instagram/company-product-teaser.jpg",
    likes: 0,
    comments: 0,
    date: "Just now",
    isPublished: false,
    scheduledFor: "2023-12-15T09:00:00Z",
  },
  {
    id: "post-8",
    caption:
      "Meet our new team members! Excited to have such talented individuals join our company. #NewHires #TeamGrowth",
    imageUrl: "/instagram/company-new-hires.jpg",
    likes: 0,
    comments: 0,
    date: "Just now",
    isPublished: false,
    scheduledFor: "2023-12-20T15:30:00Z",
  },
]

// Server actions for Instagram
export async function getInstagramUsername(): Promise<string> {
  return instagramUsername
}

export async function updateInstagramUsername(username: string): Promise<{ success: boolean; message: string }> {
  try {
    instagramUsername = username
    revalidatePath("/admin/social-media")
    return { success: true, message: "Username updated successfully" }
  } catch (error) {
    return { success: false, message: "Failed to update username" }
  }
}

export async function getInstagramPosts(): Promise<InstagramPost[]> {
  return instagramPosts
}

export async function createInstagramPost(
  post: Omit<InstagramPost, "id">,
): Promise<{ success: boolean; post?: InstagramPost; message: string }> {
  try {
    const newPost: InstagramPost = {
      ...post,
      id: `post-${Date.now()}`,
    }

    instagramPosts = [newPost, ...instagramPosts]
    revalidatePath("/admin/social-media")
    revalidatePath("/")

    return {
      success: true,
      post: newPost,
      message: "Post created successfully",
    }
  } catch (error) {
    return { success: false, message: "Failed to create post" }
  }
}

export async function updateInstagramPost(updatedPost: InstagramPost): Promise<{ success: boolean; message: string }> {
  try {
    const index = instagramPosts.findIndex((post) => post.id === updatedPost.id)

    if (index === -1) {
      return { success: false, message: "Post not found" }
    }

    instagramPosts[index] = updatedPost
    revalidatePath("/admin/social-media")
    revalidatePath("/")

    return { success: true, message: "Post updated successfully" }
  } catch (error) {
    return { success: false, message: "Failed to update post" }
  }
}

export async function deleteInstagramPost(id: string): Promise<{ success: boolean; message: string }> {
  try {
    const initialLength = instagramPosts.length
    instagramPosts = instagramPosts.filter((post) => post.id !== id)

    if (instagramPosts.length === initialLength) {
      return { success: false, message: "Post not found" }
    }

    revalidatePath("/admin/social-media")
    revalidatePath("/")

    return { success: true, message: "Post deleted successfully" }
  } catch (error) {
    return { success: false, message: "Failed to delete post" }
  }
}

export async function publishInstagramPost(id: string): Promise<{ success: boolean; message: string }> {
  try {
    const post = instagramPosts.find((post) => post.id === id)

    if (!post) {
      return { success: false, message: "Post not found" }
    }

    post.isPublished = true
    post.date = "Just now"
    delete post.scheduledFor

    revalidatePath("/admin/social-media")
    revalidatePath("/")

    return { success: true, message: "Post published successfully" }
  } catch (error) {
    return { success: false, message: "Failed to publish post" }
  }
}
