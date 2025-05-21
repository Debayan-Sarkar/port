"use server"

import { adminDb, adminStorage } from "@/lib/firebase-admin"
import { revalidatePath } from "next/cache"

export async function getProjects() {
  try {
    const snapshot = await adminDb.collection("projects").orderBy("createdAt", "desc").get()

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
  } catch (error) {
    console.error("Error getting projects:", error)
    // Return mock data as fallback during development
    return [
      {
        id: 1,
        title: "E-Commerce Dashboard",
        image: "/ecommerce-dashboard-overview.png",
        slug: "ecommerce-dashboard",
        published: true,
        description: "A comprehensive e-commerce dashboard with analytics and inventory management.",
        technologies: ["React", "Next.js", "Tailwind CSS", "Chart.js"],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 2,
        title: "AI Content Creator",
        image: "/ai-content-creator-dashboard.png",
        slug: "ai-content-creator",
        published: true,
        description: "AI-powered content creation platform for marketers and content teams.",
        technologies: ["React", "OpenAI API", "Node.js", "MongoDB"],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 3,
        title: "Modern Fitness App",
        image: "/modern-fitness-dashboard.png",
        slug: "modern-fitness-app",
        published: false,
        description: "Fitness tracking application with workout plans and progress monitoring.",
        technologies: ["React Native", "Firebase", "Redux", "Health APIs"],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 4,
        title: "Chat Interface",
        image: "/modern-chat-interface.png",
        slug: "chat-interface",
        published: true,
        description: "Real-time chat application with modern UI and rich features.",
        technologies: ["React", "Socket.io", "Express", "MongoDB"],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ]
  }
}

export async function getProjectBySlug(slug: string) {
  try {
    const snapshot = await adminDb
      .collection("projects")
      .where("slug", "==", slug)
      .where("published", "==", true)
      .limit(1)
      .get()

    if (snapshot.empty) {
      return null
    }

    const doc = snapshot.docs[0]
    return {
      id: doc.id,
      ...doc.data(),
    }
  } catch (error) {
    console.error("Error getting project:", error)
    // Return mock data as fallback during development
    const mockProjects = await getProjects()
    return mockProjects.find((p) => p.slug === slug) || null
  }
}

export async function createProject(formData: FormData) {
  try {
    const title = formData.get("title") as string
    const slug = formData.get("slug") as string
    const description = formData.get("description") as string
    const content = formData.get("content") as string
    const imageFile = formData.get("image") as File
    const technologies = formData.getAll("technologies") as string[]
    const featured = formData.get("featured") === "true"
    const published = formData.get("published") === "true"

    // Upload image to Firebase Storage
    let imageUrl = ""
    if (imageFile && imageFile.size > 0) {
      const fileRef = adminStorage.bucket().file(`projects/${slug}-${Date.now()}`)
      const fileBuffer = Buffer.from(await imageFile.arrayBuffer())

      await fileRef.save(fileBuffer, {
        metadata: {
          contentType: imageFile.type,
        },
      })

      imageUrl = `https://storage.googleapis.com/${adminStorage.bucket().name}/${fileRef.name}`
    }

    // Create project in Firestore
    const projectRef = adminDb.collection("projects").doc()
    await projectRef.set({
      title,
      slug,
      description,
      content,
      imageUrl: imageUrl || "/placeholder.svg",
      technologies,
      featured,
      published,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })

    revalidatePath("/projects")
    revalidatePath("/admin/projects")

    return { success: true, id: projectRef.id }
  } catch (error) {
    console.error("Error creating project:", error)
    return { success: false, error: "Failed to create project" }
  }
}

export async function updateProject(formData: FormData) {
  try {
    const id = formData.get("id") as string
    const title = formData.get("title") as string
    const slug = formData.get("slug") as string
    const description = formData.get("description") as string
    const content = formData.get("content") as string
    const imageFile = formData.get("image") as File
    const technologies = formData.getAll("technologies") as string[]
    const featured = formData.get("featured") === "true"
    const published = formData.get("published") === "true"

    const projectRef = adminDb.collection("projects").doc(id)
    const projectDoc = await projectRef.get()

    if (!projectDoc.exists) {
      return { success: false, error: "Project not found" }
    }

    const projectData = projectDoc.data()

    // Upload new image if provided
    let imageUrl = projectData?.imageUrl || ""
    if (imageFile && imageFile.size > 0) {
      const fileRef = adminStorage.bucket().file(`projects/${slug}-${Date.now()}`)
      const fileBuffer = Buffer.from(await imageFile.arrayBuffer())

      await fileRef.save(fileBuffer, {
        metadata: {
          contentType: imageFile.type,
        },
      })

      imageUrl = `https://storage.googleapis.com/${adminStorage.bucket().name}/${fileRef.name}`
    }

    // Update project in Firestore
    await projectRef.update({
      title,
      slug,
      description,
      content,
      imageUrl,
      technologies,
      featured,
      published,
      updatedAt: new Date().toISOString(),
    })

    revalidatePath("/projects")
    revalidatePath(`/projects/${slug}`)
    revalidatePath("/admin/projects")

    return { success: true }
  } catch (error) {
    console.error("Error updating project:", error)
    return { success: false, error: "Failed to update project" }
  }
}

export async function deleteProject(id: string) {
  try {
    await adminDb.collection("projects").doc(id).delete()

    revalidatePath("/projects")
    revalidatePath("/admin/projects")

    return { success: true }
  } catch (error) {
    console.error("Error deleting project:", error)
    return { success: false, error: "Failed to delete project" }
  }
}
