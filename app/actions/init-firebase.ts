"use server"

import { adminDb } from "@/lib/firebase-admin"
import { revalidatePath } from "next/cache"

// Sample Instagram posts data
const sampleInstagramPosts = [
  {
    image: "/instagram/ceo-conference.jpg",
    caption: "Speaking at the annual tech conference about our vision for the future.",
    username: "ceo_founder",
    likes: 245,
    comments: 32,
    saves: 18,
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
  },
  {
    image: "/instagram/ceo-team.jpg",
    caption: "Proud of our amazing team and what we've accomplished this quarter!",
    username: "ceo_founder",
    likes: 189,
    comments: 24,
    saves: 12,
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
  },
  {
    image: "/instagram/ceo-office.jpg",
    caption: "New office space, new opportunities. Excited for what's ahead!",
    username: "ceo_founder",
    likes: 312,
    comments: 45,
    saves: 28,
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
  },
  {
    image: "/instagram/dev-coding.jpg",
    caption: "Late night coding session. Building something amazing!",
    username: "lead_developer",
    likes: 178,
    comments: 19,
    saves: 8,
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
  },
  {
    image: "/instagram/dev-conference.jpg",
    caption: "Learning new technologies at the developer conference.",
    username: "lead_developer",
    likes: 156,
    comments: 22,
    saves: 14,
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
  },
  {
    image: "/instagram/dev-team.jpg",
    caption: "Brainstorming session with the dev team. Great ideas flowing!",
    username: "lead_developer",
    likes: 201,
    comments: 28,
    saves: 16,
    date: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(), // 12 days ago
  },
  {
    image: "/instagram/designer-workspace.jpg",
    caption: "My creative workspace. Where the magic happens!",
    username: "ux_designer",
    likes: 234,
    comments: 31,
    saves: 22,
    date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago
  },
  {
    image: "/instagram/designer-sketch.jpg",
    caption: "Sketching new ideas for our upcoming project.",
    username: "ux_designer",
    likes: 187,
    comments: 25,
    saves: 19,
    date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(), // 8 days ago
  },
  {
    image: "/instagram/designer-presentation.jpg",
    caption: "Presenting our new design system to the team.",
    username: "ux_designer",
    likes: 211,
    comments: 29,
    saves: 24,
    date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days ago
  },
  {
    image: "/instagram/pm-planning.jpg",
    caption: "Planning our roadmap for the next quarter.",
    username: "project_manager",
    likes: 167,
    comments: 21,
    saves: 13,
    date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(), // 6 days ago
  },
  {
    image: "/instagram/pm-team.jpg",
    caption: "Team building day! Building stronger connections.",
    username: "project_manager",
    likes: 198,
    comments: 27,
    saves: 15,
    date: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(), // 9 days ago
  },
  {
    image: "/instagram/pm-workshop.jpg",
    caption: "Leading a workshop on agile methodologies.",
    username: "project_manager",
    likes: 176,
    comments: 23,
    saves: 11,
    date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days ago
  },
]

export async function initializeFirebaseData() {
  try {
    // Check if data already exists
    const instagramSnapshot = await adminDb.collection("instagram").limit(1).get()

    if (!instagramSnapshot.empty) {
      return {
        success: true,
        message: "Firebase data already initialized. Skipping initialization.",
      }
    }

    // Initialize Instagram posts
    const batch = adminDb.batch()

    for (const post of sampleInstagramPosts) {
      const postRef = adminDb.collection("instagram").doc()
      batch.set(postRef, post)
    }

    await batch.commit()

    revalidatePath("/admin/instagram")

    return {
      success: true,
      message: "Firebase data initialized successfully!",
    }
  } catch (error) {
    console.error("Error initializing Firebase data:", error)
    return {
      success: false,
      error: "Failed to initialize Firebase data",
    }
  }
}
