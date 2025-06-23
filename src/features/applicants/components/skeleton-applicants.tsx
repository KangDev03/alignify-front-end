export function SkeletonApplicants() {
  return (
    <div className="flex gap-6 h-[633px] animate-pulse">
      <div className="w-1/3 border rounded-lg py-4 bg-card pr-0 flex flex-col">
        <div className="h-7 w-2/3 bg-muted rounded mb-4 mx-4" />
        <div className="flex-1 space-y-3 overflow-auto px-4 py-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-muted rounded-lg py-6 px-4">
              <div className="h-4 w-1/2 bg-muted-foreground rounded mb-2" />
              <div className="h-3 w-1/3 bg-muted-foreground rounded mb-2" />
              <div className="flex items-center justify-between mt-2">
                <div className="h-4 w-16 bg-muted-foreground rounded" />
                <div className="h-4 w-12 bg-muted-foreground rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 border rounded-lg bg-card flex flex-col">
        <div className="p-6 border-b">
          <div className="h-6 w-1/3 bg-muted rounded mb-4" />
          <div className="grid grid-cols-3 gap-4 text-sm">
            {[...Array(3)].map((_, i) => (
              <div key={i}>
                <div className="h-4 w-1/2 bg-muted-foreground rounded mb-2" />
                <div className="h-4 w-2/3 bg-muted-foreground rounded" />
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 p-6 flex flex-col gap-4">
          <div className="flex gap-4 mb-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-8 w-32 bg-muted-foreground rounded" />
            ))}
          </div>
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 border rounded-lg bg-muted"
            >
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 bg-muted-foreground rounded-full" />
                <div>
                  <div className="h-4 w-24 bg-muted-foreground rounded mb-2" />
                  <div className="h-3 w-16 bg-muted-foreground rounded mb-1" />
                  <div className="h-3 w-20 bg-muted-foreground rounded" />
                </div>
              </div>
              <div className="flex gap-2">
                <div className="h-8 w-16 bg-muted-foreground rounded" />
                <div className="h-8 w-20 bg-muted-foreground rounded" />
                <div className="h-8 w-16 bg-muted-foreground rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
