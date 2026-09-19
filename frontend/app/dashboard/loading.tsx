import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header Skeleton */}
        <div className="mb-8">
          <Skeleton className="h-10 w-64 md:w-96 rounded-xl mb-3" />
          <Skeleton className="h-5 w-full max-w-md rounded-xl" />
        </div>

        {/* Stats Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="p-6 rounded-2xl border border-border bg-card flex items-center gap-4">
              <Skeleton className="w-12 h-12 rounded-xl" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-7 w-16" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Chart Area Skeleton */}
          <div className="lg:col-span-2 space-y-8">
            <div className="p-6 rounded-2xl border border-border bg-card">
              <Skeleton className="h-6 w-40 mb-6" />
              <Skeleton className="h-[300px] w-full rounded-xl" />
            </div>
          </div>

          {/* Sidebar Area Skeleton */}
          <div className="space-y-8">
            <div className="p-6 rounded-2xl border border-border bg-card">
              <div className="flex items-center justify-between mb-6">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-16" />
              </div>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-4 rounded-xl border border-border flex gap-4">
                    <Skeleton className="w-10 h-10 rounded-full shrink-0" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                      <Skeleton className="h-2 w-full mt-2" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
