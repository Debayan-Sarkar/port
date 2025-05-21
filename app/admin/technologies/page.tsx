import type { Metadata } from "next"
import TechnologiesForm from "@/components/admin/technologies-form"

export const metadata: Metadata = {
  title: "Tech Stack Management | Admin Dashboard",
  description: "Manage your technology stack and skills",
}

export default function TechnologiesPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-2">Tech Stack Management</h1>
      <p className="text-muted-foreground mb-6">
        Manage your technology stack, programming languages, frameworks, and tools
      </p>

      <TechnologiesForm />
    </div>
  )
}
