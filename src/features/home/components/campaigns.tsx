import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AlertCircleIcon } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

import { useGetCampaignByCategoryQuery } from '@/features/my-campaign/campaign.service';
import CampaignCard from '@/features/my-campaign/components/campaign-card';
import { useAppSelector } from '@/hooks/redux';

import { useGetCampaignsQuery } from '../home.service';
import { addCampaignPosting, setCampaignPosting, setRefetch } from '../home.slice';
import InfiniteScroll from "react-infinite-scroll-component";

interface CampaignsProps {
  selectedCategoryId: string;
}
export default function Campaigns({ selectedCategoryId }: CampaignsProps) {
  const dispatch = useDispatch();
  const { campaign } = useAppSelector((state) => state.homeRefetch);
  const { campaignPosting } = useAppSelector((state) => state.home);
  const isAll = selectedCategoryId === 'all';
  const [pageNumber, setPageNumber] = useState(0);
  const [isStopLoading, setStopLoading] = useState(false);
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
    },
  );

  useEffect(() => {
    if (isAll) {
      dispatch(setCampaignPosting(allData!));
    } else {
      dispatch(setCampaignPosting(categoryData!));
    }
  }, [allData, categoryData, dispatch, isAll]);

  useEffect(() => {
    if (campaign) {
      if (isAll) refetchAll();
      else refetchCategory();
      setStopLoading(false);
      setPageNumber(0);
      dispatch(setRefetch({ key: 'campaign', value: false }));
    }
  }, [campaign, dispatch, isAll, refetchAll, refetchCategory]);

  useEffect(() => {
    if (pageNumber > 0) {
      if (isAll && allData && allData.data && allData.data.campaigns && allData.data.campaigns.length > 0) {
        dispatch(addCampaignPosting(allData.data.campaigns));
      } else if (!isAll && categoryData && categoryData.data && categoryData.data.campaigns && categoryData.data.campaigns.length > 0) {
        dispatch(addCampaignPosting(categoryData.data.campaigns));
      } else {
        setStopLoading(true);
      }
    }
  }, [pageNumber, allData, categoryData, isAll, dispatch]);
  console.log(campaignPosting)
  const isLoading = isAll ? isLoadingAll : isLoadingCategory;
  // const campaigns = isAll ? allData?.data?.campaigns : categoryData?.data?.campaigns;

  const fetchMoreData = () => {
    if (isStopLoading) return;
    setPageNumber((prevPage) => prevPage + 1);
  }

  if (isLoading) {
    return (
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
  }

  return (
    campaignPosting && campaignPosting.length > 0 && (
      <InfiniteScroll
        dataLength={campaignPosting!.length}
        next={fetchMoreData}
        hasMore={true}
        loader={!isStopLoading && <h4 className='text-center'>Loading...</h4>}
      >
        <div className="space-y-6">
          {campaignPosting && campaignPosting.length > 0 ? (
            campaignPosting.map((campaign) => <CampaignCard key={campaign.campaignId} campaign={campaign} />)
          ) : (
            <Alert variant="default">
              <AlertCircleIcon />
              <AlertTitle>Không có chiến dịch nào được đăng</AlertTitle>
              <AlertDescription>
                Bạn có thể quay lại đây sau khi các chiến dịch xuất hiện.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </InfiniteScroll>)
  );
}
