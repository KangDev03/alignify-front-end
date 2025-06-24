import { useRef, useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { Icons } from '@/components/icons/icons';
import { parseDateString } from '@/utils/format';

import { useChangeAvatarMutation } from '../profile.service';
import type { InfluencerData } from '../profile.type';

interface ProfileHeaderProps {
  profile: InfluencerData;
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  const [changeAvatar] = useChangeAvatarMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatarUrl, setAvatarUrl] = useState<string>();
  const [isOpenPopover, setOpenPopover] = useState<boolean>(false);
  const handleOnClickAvatar = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleChangeAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setOpenPopover(false);
    const file = event.target.files?.[0] || null;
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      return;
    }
    const image = new FormData();
    image.append('image', file);
    try {
      const response = await changeAvatar({ image }).unwrap();

      setAvatarUrl(response.data);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Error uploading avatar:', error);
    }
  };

  return (
    <Card className="border-2 border-primary/20 bg-card shadow-lg">
      <CardContent>
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
          <Popover open={isOpenPopover}>
            <PopoverTrigger
              onClick={() => {
                setOpenPopover(!isOpenPopover);
              }}
            >
              <Avatar className="h-24 w-24">
                <AvatarImage
                  src={avatarUrl ?? profile.avatarUrl ?? '/placeholder.svg'}
                  alt={profile.name}
                />
                <AvatarFallback className="text-2xl">{profile.name.charAt(0)}</AvatarFallback>
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
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">{profile.name}</h1>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                  <div className="flex items-center space-x-1">
                    <Icons.calendar className="h-4 w-4" />
                    <span>{parseDateString(profile.doB)}</span>
                  </div>
                </div>
              </div>
              {/* <Button
                variant={isEditing ? 'destructive' : 'outline'}
                size="sm"
                onClick={isEditing ? onCancel : onEditToggle}
              >
                {isEditing ? (
                  <Icons.x className="h-4 w-4 mr-2" />
                ) : (
                  <Icons.edit className="h-4 w-4 mr-2" />
                )}
                {isEditing ? 'Hủy' : 'Chỉnh sửa'}
              </Button> */}
            </div>

            <div className="flex flex-wrap gap-2">
              {profile.categories.map((category: { categoryId: string; categoryName: string }) => (
                <Badge key={category.categoryId} variant="outline" className="text-xs">
                  {category.categoryName}
                </Badge>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Icons.star className="h-4 w-4 fill-yellow-400 text-yellow-400" />

                <span className="font-medium"> {profile.rating}</span>
              </div>
              {/* <div className="flex items-center space-x-1">
                                <Icons.trendingUp className="h-4 w-4 text-green-500" />
                                <span className="text-sm">{influencer.engagementRate}% engagement</span>
                            </div> */}

              <div className="text-sm text-muted-foreground">
                {profile.completedCampaign ?? 0} chiến dịch hoàn thành
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
