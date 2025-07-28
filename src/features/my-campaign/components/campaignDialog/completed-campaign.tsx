import { useSelector } from 'react-redux';

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
import type { RootState } from '@/redux/store';

import CampaignDetail from '../campaign-detail';
import ViewProgressDialog from '../view-progress';

interface CompletedCampaignDialogProps {
  campaign: Campaign;
}
export default function CompletedCampaignDialog({ campaign }: CompletedCampaignDialogProps) {
  const { role: userRole } = useSelector((state: RootState) => state.auth);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center w-full bg-transparent">
          <Icons.eye className="h-4 w-4 mr-2" />
          Xem báo cáo
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] h-[85%] gap-0 p-0 pb-4" showCloseButton={false}>
        <DialogHeader className="h-fit border-b-2 border-border p-0 m-0 py-3">
          <DialogTitle className="font-semibold text-xl text-center">
            Chiến dịch của {campaign.brandName}
          </DialogTitle>
          <DialogDescription className="hidden"></DialogDescription>
        </DialogHeader>
        <CampaignDetail key={campaign.campaignId} campaign={campaign} />
      </DialogContent>
    </Dialog>
  );
}
