import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import { Icons } from '@/components/icons/icons';
import type { ContentPosting } from '@/features/home/forum-api/forum.type';
import { formatDate, parseTimestampToDate } from '@/utils/format';

interface ForumPostProps {
  contentPosting: ContentPosting;
}

export function ForumPost({ contentPosting }: ForumPostProps) {
  return (
    <Card
      key={contentPosting.contentId}
      className="border border-border bg-card hover:bg-muted/30 transition-all"
    >
      <CardContent className="px-6">
        {/* Post Header */}
        <div className="flex items-start space-x-3 mb-4">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={contentPosting.userAvatar || '/placeholder.svg'}
              alt={contentPosting.userName}
              className="object-cover"
            />
            <AvatarFallback>{contentPosting.userName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h4 className="font-medium">{contentPosting.userName}</h4>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">
                {formatDate(parseTimestampToDate(contentPosting.createdDate))}
              </span>
              <span className="text-muted-foreground">•</span>
              {contentPosting.categories.map((category) => (
                <Badge key={category.categoryId} variant="outline" className="text-xs">
                  {category.categoryName}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Post Content */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold leading-tight">{contentPosting.contentName}</h3>
          <div className="text-sm text-muted-foreground leading-relaxed">
            <p className="line-clamp-3">{contentPosting.content}</p>
            {/* <Button variant="link" className="p-0 h-auto text-primary text-sm mt-1">
              Đọc thêm
            </Button> */}
          </div>
        </div>

        <div className="w-full h-80 relative rounded-md mt-3">
          <img
            src="background-16x9.jpg"
            alt="Chiến dịch quảng cáo sản phẩm làm đẹp mùa hè"
            className="w-full h-full object-cover rounded-md"
          />
        </div>

        {/* Post Footer */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
          <div className="flex items-center space-x-6">
            <button className="flex items-center space-x-2 text-muted-foreground hover:text-red-500 transition-colors group">
              <Icons.heart className="h-4 w-4 group-hover:fill-current" />
              <span className="text-sm">{contentPosting.likeCount ?? 0}</span>
            </button>
            <button className="flex items-center space-x-2 text-muted-foreground hover:text-blue-500 transition-colors">
              <Icons.messageCircle className="h-4 w-4" />
              <span className="text-sm">{contentPosting.commentCount ?? 0}</span>
            </button>
            {/* <div className="flex items-center space-x-2 text-muted-foreground">
              <Icons.eye className="h-4 w-4" />
              <span className="text-sm">{post.views} lượt xem</span>
            </div> */}
          </div>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            <Icons.share2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
