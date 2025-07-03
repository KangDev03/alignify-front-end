import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { AlertCircleIcon } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

import { ForumPost } from '@/features/home/components/forum-post';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import type { RootState } from '@/redux/store';

import { useGetAllContentPostingQuery, useSearchForumContentQuery } from '../home.service';
import {
  addContentPosting,
  resetContentPosting,
  setContentPosting,
  setRefetch,
} from '../home.slice';
import type { ContentPosting } from '../home.type';

interface ForumProps {
  searchTerm: string | null;
  selectedCategoryId: string;
}

export default function Forum({ selectedCategoryId, searchTerm }: ForumProps) {
  const dispatch = useAppDispatch();
  const { forum } = useAppSelector((state: RootState) => state.homeRefetch);

  const isSearching = !!(searchTerm && searchTerm.trim() && searchTerm.length > 0);
  const pageSize = 10;
  const [pageNumber, setPageNumber] = useState(0);
  const { contentPosting }: { contentPosting: ContentPosting[] } = useAppSelector(
    (state) => state.home,
  );
  const isAll = selectedCategoryId === 'all';

  const {
    data: allData,
    isLoading: isLoadingAll,
    refetch: refetchAll,
  } = useGetAllContentPostingQuery(
    {
      pageNumber: pageNumber,
      pageSize: pageSize,
    },
    {
      refetchOnMountOrArgChange: true,
      skip: !isAll,
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

  const { data: searchResult, isLoading: isLoadingSearch } = useSearchForumContentQuery(
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
    // isLoading = isLoadingCategory;
  }
  if (
    (isLoadingAll ||
      // isLoadingCategory ||
      isLoadingSearch) &&
    contentPosting.length === 0
  ) {
    isLoading = true;
  }
  const hasMore = isSearching
    ? (searchResult?.data?.campaigns?.length ?? 0) === 10
    : isAll
      ? (allData?.data?.length ?? 0) === 10
      : false;
  // (categoryData?.data?.campaigns?.length ?? 0) === 10
  useEffect(() => {
    if (pageNumber === 0 && !isLoading) {
      if (isSearching && searchResult) {
        dispatch(setContentPosting(searchResult));
        // if (searchResult && searchResult.data && searchResult.data.campaigns) {
        //   dispatch(setCampaignPosting(searchResult));
        // } else {
        //   dispatch(resetCampaignPosting());
        // }
      } else if (isAll && allData) {
        dispatch(setContentPosting(allData));
        // } else if (!isAll && categoryData) {
        //   dispatch(setContentPosting(categoryData));
      } else {
        dispatch(resetContentPosting());
      }
    }
  }, [allData, isAll, pageNumber, dispatch, isSearching, searchResult, isLoading]);

  useEffect(() => {
    if (forum) {
      if (isAll) refetchAll();
      // else refetchCategory();
      setPageNumber(0);
      dispatch(setRefetch({ key: 'campaign', value: false }));
      // dispatch(resetCampaignPosting());
    }
  }, [forum, isAll, refetchAll, dispatch]);

  useEffect(() => {
    if (pageNumber > 0) {
      if (isAll && allData && allData.data && allData.data && allData.data.length > 0) {
        dispatch(
          addContentPosting(
            allData.data.filter(
              (cam: ContentPosting) =>
                !contentPosting.some((existing) => existing.contentId === cam.contentId),
            ),
          ),
        );
        // } else if (
        //   !isAll &&
        //   categoryData &&
        //   categoryData.data &&
        //   categoryData.data.campaigns &&
        //   categoryData.data.campaigns.length > 0
        // ) {
        //   dispatch(
        //     addCampaignPosting(
        //       categoryData.data.campaigns.filter(
        //         (cam) => !campaignPosting.some((existing) => existing.campaignId === cam.campaignId),
        //       ),
        //     ),
        //   );
      } else if (
        isSearching &&
        searchResult &&
        searchResult.data &&
        searchResult.data.campaigns &&
        searchResult.data.campaigns.length > 0
      ) {
        dispatch(
          addContentPosting(
            searchResult.data.campaigns.filter(
              (cam: ContentPosting) =>
                !contentPosting.some((existing) => existing.contentId === cam.contentId),
            ),
          ),
        );
      }
    }
  }, [
    allData,
    // categoryData,
    isAll,
    pageNumber,
    dispatch,
    contentPosting,
    isSearching,
    searchResult,
  ]);
  const fetchMoreData = () => {
    if (!hasMore) return;
    setPageNumber((prevPage) => prevPage + 1);
  };

  const loadingSkeletion = (
    <div className="space-y-6">
      <Card className="border-2 border-primary/20 bg-card shadow-lg hover:shadow-xl transition-all">
        <CardContent>
          <div className="flex items-start space-x-3">
            <Skeleton className="h-10 w-10 rounded-full bg-border" />
            <div className="flex-1 space-y-2">
              <div className="flex items-center space-x-2">
                <Skeleton className="h-4 w-24 bg-border" />
                <Skeleton className="h-4 w-8 bg-border" />
                <Skeleton className="h-4 w-16 bg-border" />
              </div>
              <Skeleton className="h-5 w-40 bg-border" />
              <Skeleton className="h-4 w-full bg-border" />
              <div className="flex items-center space-x-6 mt-3">
                <Skeleton className="h-4 w-10 bg-border" />
                <Skeleton className="h-4 w-10 bg-border" />
                <Skeleton className="h-4 w-10 bg-border" />
                <Skeleton className="h-5 w-24 rounded bg-border" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
  if (isLoading) return loadingSkeletion;

  if (
    !isLoading &&
    isSearching &&
    (!searchResult || !searchResult.data || searchResult?.data.length == 0)
  ) {
    return (
      <Alert variant="default">
        <AlertCircleIcon />
        <AlertTitle>Không tìm thấy bài đăng nào</AlertTitle>
      </Alert>
    );
  }

  return (
    <>
      <InfiniteScroll
        dataLength={contentPosting ? contentPosting.length : 0}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={hasMore && loadingSkeletion}
      >
        <div className="space-y-6">
          {contentPosting.length > 0
            ? contentPosting.map((post) => <ForumPost key={post.contentId} contentPosting={post} />)
            : contentPosting.length === 0 &&
              isLoading == null && (
                <Alert variant="default">
                  <AlertCircleIcon />
                  <AlertTitle>Không có bài đăng nào trong Forum</AlertTitle>
                  <AlertDescription>
                    Bạn có thể quay lại đây sau khi các bài đăng trong Forum xuất hiện.
                  </AlertDescription>
                </Alert>
              )}
          {!hasMore && contentPosting.length > 0 && (
            <Alert variant="default">
              <AlertCircleIcon />
              <AlertTitle>Không còn bài đăng nào trong Forum</AlertTitle>
              <AlertDescription>
                Bạn có thể quay lại đây sau khi các bài đăng mới xuất hiện.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </InfiniteScroll>
      {contentPosting.length === 0 && !isLoading && (
        <Alert variant="default">
          <AlertCircleIcon />
          <AlertTitle>Không có bài đăng nào trong Forum</AlertTitle>
          <AlertDescription>
            Bạn có thể quay lại đây sau khi các bài đăng trong Forum xuất hiện.
          </AlertDescription>
        </Alert>
      )}
    </>
  );
}
