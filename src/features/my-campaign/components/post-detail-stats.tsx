import { useEffect, useState } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { skipToken } from '@reduxjs/toolkit/query';

import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';

import { Icons } from '@/components/icons/icons';
import {
  type ISupportedPlatforms,
  type PostDetail,
  SupportedPostTypeByPlatform,
} from '@/features/common/common.type';
import { cn } from '@/lib/utils';

import type { ProcessUploadValues } from '../campaign.schema';
import { useGetStatsFromPostQuery } from '../campaign.service';
import type { PlatformRequirementTracking, PostDetailStats } from '../campaign.type';

type PostDetailProps = {
  form: UseFormReturn<ProcessUploadValues>;
  req: PlatformRequirementTracking;
  reqIndex: number;
  contentIndex: number;
};

function getPostIdFromUrl(platform: string, url: string): string {
  if (!url) return '';
  const p = platform.toLowerCase();
  if (p === 'instagram') {
    const storiesMatch = url.match(/\/stories\/[^/]+\/(\d+)/);
    if (storiesMatch) return storiesMatch[1].replace(/\/$/, '').trim();
    const match = url.match(/\/(?:reel|reels|p)\/([\w-]+)/);
    return match ? match[1].replace(/\/$/, '').trim() : '';
  }
  if (p === 'facebook') {
    // 1. /permalink/{id} (group post)
    const permalinkMatch = url.match(/\/permalink\/(\d+)/);
    if (permalinkMatch) return permalinkMatch[1];
    // 2. /posts/pfbid... (new FB post id)
    const postMatch = url.match(/\/posts\/(pfbid[\w]+)/i);
    if (postMatch) return postMatch[1];
    // 3. /watch/?v=...
    const watchMatch = url.match(/[?&]v=([\w-]+)/);
    if (watchMatch) return watchMatch[1];
    // 4. /videos/1234567890
    const videoMatch = url.match(/\/videos\/(\d+)/);
    if (videoMatch) return videoMatch[1];
    // 5. fallback: old share pattern
    const shareMatch = url.match(/\/share\/(?:p|v)\/([\w-]+)/);
    if (shareMatch) return shareMatch[1];
    return '';
  }
  if (p === 'youtube') {
    const match = url.match(/[?&]v=([\w-]+)/) || url.match(/youtu\.be\/([\w-]+)/);
    return match ? match[1].replace(/\/$/, '').trim() : '';
  }
  if (p === 'tiktok') {
    const match = url.match(/\/video\/(\d+)/);
    if (match) return match[1].replace(/\/$/, '').trim();
    const shortMatch = url.match(/tiktok\.com\/(?:[^/]+\/)*([\w-]+)\/?/);
    return shortMatch ? shortMatch[1].replace(/\/$/, '').trim() : '';
  }
  return '';
}

export default function PostDetailStats({ form, req, reqIndex, contentIndex }: PostDetailProps) {
  const [isChecked, setChecked] = useState<boolean>(
    req.details[contentIndex]?.postUrl !== undefined &&
      req.details[contentIndex]?.postUrl?.length > 0,
  );
  const platform = req.platform;
  const hasError =
    !!form.formState.errors.platformRequirement?.[reqIndex]?.details?.[contentIndex]?.postUrl;
  return (
    <div
      className="flex flex-col gap-2"
      key={`${req.platform}.${req.post_type}.${reqIndex}.details.${contentIndex}.index`}
    >
      <FormField
        control={form.control}
        name={`platformRequirement.${reqIndex}.details.${contentIndex}.postUrl`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Liên kết *</FormLabel>
            <FormControl>
              <div className="flex gap-2 items-center">
                <Input
                  readOnly={
                    req.details[contentIndex].status !== undefined &&
                    req.details[contentIndex].status !== null &&
                    req.details[contentIndex].status !== 'REJECTED'
                  }
                  disabled={
                    req.details[contentIndex].status !== undefined &&
                    req.details[contentIndex].status !== null &&
                    req.details[contentIndex].status !== 'REJECTED'
                  }
                  className="flex-1"
                  placeholder={`https://www.${platform.toLowerCase()}.com/${req.post_type}/..`}
                  {...field}
                  onChange={(e) => {
                    setChecked(false);
                    field.onChange(e.target.value);
                  }}
                />
                {(!req.details[contentIndex].status ||
                  req.details[contentIndex].status === 'REJECTED') &&
                  (!hasError && !field.value ? null : isChecked ? (
                    <Button
                      type="button"
                      variant={'destructive'}
                      onClick={() => {
                        setChecked(false);
                        field.onChange('');
                      }}
                    >
                      <Icons.x />
                    </Button>
                  ) : (
                    <Button type="button" variant={'outline'} onClick={() => setChecked(true)}>
                      <Icons.check />
                    </Button>
                  ))}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {!hasError &&
        form.watch(`platformRequirement.${reqIndex}.details.${contentIndex}.postUrl`) &&
        isChecked && (
          <Detail
            form={form}
            platform={platform}
            postId={getPostIdFromUrl(
              platform,
              form.watch(`platformRequirement.${reqIndex}.details.${contentIndex}.postUrl`)!,
            )}
            key={`${req.platform}.${req.post_type}.${reqIndex}.details.${contentIndex}.index`}
            contentIndex={contentIndex}
            req={req}
            reqIndex={reqIndex}
            postUrl={form.watch(`platformRequirement.${reqIndex}.details.${contentIndex}.postUrl`)!}
          />
        )}
    </div>
  );
}
interface DetailProps {
  platform: string;
  postId: string;
  req: PlatformRequirementTracking;
  reqIndex: number;
  contentIndex: number;
  form: UseFormReturn<ProcessUploadValues>;
  postUrl: string;
}

const Detail = ({ platform, postId, req, contentIndex, reqIndex, form, postUrl }: DetailProps) => {
  const [isSkipped, setSkipped] = useState<boolean>(
    req.details[contentIndex]?.postUrl !== undefined &&
      req.details[contentIndex]?.postUrl?.length > 0,
  );
  const {
    data: dataRaw,
    isLoading,
    isFetching,
    refetch,
    isSuccess,
    isError,
  } = useGetStatsFromPostQuery(
    isSkipped
      ? skipToken
      : {
          platform: platform.toLowerCase() as ISupportedPlatforms,
          postId: postId,
          contentIndex: contentIndex,
          reqIndex: reqIndex,
          post_type: req.post_type,
          postUrl: postUrl,
        },
    { refetchOnMountOrArgChange: true },
  );
  const loadingAnimate = isLoading || isFetching;
  const data = dataRaw?.data;

  return (
    <div
      className="flex-1 flex items-start border rounded-md justify-between px-3 py-2 text-sm font-semibold"
      key={`${req.platform}.${req.post_type}.${reqIndex}.details.${contentIndex}.index`}
    >
      {loadingAnimate ? (
        <Skeleton className="w-full">
          <div>
            <p className="w-24 h-5"></p>
            <span className="w-20 h-5"></span>
          </div>
          <div>
            <p className="w-24 h-5"></p>
            <span className="w-20 h-5"></span>
          </div>
        </Skeleton>
      ) : isError ? (
        <p className="text-destructive">Không tìm thấy bài đăng</p>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          <PostDetailsStatsFormField
            contentIndex={contentIndex}
            reqIndex={reqIndex}
            form={form}
            req={req}
            isError={isError}
            isSkipped={isSkipped}
            isSuccess={isSuccess}
            data={data}
          />
        </div>
      )}

      <Button
        type="button"
        onClick={() => {
          setSkipped(false);
          if (!isSkipped) refetch();
        }}
        variant={'ghost'}
        size={'icon'}
        key={`${req.platform}.${req.post_type}.${reqIndex}.details.${contentIndex}.index`}
      >
        <Icons.refreshCcw
          key={`${req.platform}.${req.post_type}.${reqIndex}.details.${contentIndex}.index`}
          className={cn('cursor-pointer w-fit stroke-2 size-5', loadingAnimate && 'animate-spin')}
        />
      </Button>
    </div>
  );
};
interface PostDetailsStatsFormFieldProps {
  req: PlatformRequirementTracking;
  form: UseFormReturn<ProcessUploadValues>;
  reqIndex: number;
  contentIndex: number;
  isSkipped: boolean;
  isSuccess: boolean;
  isError: boolean;
  data?: PostDetailStats;
}
const PostDetailsStatsFormField = ({
  req,
  form,
  reqIndex,
  contentIndex,
  isError,
  isSkipped,
  isSuccess,
  data,
}: PostDetailsStatsFormFieldProps) => {
  const platformKey = req.platform.toLowerCase() as keyof typeof SupportedPostTypeByPlatform;
  const postTypes = SupportedPostTypeByPlatform[platformKey];

  const postObj = postTypes.find((obj) => {
    return Object.keys(obj)[0] === req.post_type;
  });

  const posts = postObj ? postObj[req.post_type as keyof typeof postObj] : [];

  useEffect(() => {
    if (!isSkipped && (isSuccess || isError)) {
      form.setValue(
        `platformRequirement.${reqIndex}.details.${contentIndex}.like`,
        data?.like_count ?? 0,
        { shouldValidate: true },
      );
      form.setValue(
        `platformRequirement.${reqIndex}.details.${contentIndex}.share`,
        data?.share_count ?? 0,
        { shouldValidate: true },
      );
      form.setValue(
        `platformRequirement.${reqIndex}.details.${contentIndex}.comment`,
        data?.comment_count ?? 0,
        { shouldValidate: true },
      );
      form.setValue(
        `platformRequirement.${reqIndex}.details.${contentIndex}.view`,
        data?.view_count ?? 0,
        { shouldValidate: true },
      );
    }
  }, [isSkipped, isSuccess, isError, data, reqIndex, contentIndex, form]);
  return posts?.map((contentType, idx) => {
    let label = '';
    switch (contentType) {
      case 'view':
        label = 'Lượt xem ';
        break;
      case 'like':
        label = 'Lượt thích ';
        break;
      case 'comment':
        label = 'Lượt bình luận ';
        break;
      case 'share':
        label = 'Lượt chia sẻ ';
        break;
    }
    return (
      <FormField
        key={contentType + idx}
        control={form.control}
        name={`platformRequirement.${reqIndex}.details.${contentIndex}.${contentType as PostDetail}`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Input
                type="number"
                className="text-primary w-fit"
                {...field}
                value={
                  form.watch(
                    `platformRequirement.${reqIndex}.details.${contentIndex}.${contentType as PostDetail}`,
                  ) ?? 0
                }
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
                readOnly
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  });
};
