'use client';

import { useSelector } from 'react-redux';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import type { RootState } from '@/redux/store';

import InvitationCard from './invitation-card';

export default function InvitationList() {
  const { invitations } = useSelector((state: RootState) => state.invitation);

  const filterInvitations = (status?: string) => {
    return invitations.filter((inv) => inv.status === status);
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">Tất cả ({invitations.length})</TabsTrigger>
          <TabsTrigger value="PENDING">
            Chờ phản hồi ({filterInvitations('PENDING')?.length})
          </TabsTrigger>
          <TabsTrigger value="ACCEPTED">
            Đã chấp nhận ({filterInvitations('ACCEPTED')?.length})
          </TabsTrigger>
          <TabsTrigger value="REJECTED">
            Đã từ chối ({filterInvitations('REJECTED')?.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="grid grid-cols-3 gap-6">
          {invitations.map((invitation) => (
            <InvitationCard key={invitation.invitationId} invitation={invitation} />
          ))}
        </TabsContent>

        <TabsContent value="PENDING" className="grid grid-cols-3 gap-6">
          {filterInvitations('PENDING')?.map((invitation) => (
            <InvitationCard key={invitation.invitationId} invitation={invitation} />
          ))}
        </TabsContent>

        <TabsContent value="ACCEPTED" className="grid grid-cols-3 gap-6">
          {filterInvitations('ACCEPTED')?.map((invitation) => (
            <InvitationCard key={invitation.invitationId} invitation={invitation} />
          ))}
        </TabsContent>

        <TabsContent value="REJECTED" className="grid grid-cols-3 gap-6">
          {filterInvitations('REJECTED')?.map((invitation) => (
            <InvitationCard key={invitation.invitationId} invitation={invitation} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
