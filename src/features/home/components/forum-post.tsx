import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';

import { Icons } from '@/components/icons/icons';
import type { ContentPosting } from '@/features/home/home.type';
import ContentPopUp from '@/features/posting/components/popUp-content';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { getStompClient } from '@/lib/stom-client';
import { cn } from '@/lib/utils';
import type { RootState } from '@/redux/store';
import { formatDate, parseIsoToDateTime } from '@/utils/format';
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog';

import ForumCommentDialog from './forum-comment';
import { setLikeCountState, setLikedState, toggleLikeContentPosting } from '../home.slice';

interface ForumPostProps {
  contentPosting: ContentPosting;
}

interface ReceivedLike {
  likes: number;
}

interface IsLiked {
  isLiked: boolean;
}

export interface LikeSending {
  contentId: string;
  userId: string;
}

export function ForumPost({ contentPosting }: ForumPostProps) {
  const dispatch = useAppDispatch();
  const { token, id: userId } = useAppSelector((state: RootState) => state.auth);
  const [isReadMore, setReadMore] = useState(false);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isPopoverOpen, setPopoverOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const isAuthor = userId === contentPosting.userId

  useEffect(() => {
    if (!token) return;
    let likeSubscription: any;
    getStompClient(token)
      .then((client) => {
        likeSubscription = client.subscribe(
          `/topic/contents/${contentPosting.contentId}`,
          (res: any) => {
            try {
              const receivedLike: ReceivedLike = JSON.parse(res.body);
              if (receivedLike) {
                dispatch(
                  setLikeCountState({
                    contentId: contentPosting.contentId,
                    likeCount: receivedLike.likes,
                  }),
                );
              }
            } catch (error) {
              console.error(error);
            }
          },
        );
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
        likeSubscription = client.subscribe(
          `/topic/contents/isLiked/${contentPosting.contentId}`,
          (res: any) => {
            try {
              const received: IsLiked = JSON.parse(res.body);
              if (received) {
                dispatch(
                  setLikedState({ contentId: contentPosting.contentId, isLiked: received.isLiked }),
                );
              }
            } catch (error) {
              console.error(error);
            }
          },
        );
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
          client.send(`/app/isLiked/${contentPosting.contentId}`, {
            Authorization: `Bearer ${token}`,
          });
        }
      });
    }
  }, [contentPosting.contentId, token]);

  const handleLike = () => {
    if (contentPosting.contentId && token) {
      getStompClient(token!).then((client) => {
        if (client.connected) {
          const likeSending: LikeSending = {
            contentId: contentPosting.contentId,
            userId: userId!,
          };
          dispatch(toggleLikeContentPosting({ contentId: contentPosting.contentId }));
          client.send(
            `/app/like/${contentPosting.contentId}`,
            { Authorization: `Bearer ${token}` },
            JSON.stringify(likeSending),
          );
        }
      });
    }
  };

  const handleDeletePost = async () => {
    setIsDeleting(true)
    try {
      // TODO: Implement delete post API call
      // await deletePost(contentPosting.contentId);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast.success("Đã xóa bài viết thành công")
      setPopoverOpen(false)
    } catch (_error) {
      toast.error("Xóa bài viết thất bại. Vui lòng thử lại!")
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Card
      key={contentPosting.contentId}
      className="border border-border bg-card transition-all"
    >
      <CardContent className="px-6">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <Avatar className="h-12 w-12">
            <AvatarImage
              src={contentPosting.userAvatar || '/placeholder.svg'}
              alt={contentPosting.userName}
              className="object-cover"
            />
            <AvatarFallback>{contentPosting.userName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className='flex flex-row items-center justify-between'>
              <div className="flex items-center gap-2">
                <h4 className="font-medium">{contentPosting.userName}</h4>
                {!contentPosting.isPublic && (
                  <Badge variant="secondary" className="text-xs">
                    <Icons.lock className="w-3 h-3 mr-1" />
                    Riêng tư
                  </Badge>
                )}
              </div>
              {isAuthor && (
                <Popover open={isPopoverOpen} onOpenChange={setPopoverOpen}>
                  <PopoverTrigger>
                    <Button variant="ghost" size="sm">
                      <Icons.ellipsis size={20} className="cursor-pointer" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-56" align="end">
                    <div className="space-y-1">

                      {/* Edit Dialog */}
                      <Dialog>
                        <DialogTrigger>
                          <Button variant="ghost" className="w-full justify-start h-9">
                            <Icons.edit className="w-4 h-4 mr-3" />
                            Chỉnh sửa bài viết
                          </Button>
                        </DialogTrigger>
                        <ContentPopUp contentData={contentPosting} />
                      </Dialog>

                      <Separator className="my-1" />

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            className="w-full justify-start h-9 text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <Icons.trash2 className="w-4 h-4 mr-3" />
                            Xóa bài viết
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Xác nhận xóa bài viết</AlertDialogTitle>
                            <AlertDialogDescription>
                              Bạn có chắc chắn muốn xóa bài viết này không? Hành động này không thể hoàn tác.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Hủy</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={handleDeletePost}
                              disabled={isDeleting}
                              className="bg-destructive hover:bg-destructive/90"
                            >
                              {isDeleting ? (
                                <>
                                  <Icons.loader2 className="w-4 h-4 mr-2 animate-spin" />
                                  Đang xóa...
                                </>
                              ) : (
                                "Xóa bài viết"
                              )}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </PopoverContent>
                </Popover>
              )}
            </div>
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
            <p className={cn(!isReadMore && 'line-clamp-3')}>{contentPosting.content}</p>
            <Button
              variant="link"
              className="p-0 h-auto text-primary text-sm mt-1"
              onClick={() => setReadMore(!isReadMore)}
            >
              {isReadMore ? 'Thu gọn' : 'Đọc thêm'}
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

        <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
          <div className="flex items-center space-x-6">
            <button
              onClick={handleLike}
              className={cn(
                'flex items-center space-x-2 text-muted-foreground hover:text-red-500 transition-colors group cursor-pointer',
                contentPosting.isLiked && 'text-red-500',
              )}
            >
              <Icons.heart
                className={cn(
                  'h-4 w-4 group-hover:fill-red-500 transition-colors',
                  contentPosting.isLiked && 'fill-red-500',
                )}
              />
              <span className="text-sm">{contentPosting.likeCount}</span>
            </button>
            <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger>
                <button className="flex items-center space-x-2 text-muted-foreground hover:text-blue-500 transition-colors cursor-pointer">
                  <Icons.messageCircle className="h-4 w-4" />
                  <span className="text-sm">{contentPosting.commentCount ?? 0}</span>
                </button>
              </DialogTrigger>
              <DialogContent
                showCloseButton={false}
                className="sm:max-w-[600px] h-[85%] p-0 rounded-xl bg-card gap-0"
              >
                <DialogHeader className="border-b-2 border-border p-0 m-0 py-3">
                  <DialogTitle className="font-semibold text-xl text-center">
                    Bài đăng của {contentPosting.userName}
                  </DialogTitle>
                  <DialogDescription className="hidden"></DialogDescription>
                </DialogHeader>
                <ForumCommentDialog
                  key={contentPosting.contentId}
                  contentPosting={contentPosting}
                  resetTrigger={isDialogOpen}
                />
              </DialogContent>
            </Dialog>
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
