import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router';
import { skipToken } from '@reduxjs/toolkit/query/react';
import { AlertCircleIcon } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

import { Icons } from '@/components/icons/icons';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import type { RootState } from '@/redux/store';

import { useGetInfluencerProfilesQuery, useSearchInfluencersQuery } from '../home.service';
import { setRefetch } from '../home.slice';

interface InfluencersProps {
  searchTerm: string | null;
}

export default function Influencers({ searchTerm }: InfluencersProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { role } = useAppSelector((state: RootState) => state.common);
  const { influencer } = useAppSelector((state: RootState) => state.homeRefetch);
  const influencerRole = role?.find((role) => role.roleName === 'INFLUENCER');

  const isSearching = !!(searchTerm && searchTerm.trim() && searchTerm.length > 0);
  const [pageNumber, setPageNumber] = useState(0);
  const pageSize = 10;

  const {
    data: profiles,
    isLoading,
    refetch,
  } = useGetInfluencerProfilesQuery(
    influencerRole ? { roleId: influencerRole.roleId, pageNumber, pageSize } : skipToken,
    { refetchOnMountOrArgChange: true, skip: isSearching || !influencerRole },
  );

  const { data: searchResult, isLoading: isLoadingSearch } = useSearchInfluencersQuery(
    isSearching
      ? { term: searchTerm!.trim(), pageNumber, pageSize }
      : { term: '', pageNumber, pageSize },
    { skip: !isSearching },
  );

  useEffect(() => {
    if (isSearching && searchResult) {
      // Log toàn bộ kết quả trả về từ API để kiểm tra cấu trúc và dữ liệu
      console.log('Influencer searchResult:', searchResult);
      console.log('influencersToShow:', searchResult?.data?.influencers);
    }
  }, [isSearching, searchResult]);

  const hasMore = isSearching
    ? (searchResult?.data?.influencers?.length ?? 0) === pageSize
    : (profiles?.data?.length ?? 0) === pageSize;

  const fetchMoreData = () => {
    if (!hasMore) return;
    setPageNumber((prev) => prev + 1);
  };

  const loadingSkeleton = (
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

  const influencersToShow = isSearching
    ? searchResult?.data?.influencers ?? []
    : profiles?.data;
  const loading = isSearching ? isLoadingSearch : isLoading;

  useEffect(() => {
    if (influencer && !isSearching) {
      refetch();
      dispatch(setRefetch({ key: 'influencer', value: false }));
    }
  }, [influencer, dispatch, refetch, isSearching]);

  useEffect(() => {
    if (searchTerm === undefined) return;
    setPageNumber(0);
  }, [searchTerm]);

  if (loading && pageNumber === 0) {
    return loadingSkeleton;
  }

  if (!role || !influencerRole) {
    return loadingSkeleton;
  }

  return (
    <InfiniteScroll
      dataLength={influencersToShow?.length ?? 0}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={hasMore && loadingSkeleton}
    >
      <div className="space-y-6">
        {influencersToShow && influencersToShow.length > 0 ? (
          influencersToShow.map((influencer: any) => (
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
                        {influencer?.category.map((category: any) => category.categoryName).join(', ')}
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
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      navigate(`/influencer/${influencer.id}`);
                    }}
                  >
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
    </InfiniteScroll>
  );
}
