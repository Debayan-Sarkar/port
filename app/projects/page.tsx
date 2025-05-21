import type { Metadata } from "next"
import ProjectsClientPage from "./ProjectsClientPage"
import PageSpecificWrapper from "@/components/page-specific-wrapper"

export const metadata: Metadata = {
  title: "Projects | RCode Technologies",
  description: "View our portfolio of successful projects and case studies",
}

export default function ProjectsPage() {
  return (
    <PageSpecificWrapper pageType="projects">
      <ProjectsClientPage />
    </PageSpecificWrapper>
  )
}
