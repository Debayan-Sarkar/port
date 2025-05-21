"use server"

import { db } from "@/lib/firebase"
import { collection, getDocs, setDoc, doc } from "firebase/firestore"
import { getAuthenticatedUser } from "./auth"

export async function initializeFirebase() {
  const user = await getAuthenticatedUser()

  if (!user || !user.isAdmin) {
    return { success: false, error: "Unauthorized" }
  }

  try {
    // Check if we have any Instagram posts
    const postsSnapshot = await getDocs(collection(db, "instagram_posts"))

    // If we don't have any posts, create some sample data
    if (postsSnapshot.empty) {
      const samplePosts = [
        {
          id: "post1",
          username: "dev_portfolio",
          imageUrl: "/instagram/dev-coding.jpg",
          caption: "Coding day! #webdevelopment #coding",
          likes: 120,
          saves: 45,
          comments: 23,
          timestamp: new Date().toISOString(),
        },
        {
          id: "post2",
          username: "dev_portfolio",
          imageUrl: "/instagram/dev-conference.jpg",
          caption: "At the tech conference! #technology #conference",
          likes: 89,
          saves: 32,
          comments: 15,
          timestamp: new Date().toISOString(),
        },
        {
          id: "post3",
          username: "dev_portfolio",
          imageUrl: "/instagram/dev-team.jpg",
          caption: "Team meeting! #teamwork #development",
          likes: 156,
          saves: 67,
          comments: 34,
          timestamp: new Date().toISOString(),
        },
      ]

      // Add sample posts to Firestore
      for (const post of samplePosts) {
        await setDoc(doc(db, "instagram_posts", post.id), post)
      }

      return { success: true, message: "Sample data initialized successfully" }
    }

    return { success: true, message: "Firebase already initialized" }
  } catch (error: any) {
    console.error("Firebase initialization error:", error)
    return { success: false, error: error.message || "Failed to initialize Firebase" }
  }
}
