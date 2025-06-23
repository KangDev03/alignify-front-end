import { Skeleton } from '@/components/ui/skeleton';

export function SkeletonApplicants() {
  return (
    <div className="flex gap-6 h-[633px]">
      <div className="w-1/3 border rounded-lg py-4 bg-card pr-0 flex flex-col">
        <Skeleton className="h-7 w-2/3 mb-4 mx-4 bg-border" />
        <div className="flex-1 space-y-3 overflow-auto px-4 py-2">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="rounded-lg py-6 px-4 bg-border">
              <Skeleton className="h-4 w-1/2 mb-2 bg-border" />
              <Skeleton className="h-3 w-1/3 mb-2 bg-border" />
              <div className="flex items-center justify-between mt-2">
                <Skeleton className="h-4 w-16 bg-border" />
                <Skeleton className="h-4 w-12 bg-border" />
              </div>
            </Skeleton>
          ))}
        </div>
      </div>
      <div className="flex-1 border rounded-lg bg-card flex flex-col">
        <div className="p-6 border-b">
          <Skeleton className="h-6 w-1/3 mb-4 bg-border" />
          <div className="grid grid-cols-3 gap-4 text-sm">
            {[...Array(3)].map((_, i) => (
              <div key={i}>
                <Skeleton className="h-4 w-1/2 mb-2 bg-border" />
                <Skeleton className="h-4 w-2/3 bg-border" />
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 p-6 flex flex-col gap-4">
          <div className="flex gap-4 mb-4">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-8 w-32 bg-border" />
            ))}
          </div>
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 border rounded-lg bg-muted"
            >
              <div className="flex items-center gap-3">
                <Skeleton className="h-12 w-12 rounded-full bg-border" />
                <div>
                  <Skeleton className="h-4 w-24 mb-2 bg-border" />
                  <Skeleton className="h-3 w-16 mb-1 bg-border" />
                  <Skeleton className="h-3 w-20 bg-border" />
                </div>
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-8 w-16 bg-border" />
                <Skeleton className="h-8 w-20 bg-border" />
                <Skeleton className="h-8 w-16 bg-border" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
