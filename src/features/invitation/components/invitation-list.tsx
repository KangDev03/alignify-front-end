'use client';

import { useState } from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import InvitationCard from './invitation-card';
import type { Invitation } from '../invitation.type';

export default function InvitationList() {
  const [invitations] = useState<Invitation[]>([
    {
      id: '1',
      campaignTitle: 'Chiến dịch quảng cáo sản phẩm làm đẹp mùa hè',
      influencerName: 'Nguyễn Minh Anh',
      influencerAvatar: '/placeholder.svg?height=40&width=40',
      status: 'pending',
      sentAt: '2024-01-15T10:30:00Z',
      budget: 5000000,
      message: 'Xin chào! Chúng tôi rất mong muốn hợp tác với bạn...',
      deadline: '2024-01-20',
    },
    {
      id: '2',
      campaignTitle: 'Review sản phẩm công nghệ mới',
      influencerName: 'Trần Văn Tech',
      influencerAvatar: '/placeholder.svg?height=40&width=40',
      status: 'accepted',
      sentAt: '2024-01-14T14:20:00Z',
      respondedAt: '2024-01-15T09:15:00Z',
      budget: 8000000,
      message: 'Chúng tôi có sản phẩm công nghệ mới...',
      deadline: '2024-01-18',
    },
    {
      id: '3',
      campaignTitle: 'Quảng cáo thời trang xuân hè',
      influencerName: 'Lê Thị Fashion',
      influencerAvatar: '/placeholder.svg?height=40&width=40',
      status: 'declined',
      sentAt: '2024-01-13T16:45:00Z',
      respondedAt: '2024-01-14T11:30:00Z',
      budget: 6000000,
      message: 'Bộ sưu tập thời trang mới của chúng tôi...',
      deadline: '2024-01-17',
    },
  ]);

  const filterInvitations = (status?: string) => {
    if (!status) return invitations;
    return invitations.filter((inv) => inv.status === status);
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">Tất cả ({invitations.length})</TabsTrigger>
          <TabsTrigger value="pending">
            Chờ phản hồi ({filterInvitations('pending').length})
          </TabsTrigger>
          <TabsTrigger value="accepted">
            Đã chấp nhận ({filterInvitations('accepted').length})
          </TabsTrigger>
          <TabsTrigger value="declined">
            Đã từ chối ({filterInvitations('declined').length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {invitations.map((invitation) => (
            <InvitationCard key={invitation.id} invitation={invitation} />
          ))}
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          {filterInvitations('pending').map((invitation) => (
            <InvitationCard key={invitation.id} invitation={invitation} />
          ))}
        </TabsContent>

        <TabsContent value="accepted" className="space-y-4">
          {filterInvitations('accepted').map((invitation) => (
            <InvitationCard key={invitation.id} invitation={invitation} />
          ))}
        </TabsContent>

        <TabsContent value="declined" className="space-y-4">
          {filterInvitations('declined').map((invitation) => (
            <InvitationCard key={invitation.id} invitation={invitation} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
