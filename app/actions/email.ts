"use server"

import nodemailer from "nodemailer"

export type EmailData = {
  name: string
  email: string
  subject: string
  message: string
}

export async function sendEmail(data: EmailData) {
  const { name, email, subject, message } = data

  if (!name || !email || !subject || !message) {
    return {
      success: false,
      message: "Missing required fields",
    }
  }

  try {
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

    // Email content
    const mailOptions = {
      from: `"Portfolio Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `Contact Form: ${subject}`,
      text: `
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
      `,
      html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #ff4d4d;">New Contact Form Submission</h2>
  <p><strong>Name:</strong> ${name}</p>
  <p><strong>Email:</strong> ${email}</p>
  <p><strong>Subject:</strong> ${subject}</p>
  <div style="margin-top: 20px;">
    <h3 style="color: #333;">Message:</h3>
    <p style="background-color: #f5f5f5; padding: 15px; border-left: 4px solid #ff4d4d;">${message.replace(/\n/g, "<br>")}</p>
  </div>
  <div style="margin-top: 30px; font-size: 12px; color: #666; border-top: 1px solid #eee; padding-top: 10px;">
    <p>This message was sent from your portfolio website contact form.</p>
  </div>
</div>
      `,
    }

    // Send the email
    await transporter.sendMail(mailOptions)

    return {
      success: true,
      message: "Email sent successfully",
    }
  } catch (error) {
    console.error("Error sending email:", error)
    return {
      success: false,
      message: "Failed to send email",
      error: error instanceof Error ? error.message : String(error),
    }
  }
}
