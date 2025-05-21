import type { Metadata } from "next"
import { ResumeForm } from "@/components/admin/resume-form"

export const metadata: Metadata = {
  title: "Resume Management | Admin Dashboard",
  description: "Manage your resume and CV information",
}

export default function ResumePage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-2">Resume Management</h1>
      <p className="text-muted-foreground mb-8">Update your resume information and downloadable files.</p>
      <ResumeForm />
    </div>
  )
}
