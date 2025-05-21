import type { Metadata } from "next"
import ExperienceForm from "@/components/admin/experience-form"

export const metadata: Metadata = {
  title: "Experience Management | Admin Dashboard",
  description: "Manage your professional experience entries",
}

export default function ExperiencePage() {
  return (
    <div className="container mx-auto py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Experience Management</h1>
        <p className="text-muted-foreground">Add, edit, or remove your professional experience entries</p>
      </div>

      <div className="grid gap-6">
        <ExperienceForm />
      </div>
    </div>
  )
}
