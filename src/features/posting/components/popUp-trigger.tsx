import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import { Icons } from '@/components/icons/icons';
import type { RoleName } from '@/features/common/common.type';
import { useAppSelector } from '@/hooks/redux';
import { cn } from '@/lib/utils';
import type { RootState } from '@/redux/store';
import { Dialog, DialogTrigger } from '@radix-ui/react-dialog';

import CampaignPopUp from './popUp-campaign';
import ContentPopUp from './popUp-content';

export default function PopUpTrigger() {
  const { role } = useAppSelector((state: RootState) => state.auth);
  const userRole: RoleName = role!;

  return (
    userRole !== 'ADMIN' && (
      <Dialog>
        <DialogTrigger className={cn(userRole === "BRAND" ? "fixed bottom-6 right-8 cursor-pointer" : "fixed bottom-24 right-8 cursor-pointer")}>
          {userRole === 'INFLUENCER' ? (
            <Tooltip delayDuration={500}>
              <TooltipTrigger>
                <Button
                  variant="default"
                  className="size-14 rounded-full flex justify-center items-center"
                >
                  <Icons.penTool className="size-6 rotate-180" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="text-xs font-medium p-1">
                <p>Tạo bài viết mới</p>
              </TooltipContent>
            </Tooltip>
          ) : (
            <Tooltip delayDuration={500}>
              <TooltipTrigger>
                <Button
                  variant="default"
                  className="size-14 rounded-full flex justify-center items-center"
                >
                  <Icons.megaphone className="size-6" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Tạo chiến dịch mới</p>
              </TooltipContent>
            </Tooltip>
          )}
        </DialogTrigger>
        {userRole === 'INFLUENCER' && <ContentPopUp />}
        {userRole === 'BRAND' && <CampaignPopUp />}
      </Dialog>
    )
  );
}
