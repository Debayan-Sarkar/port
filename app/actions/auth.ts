"use server"

import { cookies } from "next/headers"
import { adminAuth } from "@/lib/firebase-admin"
import { redirect } from "next/navigation"

export async function login(formData: FormData) {
  try {
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    // Check if user exists
    let userRecord
    try {
      userRecord = await adminAuth.getUserByEmail(email)
    } catch (error) {
      return {
        success: false,
        error: "Invalid email or password",
      }
    }

    // In a real production app, you would use Firebase Auth signInWithEmailAndPassword
    // Here we're using a simplified approach for demonstration
    // We're using the Firebase Admin SDK to create a custom token

    // Create a custom token
    const customToken = await adminAuth.createCustomToken(userRecord.uid, {
      admin: true,
    })

    // Set session cookie
    const expiresIn = 60 * 60 * 24 * 5 // 5 days

    cookies().set("admin-session", customToken, {
      maxAge: expiresIn,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    })

    return { success: true }
  } catch (error: any) {
    console.error("Login error:", error)
    return {
      success: false,
      error: error.message || "Invalid email or password",
    }
  }
}

export async function register(formData: FormData) {
  try {
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirmPassword") as string

    // Validate passwords match
    if (password !== confirmPassword) {
      return {
        success: false,
        error: "Passwords do not match",
      }
    }

    // Check if user already exists
    try {
      const existingUser = await adminAuth.getUserByEmail(email)
      if (existingUser) {
        return {
          success: false,
          error: "User already exists with this email",
        }
      }
    } catch (error) {
      // User doesn't exist, which is what we want
    }

    // Create a new user
    const userRecord = await adminAuth.createUser({
      email,
      password,
      displayName: "Admin User",
    })

    // Set admin custom claim
    await adminAuth.setCustomUserClaims(userRecord.uid, { admin: true })

    return { success: true }
  } catch (error: any) {
    console.error("Registration error:", error)
    return {
      success: false,
      error: error.message || "Failed to create account",
    }
  }
}

export async function logout() {
  cookies().delete("admin-session")
  redirect("/admin/login")
}

export async function getAuthenticatedUser() {
  try {
    const sessionCookie = cookies().get("admin-session")?.value

    if (!sessionCookie) {
      return null
    }

    // Verify the session cookie
    const decodedToken = await adminAuth.verifyIdToken(sessionCookie).catch(() => null)

    if (!decodedToken) {
      return null
    }

    const user = await adminAuth.getUser(decodedToken.uid)

    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      isAdmin: decodedToken.admin === true,
    }
  } catch (error) {
    console.error("Auth error:", error)
    return null
  }
}
