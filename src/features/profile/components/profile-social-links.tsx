import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Icons } from '@/components/icons/icons';
import { SupportedPlatforms } from '@/features/common/common.type';
import type { SocialMedia } from '@/features/setting/setting.type';

interface ProfileSocialLinksProps {
  socialMediaLinks: SocialMedia[];
}

export function ProfileSocialLinks({ socialMediaLinks }: ProfileSocialLinksProps) {
  return (
    <Card className="border-2 border-primary/20 bg-card shadow-lg">
      <CardHeader>
        <CardTitle>Liên kết mạng xã hội</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {SupportedPlatforms.map((platform) => {
          const Icon = Icons[platform as keyof typeof Icons];
          const linkObj = socialMediaLinks.find((sm) => sm.platform?.toLowerCase() === platform);
          const link = linkObj?.url;

          return (
            <div
              key={platform}
              className="flex items-center justify-between p-3 border-2 border-primary/10 rounded-lg bg-card/50 hover:bg-card transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Icon className="h-5 w-5" />
                <div className="capitalize font-medium">{platform}</div>
              </div>
              <div className="flex items-center space-x-2">
                {link ? (
                  <>
                    <span className="text-sm text-muted-foreground">{link}</span>
                    <Button variant="ghost" size="sm" onClick={() => window.open(link, '_blank')}>
                      <Icons.externalLink className="h-4 w-4" />
                    </Button>
                  </>
                ) : (
                  <span className="text-sm italic text-muted-foreground">Chưa có</span>
                )}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
