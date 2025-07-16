import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const InfluencerProfileSkeletion = () => (
  <div className="min-h-screen transition-colors duration-300">
    <div className="space-y-6">
      {/* Header Skeleton */}
      <Card className="border-2 border-primary/20 bg-card shadow-lg rounded-xl">
        <CardContent className="px-6 py-2 flex gap-6 items-center">
          <Skeleton className="h-24 w-24 rounded-full" />
          <div className="flex-1 space-y-3">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-1/6" />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="profile">Thông tin cá nhân</TabsTrigger>
          <TabsTrigger value="posts">Bài viết</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card className="border-2 border-primary/20 bg-card shadow-lg rounded-xl">
                <CardContent className="p-6">
                  <Skeleton className="h-5 w-1/4 mb-4" />
                  <Skeleton className="h-4 w-1/2 mb-2" />
                  <Skeleton className="h-4 w-2/3 mb-2" />
                  <Skeleton className="h-4 w-1/3 mb-2" />
                </CardContent>
              </Card>
              <Card className="border-2 border-primary/20 bg-card shadow-lg rounded-xl">
                <CardContent className="p-6">
                  <Skeleton className="h-5 w-1/4 mb-4" />
                  {[...Array(3)].map((_, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 border-2 border-primary/10 rounded-lg bg-card/50 mb-2"
                    >
                      <div className="flex items-center space-x-3">
                        <Skeleton className="h-5 w-5" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                      <Skeleton className="h-4 w-24" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
            <div className="space-y-6">
              <Card className="border-2 border-primary/20 bg-card shadow-lg rounded-xl">
                <CardContent className="p-6">
                  <Skeleton className="h-5 w-1/4 mb-4" />
                  <Skeleton className="h-4 w-1/2 mb-2" />
                  <Skeleton className="h-4 w-2/3 mb-2" />
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="posts" className="mt-6">
          <div className="space-y-4">
            {[...Array(2)].map((_, idx) => (
              <Card key={idx} className="border-2 border-primary/20 bg-card shadow-lg rounded-xl">
                <CardContent className="p-6 flex gap-4 items-center">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  </div>
);

const BrandProfileSkeletion = () => (
  <div className="min-h-screen transition-colors duration-300">
    <div className="space-y-6">
      {/* Header Skeleton */}
      <Card className="border-2 border-primary/20 bg-card shadow-lg rounded-xl">
        <CardContent className="px-6 py-2 flex gap-6 items-center">
          <Skeleton className="h-24 w-24 rounded-full" />
          <div className="flex-1 space-y-3">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-1/6" />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-2 border-primary/20 bg-card shadow-lg rounded-xl">
            <CardContent className="p-6">
              <Skeleton className="h-5 w-1/4 mb-4" />
              <Skeleton className="h-4 w-1/2 mb-2" />
              <Skeleton className="h-4 w-2/3 mb-2" />
              <Skeleton className="h-4 w-1/3 mb-2" />
            </CardContent>
          </Card>
          <Card className="border-2 border-primary/20 bg-card shadow-lg rounded-xl">
            <CardContent className="p-6">
              <Skeleton className="h-5 w-1/4 mb-4" />
              {[...Array(3)].map((_, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 border-2 border-primary/10 rounded-lg bg-card/50 mb-2"
                >
                  <div className="flex items-center space-x-3">
                    <Skeleton className="h-5 w-5" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <Skeleton className="h-4 w-24" />
                </div>
              ))}
            </CardContent>
          </Card>
          <Card className="border-2 border-primary/20 bg-card shadow-lg rounded-xl">
            <CardContent className="p-6">
              <Skeleton className="h-5 w-1/4 mb-4" />
              <Skeleton className="h-4 w-1/2 mb-2" />
              <Skeleton className="h-4 w-2/3 mb-2" />
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
          <Card className="border-2 border-primary/20 bg-card shadow-lg rounded-xl">
            <CardContent className="p-6">
              <Skeleton className="h-5 w-1/4 mb-4" />
              <Skeleton className="h-8 w-1/2 mb-2 mx-auto" />
              <Skeleton className="h-4 w-1/3 mb-2 mx-auto" />
              <Skeleton className="h-4 w-2/3 mb-2" />
              <Skeleton className="h-4 w-1/2 mb-2" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </div>
);

export { BrandProfileSkeletion, InfluencerProfileSkeletion };
