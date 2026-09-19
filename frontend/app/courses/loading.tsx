import { Skeleton } from "@/components/ui/skeleton";

export default function CoursesLoading() {
  return (
    <>
      {/* Hero Banner Skeleton */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 py-16 md:py-20">
        <div className="relative z-10 mx-auto max-w-7xl px-6 flex flex-col items-center">
          <Skeleton className="h-6 w-32 rounded-full mb-4 bg-white/10" />
          <Skeleton className="h-12 w-64 md:w-96 rounded-xl mb-4 bg-white/10" />
          <Skeleton className="h-4 w-full max-w-lg rounded-xl bg-white/10" />
        </div>
      </section>

      {/* Filters Skeleton */}
      <section className="bg-background border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <Skeleton className="h-10 w-full md:w-80 rounded-xl" />
            <div className="flex flex-wrap gap-3">
              <Skeleton className="h-9 w-40 rounded-xl" />
              <Skeleton className="h-9 w-60 rounded-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Grid Skeleton */}
      <section className="py-12 md:py-16 bg-background">
        <div className="mx-auto max-w-7xl px-6">
          <Skeleton className="h-5 w-32 mb-6" />
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card">
                <Skeleton className="h-40 w-full rounded-none" />
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <div className="flex gap-2">
                    <Skeleton className="h-5 w-16 rounded-full" />
                    <Skeleton className="h-5 w-16 rounded-full" />
                  </div>
                  <Skeleton className="h-6 w-3/4 mt-1" />
                  <Skeleton className="h-4 w-1/2" />
                  <div className="mt-2 space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-4/5" />
                  </div>
                  <div className="mt-auto pt-4 flex justify-between border-t border-border">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
