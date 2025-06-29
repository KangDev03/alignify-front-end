import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { DateTime } from 'luxon';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

import { Icons } from '@/components/icons/icons';
import type { CommonPageableRequest } from '@/features/common/common.type';
import type { Comment, ContentPosting } from '@/features/home/home.type';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { getStompClient } from '@/lib/stom-client';
import { cn } from '@/lib/utils';
import type { RootState } from '@/redux/store';
import { formatDate, parseIsoToDateTime } from '@/utils/format';

import CommentCard from './comment-card';
import { addComment, addComments, setComments, setLikeCountState, setLikedState, toggleLikeContentPosting } from '../home.slice';


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
  resetTrigger: boolean;
}

export default function ForumCommentDialog({ contentPosting, resetTrigger }: ForumCommentProps) {
  const dispatch = useAppDispatch();
  const { token, id: userId, avatarUrl } = useAppSelector((state: RootState) => state.auth);
  const [valueChange, setValueChange] = useState<string>('');
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (resetTrigger) {
      dispatch(setComments({ contentId: contentPosting.contentId, comment: [] }));
      setPageNumber(0);
    }
  }, [resetTrigger, contentPosting.contentId, dispatch]);

  useEffect(() => {
    if (token) {
      getStompClient(token).then((client) => {
        if (client.connected) {
          const pageable: CommonPageableRequest = {
            pageNumber: pageNumber,
            pageSize: 10
          }
          client.send(`/app/comment/select/${contentPosting.contentId}`, {}, JSON.stringify(pageable));
        }
      })
    }
  }, [contentPosting.contentId, token, pageNumber, resetTrigger]);

  useEffect(() => {
    if (!token) return;
    let commentSub: any;
    getStompClient(token).then((client) => {
      commentSub = client.subscribe(`/topic/comments/select/${contentPosting.contentId}`, (res: any) => {
        try {
          const received: Comment[] = JSON.parse(res.body);
          if (pageNumber === 0) {
            dispatch(setComments({ contentId: contentPosting.contentId, comment: received }));
            setHasMore(received.length === 10);
          } else {
            dispatch(addComments({ contentId: contentPosting.contentId, comment: received }));
            setHasMore(received.length === 10);

          }
        } catch (error) {
          console.error(error);
        }
      })
    }).catch((error) => console.error('WebSocket connection error:', error));

    return () => {
      if (commentSub) commentSub.unsubscribe();
    }
  }, [contentPosting.contentId, token, dispatch, contentPosting.comment, pageNumber])

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

  useEffect(() => {
    if (!token) return;
    let commentsub: any;
    getStompClient(token)
      .then((client) => {
        commentsub = client.subscribe(`/topic/comments/${contentPosting.contentId}`, (res: any) => {
          try {
            const received: Comment = JSON.parse(res.body);
            if (received) {
              dispatch(addComment({ contentId: contentPosting.contentId, comment: received }))
            }
          } catch (error) {
            console.error(error);
          }
        });
      })
      .catch((error) => console.error('WebSocket connection error:', error));

    return () => {
      if (commentsub) commentsub.unsubscribe();
    };
  }, [contentPosting.contentId, token, dispatch]);

  const sendComment = () => {
    if (valueChange && contentPosting.contentId && token) {
      getStompClient(token!).then(client => {
        if (client.connected) {
          const commentSending: Comment = {
            contentId: contentPosting.contentId,
            userId: userId!,
            content: valueChange,
            createdDate: DateTime.now().setZone('Asia/Ho_Chi_Minh').toISO()!,
          }
          client.send(`/app/comment/${contentPosting.contentId}`, {}, JSON.stringify(commentSending))
        }
      })
      setValueChange('');
    }
  }

  const fetchMoreData = () => {
    if (!hasMore) return;
    setPageNumber((prevPage) => prevPage + 1);
  };
  return (
    <Card
      key={contentPosting.contentId}
      className="border-none rounded-none bg-card shadow-none overflow-auto scrollbar-small p-0 mb-16 pt-5"
    >
      <CardContent className="px-6 relative">
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
            <p className={cn("")}>{contentPosting.content}</p>
            {/* <Button variant="link" className="p-0 h-auto text-primary text-sm mt-1" onClick={() => setReadMore(!isReadMore)} >
              {isReadMore ? "Thu gọn" : "Đọc thêm"}
            </Button> */}
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
        <InfiniteScroll
          dataLength={(contentPosting && contentPosting.comment) ? contentPosting.comment.length : 0}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={hasMore && <p>Loading more...</p>}
          className='mt-4 flex flex-col gap-4'
        >
          {contentPosting.comment && contentPosting.comment.length > 0 ?
            contentPosting.comment.map(cmt => <CommentCard key={cmt.commentId} comment={cmt} />
            ) : <p className='text-center text-sm text-muted-foreground'>Hãy là người bình luận đầu tiên</p>
          }
        </InfiniteScroll>
        <div className='fixed bottom-0 left-0 right-0 flex text-sm px-6 py-3 bg-card rounded-b-xl gap-2'>
          <Avatar className="h-8 w-8 border border-border">
            <AvatarImage
              src={avatarUrl || '/placeholder.svg'}
              alt={contentPosting.userName}
              className="object-cover"
            />
            <AvatarFallback>{contentPosting.userName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className='flex-1 relative'>
            <Input
              type='text'
              placeholder='Nhập bình luận'
              className='rounded-full text-sm'
              onChange={(e) => setValueChange(e.target.value)}
              value={valueChange} onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  sendComment();
                }
              }} />
            <Button
              variant='ghost'
              className='absolute top-1/2 right-0 -translate-y-1/2 -translate-x-1/2 cursor-pointer rounded-full size-7'
              disabled={!valueChange?.trim()}
              onClick={sendComment}>
              <Icons.send className='text-blue-500' size={14} />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
