import { useEffect } from 'react';
import { AlertCircleIcon } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

import { Icons } from '@/components/icons/icons';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import type { RootState } from '@/redux/store';

import { useGetBrandProfilesQuery } from '../home.service';
import { setRefetch } from '../home.slice';

export default function Brands() {
  const dispatch = useAppDispatch();
  const { role } = useAppSelector((state: RootState) => state.common);
  const { brand } = useAppSelector((state: RootState) => state.homeRefetch);
  const brandRole = role?.find((role) => role.roleName === 'BRAND');
  const { data: profiles, isLoading, refetch } = useGetBrandProfilesQuery(
    { roleId: brandRole!.roleId },
    { refetchOnMountOrArgChange: true, },
  );
  useEffect(() => {
    if (brand) {
      refetch();
      dispatch(setRefetch({ key: 'brand', value: false }));
    }
  }, [brand, dispatch]);
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
    <div className="space-y-4">
      {profiles?.data && profiles.data.length > 0 ? (
        profiles?.data.map((brand, idx) => (
          <Card
            key={brand.id ?? idx}
            className="border-2 border-primary/20 bg-card shadow-lg hover:shadow-xl transition-all"
          >
            <CardContent>
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src={brand.avatarUrl || '/placeholder.svg'}
                    alt={brand.name}
                    className="object-cover"
                  />
                  <AvatarFallback>{brand.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold">{brand.name}</h3>
                    {/* {brand.verified && (
                    <Badge variant="default" className="text-xs">
                      Verified
                    </Badge>
                  )} */}
                  </div>
                  <p className="text-sm text-muted-foreground">{brand.bio}</p>
                  <div className="flex items-center space-x-4 mt-2 text-sm">
                    <div className="flex items-center space-x-1">
                      <Icons.building2 className="h-4 w-4" />
                      <span>{brand.totalCampaign} chiến dịch</span>
                    </div>
                    {/* <div className="flex items-center space-x-1">
                    <Icons.star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{brand.rating}</span>
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
          <AlertTitle>Không có tài khoản Brand nào</AlertTitle>
          <AlertDescription>
            Bạn có thể quay lại đây sau khi các tài khoản Brand xuất hiện.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
