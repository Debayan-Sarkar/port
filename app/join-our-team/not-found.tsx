import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Fallback404 from "@/components/fallback-404"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <Fallback404 />
      <h1 className="text-4xl font-bold mt-8 mb-4">Page Not Found</h1>
      <p className="text-xl text-muted-foreground mb-8 text-center max-w-md">
        Sorry, the job application page you're looking for doesn't exist or has been moved.
      </p>
      <Button asChild>
        <Link href="/join-our-team" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Join Our Team
        </Link>
      </Button>
    </div>
  )
}
