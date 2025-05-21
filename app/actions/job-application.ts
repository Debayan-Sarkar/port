"use server"

import { revalidatePath } from "next/cache"
import nodemailer from "nodemailer"
import { v4 as uuidv4 } from "uuid"

// This is a mock database for demonstration purposes
// In a real application, you would use a database like MongoDB, PostgreSQL, etc.
const applications = [
  // Sample applications are defined in admin-applications.ts
]

export async function submitJobApplication(formData: FormData) {
  try {
    // Extract form data
    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const name = `${firstName} ${lastName}`.trim()
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const position = formData.get("position") as string
    const experience = formData.get("experience") as string
    const message = formData.get("message") as string
    const resumeFile = formData.get("resume") as File
    const linkedinUrl = formData.get("linkedin") as string
    const portfolioUrl = formData.get("portfolio") as string

    // Validate required fields
    if (!name || !email || !phone || !position) {
      return {
        success: false,
        message: "Please fill in all required fields",
      }
    }

    // Check if environment variables are available
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("Email environment variables are not set")
      return {
        success: false,
        message: "Email configuration is missing. Please contact the administrator.",
      }
    }

    // Create a transporter with Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    // Convert resume file to base64 if it exists
    let resumeAttachment = null
    let resumeFileName = ""
    let resumeUrl = ""

    if (resumeFile && resumeFile.size > 0) {
      const buffer = Buffer.from(await resumeFile.arrayBuffer())
      resumeFileName = resumeFile.name
      resumeAttachment = {
        filename: resumeFileName,
        content: buffer,
      }

      // In a real application, you would upload the file to a storage service
      // and get a URL to access it. For this example, we'll use a placeholder.
      resumeUrl = "/sample-resume.pdf"
    }

    // Prepare email attachments
    const attachments = resumeAttachment ? [resumeAttachment] : []

    // Email content
    const mailOptions = {
      from: `"Portfolio Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `New Job Application: ${position} - ${name}`,
      text: `
Name: ${name}
Email: ${email}
Phone: ${phone}
Position: ${position}
Experience: ${experience}
LinkedIn: ${linkedinUrl || "Not provided"}
Portfolio: ${portfolioUrl || "Not provided"}

Message:
${message || "No additional message provided"}

Resume: ${resumeFileName || "Not provided"}
      `,
      html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #ff4d4d;">New Job Application</h2>
  <p><strong>Position:</strong> ${position}</p>
  <p><strong>Name:</strong> ${name}</p>
  <p><strong>Email:</strong> ${email}</p>
  <p><strong>Phone:</strong> ${phone}</p>
  <p><strong>Experience:</strong> ${experience}</p>
  <p><strong>LinkedIn:</strong> ${linkedinUrl ? `<a href="${linkedinUrl}">${linkedinUrl}</a>` : "Not provided"}</p>
  <p><strong>Portfolio:</strong> ${portfolioUrl ? `<a href="${portfolioUrl}">${portfolioUrl}</a>` : "Not provided"}</p>
  
  <div style="margin-top: 20px;">
    <h3 style="color: #333;">Message:</h3>
    <p style="background-color: #f5f5f5; padding: 15px; border-left: 4px solid #ff4d4d;">${message ? message.replace(/\n/g, "<br>") : "No additional message provided"}</p>
  </div>
  
  <div style="margin-top: 20px;">
    <h3 style="color: #333;">Resume:</h3>
    <p>${resumeFileName ? `Attached: ${resumeFileName}` : "Not provided"}</p>
  </div>
  
  <div style="margin-top: 30px; font-size: 12px; color: #666; border-top: 1px solid #eee; padding-top: 10px;">
    <p>This message was sent from the portfolio website job application form.</p>
  </div>
</div>
      `,
      attachments,
    }

    // Send the email
    await transporter.sendMail(mailOptions)

    // Store the application in our mock database
    const newApplication = {
      id: uuidv4(),
      name,
      email,
      phone,
      position,
      experience,
      message: message || undefined,
      resumeUrl: resumeUrl || undefined,
      linkedinUrl: linkedinUrl || undefined,
      portfolioUrl: portfolioUrl || undefined,
      status: "pending",
      createdAt: new Date().toISOString(),
    }

    // In a real application, you would save this to your database
    applications.push(newApplication)

    revalidatePath("/join-our-team")
    revalidatePath("/admin/applications")

    return {
      success: true,
      message: "Your application has been submitted successfully!",
    }
  } catch (error) {
    console.error("Error sending job application:", error)
    return {
      success: false,
      message: "Failed to submit application. Please try again later.",
      details: error instanceof Error ? error.message : String(error),
    }
  }
}
