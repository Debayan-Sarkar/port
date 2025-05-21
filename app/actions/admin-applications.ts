"use server"

import { revalidatePath } from "next/cache"
import nodemailer from "nodemailer"

// This is a mock database for demonstration purposes
// In a real application, you would use a database like MongoDB, PostgreSQL, etc.
let applications = [
  {
    id: "app-1",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    position: "Frontend Developer",
    experience: "3-5",
    message:
      "I'm excited about the opportunity to join your team and contribute to your projects. I have experience with React, Next.js, and TypeScript.",
    resumeUrl: "/sample-resume.pdf",
    linkedinUrl: "https://linkedin.com/in/johndoe",
    portfolioUrl: "https://johndoe-portfolio.com",
    status: "pending",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
  },
  {
    id: "app-2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1 (555) 987-6543",
    position: "UI/UX Designer",
    experience: "1-3",
    message:
      "I've been following your company for a while and I'm impressed with your design work. I believe my skills in UI/UX design would be a great addition to your team.",
    resumeUrl: "/sample-resume.pdf",
    linkedinUrl: "https://linkedin.com/in/janesmith",
    status: "pending",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
  },
  {
    id: "app-3",
    name: "Michael Johnson",
    email: "michael.johnson@example.com",
    phone: "+1 (555) 456-7890",
    position: "Full Stack Developer",
    experience: "5-10",
    message:
      "I have extensive experience in full stack development and I'm looking for new challenges. I'm particularly interested in your company because of the innovative projects you're working on.",
    resumeUrl: "/sample-resume.pdf",
    portfolioUrl: "https://michaeljohnson-dev.com",
    status: "accepted",
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
  },
  {
    id: "app-4",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    phone: "+1 (555) 789-0123",
    position: "Project Manager",
    experience: "5-10",
    message:
      "I'm an experienced project manager looking for a new opportunity. I've successfully led teams of developers and designers on various projects.",
    resumeUrl: "/sample-resume.pdf",
    linkedinUrl: "https://linkedin.com/in/emilydavis",
    status: "rejected",
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days ago
  },
]

export async function getApplications() {
  // In a real application, you would fetch data from your database
  return applications
}

export async function acceptApplication(id: string) {
  try {
    // In a real application, you would update the database
    const application = applications.find((app) => app.id === id)

    if (!application) {
      throw new Error("Application not found")
    }

    // Update the application status
    application.status = "accepted"

    // Send email notification to the applicant
    await sendAcceptanceEmail(application)

    revalidatePath("/admin/applications")
    return { success: true }
  } catch (error) {
    console.error("Error accepting application:", error)
    throw new Error("Failed to accept application")
  }
}

export async function rejectApplication(id: string) {
  try {
    // In a real application, you would update the database
    const application = applications.find((app) => app.id === id)

    if (!application) {
      throw new Error("Application not found")
    }

    // Update the application status
    application.status = "rejected"

    revalidatePath("/admin/applications")
    return { success: true }
  } catch (error) {
    console.error("Error rejecting application:", error)
    throw new Error("Failed to reject application")
  }
}

export async function deleteApplication(id: string) {
  try {
    // In a real application, you would delete from the database
    applications = applications.filter((app) => app.id !== id)

    revalidatePath("/admin/applications")
    return { success: true }
  } catch (error) {
    console.error("Error deleting application:", error)
    throw new Error("Failed to delete application")
  }
}

async function sendAcceptanceEmail(application: any) {
  try {
    // Check if environment variables are available
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("Email environment variables are not set")
      throw new Error("Email configuration is missing")
    }

    // Create a transporter with Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    // Email content
    const mailOptions = {
      from: `"Your Company" <${process.env.EMAIL_USER}>`,
      to: application.email,
      subject: "Your Job Application Has Been Accepted!",
      text: `
Dear ${application.name},

We are pleased to inform you that your application for the position of ${application.position} has been accepted!

Our team was impressed with your qualifications and experience, and we would like to move forward with the next steps in the hiring process.

Someone from our HR department will contact you shortly to schedule an interview and discuss the details.

If you have any questions in the meantime, please don't hesitate to reach out.

Best regards,
The Hiring Team
Your Company
      `,
      html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #ff4d4d;">Your Application Has Been Accepted!</h2>
  
  <p>Dear ${application.name},</p>
  
  <p>We are pleased to inform you that your application for the position of <strong>${application.position}</strong> has been accepted!</p>
  
  <p>Our team was impressed with your qualifications and experience, and we would like to move forward with the next steps in the hiring process.</p>
  
  <p>Someone from our HR department will contact you shortly to schedule an interview and discuss the details.</p>
  
  <p>If you have any questions in the meantime, please don't hesitate to reach out.</p>
  
  <p>
    Best regards,<br>
    The Hiring Team<br>
    Your Company
  </p>
  
  <div style="margin-top: 30px; font-size: 12px; color: #666; border-top: 1px solid #eee; padding-top: 10px;">
    <p>This is an automated message. Please do not reply to this email.</p>
  </div>
</div>
      `,
    }

    // Send the email
    await transporter.sendMail(mailOptions)

    return { success: true }
  } catch (error) {
    console.error("Error sending acceptance email:", error)
    throw new Error("Failed to send acceptance email")
  }
}
