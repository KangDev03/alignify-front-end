import { AlertCircleIcon } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

import { ForumPost } from '@/components/forum-post/forum-post';

import { useGetAllContentPostingQuery } from '../home.service';

export default function Forum() {
  const { data: rawData, isLoading } = useGetAllContentPostingQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const contentPosting = rawData?.data;
  if (isLoading) {
    return (
      <div className="space-y-6">
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
  return (
    <div className="space-y-6">
      {contentPosting && contentPosting.length > 0 ? (
        contentPosting?.map((post) => {
          return <ForumPost key={post.contentId} contentPosting={post} />;
        })
      ) : (
        <Alert variant="default">
          <AlertCircleIcon />
          <AlertTitle>Không có bài đăng nào trong Forum</AlertTitle>
          <AlertDescription>
            Bạn có thể quay lại đây sau khi các bài đăng trong Forum xuất hiện.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
