import { AlertCircleIcon } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

import { Icons } from '@/components/icons/icons';

import { useGetAllContentPostingQuery } from '../forum-api/forum.service';

function getTimeAgo(date: Date): string {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInSeconds = Math.floor(diffInMs / 1000);

  if (diffInSeconds < 60) return `${diffInSeconds} giây trước`;
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes} phút trước`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} giờ trước`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) return `${diffInDays} ngày trước`;

  // Nếu lâu hơn 30 ngày thì hiển thị theo ngày tháng
  return date.toLocaleDateString('vi-VN');
}

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
  return (
    <div className="space-y-4">
      {contentPosting && contentPosting.length > 0 ? (
        contentPosting?.map((post) => {
          const [year, month, day, hour, minute, second] = post.createdDate;
          const postDate = new Date(year, month - 1, day, hour, minute, second);
          console.log('PostDAte: ', post.createdDate);
          return (
            <Card
              key={post.contentId}
              className="border-2 border-primary/20 bg-card shadow-lg hover:shadow-xl transition-all"
            >
              <CardContent>
                <div className="flex items-start space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={post.imageUrl || '/placeholder.svg'} alt={post.userName} />
                    <AvatarFallback>{post.userName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold">{post.userName}</h3>
                      <span className="text-sm text-muted-foreground">•</span>
                      <span className="text-sm text-muted-foreground">{getTimeAgo(postDate)}</span>
                    </div>
                    <h4 className="font-medium mt-1">{post.contentName}</h4>
                    <p className="text-sm text-muted-foreground mt-2">{post.content}</p>
                    <div className="flex items-center space-x-6 mt-3">
                      <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                        <Icons.heart className="h-4 w-4" />
                        <span>{post.likeCount}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                        <Icons.messageCircle className="h-4 w-4" />
                        <span>{post.commentCount}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                        <Icons.eye className="h-4 w-4" />
                        <span>0</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {Array.isArray(post.categories)
                          ? post.categories
                              .map((cat) =>
                                typeof cat === 'string' ? cat : cat.categoryName || '',
                              )
                              .join(', ')
                          : ''}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
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
