import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { AlertCircleIcon } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

import { ForumPost } from '@/features/home/components/forum-post';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import type { RootState } from '@/redux/store';

import {
  useGetAllContentPostingQuery,
  useGetPostByCategoryQuery,
  useSearchForumContentQuery,
} from '../home.service';
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
  const { contentPosting }: { contentPosting: ContentPosting[] } = useAppSelector(
    (state) => state.home,
  );

  const isSearching = !!(searchTerm && searchTerm.trim() && searchTerm.length > 0);
  const isAll = selectedCategoryId === 'all';
  const pageSize = 10;
  const [pageNumber, setPageNumber] = useState(0);

  const {
    data: allData,
    isLoading: isLoadingAll,
    refetch: refetchAll,
  } = useGetAllContentPostingQuery(
    { pageNumber, pageSize },
    { refetchOnMountOrArgChange: true, skip: !isAll },
  );

  const {
    data: categoryData,
    isLoading: isLoadingCategory,
    refetch: refetchCategory,
  } = useGetPostByCategoryQuery(
    { categoryId: selectedCategoryId, pageNumber, pageSize },
    { refetchOnMountOrArgChange: true, skip: isAll },
  );
  const { data: searchResult, isLoading: isLoadingSearch } = useSearchForumContentQuery(
    isSearching
      ? { term: searchTerm!.trim(), pageNumber, pageSize }
      : { term: '', pageNumber, pageSize },
    { skip: !isSearching },
  );

  useEffect(() => {
    if (!searchTerm || !searchTerm.trim()) {
      setPageNumber(0);
    }
  }, [searchTerm]);

  let isLoading: boolean | null = null;
  if (isSearching) {
    isLoading = isLoadingSearch;
  } else if (isAll) {
    isLoading = isLoadingAll;
  } else {
    isLoading = isLoadingCategory;
  }

  if ((isLoadingAll || isLoadingCategory || isLoadingSearch) && contentPosting.length === 0) {
    isLoading = true;
  }

  const hasMore = isSearching
    ? (searchResult?.data?.length ?? 0) === pageSize
    : isAll
      ? (allData?.data?.length ?? 0) === pageSize
      : (categoryData?.data?.length ?? 0) === pageSize;

  useEffect(() => {
    if (pageNumber === 0 && !isLoading) {
      if (isSearching && searchResult) {
        dispatch(setContentPosting(searchResult));
      } else if (isAll && allData) {
        dispatch(setContentPosting(allData));
      } else if (!isAll && categoryData) {
        dispatch(setContentPosting(categoryData));
      } else {
        dispatch(resetContentPosting());
      }
    }
  }, [allData, categoryData, isAll, pageNumber, dispatch, isSearching, searchResult, isLoading]);

  useEffect(() => {
    if (forum) {
      if (isAll) refetchAll();
      else refetchCategory();
      setPageNumber(0);
      dispatch(setRefetch({ key: 'forum', value: false }));
    }
  }, [forum, isAll, refetchAll, refetchCategory, dispatch]);

  useEffect(() => {
    if (pageNumber > 0) {
      const newPosts =
        isSearching && searchResult?.data?.length
          ? searchResult.data
          : isAll && allData?.data?.length
            ? allData.data
            : !isAll && categoryData?.data?.length
              ? categoryData.data
              : [];

      dispatch(
        addContentPosting(
          newPosts.filter(
            (post: ContentPosting) =>
              !contentPosting.some((existing) => existing.contentId === post.contentId),
          ),
        ),
      );
    }
  }, [
    pageNumber,
    isSearching,
    searchResult,
    isAll,
    allData,
    categoryData,
    contentPosting,
    dispatch,
  ]);

  const fetchMoreData = () => {
    if (!hasMore) return;
    setPageNumber((prev) => prev + 1);
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
    (!searchResult || !searchResult.data || searchResult?.data.length === 0)
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
        dataLength={contentPosting.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={hasMore && loadingSkeletion}
      >
        <div className="space-y-6">
          {contentPosting.length > 0
            ? contentPosting.map((post) => <ForumPost key={post.contentId} contentPosting={post} />)
            : isLoading == null && (
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
    </>
  );
}
