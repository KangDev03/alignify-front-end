'use client';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import InvitationList from '@/features/invitation/components/invitation-list';
import type { RootState } from '@/redux/store';

export default function InfluencerInvitations() {
  const { t } = useTranslation();
  const { invitations } = useSelector((state: RootState) => state.invitation);

  const getInvitationsCountByStatus = (status?: string) => {
    return invitations.reduce((count, inv) => (inv.status === status ? count + 1 : count), 0);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{t("invitation.sectionTitle")}</h1>
          <p className="mt-2 text-muted-foreground">{t("invitation.influencer.sectionDescription")}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="gap-2 h-fit">
          <CardHeader>
            <CardTitle className="text-sm">{t("invitation.influencer.cardTitle.totalInvites")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{invitations.length}</div>
          </CardContent>
        </Card>
        <Card className="gap-2 h-fit">
          <CardHeader>
            <CardTitle className="text-sm">{t("invitation.influencer.cardTitle.respondedInvites")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {getInvitationsCountByStatus('ACCEPTED') + getInvitationsCountByStatus('REJECTED')}
            </div>
          </CardContent>
        </Card>
        <Card className="gap-2 h-fit">
          <CardHeader>
            <CardTitle className="text-sm">{t("invitation.influencer.cardTitle.pendingInvites")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {getInvitationsCountByStatus('PENDING')}
            </div>
          </CardContent>
        </Card>
      </div>

      <InvitationList />
    </div>
  );
}
