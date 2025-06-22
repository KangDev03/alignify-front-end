import { AlertCircleIcon } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

import { Icons } from '@/components/icons/icons';
import { useAppSelector } from '@/hooks/redux';
import type { RootState } from '@/redux/store';

import { useGetInfluencerProfilesQuery } from '../home.service';

export default function Influencers() {
  const { role } = useAppSelector((state: RootState) => state.common);
  const influencerRole = role?.find((role) => role.roleName === 'INFLUENCER');
  const { data: profiles, isLoading } = useGetInfluencerProfilesQuery(
    { roleId: influencerRole!.roleId },
    { refetchOnMountOrArgChange: true },
  );
  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card className="border-2 border-primary/20 bg-card shadow-lg hover:shadow-xl transition-all">
          <CardContent>
            <div className="flex items-center space-x-4">
              <Skeleton className="h-16 w-16 rounded-full bg-border" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-32 bg-border" />
                <div className="flex items-center space-x-4 mt-2">
                  <Skeleton className="h-4 w-20 bg-border" />
                  <Skeleton className="h-4 w-12 bg-border" />
                </div>
              </div>
              <Skeleton className="h-8 w-24 rounded bg-border" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  return (
    <div className="space-y-6">
      {profiles?.data && profiles.data.length > 0 ? (
        profiles?.data.map((influencer) => (
          <Card
            key={influencer.id}
            className="border-2 border-primary/20 bg-card shadow-lg hover:shadow-xl transition-all"
          >
            <CardContent>
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src={influencer.avatarUrl || '/placeholder.svg'}
                    alt={influencer.name}
                    className="object-cover"
                  />
                  <AvatarFallback>{influencer.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-semibold">{influencer.name}</h3>
                  {influencer?.category && (
                    <p className="text-sm text-muted-foreground capitalize">
                      {influencer?.category.map((category) => category.categoryName).join(', ')}
                    </p>
                  )}
                  <div className="flex items-center space-x-4 mt-2 text-sm">
                    <div className="flex items-center space-x-1">
                      <Icons.users className="h-4 w-4" />
                      <span>{influencer.follower} followers</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icons.star className="h-4 w-4" />
                      <span>{influencer.rating}</span>
                    </div>
                    {/* <div className="flex items-center space-x-1">
                    <Icons.trendingUp className="h-4 w-4" />
                    <span>{influencer.rating}</span>
                  </div> */}
                    {/* <div className="flex items-center space-x-1">
                    <Icons.mapPin className="h-4 w-4" />
                    <span>{influencer.location}</span>
                  </div> */}
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Xem hồ sơ
                </Button>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <Alert variant="default">
          <AlertCircleIcon />
          <AlertTitle>Không có tài khoản Influencer nào</AlertTitle>
          <AlertDescription>
            Bạn có thể quay lại đây sau khi các tài khoản Influencer xuất hiện.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
