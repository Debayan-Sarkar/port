import type { Metadata } from "next"
import { ContactForm } from "@/components/admin/contact-form"

export const metadata: Metadata = {
  title: "Contact Management | Admin Dashboard",
  description: "Manage contact information and settings",
}

export default function ContactPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-2">Contact Management</h1>
      <p className="text-muted-foreground mb-8">Update your contact information and form settings.</p>
      <ContactForm />
    </div>
  )
}
