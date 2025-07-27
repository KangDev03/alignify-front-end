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
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Icons.edit className="h-4 w-4 mr-1" />
          Chỉnh sửa
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] " showCloseButton={false}>
        <AlertDialogHeader className="border-b-2 border-border py-3">
          <DialogTitle className="font-semibold text-xl text-center">
            Chiến dịch của {campaign.brandName}
          </DialogTitle>
          <DialogDescription>
            Bạn có chắc chắn muốn chỉnh sửa chiến dịch không? Hành động này sẽ đưa chiến dịch của
            bạn về trạng thái nháp. Mọi đơn ứng tuyển và lời mời sẽ bị xóa. Hãy đảm bảo rằng chính
            bạn là người thực hiện!
          </DialogDescription>
        </AlertDialogHeader>
        <div className="flex justify-between">
          <DialogClose>
            <Button variant={'destructive'}>Hủy</Button>
          </DialogClose>
          <Button variant={'default'} onClick={handleMoveToDraft}>
            Xác nhận
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
