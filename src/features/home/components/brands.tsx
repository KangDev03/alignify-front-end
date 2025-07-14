import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router';
import { AlertCircleIcon } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

import { Icons } from '@/components/icons/icons';
import type { Category } from '@/features/common/common.type';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import type { RootState } from '@/redux/store';

import {
  useGetBrandByCategoryQuery,
  useGetBrandProfilesQuery,
  useSearchBrandsQuery,
} from '../home.service';
import { addBrandProfile, resetBrandProfile, setBrandProfile, setRefetch } from '../home.slice';

interface BrandsProps {
  searchTerm: string | null;
  selectedCategoryId: string;
}

export default function Brands({ searchTerm, selectedCategoryId }: BrandsProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { role } = useAppSelector((state: RootState) => state.common);
  const { brand } = useAppSelector((state: RootState) => state.homeRefetch);
  const brandRole = role?.find((role) => role.roleName === 'BRAND');

  const { brandProfile } = useAppSelector((state: RootState) => state.home);

  const isAll = selectedCategoryId === 'all';
  const [pageNumber, setPageNumber] = useState(0);
  const pageSize = 10;

  const {
    data: allData,
    isLoading: isLoadingAll,
    refetch: refetchAll,
  } = useGetBrandProfilesQuery(
    { roleId: brandRole!.roleId, pageNumber, pageSize },
    { skip: !isAll },
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
  } = useGetBrandByCategoryQuery(
    { categoryId: selectedCategoryId, pageNumber, pageSize },
    { skip: isAll || isSearching },
  );
  const { data: searchResult, isLoading: isLoadingSearch } = useSearchBrandsQuery(
    isSearching
      ? { term: searchTerm!.trim(), pageNumber, pageSize }
      : { term: '', pageNumber, pageSize },
    { skip: !isSearching },
  );

  let isLoading: boolean | null = null;
  console.log(`Data: ${categoryData}`);
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
    brandProfile &&
    brandProfile.length === 0
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
        dispatch(setBrandProfile(searchResult));
      } else if (isAll && allData) {
        dispatch(setBrandProfile(allData));
      } else if (!isAll && categoryData) {
        dispatch(setBrandProfile(categoryData));
      } else {
        dispatch(resetBrandProfile());
      }
    }
  }, [searchResult, allData, categoryData, isAll, isSearching, pageNumber, dispatch, isLoading]);

  useEffect(() => {
    if (brand) {
      if (isAll) refetchAll();
      else refetchCategory();
      setPageNumber(0);
      dispatch(setRefetch({ key: 'brand', value: false }));
    }
  }, [brand, isAll, refetchAll, refetchCategory, dispatch]);

  useEffect(() => {
    if (pageNumber > 0) {
      const newBrands =
        isSearching && searchResult?.data?.length
          ? searchResult.data
          : isAll && allData?.data?.length
            ? allData.data
            : !isAll && categoryData?.data?.length
              ? categoryData.data
              : [];

      dispatch(
        addBrandProfile(
          newBrands.filter((brand) => !brandProfile.some((existing) => existing.id === brand.id)),
        ),
      );
    }
  }, [pageNumber, isSearching, searchResult, isAll, allData, categoryData, brandProfile, dispatch]);

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
        <AlertTitle>Không tìm thấy tài khoản Brand nào</AlertTitle>
      </Alert>
    );
  }

  return (
    <>
      <InfiniteScroll
        dataLength={brandProfile ? brandProfile?.length : 0}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={hasMore && loadingSkeleton}
      >
        <div className="space-y-4">
          {brandProfile && brandProfile.length > 0
            ? brandProfile.map((brand) => (
                <Card
                  key={brand.id}
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
                      <div className="flex-1 flex flex-col gap-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold">{brand.name}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">{brand.bio}</p>
                        {brand?.category && (
                          <div className="flex gap-1 text-sm text-muted-foreground capitalize">
                            {brand?.category.map((cat: Category, i) => (
                              <Badge key={cat.categoryId ?? i} variant="outline">
                                {cat.categoryName ?? cat}
                              </Badge>
                            ))}
                          </div>
                        )}
                        <div className="flex items-center space-x-4 mt-2 text-sm">
                          <div className="flex items-center space-x-1">
                            <Icons.building2 className="h-4 w-4" />
                            <span>{brand.totalCampaign} chiến dịch</span>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/brand/${brand.id}`)}
                      >
                        Xem hồ sơ
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            : brandProfile.length === 0 &&
              isLoading == null && (
                <Alert variant="default">
                  <AlertCircleIcon />
                  <AlertTitle>Không có tài khoản Brand nào</AlertTitle>
                  <AlertDescription>
                    Bạn có thể quay lại đây sau khi các tài khoản Brand xuất hiện.
                  </AlertDescription>
                </Alert>
              )}
          {!hasMore && brandProfile.length > 0 && (
            <Alert variant="default">
              <AlertCircleIcon />
              <AlertTitle>Không còn tài khoản Brand nào</AlertTitle>
              <AlertDescription>
                Bạn có thể quay lại đây sau khi các tài khoản Brand mới xuất hiện.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </InfiniteScroll>
      {brandProfile.length === 0 && !isLoading && (
        <Alert variant="default">
          <AlertCircleIcon />
          <AlertTitle>Không có tài khoản Brand nào</AlertTitle>
          <AlertDescription>
            Bạn có thể quay lại đây sau khi các tài khoản Brand xuất hiện.
          </AlertDescription>
        </Alert>
      )}
    </>
  );
}
