import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function SkeletonChart() {
  return (
    <Card>
      <CardHeader>
        <div className="h-5 w-64 animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-48 animate-pulse rounded bg-gray-100" />
      </CardHeader>
      <CardContent>
        <div className="h-[360px] animate-pulse rounded-lg bg-gray-100" />
      </CardContent>
    </Card>
  )
}

export function SkeletonMetricCard() {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
        <div className="mt-3 h-8 w-32 animate-pulse rounded bg-gray-200" />
        <div className="mt-2 h-3 w-40 animate-pulse rounded bg-gray-100" />
      </CardContent>
    </Card>
  )
}

export function SkeletonZoneRow() {
  return (
    <div className="rounded-lg border p-4">
      <div className="flex items-center gap-3">
        <div className="h-6 w-6 animate-pulse rounded-full bg-gray-200" />
        <div className="h-5 w-40 animate-pulse rounded bg-gray-200" />
      </div>
      <div className="mt-3 grid grid-cols-4 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-8 animate-pulse rounded bg-gray-100" />
        ))}
      </div>
    </div>
  )
}
