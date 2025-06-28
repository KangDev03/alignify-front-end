import { useEffect, useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import { Icons } from '@/components/icons/icons';
import type { ContentPosting } from '@/features/home/home.type';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { getStompClient } from '@/lib/stom-client';
import { cn } from '@/lib/utils';
import type { RootState } from '@/redux/store';
import { formatDate, parseIsoToDateTime } from '@/utils/format';

import CommentCard from './comment-card';
import { setLikeCountState, setLikedState, toggleLikeContentPosting } from '../home.slice';


interface ReceivedLike {
  likes: number;
}

interface IsLiked {
  isLiked: boolean;
}

export interface LikeSending {
  contentId: string,
  userId: string
}
interface ForumCommentProps {
  contentPosting: ContentPosting;
}

export default function ForumCommentDialog({ contentPosting }: ForumCommentProps) {
  const dispatch = useAppDispatch();
  const { token, id: userId } = useAppSelector((state: RootState) => state.auth);
  const [isReadMore, setReadMore] = useState(false);
  useEffect(() => {
    if (!token) return;
    let likeSubscription: any;
    getStompClient(token)
      .then((client) => {
        likeSubscription = client.subscribe(`/topic/contents/${contentPosting.contentId}`, (res: any) => {
          try {
            const receivedLike: ReceivedLike = JSON.parse(res.body);
            if (receivedLike) {
              dispatch(setLikeCountState({ contentId: contentPosting.contentId, likeCount: receivedLike.likes }))
            }
          } catch (error) {
            console.error(error);
          }
        });
      })
      .catch((error) => console.error('WebSocket connection error:', error));

    return () => {
      if (likeSubscription) likeSubscription.unsubscribe();
    };
  }, [contentPosting.contentId, token, dispatch]);

  useEffect(() => {
    if (!token) return;
    let likeSubscription: any;
    getStompClient(token)
      .then((client) => {
        likeSubscription = client.subscribe(`/topic/contents/isLiked/${contentPosting.contentId}`, (res: any) => {
          try {
            const received: IsLiked = JSON.parse(res.body);
            if (received) {
              dispatch(setLikedState({ contentId: contentPosting.contentId, isLiked: received.isLiked }))
            }
          } catch (error) {
            console.error(error);
          }
        });
      })
      .catch((error) => console.error('WebSocket connection error:', error));

    return () => {
      if (likeSubscription) likeSubscription.unsubscribe();
    };
  }, [contentPosting.contentId, token, dispatch]);

  useEffect(() => {
    if (contentPosting.contentId && token) {
      getStompClient(token!).then((client) => {
        if (client.connected) {
          client.send(`/app/isLiked/${contentPosting.contentId}`);
        }
      })
    };
  }, [contentPosting.contentId, token])

  const handleLike = () => {
    if (contentPosting.contentId && token) {
      getStompClient(token!).then((client) => {
        if (client.connected) {
          const likeSending: LikeSending = {
            contentId: contentPosting.contentId,
            userId: userId!
          }
          dispatch(toggleLikeContentPosting({ contentId: contentPosting.contentId }));
          client.send(`/app/like/${contentPosting.contentId}`, {}, JSON.stringify(likeSending));
        }
      })
    };
  }
  return (
    <Card
      key={contentPosting.contentId}
      className="border border-border bg-card overflow-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-muted-foreground scrollbar-track-transparent scrollbar-hide-arrows "
    >
      <CardContent className="px-6">
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
                {formatDate(parseIsoToDateTime(contentPosting.createdDate))}
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

        <div className="space-y-3">
          <h3 className="text-lg font-semibold leading-tight">{contentPosting.contentName}</h3>
          <div className="text-sm text-muted-foreground leading-relaxed">
            <p className={cn(!isReadMore && "line-clamp-3")}>{contentPosting.content}</p>
            <Button variant="link" className="p-0 h-auto text-primary text-sm mt-1" onClick={() => setReadMore(!isReadMore)} >
              {isReadMore ? "Thu gọn" : "Đọc thêm"}
            </Button>
          </div>
        </div>

        <div className="w-full h-80 relative rounded-md mt-3">
          <img
            src={contentPosting.imageUrl || 'background-16x9.jpg'}
            alt="Chiến dịch quảng cáo sản phẩm làm đẹp mùa hè"
            className="w-full h-full object-cover rounded-md"
          />
        </div>

        <div className="flex items-center justify-between mt-4 py-3 border-y border-border">
          <div className="flex items-center space-x-6">
            <button
              onClick={handleLike}
              className={cn("flex items-center space-x-2 text-muted-foreground hover:text-red-500 transition-colors group cursor-pointer", contentPosting.isLiked && "text-red-500")}>
              <Icons.heart
                className={cn(
                  "h-4 w-4 group-hover:fill-red-500 transition-colors",
                  contentPosting.isLiked && "fill-red-500"
                )}
              />
              <span className="text-sm">{contentPosting.likeCount}</span>
            </button>

            <button className="flex items-center space-x-2 text-muted-foreground hover:text-blue-500 transition-colors cursor-pointer">
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
        <div className='my-4 flex flex-col gap-4'>
          <CommentCard />
          <CommentCard />
        </div>
      </CardContent>
    </Card>
  );
}
