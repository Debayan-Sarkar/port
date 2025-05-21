import type { Metadata } from "next"
import { TeamForm } from "@/components/admin/team-form"

export const metadata: Metadata = {
  title: "Team Management | Admin Dashboard",
  description: "Manage team members information",
}

export default function TeamPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-2">Team Management</h1>
      <p className="text-muted-foreground mb-8">Add, edit, or remove team members displayed on your portfolio.</p>
      <TeamForm />
    </div>
  )
}
