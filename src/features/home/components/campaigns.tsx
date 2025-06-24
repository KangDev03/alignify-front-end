import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch } from 'react-redux';
import { AlertCircleIcon } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

import type { Campaign } from '@/features/common/common.type';
import { useGetCampaignByCategoryQuery } from '@/features/my-campaign/campaign.service';
import CampaignCard from '@/features/my-campaign/components/campaign-card';
import { useAppSelector } from '@/hooks/redux';

import { useGetCampaignsQuery, useSearchCampaignsQuery } from '../home.service';
import {
  addCampaignPosting,
  resetCampaignPosting,
  setCampaignPosting,
  setRefetch,
} from '../home.slice';

interface CampaignsProps {
  selectedCategoryId: string;
  searchTerm: string|null;
  activeTab: string;
}
export default function Campaigns({ selectedCategoryId, searchTerm, activeTab }: CampaignsProps) {
  const dispatch = useDispatch();
  const { campaign } = useAppSelector((state) => state.homeRefetch);
  const { campaignPosting }: { campaignPosting: Campaign[] } = useAppSelector(
    (state) => state.home,
  );
  const isAll = selectedCategoryId === 'all';
  const [pageNumber, setPageNumber] = useState(0);
  const {
    data: allData,
    isLoading: isLoadingAll,
    refetch: refetchAll,
  } = useGetCampaignsQuery(
    {
      pageNumber: pageNumber,
      pageSize: 10,
    },
    {
      skip: !isAll,
      refetchOnMountOrArgChange: true,
    },
  );

  const {
    data: categoryData,
    isLoading: isLoadingCategory,
    refetch: refetchCategory,
  } = useGetCampaignByCategoryQuery(
    {
      categoryId: selectedCategoryId,
      pageNumber: pageNumber,
      pageSize: 10,
    },
    {
      skip: isAll,
      refetchOnMountOrArgChange: true,
    },
  );

  // Gọi API tìm kiếm khi searchTerm thay đổi và tab là 'campaign'
  const shouldSearch = activeTab === 'campaign' && searchTerm && searchTerm.trim();
  const { data: searchResult } = useSearchCampaignsQuery(
    shouldSearch ? { term: searchTerm.trim() } : (false as any),
    { skip: !shouldSearch },
  );
  // Lưu kết quả tìm kiếm vào store khi có kết quả

  const isContainValue = isAll
    ? (allData?.data?.campaigns?.length ?? 0) > 0
    : (categoryData?.data?.campaigns?.length ?? 0) > 0;

  useEffect(() => {
    if (pageNumber === 0) {
      if (shouldSearch && searchResult) {
        dispatch(setCampaignPosting(searchResult));
      } else if (isAll && allData) {
        dispatch(setCampaignPosting(allData));
      } else if (!isAll && categoryData) {
        dispatch(setCampaignPosting(categoryData));
      } else {
        dispatch(resetCampaignPosting());
      }
    }
  }, [allData, categoryData, isAll, pageNumber, dispatch, shouldSearch, searchResult]);

  useEffect(() => {
    if (campaign) {
      if (isAll) refetchAll();
      else refetchCategory();
      setPageNumber(0);
      dispatch(setRefetch({ key: 'campaign', value: false }));
      // dispatch(resetCampaignPosting());
    }
  }, [campaign, isAll, refetchAll, refetchCategory, dispatch]);

  useEffect(() => {
    if (pageNumber > 0) {
      if (
        isAll &&
        allData &&
        allData.data &&
        allData.data.campaigns &&
        allData.data.campaigns.length > 0
      ) {
        dispatch(
          addCampaignPosting(
            allData.data.campaigns.filter(
              (cam) => !campaignPosting.some((existing) => existing.campaignId === cam.campaignId),
            ),
          ),
        );
      } else if (
        !isAll &&
        categoryData &&
        categoryData.data &&
        categoryData.data.campaigns &&
        categoryData.data.campaigns.length > 0
      ) {
        dispatch(
          addCampaignPosting(
            categoryData.data.campaigns.filter(
              (cam) => !campaignPosting.some((existing) => existing.campaignId === cam.campaignId),
            ),
          ),
        );
      }
    }
  }, [allData, categoryData, isAll, pageNumber, dispatch, campaignPosting]);

  const fetchMoreData = () => {
    if (!isContainValue) return;
    setPageNumber((prevPage) => prevPage + 1);
  };

  const loadingSkeletion = (
    <div className="space-y-6">
      <Card className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow pt-0">
        <div className="w-full h-64 relative">
          <Skeleton className="w-full h-full object-cover" />
        </div>
        <CardContent className="px-6 w-full">
          <div className="flex gap-3 mb-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="flex-1">
              <div className="flex flex-row items-center justify-between">
                <Skeleton className="h-6 w-100" />
                <Skeleton className="h-6 w-16 ml-2" />
              </div>
              <Skeleton className="h-4 w-40 mt-2" />
            </div>
          </div>
          <div className="flex items-start w-fit mb-4 h-12">
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="flex justify-between mb-4 text-sm">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-40" />
          </div>
          <div className="flex justify-center">
            <Skeleton className="h-8 w-full rounded" />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Ưu tiên hiển thị kết quả tìm kiếm nếu có
  const campaignsFromSearch = useAppSelector((state) => state.common.campaigns);

  let isLoading = null;

  if (isLoadingAll && isAll) {
    isLoading = true;
    return loadingSkeletion;
  } else if (isLoadingCategory && !isAll) {
    isLoading = true;
    return loadingSkeletion;
  } else if ((isLoadingAll || isLoadingCategory) && campaignPosting.length === 0) {
    isLoading = true;
    return loadingSkeletion;
  } else {
    isLoading = false;
  }

  return (
    <InfiniteScroll
      dataLength={
        shouldSearch && Array.isArray(campaignsFromSearch)
          ? campaignsFromSearch.length
          : campaignPosting.length
      }
      next={fetchMoreData}
      hasMore={isContainValue}
      loader={isContainValue && loadingSkeletion}
    >
      <div className="space-y-6">
        {shouldSearch && Array.isArray(campaignsFromSearch) && campaignsFromSearch.length > 0
          ? campaignsFromSearch.map((campaign) => (
              <CampaignCard key={campaign.campaignId} campaign={campaign} />
            ))
          : campaignPosting.length > 0
            ? campaignPosting.map((campaign) => (
                <CampaignCard key={campaign.campaignId} campaign={campaign} />
              ))
            : campaignPosting.length === 0 &&
              isLoading == null && (
                <Alert variant="default">
                  <AlertCircleIcon />
                  <AlertTitle>Không có chiến dịch nào được đăng</AlertTitle>
                  <AlertDescription>
                    Bạn có thể quay lại đây sau khi các chiến dịch xuất hiện.
                  </AlertDescription>
                </Alert>
              )}
        {!isContainValue && (
          <Alert variant="default">
            <AlertCircleIcon />
            <AlertTitle className="text-muted-foreground">
              Không có bài đăng chiến dịch mới nào
            </AlertTitle>
            <AlertDescription>
              Bạn có thể quay lại đây sau khi các chiến dịch mới xuất hiện.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </InfiniteScroll>
  );
}
