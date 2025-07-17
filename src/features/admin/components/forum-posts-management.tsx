'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import Stomp from 'stompjs';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Icons } from '@/components/icons/icons';
import type { CommonPageableRequest } from '@/features/common/common.type';
import type { ContentPosting } from '@/features/home/home.type';
import { useDeletePostMutation } from '@/features/posting/posting.service';
import { getStompClient } from '@/lib/stom-client';
import type { RootState } from '@/redux/store';
import { formatDate, parseIsoToDateTime } from '@/utils/format';

export function ForumPostsManagement() {
  const [searchQuery, setSearchQuery] = useState('');

  const { token } = useSelector((state: RootState) => state.auth);
  const [contents, setContents] = useState<ContentPosting[]>([]);
  const [deletePost, { isLoading: isDeleting, isSuccess }] = useDeletePostMutation();
  const [toastId, setToastId] = useState<string | number | undefined>();

  useEffect(() => {
    if (!token) return;
    let subscription: any;
    getStompClient(token).then((client) => {
      subscription = client.subscribe(`/topic/contents`, (res: Stomp.Message) => {
        try {
          const received: ContentPosting[] = JSON.parse(res.body);
          if (received) {
            setContents(received);
          }
        } catch (error) {
          console.error('Error parsing STOMP message:', error);
        }
      });
    });
    return () => {
      if (subscription) subscription.unsubscribe();
    };
  }, [token]);

  useEffect(() => {
    if (token) {
      getStompClient(token!).then((client) => {
        if (client.connected) {
          const pageRequest: CommonPageableRequest = {
            pageNumber: 0,
            pageSize: 10,
          };
          client.send(
            `/app/contents`,
            { Authorization: `Bearer ${token}` },
            JSON.stringify(pageRequest),
          );
        }
      });
    }
  }, [token]);

  // const getStatusBadge = (status: string, reports: number) => {
  //   const base = 'pointer-events-none hover:bg-transparent hover:text-inherit';
  //   if (reports > 0) {
  //     return <Badge className={`bg-red-100 text-red-800 ${base}`}>Bị báo cáo ({reports})</Badge>;
  //   }
  //   switch (status) {
  //     case 'published':
  //       return <Badge className={`bg-green-100 text-green-800 ${base}`}>Đã đăng</Badge>;
  //     case 'draft':
  //       return <Badge className={`bg-yellow-100 text-yellow-800 ${base}`}>Bản nháp</Badge>;
  //     case 'hidden':
  //       return <Badge className={`bg-gray-100 text-gray-800 ${base}`}>Đã ẩn</Badge>;
  //     default:
  //       return (
  //         <Badge variant="secondary" className={`${base}`}>
  //           {status}
  //         </Badge>
  //       );
  //   }
  // };

  const handleDeletePost = async (postId: string) => {
    let toastId: string | number | undefined;
    try {
      await deletePost(postId).unwrap();
      setContents((prev) => prev.filter((post) => post.contentId !== postId));
    } catch (_err) {
      if (toastId) toast.dismiss(toastId);
      toast.error('Xóa bài viết thất bại!. Thử lại sau!');
    }
  };

  useEffect(() => {
    if (isDeleting && !toastId) {
      const id = toast.loading('Đang xóa bài viết!', { duration: 2000 });
      setToastId(id);
    }
    if (!isDeleting && toastId) {
      toast.dismiss(toastId);
      setToastId(undefined);
    }
  }, [isDeleting, toastId]);

  useEffect(() => {
    if (isSuccess && toastId) {
      toast.dismiss(toastId);
      toast.success('Xóa bài viết thành công!', { duration: 2000 });
      setToastId(undefined);
    }
  }, [isSuccess, toastId]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Quản lý bài viết Forum</h2>
          <p className="text-muted-foreground">Quản lý tất cả bài viết trong forum</p>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Icons.search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm bài viết..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      {/* Posts Table */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách bài viết</CardTitle>
          <CardDescription>Tổng cộng {contents.length} bài viết</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bài viết</TableHead>
                <TableHead>Tác giả</TableHead>
                {/* <TableHead>Danh mục</TableHead> */}
                {/* <TableHead>Trạng thái</TableHead> */}
                <TableHead>Ngày đăng</TableHead>
                {/* <TableHead>Tương tác</TableHead> */}
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contents.map((post) => (
                <TableRow key={post.contentId}>
                  <TableCell>
                    <div className="max-w-xs">
                      <div className="font-medium truncate">{post.contentName}</div>
                      <div className="text-sm text-muted-foreground truncate">{post.content}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage
                          src={post.userAvatar || '/placeholder.svg'}
                          alt={post.userName}
                        />
                        <AvatarFallback>{post.userName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{post.userName}</span>
                    </div>
                  </TableCell>
                  {/* <TableCell>
                    <Badge variant="outline">{post.category}</Badge>
                  </TableCell> */}
                  {/* <TableCell>{getStatusBadge(post.status, post.reports)}</TableCell> */}
                  <TableCell>{formatDate(parseIsoToDateTime(post.createdDate))}</TableCell>
                  {/* <TableCell>
                    <div className="flex items-center space-x-3 text-sm">
                      <div className="flex items-center space-x-1">
                        <Icons.heart className="h-3 w-3" />
                        <span>{post.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icons.messageCircle className="h-3 w-3" />
                        <span>{post.comments}</span>
                      </div>
                    </div>
                  </TableCell> */}
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <Icons.moreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Icons.eye className="mr-2 h-4 w-4" />
                          Xem chi tiết
                        </DropdownMenuItem>
                        {/* {post.reports > 0 && (
                          <DropdownMenuItem>
                            <Icons.flag className="mr-2 h-4 w-4" />
                            Xem báo cáo ({post.reports})
                          </DropdownMenuItem>
                        )} */}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleDeletePost(post.contentId)}
                          className="text-red-600"
                        >
                          <Icons.trash2 className="mr-2 h-4 w-4" />
                          Xóa bài viết
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
