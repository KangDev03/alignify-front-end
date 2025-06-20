import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

import { Icons } from '@/components/icons/icons';

import { useGetAllContentPostingQuery } from '../forum-api/forum.service';

function getTimeAgo(date: Date): string {
  const now = new Date()
  const diffInMs = now.getTime() - date.getTime()
  const diffInSeconds = Math.floor(diffInMs / 1000)

  if (diffInSeconds < 60) return `${diffInSeconds} giây trước`
  const diffInMinutes = Math.floor(diffInSeconds / 60)
  if (diffInMinutes < 60) return `${diffInMinutes} phút trước`
  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) return `${diffInHours} giờ trước`
  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 30) return `${diffInDays} ngày trước`

  return date.toLocaleDateString('vi-VN')
}

export default function Forum() {
  const { data: rawData } = useGetAllContentPostingQuery({ pageNumber: 0, pageSize: 10 });
  const contentPosting = rawData?.data;

  return (
    <div className="space-y-4">
      {contentPosting?.map((post) => {
        const [year, month, day, hour, minute, second] = post.createdDate;
        const postDate = new Date(year, month - 1, day,hour, minute,second);
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
                    <span className="text-sm text-muted-foreground">
                      {getTimeAgo(postDate)}
                    </span>
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
        {post.categories.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.categories.map((cat: any, i: number) => (
              <Badge key={cat.categoryId ?? i} variant="outline">
                {cat.categoryName ?? cat}
              </Badge>
            ))}
          </div>
        )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
