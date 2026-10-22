import { Skeleton } from "@/components/ui/skeleton";
import { HomepageHeader } from "@/components/homepage/header";
import { HomepageFooter } from "@/components/homepage/footer";

export default function JobDetailLoading() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground antialiased">
      <HomepageHeader />
      <main className="flex-1">
        <div className="border-b border-border/70 py-10 bg-card/40">
          <div className="page-container space-y-4">
            <Skeleton className="h-4 w-36" />
            <div className="flex gap-2">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-24" />
            </div>
            <Skeleton className="h-10 w-2/3 max-w-xl" />
            <div className="flex gap-4 pt-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-5 w-28" />
            </div>
          </div>
        </div>

        <div className="page-container py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-8">
              <div className="space-y-3">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
              <div className="space-y-3">
                <Skeleton className="h-6 w-56" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/6" />
              </div>
            </div>
            <div className="lg:col-span-4 space-y-6">
              <Skeleton className="h-64 rounded-2xl w-full" />
              <Skeleton className="h-40 rounded-2xl w-full" />
            </div>
          </div>
        </div>
      </main>
      <HomepageFooter />
    </div>
  );
}
