import { Skeleton } from "@/components/ui/skeleton"

export function CardSkeleton() {
  return (
    <div className="bg-[#151515] rounded-xl overflow-hidden">
      <Skeleton className="h-48 w-full" />
      <div className="p-6 space-y-3">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-4 w-1/4" />
      </div>
    </div>
  )
}

export function ProjectCardSkeleton() {
  return (
    <div className="bg-[#151515] rounded-xl overflow-hidden">
      <Skeleton className="h-64 w-full" />
      <div className="p-6 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-24 w-full" />
        <div className="flex gap-2 mt-4">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
      </div>
    </div>
  )
}

export function BlogPostSkeleton() {
  return (
    <div className="bg-[#151515] rounded-lg overflow-hidden">
      <Skeleton className="h-48 w-full" />
      <div className="p-6 space-y-3">
        <div className="flex justify-between">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-24" />
        </div>
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/4" />
      </div>
    </div>
  )
}

export function TestimonialSkeleton() {
  return (
    <div className="bg-[#151515] rounded-lg p-6 space-y-4">
      <div className="flex items-center gap-4">
        <Skeleton className="h-16 w-16 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
      <Skeleton className="h-20 w-full" />
      <div className="flex">
        <Skeleton className="h-4 w-4 rounded-full mr-1" />
        <Skeleton className="h-4 w-4 rounded-full mr-1" />
        <Skeleton className="h-4 w-4 rounded-full mr-1" />
        <Skeleton className="h-4 w-4 rounded-full mr-1" />
        <Skeleton className="h-4 w-4 rounded-full" />
      </div>
    </div>
  )
}

export function TeamMemberSkeleton() {
  return (
    <div className="bg-[#151515] rounded-xl overflow-hidden">
      <Skeleton className="aspect-[3/4] w-full" />
      <div className="p-6 text-center">
        <Skeleton className="h-6 w-3/4 mx-auto mb-2" />
        <Skeleton className="h-4 w-1/2 mx-auto" />
      </div>
    </div>
  )
}

export function ExperienceSkeleton() {
  return (
    <div className="relative pl-8 border-l-2 border-[#333]">
      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#ff4d4d]" />
      <div className="bg-[#151515] p-6 rounded-lg border border-[#333]">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
          <Skeleton className="h-6 w-48 mb-2 md:mb-0" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="h-4 w-32 mb-2" />
        <Skeleton className="h-16 w-full mb-4" />
        <Skeleton className="h-3 w-40 mb-2" />
        <div className="space-y-2">
          <div className="flex items-start">
            <Skeleton className="h-5 w-5 mr-2 shrink-0 mt-0.5" />
            <Skeleton className="h-4 w-full" />
          </div>
          <div className="flex items-start">
            <Skeleton className="h-5 w-5 mr-2 shrink-0 mt-0.5" />
            <Skeleton className="h-4 w-full" />
          </div>
          <div className="flex items-start">
            <Skeleton className="h-5 w-5 mr-2 shrink-0 mt-0.5" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function SkillSkeleton() {
  return (
    <div className="bg-[#151515] p-6 rounded-lg border border-[#333]">
      <div className="flex justify-between items-center mb-2">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-4 w-12" />
      </div>
      <Skeleton className="h-2 w-full" />
    </div>
  )
}

export function ServiceSkeleton() {
  return (
    <div className="bg-[#151515] p-6 rounded-xl">
      <div className="mb-6">
        <Skeleton className="h-12 w-12 rounded-lg mb-4" />
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  )
}

export function HeroSkeleton() {
  return (
    <div className="container px-4 md:px-6 py-20">
      <div className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-4 lg:gap-12">
        <div className="w-full md:w-1/2 space-y-8">
          <Skeleton className="h-8 w-40" />
          <div className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-12 w-full" />
          </div>
          <Skeleton className="h-20 w-full" />
          <div className="flex gap-4">
            <Skeleton className="h-12 w-32 rounded-full" />
            <Skeleton className="h-12 w-32 rounded-full" />
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <Skeleton className="h-[400px] md:h-[500px] w-full rounded-xl" />
        </div>
      </div>
    </div>
  )
}

export function PricingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="bg-[#151515] rounded-2xl overflow-hidden border border-[#333]">
          <div className="p-6 space-y-4">
            <Skeleton className="h-8 w-24" />
            <div className="flex items-baseline">
              <Skeleton className="h-10 w-20" />
            </div>
            <Skeleton className="h-4 w-full" />
            <div className="space-y-3 py-4">
              {[...Array(6)].map((_, j) => (
                <div key={j} className="flex items-start">
                  <Skeleton className="h-5 w-5 rounded-full mr-2" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </div>
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  )
}
