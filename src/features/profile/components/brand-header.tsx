import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { BarChart3, Calendar } from 'lucide-react';
import { toast } from 'sonner';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { Icons } from '@/components/icons/icons';
import { changeUserAvtar } from '@/features/auth/auth.slice';
import { useSendNotification } from '@/features/notification/useSendNotification';
import type { BrandData } from '@/features/profile/profile.type';
import { useAppDispatch } from '@/hooks/redux';
import type { RootState } from '@/redux/store';

import { useChangeAvatarMutation } from '../profile.service';

interface BrandHeaderProps {
  profile: BrandData;
  campaignCompleted: number;
}

export function BrandHeaderCard({ profile, campaignCompleted }: BrandHeaderProps) {
  const dispatch = useAppDispatch();
  const [changeAvatar] = useChangeAvatarMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { avatarUrl, id, name } = useSelector((state: RootState) => state.auth);
  const [isPopoverOpen, setPopoverOpen] = useState(false);

  const sendNotification = useSendNotification();

  const handleOnClickAvatar = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleChangeAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setPopoverOpen(false);
    const file = event.target.files?.[0] || null;
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      return;
    }
    const image = new FormData();
    image.append('image', file);
    try {
      const response = await changeAvatar({ image }).unwrap();
      dispatch(changeUserAvtar({ url: response.data }));
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      sendNotification({
        userId: id!,
        content: `${name} đã cập nhật ảnh đại diện thành công`,
      });
      // toast.success('Cập nhật ảnh đại diện thành công');
    } catch (error) {
      toast.success('Cập nhật ảnh đại diện thất bại');
      console.error('Error uploading avatar:', error);
    }
  };
  return (
    <Card className="border-2 border-primary/20 bg-card shadow-lg">
      <CardContent>
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
          <Popover open={isPopoverOpen} onOpenChange={setPopoverOpen}>
            <PopoverTrigger>
              <Avatar className="h-24 w-24">
                <AvatarImage
                  src={avatarUrl! ?? profile.avatarUrl ?? '/placeholder.svg'}
                  alt={profile.name}
                />
                <AvatarFallback className="text-2xl">
                  {profile.name.charAt(0) ?? 'U'}
                </AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent
              className="text-left font-semibold py-3 flex gap-2 items-center cursor-pointer"
              onClick={handleOnClickAvatar}
            >
              <Icons.camera strokeWidth={1.5} /> Choose profile picture
            </PopoverContent>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleChangeAvatar}
            />
          </Popover>
          <div className="flex-1 space-y-2">
            <h1 className="text-2xl font-bold m-0">{profile.name}</h1>
            <div className="flex items-center space-x-1 text-sm text-muted-foreground mt-1">
              <Calendar className="h-4 w-4" />
              <span>
                Thành lập {profile.establishDate ? profile.establishDate : '(chưa cung cấp)'}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {profile.categories && profile.categories.length > 0 ? (
                profile.categories.map((category: { categoryId: string; categoryName: string }) => (
                  <Badge key={category.categoryId} variant="outline" className="text-xs">
                    {category.categoryName}
                  </Badge>
                ))
              ) : (
                <Badge variant="outline" className="text-xs text-muted-foreground">
                  Chưa có danh mục
                </Badge>
              )}
            </div>
            <div className="flex items-center space-x-1 text-sm">
              <BarChart3 className="h-4 w-4 text-blue-500" />
              <span>{campaignCompleted ?? 0} chiến dịch</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
