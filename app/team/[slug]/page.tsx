import { getTeamMemberBySlug } from "@/lib/team-data"
import { notFound } from "next/navigation"
import TeamMemberProfile from "@/components/team-member-profile"
import type { Metadata } from "next"
import PageSpecificWrapper from "@/components/page-specific-wrapper"

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const member = await getTeamMemberBySlug(params.slug)

  if (!member) {
    return {
      title: "Team Member Not Found",
      description: "The requested team member profile could not be found.",
    }
  }

  return {
    title: `${member.name} - ${member.position} | RCode Technologies`,
    description: `Learn more about ${member.name}, ${member.position} at RCode Technologies.`,
  }
}

export default async function TeamMemberPage({ params }: Props) {
  const member =  getTeamMemberBySlug(params.slug)

  if (!member) {
    notFound()
  }

  return (
    <PageSpecificWrapper pageType="team">
      <TeamMemberProfile member={member} />
    </PageSpecificWrapper>
  )
}
