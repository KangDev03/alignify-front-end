import { useState } from 'react';

import { Button } from '@/components/ui/button';

import { Icons } from '@/components/icons/icons';
import { Dialog, DialogTrigger } from '@radix-ui/react-dialog';

import CampaignPopUp from './popUp-campaign';
import ContentPopUp from './popUp-content';

const categories = [
  { id: '1', name: 'Thời gian' },
  { id: '2', name: 'Thể thao' },
  { id: '3', name: 'Làm đẹp' },
  { id: '4', name: 'Du lịch' },
  { id: '5', name: 'Ẩm thực' },
  { id: '6', name: 'Công nghệ' },
  { id: '7', name: 'Sức khỏe' },
  { id: '8', name: 'Giáo dục' },
  { id: '9', name: 'Kinh doanh' },
  { id: '10', name: 'Nghệ thuật' },
];
type Role = 'INFLUENCER' | 'BRAND' | 'ADMIN' | null;

const userRole: Role = 'INFLUENCER';

export default function PopUpTrigger() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const MAX_CATEGORIES = 3;
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
    userRole !== 'ADMIN' &&
    userRole !== null && (
      <Dialog>
        <DialogTrigger className="fixed bottom-5 right-5 cursor-pointer">
          <Button
            variant={'default'}
            className="size-14 rounded-full flex justify-center items-center"
          >
            <Icons.plus className="bg-transparent rounded-full text-background size-6" />
          </Button>
        </DialogTrigger>
        {userRole === 'INFLUENCER' && (
          <ContentPopUp
            categories={categories}
            selectedCategories={selectedCategories}
            onSelectCategory={handleSelectCategory}
          />
        )}
        {userRole === 'BRAND' && (
          <CampaignPopUp
            categories={categories}
            selectedCategories={selectedCategories}
            onSelectCategory={handleSelectCategory}
          />
        )}
      </Dialog>
    )
  );
}
