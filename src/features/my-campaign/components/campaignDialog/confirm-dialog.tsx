import { useTranslation } from 'react-i18next';

import { AlertDialogHeader } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Icons } from '@/components/icons/icons';
import type { Campaign } from '@/features/common/common.type';

interface ConfirmDialogProps {
  campaign: Campaign;
  handleMoveToDraft: () => void;
}
export default function ConfirmMoveDraftDialog({
  campaign,
  handleMoveToDraft,
}: ConfirmDialogProps) {
  const { t } = useTranslation();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Icons.edit className="h-4 w-4 mr-1" />
          {t('campaignCard.editButton')}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] " showCloseButton={false}>
        <AlertDialogHeader className="border-b-2 border-border py-3">
          <DialogTitle className="font-semibold text-xl text-center">
            {t("campaignCard.campaignPostBy")} {campaign.brandName}
          </DialogTitle>
          <DialogDescription>
            {t('campaignCard.editDialogDesc')}
          </DialogDescription>
        </AlertDialogHeader>
        <div className="flex justify-between">
          <DialogClose>
            <Button variant={'destructive'}>{t("campaignCard.cancelButton")}</Button>
          </DialogClose>
          <Button variant={'default'} onClick={handleMoveToDraft}>
            {t("campaignCard.confirmButton")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
