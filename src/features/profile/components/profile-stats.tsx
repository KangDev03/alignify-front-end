import * as react from 'react';
import type { LucideProps } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Icons } from '@/components/icons/icons';
import type { SocialMedia } from '@/features/setting/setting.type';
import { formatNumber } from '@/utils/format';

interface SocialPlatformStats {
  platform: string;
  icon: react.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & react.RefAttributes<SVGSVGElement>
  >;
  color: string;
  followers: number;
}

export function ProfileStats({ socialMedias }: { socialMedias: SocialMedia[] }) {
  const socialMediaPlatforms: SocialPlatformStats[] = socialMedias
    ? socialMedias.map((item) => {
        let color = '';
        const platform = item.platform.toLowerCase();
        switch (platform) {
          case 'facebook': {
            color = 'text-blue-500';
            break;
          }
          case 'youtube': {
            color = 'text-red-500';
            break;
          }
          case 'instagram': {
            color = 'text-pink-500';
            break;
          }
          case 'tiktok': {
            color = 'text-gray-500';
            break;
          }
          default:
            break;
        }
        return {
          platform: item.platform,
          color: color,
          icon: Icons[platform as keyof typeof Icons],
          followers: item.follower,
        };
      })
    : [];

  return (
    <Card className="border-2 border-primary/20 bg-card shadow-lg">
      <CardHeader>
        <CardTitle>Thống kê tổng quan</CardTitle>
      </CardHeader>
      <CardContent>
        {/* <div className="text-center space-y-2">
          <div className="text-3xl font-bold text-primary">{1000}</div>
          <p className="text-sm text-muted-foreground">Tổng số người theo dõi</p>
        </div>

        <Separator className="my-4" /> */}

        <div className="space-y-3">
          {socialMediaPlatforms.map((platform) => {
            const Icon = platform.icon;
            return (
              <div
                key={platform.platform}
                className="flex items-center justify-between font-medium"
              >
                <div className="flex items-center space-x-2">
                  <Icon className={`h-4 w-4 ${platform.color}`} />
                  <span className="text-sm">{platform.platform}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-sm">{formatNumber(platform.followers)}</span>
                  <Icons.rss className="h-4 w-4 -scale-x-90" />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
