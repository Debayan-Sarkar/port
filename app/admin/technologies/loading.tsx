import { Skeleton } from "@/components/ui/skeleton"

export default function TechnologiesLoading() {
  return (
    <div className="container mx-auto py-10">
      <Skeleton className="h-8 w-64 mb-2" />
      <Skeleton className="h-4 w-96 mb-8" />

      <div className="space-y-8">
        <Skeleton className="h-[300px] w-full rounded-lg" />
        <div className="space-y-4">
          <Skeleton className="h-10 w-full max-w-md" />
          <Skeleton className="h-[400px] w-full rounded-lg" />
        </div>
      </div>
    </div>
  )
}
