import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

import { Icons } from '@/components/icons/icons';
import type { ProfileInfoProps } from '@/features/profile/components/profile-info';
import { formatNumber } from '@/utils/format';

export function ProfileStats({ profile }: ProfileInfoProps) {
  const socialPlatforms = [
    {
      name: 'Instagram',
      icon: Icons.instagram,
      color: 'text-pink-500',
      followers: 10,
    },
    {
      name: 'YouTube',
      icon: Icons.youtube,
      color: 'text-red-500',
      followers: 10,
    },
    {
      name: 'Facebook',
      icon: Icons.facebook,
      color: 'text-blue-500',
      followers: 10,
    },
  ];
  console.log(profile);


  return (
    <Card className="border-2 border-primary/20 bg-card shadow-lg">
      <CardHeader>
        <CardTitle>Thống kê tổng quan</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center space-y-2">
          <div className="text-3xl font-bold text-primary">{1000}</div>
          <p className="text-sm text-muted-foreground">Tổng số người theo dõi</p>
        </div>

        <Separator className="my-4" />

        <div className="space-y-3">
          {socialPlatforms.map((platform) => {
            const Icon = platform.icon;
            return (
              <div key={platform.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon className={`h-4 w-4 ${platform.color}`} />
                  <span className="text-sm">{platform.name}</span>
                </div>
                <span className="text-sm font-medium">{formatNumber(platform.followers)}</span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
