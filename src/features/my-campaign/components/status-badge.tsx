import { useTranslation } from 'react-i18next';

import { Badge } from '@/components/ui/badge';

import { Icons } from '@/components/icons/icons';

export const StatusBadge = (status: string) => {
  const { t } = useTranslation();
  switch (status) {
    case 'DRAFT':
      return (
        <Badge variant="secondary">
          <Icons.fileText size={12} className="mt-0.5" />
          <p className="leading-6">{t("campaignCard.campaignStatus.draft")}</p>
        </Badge>
      );
    case 'RECRUITING':
      return (
        <Badge variant="recruiting">
          <Icons.users size={12} className="mt-0.5" />
          <p className="leading-6">{t("campaignCard.campaignStatus.recruiting")}</p>
        </Badge>
      );
    case 'PENDING':
      return (
        <Badge variant="pending">
          <Icons.clock4 size={12} className="mt-0.5" />
          <p className="leading-6">{t("campaignCard.campaignStatus.pending")}</p>
        </Badge>
      );
    case 'PARTICIPATING':
      return (
        <Badge variant="default">
          <Icons.play size={12} className="mt-0.5" />
          <p className="leading-6">{t("campaignCard.campaignStatus.participating")}</p>
        </Badge>
      );
    case 'COMPLETED':
      return (
        <Badge variant="accepted">
          <Icons.circleX size={12} className="mt-0.5" />
          <p className="leading-6">{t("campaignCard.campaignStatus.compleeted")}</p>
        </Badge>
      );
    default:
      return (
        <Badge variant="outline" className="rounded-full">
          {status}
        </Badge>
      );
  }
};
