import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Icons } from '@/components/icons/icons';
import type { Campaign } from '@/features/common/common.type';

import CampaignDetail from '../campaign-detail';

interface CompletedCampaignDialogProps {
  campaign: Campaign;
}
export default function CompletedCampaignDialog({ campaign }: CompletedCampaignDialogProps) {
  const { t } = useTranslation();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center w-full bg-transparent">
          <Icons.eye className="h-4 w-4 mr-2" />
          {t('campaignCard.viewReport')}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] h-[85%] gap-0 p-0 pb-4" showCloseButton={false}>
        <DialogHeader className="h-fit border-b-2 border-border p-0 m-0 py-3">
          <DialogTitle className="font-semibold text-xl text-center">
            {t("campaignCard.campaignPostBy")} {campaign.brandName}
          </DialogTitle>
          <DialogDescription className="hidden"></DialogDescription>
        </DialogHeader>
        <CampaignDetail key={campaign.campaignId} campaign={campaign} />
      </DialogContent>
    </Dialog>
  );
}
