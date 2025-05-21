"use server"

import { adminDb, adminStorage } from "@/lib/firebase-admin"
import { revalidatePath } from "next/cache"

// Types
export type InstagramPost = {
  id: string
  image: string
  caption: string
  username: string
  likes: number
  comments: number
  saves: number
  date: string
}

// Get all Instagram posts
export async function getInstagramPosts() {
  try {
    const snapshot = await adminDb.collection("instagram").orderBy("date", "desc").get()

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as InstagramPost[]
  } catch (error) {
    console.error("Error getting Instagram posts:", error)
    return []
  }
}

// Get Instagram posts by username
export async function getInstagramPostsByUsername(username: string) {
  try {
    const snapshot = await adminDb
      .collection("instagram")
      .where("username", "==", username)
      .orderBy("date", "desc")
      .get()

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as InstagramPost[]
  } catch (error) {
    console.error("Error getting Instagram posts by username:", error)
    return []
  }
}

// Create a new Instagram post
export async function createInstagramPost(formData: FormData) {
  try {
    const caption = formData.get("caption") as string
    const username = formData.get("username") as string
    const imageFile = formData.get("image") as File

    // Upload image to Firebase Storage
    let imageUrl = ""
    if (imageFile && imageFile.size > 0) {
      const fileRef = adminStorage.bucket().file(`instagram/${username}-${Date.now()}`)
      const fileBuffer = Buffer.from(await imageFile.arrayBuffer())

      await fileRef.save(fileBuffer, {
        metadata: {
          contentType: imageFile.type,
        },
      })

      imageUrl = `https://storage.googleapis.com/${adminStorage.bucket().name}/${fileRef.name}`
    }

    // Create post in Firestore
    const postRef = adminDb.collection("instagram").doc()
    await postRef.set({
      image: imageUrl,
      caption,
      username,
      likes: 0,
      comments: 0,
      saves: 0,
      date: new Date().toISOString(),
    })

    revalidatePath("/admin/instagram")

    return { success: true, id: postRef.id }
  } catch (error) {
    console.error("Error creating Instagram post:", error)
    return { success: false, error: "Failed to create post" }
  }
}

// Update an Instagram post
export async function updateInstagramPost(formData: FormData) {
  try {
    const id = formData.get("id") as string
    const caption = formData.get("caption") as string
    const username = formData.get("username") as string
    const likes = Number.parseInt(formData.get("likes") as string) || 0
    const comments = Number.parseInt(formData.get("comments") as string) || 0
    const saves = Number.parseInt(formData.get("saves") as string) || 0
    const imageFile = formData.get("image") as File

    const postRef = adminDb.collection("instagram").doc(id)
    const postDoc = await postRef.get()

    if (!postDoc.exists) {
      return { success: false, error: "Post not found" }
    }

    const postData = postDoc.data()

    // Upload new image if provided
    let imageUrl = postData?.image || ""
    if (imageFile && imageFile.size > 0) {
      const fileRef = adminStorage.bucket().file(`instagram/${username}-${Date.now()}`)
      const fileBuffer = Buffer.from(await imageFile.arrayBuffer())

      await fileRef.save(fileBuffer, {
        metadata: {
          contentType: imageFile.type,
        },
      })

      imageUrl = `https://storage.googleapis.com/${adminStorage.bucket().name}/${fileRef.name}`
    }

    // Update post in Firestore
    await postRef.update({
      image: imageUrl,
      caption,
      username,
      likes,
      comments,
      saves,
    })

    revalidatePath("/admin/instagram")

    return { success: true }
  } catch (error) {
    console.error("Error updating Instagram post:", error)
    return { success: false, error: "Failed to update post" }
  }
}

// Delete an Instagram post
export async function deleteInstagramPost(id: string) {
  try {
    await adminDb.collection("instagram").doc(id).delete()

    revalidatePath("/admin/instagram")

    return { success: true }
  } catch (error) {
    console.error("Error deleting Instagram post:", error)
    return { success: false, error: "Failed to delete post" }
  }
}

// Update username for all posts
export async function updateInstagramUsername(oldUsername: string, newUsername: string) {
  try {
    // Get all posts with the old username
    const snapshot = await adminDb.collection("instagram").where("username", "==", oldUsername).get()

    // Update each post with the new username
    const batch = adminDb.batch()

    snapshot.docs.forEach((doc) => {
      batch.update(doc.ref, { username: newUsername })
    })

    await batch.commit()

    revalidatePath("/admin/instagram")

    return {
      success: true,
      count: snapshot.docs.length,
      message: `Updated username for ${snapshot.docs.length} posts`,
    }
  } catch (error) {
    console.error("Error updating Instagram username:", error)
    return { success: false, error: "Failed to update username" }
  }
}
