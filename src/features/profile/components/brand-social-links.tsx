import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Icons } from '@/components/icons/icons';

const platforms = ['instagram', 'facebook', 'youtube'] as const;

interface Props {
  socialMediaLinks: Record<string, string>;
}

export function SocialMediaCard({ socialMediaLinks }: Props) {
  const socialIcons = {
    instagram: Icons.instagram,
    facebook: Icons.facebook,
    youtube: Icons.youtube,
  };

  return (
    <Card className="border-2 border-primary/20 bg-card shadow-lg">
      <CardHeader>
        <CardTitle>Liên kết mạng xã hội</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {platforms.map((platform) => {
          const Icon = socialIcons[platform];
          const link = socialMediaLinks?.[platform];

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
