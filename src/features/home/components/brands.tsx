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

import { useGetBrandProfilesQuery, useSearchBrandsQuery } from '../home.service';
import { setRefetch } from '../home.slice';

interface BrandsProps {
  searchTerm: string | null;
}

export default function Brands({ searchTerm }: BrandsProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { role } = useAppSelector((state: RootState) => state.common);
  const { brand } = useAppSelector((state: RootState) => state.homeRefetch);
  const brandRole = role?.find((role) => role.roleName === 'BRAND');

  // Xác định có đang search hay không
  const isSearching = !!(searchTerm && searchTerm.trim() && searchTerm.length > 0);

  // Infinite scroll và skeleton loading tương tự campaigns
  const [pageNumber, setPageNumber] = useState(0);
  const pageSize = 10;

  // Gọi API search hoặc get all với phân trang
  const {
    data: profiles,
    isLoading,
    refetch,
  } = useGetBrandProfilesQuery(
    { roleId: brandRole!.roleId, pageNumber, pageSize },
    { refetchOnMountOrArgChange: true, skip: isSearching }
  );

  const { data: searchResult, isLoading: isLoadingSearch } = useSearchBrandsQuery(
    isSearching
      ? { term: searchTerm!.trim(), pageNumber, pageSize }
      : { term: '', pageNumber, pageSize },
    { skip: !isSearching }
  );

  // Xác định hasMore
  const hasMore = isSearching
    ? (searchResult?.data?.brands?.length ?? 0) === pageSize
    : (profiles?.data?.length ?? 0) === pageSize;

  // Fetch more data
  const fetchMoreData = () => {
    if (!hasMore) return;
    setPageNumber((prev) => prev + 1);
  };

  // Skeleton loading
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

  // Kết quả hiển thị (ưu tiên search, phân trang)
  const brandsToShow = isSearching
    ? searchResult?.data?.brands ?? []
    : profiles?.data;
  const loading = isSearching ? isLoadingSearch : isLoading;

  useEffect(() => {
    if (brand && !isSearching) {
      refetch();
      dispatch(setRefetch({ key: 'brand', value: false }));
    }
  }, [brand, dispatch, refetch, isSearching]);

  // Reset pageNumber về 0 mỗi khi searchTerm thay đổi
  useEffect(() => {
    // Nếu searchTerm là undefined/null/empty thì không làm gì
    if (searchTerm === undefined) return;
    setPageNumber(0);
  }, [searchTerm]);

  if (loading && pageNumber === 0) {
    return loadingSkeleton;
  }

  // Nếu chưa có role hoặc brandRole thì chỉ render skeleton, không gọi query
  if (!role || !brandRole) {
    return loadingSkeleton;
  }

  return (
    <InfiniteScroll
      dataLength={brandsToShow?.length ?? 0}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={hasMore && loadingSkeleton}
    >
      <div className="space-y-4">
        {brandsToShow && brandsToShow.length > 0 ? (
          brandsToShow.map((brand: any, idx: number) => (
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
                    </div>
                    <p className="text-sm text-muted-foreground">{brand.bio}</p>
                    <div className="flex items-center space-x-4 mt-2 text-sm">
                      <div className="flex items-center space-x-1">
                        <Icons.building2 className="h-4 w-4" />
                        <span>{brand.totalCampaign} chiến dịch</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => navigate(`/brand/${brand.id}`)}>
                    Xem hồ sơ
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          console.log('No brand profiles found')
          // <Alert variant="default">
          //   <AlertCircleIcon />
          //   <AlertTitle>Không có tài khoản Brand nào</AlertTitle>
          //   <AlertDescription>
          //     Bạn có thể quay lại đây sau khi các tài khoản Brand xuất hiện.
          //   </AlertDescription>
          // </Alert>
        )}
        {!hasMore && (
          <Alert variant="default">
            <AlertCircleIcon />
            <AlertTitle className="text-muted-foreground">
              Không có brand mới nào
            </AlertTitle>
            <AlertDescription>
              Bạn có thể quay lại đây sau khi các brand mới xuất hiện.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </InfiniteScroll>
  );
}
