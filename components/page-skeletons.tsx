import { Skeleton } from "./ui/skeleton"
import {
  HeroSkeleton,
  ProjectCardSkeleton,
  ServiceSkeleton,
  TeamMemberSkeleton,
  BlogPostSkeleton,
  ExperienceSkeleton,
  SkillSkeleton,
  PricingSkeleton,
  TestimonialSkeleton,
} from "./skeleton-loaders"

export function AboutPageSkeleton() {
  return (
    <div className="min-h-screen bg-[#0e0e0e] pt-24">
      <div className="container px-4 md:px-6 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <Skeleton className="h-10 w-48 mx-auto mb-4" />
          <Skeleton className="h-4 w-full max-w-md mx-auto" />
        </div>

        {/* About Content */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 mb-16">
          <div className="w-full md:w-1/2">
            <Skeleton className="h-[400px] w-full rounded-xl" />
          </div>
          <div className="w-full md:w-1/2 space-y-6">
            <Skeleton className="h-8 w-40" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-8 w-40" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <Skeleton className="h-8 w-48 mx-auto mb-4" />
            <Skeleton className="h-4 w-full max-w-md mx-auto" />
          </div>
          <div className="space-y-8">
            {[1, 2, 3, 4].map((i) => (
              <ExperienceSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function ServicesPageSkeleton() {
  return (
    <div className="min-h-screen bg-[#0e0e0e] pt-24">
      <div className="container px-4 md:px-6 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <Skeleton className="h-10 w-48 mx-auto mb-4" />
          <Skeleton className="h-4 w-full max-w-md mx-auto" />
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <ServiceSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  )
}

export function ProjectsPageSkeleton() {
  return (
    <div className="min-h-screen bg-[#0e0e0e] pt-24">
      <div className="container px-4 md:px-6 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <Skeleton className="h-10 w-48 mx-auto mb-4" />
          <Skeleton className="h-4 w-full max-w-md mx-auto" />
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center mb-12">
          <div className="flex gap-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-10 w-24 rounded-full" />
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <ProjectCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  )
}

export function TeamPageSkeleton() {
  return (
    <div className="min-h-screen bg-[#0e0e0e] pt-24">
      <div className="container px-4 md:px-6 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <Skeleton className="h-10 w-48 mx-auto mb-4" />
          <Skeleton className="h-4 w-full max-w-md mx-auto" />
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <TeamMemberSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  )
}

export function ContactPageSkeleton() {
  return (
    <div className="min-h-screen bg-[#0e0e0e] pt-24">
      <div className="container px-4 md:px-6 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <Skeleton className="h-10 w-48 mx-auto mb-4" />
          <Skeleton className="h-4 w-full max-w-md mx-auto" />
        </div>

        {/* Contact Content */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          <div className="w-full md:w-1/2 space-y-6">
            <Skeleton className="h-8 w-40" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />

            <div className="space-y-4 mt-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-start gap-4">
                  <Skeleton className="h-10 w-10 rounded-full shrink-0" />
                  <div className="space-y-1">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-4 w-48" />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4 mt-6">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-10 w-10 rounded-full" />
              ))}
            </div>
          </div>

          <div className="w-full md:w-1/2 space-y-4">
            <Skeleton className="h-12 w-full rounded-lg" />
            <Skeleton className="h-12 w-full rounded-lg" />
            <Skeleton className="h-12 w-full rounded-lg" />
            <Skeleton className="h-32 w-full rounded-lg" />
            <Skeleton className="h-12 w-32 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function BlogPageSkeleton() {
  return (
    <div className="min-h-screen bg-[#0e0e0e] pt-24">
      <div className="container px-4 md:px-6 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <Skeleton className="h-10 w-48 mx-auto mb-4" />
          <Skeleton className="h-4 w-full max-w-md mx-auto" />
        </div>

        {/* Featured Post */}
        <div className="mb-12">
          <div className="bg-[#151515] rounded-xl overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <Skeleton className="h-64 md:h-auto md:w-1/2" />
              <div className="p-6 md:w-1/2 space-y-4">
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-20 rounded-full" />
                  <Skeleton className="h-6 w-24 rounded-full" />
                </div>
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <div className="flex justify-between items-center">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-10 w-32 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <BlogPostSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  )
}

export function BlogPostSingleSkeleton() {
  return (
    <div className="min-h-screen bg-[#0e0e0e] pt-24">
      <div className="container px-4 md:px-6 py-12 max-w-4xl mx-auto">
        {/* Post Header */}
        <div className="mb-8">
          <div className="flex gap-2 mb-4">
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-24 rounded-full" />
          </div>
          <Skeleton className="h-10 w-full mb-4" />
          <div className="flex items-center gap-4 mb-6">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div>
              <Skeleton className="h-4 w-32 mb-1" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <Skeleton className="h-[400px] w-full rounded-xl mb-8" />

        {/* Post Content */}
        <div className="space-y-6">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-5/6" />

          <Skeleton className="h-40 w-full rounded-xl my-8" />

          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-4/5" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-3/4" />
        </div>
      </div>
    </div>
  )
}

export function ResumePageSkeleton() {
  return (
    <div className="min-h-screen bg-[#0e0e0e] pt-24">
      <div className="container px-4 md:px-6 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <Skeleton className="h-10 w-48 mx-auto mb-4" />
          <Skeleton className="h-4 w-full max-w-md mx-auto" />
        </div>

        {/* Resume Preview */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 mb-12">
          <div className="w-full md:w-2/3 mx-auto">
            <Skeleton className="h-[800px] w-full rounded-xl" />
          </div>
        </div>

        {/* Download Button */}
        <div className="flex justify-center">
          <Skeleton className="h-12 w-48 rounded-full" />
        </div>
      </div>
    </div>
  )
}

export function HomePageSkeleton() {
  return (
    <div className="space-y-20">
      <HeroSkeleton />

      <div className="container px-4 md:px-6">
        <div className="mb-10">
          <Skeleton className="h-8 w-64 mx-auto" />
          <Skeleton className="h-4 w-96 mx-auto mt-4" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      </div>

      <div className="container px-4 md:px-6">
        <div className="mb-10">
          <Skeleton className="h-8 w-64 mx-auto" />
          <Skeleton className="h-4 w-96 mx-auto mt-4" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <Skeleton className="h-64 w-full rounded-xl" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-10 w-32 rounded-full" />
          </div>
        </div>
      </div>

      <div className="container px-4 md:px-6">
        <div className="mb-10">
          <Skeleton className="h-8 w-64 mx-auto" />
          <Skeleton className="h-4 w-96 mx-auto mt-4" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="text-center">
              <Skeleton className="h-20 w-20 rounded-full mx-auto mb-4" />
              <Skeleton className="h-6 w-24 mx-auto mb-2" />
              <Skeleton className="h-4 w-full mx-auto" />
            </div>
          ))}
        </div>
      </div>

      <div className="container px-4 md:px-6">
        <div className="mb-10">
          <Skeleton className="h-8 w-64 mx-auto" />
          <Skeleton className="h-4 w-96 mx-auto mt-4" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <SkillSkeleton key={i} />
          ))}
        </div>
      </div>

      <div className="container px-4 md:px-6">
        <div className="mb-10">
          <Skeleton className="h-8 w-64 mx-auto" />
          <Skeleton className="h-4 w-96 mx-auto mt-4" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <ServiceSkeleton key={i} />
          ))}
        </div>
      </div>

      <div className="container px-4 md:px-6">
        <div className="mb-10">
          <Skeleton className="h-8 w-64 mx-auto" />
          <Skeleton className="h-4 w-96 mx-auto mt-4" />
        </div>
        <div className="space-y-8">
          {[...Array(3)].map((_, i) => (
            <ExperienceSkeleton key={i} />
          ))}
        </div>
      </div>

      <div className="container px-4 md:px-6">
        <div className="mb-10">
          <Skeleton className="h-8 w-64 mx-auto" />
          <Skeleton className="h-4 w-96 mx-auto mt-4" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <ProjectCardSkeleton key={i} />
          ))}
        </div>
      </div>

      <div className="container px-4 md:px-6">
        <div className="mb-10">
          <Skeleton className="h-8 w-64 mx-auto" />
          <Skeleton className="h-4 w-96 mx-auto mt-4" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[...Array(4)].map((_, i) => (
            <TeamMemberSkeleton key={i} />
          ))}
        </div>
      </div>

      <div className="container px-4 md:px-6">
        <div className="mb-10">
          <Skeleton className="h-8 w-64 mx-auto" />
          <Skeleton className="h-4 w-96 mx-auto mt-4" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <TestimonialSkeleton key={i} />
          ))}
        </div>
      </div>

      <div className="container px-4 md:px-6">
        <div className="mb-10">
          <Skeleton className="h-8 w-64 mx-auto" />
          <Skeleton className="h-4 w-96 mx-auto mt-4" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <BlogPostSkeleton key={i} />
          ))}
        </div>
      </div>

      <div className="container px-4 md:px-6">
        <div className="mb-10">
          <Skeleton className="h-8 w-64 mx-auto" />
          <Skeleton className="h-4 w-96 mx-auto mt-4" />
        </div>
        <PricingSkeleton />
      </div>

      <div className="container px-4 md:px-6">
        <div className="mb-10">
          <Skeleton className="h-8 w-64 mx-auto" />
          <Skeleton className="h-4 w-96 mx-auto mt-4" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Skeleton className="h-96 w-full rounded-xl" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    </div>
  )
}
