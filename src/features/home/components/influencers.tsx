import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router';
import { AlertCircleIcon } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

import { Icons } from '@/components/icons/icons';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import type { RootState } from '@/redux/store';
import { formatNumber } from '@/utils/format';

import {
  useGetInfluencerByCategoryQuery,
  useGetInfluencerProfilesQuery,
  useSearchInfluencersQuery,
} from '../home.service';
import {
  addInfluencerProfile,
  resetInfluencerProfile,
  setInfluencerProfile,
  setRefetch,
} from '../home.slice';

interface InfluencersProps {
  searchTerm: string | null;
  selectedCategoryId: string;
}

export default function Influencers({ selectedCategoryId, searchTerm }: InfluencersProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { role } = useAppSelector((state: RootState) => state.common);
  const { influencer } = useAppSelector((state: RootState) => state.homeRefetch);
  const { influencerProfile } = useAppSelector((state: RootState) => state.home);
  const isAll = selectedCategoryId === 'all';
  const influencerRole = role?.find((role) => role.roleName === 'INFLUENCER');

  const [pageNumber, setPageNumber] = useState(0);
  const pageSize = 10;

  const {
    data: allData,
    isLoading: isLoadingAll,
    refetch: refetchAll,
  } = useGetInfluencerProfilesQuery(
    { roleId: influencerRole!.roleId, pageNumber, pageSize },
    {
      skip: !isAll,
      refetchOnMountOrArgChange: true,
    },
  );

  useEffect(() => {
    if (
      !searchTerm ||
      !searchTerm.trim() ||
      searchTerm.trim().length === 0 ||
      searchTerm.trim() === ''
    ) {
      setPageNumber(0);
    }
  }, [searchTerm]);

  const isSearching = searchTerm && searchTerm.trim() && searchTerm.length > 0 ? true : false;
  const {
    data: categoryData,
    isLoading: isLoadingCategory,
    refetch: refetchCategory,
  } = useGetInfluencerByCategoryQuery(
    { categoryId: selectedCategoryId, pageNumber, pageSize },
    { skip: isAll || isSearching },
  );

  const { data: searchResult, isLoading: isLoadingSearch } = useSearchInfluencersQuery(
    isSearching
      ? { term: searchTerm!.trim(), pageNumber, pageSize }
      : { term: '', pageNumber, pageSize },
    { skip: !isSearching },
  );
  let isLoading: boolean | null = null;

  if (isSearching) {
    isLoading = isLoadingSearch;
  } else if (isAll) {
    isLoading = isLoadingAll;
  } else {
    isLoading = isLoadingCategory;
  }

  if (
    (isLoadingAll ||
      // isLoadingCategory ||
      isLoadingSearch) &&
    influencerProfile &&
    influencerProfile.length === 0
  ) {
    isLoading = false;
  }

  const hasMore = isSearching
    ? (searchResult?.data?.length ?? 0) === pageSize
    : isAll
      ? (allData?.data?.length ?? 0) === pageSize
      : (categoryData?.data?.length ?? 0) === pageSize;

  useEffect(() => {
    if (pageNumber === 0 && !isLoading) {
      if (isSearching && searchResult) {
        dispatch(setInfluencerProfile(searchResult));
      } else if (isAll && allData) {
        dispatch(setInfluencerProfile(allData));
      } else if (!isAll && categoryData) {
        dispatch(setInfluencerProfile(categoryData));
      } else {
        dispatch(resetInfluencerProfile());
      }
    }
  }, [allData, isAll, pageNumber, dispatch, isSearching, searchResult, isLoading, categoryData]);

  useEffect(() => {
    if (influencer) {
      if (isAll) refetchAll();
      else refetchCategory();
      setPageNumber(0);
      dispatch(setRefetch({ key: 'influencer', value: false }));
    }
  }, [influencer, isAll, refetchAll, refetchCategory, dispatch]);

  useEffect(() => {
    if (pageNumber > 0) {
      const newInfluencers =
        isSearching && searchResult?.data?.length
          ? searchResult.data
          : isAll && allData?.data?.length
            ? allData.data
            : !isAll && categoryData?.data?.length
              ? categoryData.data
              : [];

      dispatch(
        addInfluencerProfile(
          newInfluencers.filter(
            (influencer) => !influencerProfile.some((existing) => existing.id === influencer.id),
          ),
        ),
      );
    }
  }, [
    allData,
    isAll,
    pageNumber,
    dispatch,
    influencerProfile,
    isSearching,
    searchResult,
    categoryData?.data,
  ]);

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

  if (isLoading) return loadingSkeleton;

  if (
    !isLoading &&
    isSearching &&
    (!searchResult || !searchResult.data || searchResult?.data.length == 0)
  ) {
    return (
      <Alert variant="default">
        <AlertCircleIcon />
        <AlertTitle>Không tìm thấy tài khoản Influencer nào</AlertTitle>
      </Alert>
    );
  }

  return (
    <>
      <InfiniteScroll
        dataLength={influencerProfile ? influencerProfile.length : 0}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={hasMore && loadingSkeleton}
      >
        <div className="space-y-6">
          {influencerProfile.length > 0
            ? influencerProfile.map((influencer) => (
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
                            {influencer?.category
                              .map((category: any) => category.categoryName)
                              .join(', ')}
                          </p>
                        )}
                        <div className="flex items-center space-x-4 mt-2 text-sm">
                          <div className="flex items-center space-x-1">
                            <Icons.users className="h-4 w-4" />
                            <span>{formatNumber(influencer.follower ?? 0)} followers</span>
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
            : influencerProfile.length === 0 &&
              isLoading == null && (
                <Alert variant="default">
                  <AlertCircleIcon />
                  <AlertTitle>Không có tài khoản Influencer nào</AlertTitle>
                  <AlertDescription>
                    Bạn có thể quay lại đây sau khi các tài khoản Influencer xuất hiện.
                  </AlertDescription>
                </Alert>
              )}
          {!hasMore && influencerProfile.length > 0 && (
            <Alert variant="default">
              <AlertCircleIcon />
              <AlertTitle>Không còn tài khoản Influencer nào</AlertTitle>
              <AlertDescription>
                Bạn có thể quay lại đây sau khi các tài khoản Influencer mới xuất hiện.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </InfiniteScroll>
      {influencerProfile.length === 0 && !isLoading && (
        <Alert variant="default">
          <AlertCircleIcon />
          <AlertTitle>Không có tài khoản Influencer nào</AlertTitle>
          <AlertDescription>
            Bạn có thể quay lại đây sau khi các tài khoản Influencer xuất hiện.
          </AlertDescription>
        </Alert>
      )}
    </>
  );
}
