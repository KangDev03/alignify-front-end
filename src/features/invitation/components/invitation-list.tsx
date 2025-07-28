'use client';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import type { RootState } from '@/redux/store';

import InvitationCard from './invitation-card';

export default function InvitationList() {
  const { t } = useTranslation();
  const { invitations } = useSelector((state: RootState) => state.invitation);

  const filterInvitations = (status?: string) => {
    return invitations.filter((inv) => inv.status === status);
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">{t("invitation.tabs.all")} ({invitations.length})</TabsTrigger>
          <TabsTrigger value="PENDING">
            {t("invitation.tabs.pending")} ({filterInvitations('PENDING')?.length})
          </TabsTrigger>
          <TabsTrigger value="ACCEPTED">
            {t("invitation.tabs.accepted")} ({filterInvitations('ACCEPTED')?.length})
          </TabsTrigger>
          <TabsTrigger value="REJECTED">
            {t("invitation.tabs.rejected")} ({filterInvitations('REJECTED')?.length})
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
