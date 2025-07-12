'use client';

import { useSelector } from 'react-redux';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import InvitationList from '@/features/invitation/components/invitation-list';
import InvitationModal from '@/features/invitation/components/invitation-modal';
import type { RootState } from '@/redux/store';

export default function BrandInvitations() {
  const { invitations } = useSelector((state: RootState) => state.invitation);

  const getInvitationsCountByStatus = (status?: string) => {
    return invitations.reduce((count, inv) => (inv.status === status ? count + 1 : count), 0);
  };
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Quản lý lời mời</h1>
          <p className="mt-2 text-muted-foreground">
            Mời influencer tham gia chiến dịch và theo dõi trạng thái
          </p>
        </div>
        <InvitationModal />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="gap-2 h-fit">
          <CardHeader>
            <CardTitle className="text-sm">Tổng lời mời</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{invitations.length}</div>
          </CardContent>
        </Card>

        <Card className="gap-2 h-fit">
          <CardHeader>
            <CardTitle className="text-sm">Chờ phản hồi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {getInvitationsCountByStatus('PENDING')}
            </div>
          </CardContent>
        </Card>

        <Card className="gap-2 h-fit">
          <CardHeader>
            <CardTitle className="text-sm">Tỷ lệ chấp nhận</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {Math.ceil(getInvitationsCountByStatus('ACCEPTED') / invitations.length) * 100}%
            </div>
          </CardContent>
        </Card>
      </div>

      <InvitationList />
    </div>
  );
}
