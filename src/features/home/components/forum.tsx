import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

import { ForumPost } from '@/components/forum-post/forum-post';

import { useGetAllContentPostingQuery } from '../forum-api/forum.service';

export default function Forum() {
  const { data: rawData, isLoading } = useGetAllContentPostingQuery({
    pageNumber: 0,
    pageSize: 10,
  });
  const contentPosting = rawData?.data;
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Card className="border-2 border-primary/20 bg-card shadow-lg hover:shadow-xl transition-all">
          <CardContent>
            <div className="flex items-start space-x-3">
              <Skeleton className="h-10 w-10 rounded-full bg-border" />
              <div className="flex-1 space-y-2">
                <div className="flex items-center space-x-2">
                  <Skeleton className="h-4 w-24 bg-border" />
                  <Skeleton className="h-4 w-8 bg-border" />
                  <Skeleton className="h-4 w-16 bg-border" />
                </div>
                <Skeleton className="h-5 w-40 bg-border" />
                <Skeleton className="h-4 w-full bg-border" />
                <div className="flex items-center space-x-6 mt-3">
                  <Skeleton className="h-4 w-10 bg-border" />
                  <Skeleton className="h-4 w-10 bg-border" />
                  <Skeleton className="h-4 w-10 bg-border" />
                  <Skeleton className="h-5 w-24 rounded bg-border" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  console.log(contentPosting);
  return (
    <div className="space-y-4">
      {contentPosting?.map((post) => {
        return <ForumPost key={post.contentId} contentPosting={post} />;
      })}
    </div>
  );
}
