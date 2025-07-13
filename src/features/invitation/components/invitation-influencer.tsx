'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import InvitationList from '@/features/invitation/components/invitation-list';

export default function InfluencerInvitations() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Quản lý lời mời</h1>
          <p className="mt-2 text-muted-foreground">Phản hồi lời mời từ các Brand (nhãn hàng)</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="gap-2 h-fit">
          <CardHeader>
            <CardTitle className="text-sm">Tổng lời mời</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
          </CardContent>
        </Card>
        <Card className="gap-2 h-fit">
          <CardHeader>
            <CardTitle className="text-sm">Đã phản hồi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">8</div>
          </CardContent>
        </Card>
        <Card className="gap-2 h-fit">
          <CardHeader>
            <CardTitle className="text-sm">Chờ phản hồi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">8</div>
          </CardContent>
        </Card>
      </div>

      <InvitationList />
    </div>
  );
}
