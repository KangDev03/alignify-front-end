import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import { Icons } from '@/components/icons/icons';
import { useGetCategoriesQuery } from '@/features/common/common.service';
import type { RoleName } from '@/features/common/common.type';
import { useAppSelector } from '@/hooks/redux';
import type { RootState } from '@/redux/store';
import { Dialog, DialogTrigger } from '@radix-ui/react-dialog';

import CampaignPopUp from './popUp-campaign';
import ContentPopUp from './popUp-content';

export default function PopUpTrigger() {
  const { role } = useAppSelector((state: RootState) => state.auth);
  const { data: rawData, isLoading } = useGetCategoriesQuery();
  const categories = rawData?.data;
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const MAX_CATEGORIES = 3;
  const userRole: RoleName = role;

  function handleSelectCategory(categoryId: string) {
    setSelectedCategories((prev) => {
      if (prev.includes(categoryId)) {
        return prev.filter((id) => id !== categoryId);
      }
      if (prev.length >= MAX_CATEGORIES) {
        const copy = [...prev].slice(0, MAX_CATEGORIES - 1);
        return [...copy, categoryId];
      }
      return [...prev, categoryId];
    });
  }
  return (
    userRole !== 'ADMIN' && (
      <Dialog>
        <DialogTrigger className="fixed bottom-6 right-10 cursor-pointer">
          {isLoading ? (
            <Skeleton className="w-14 h-14 rounded-full bg-primary" />
          ) : userRole === 'INFLUENCER' ? (
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
        {userRole === 'INFLUENCER' && (
          <ContentPopUp
            categories={categories!}
            selectedCategories={selectedCategories}
            onSelectCategory={handleSelectCategory}
          />
        )}
        {userRole === 'BRAND' && <CampaignPopUp categories={categories!} />}
      </Dialog>
    )
  );
}
