'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import Stomp from 'stompjs';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
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
import type { Campaign, CommonPageableRequest } from '@/features/common/common.type';
import { useDeleteCampaignMutation } from '@/features/posting/posting.service';
import { getStompClient } from '@/lib/stom-client';
import type { RootState } from '@/redux/store';

export function CampaignsManagement() {
  const { token } = useSelector((state: RootState) => state.auth);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [deleteCampaign, { isLoading: isDeleting, isSuccess, isError }] =
    useDeleteCampaignMutation();
  const [toastId, setToastId] = useState<string | number | undefined>();

  useEffect(() => {
    if (!token) return;
    let subscription: any;
    getStompClient(token).then((client) => {
      subscription = client.subscribe(`/topic/campaigns`, (res: Stomp.Message) => {
        try {
          const received: Campaign[] = JSON.parse(res.body);
          if (received) {
            setCampaigns(received);
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
            `/app/campaigns`,
            { Authorization: `Bearer ${token}` },
            JSON.stringify(pageRequest),
          );
        }
      });
    }
  }, [token]);

  const getStatusBadge = (status: string) => {
    const base = 'pointer-events-none hover:bg-transparent hover:text-inherit';
    switch (status) {
      case 'DRAFT':
        return <Badge className={`bg-gray-100 text-gray-800 ${base}`}>Đang chờ tuyển</Badge>;
      case 'RECRUITING':
        return <Badge className={`bg-blue-100 text-blue-800 ${base}`}>Đang tuyển</Badge>;
      case 'COMPLETED':
        return <Badge className={`bg-green-100 text-green-800 ${base}`}>Hoàn thành</Badge>;
      case 'PENDING':
        return <Badge className={`bg-yellow-100 text-yellow-800 ${base}`}>Chờ duyệt</Badge>;
      case 'REPORTED':
        return <Badge className={`bg-red-100 text-red-800 ${base}`}>Bị báo cáo</Badge>;
      case 'PARTICIPATING':
        return <Badge className={`bg-indigo-100 text-indigo-800 ${base}`}>Đang diễn ra</Badge>;
      default:
        return (
          <Badge variant="secondary" className={`${base}`}>
            {status}
          </Badge>
        );
    }
  };

  const handleDeleteCampaign = async (campaignId: string) => {
    let toastId: string | number | undefined;
    try {
      toastId = toast.loading('Đang xóa chiến dịch!', { duration: 2000 });
      await deleteCampaign(campaignId).unwrap();
      setCampaigns((prev) => prev.filter((campaign) => campaign.campaignId !== campaignId));
      toast.dismiss(toastId);
      toast.success('Xóa chiến dịch thành công!', { duration: 2000 });
    } catch (err) {
      if (toastId) toast.dismiss(toastId);
      console.log(err);
      toast.error('Xóa chiến dịch thất bại. Thử lại sau!');
    }
  };

  useEffect(() => {
    if (isDeleting && !toastId) {
      const id = toast.loading('Đang xóa chiến dịch!', { duration: 2000 });
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
      toast.success('Xóa chiến dịch thành công!', { duration: 2000 });
      setToastId(undefined);
    } else if (isError && toastId) {
      toast.dismiss(toastId);
      toast.error('Xóa chiến dịch thất bại. Thử lại sau!');
      setToastId(undefined);
    }
  }, [isSuccess, toastId, isError]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Quản lý chiến dịch</h2>
          <p className="text-muted-foreground">Quản lý tất cả chiến dịch trên hệ thống</p>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Icons.search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Tìm kiếm chiến dịch..." className="pl-8" />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách chiến dịch</CardTitle>
          <CardDescription>Tổng cộng {campaigns.length} chiến dịch</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Chiến dịch</TableHead>
                <TableHead>Thương hiệu</TableHead>
                <TableHead>Trạng thái</TableHead>
                {/* <TableHead>Ngân sách</TableHead> */}
                {/* <TableHead>Thời gian</TableHead> */}
                {/* <TableHead>Ứng viên</TableHead> */}
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaigns.map((campaign) => (
                <TableRow key={campaign.campaignId}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{campaign.campaignName}</div>
                      {/* <div className="text-sm text-muted-foreground">{campaign.c}</div> */}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage
                          src={campaign.brandAvartar || '/placeholder.svg'}
                          alt={campaign.brandName}
                        />
                        <AvatarFallback>{campaign.brandName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{campaign.brandName}</span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(campaign.status)}</TableCell>
                  {/* <TableCell>{campaign.budget}</TableCell> */}
                  {/* <TableCell>
                    <div className="text-sm">
                      <div>{new Date(campaign.startDate).toLocaleDateString('vi-VN')}</div>
                      <div className="text-muted-foreground">
                        đến {new Date(campaign.endDate).toLocaleDateString('vi-VN')}
                      </div>
                    </div>
                  </TableCell> */}
                  {/* <TableCell>
                    <div className="text-sm">
                      <div>
                        {campaign.selected}/{campaign.applicants}
                      </div>
                      <div className="text-muted-foreground">đã chọn/ứng tuyển</div>
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
                        {campaign.status === 'reported' && (
                          <DropdownMenuItem>
                            <Icons.flag className="mr-2 h-4 w-4" />
                            Xem báo cáo
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleDeleteCampaign(campaign.campaignId)}
                          className="text-red-600"
                        >
                          <Icons.trash2 className="mr-2 h-4 w-4" />
                          Xóa chiến dịch
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
