import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { Icons } from '@/components/icons/icons';
import { cn } from '@/lib/utils';

import {
  useGetFollowerCountFromFacebookQuery,
  useGetFollowerCountFromInstagramQuery,
  useGetFollowerCountFromTiktokQuery,
  useGetSubcriberCountFromYoutubeQuery,
} from '../setting.service';

interface FollowerInputProps extends React.ComponentProps<'input'> {
  url: string;
  follower: number;
  showRefetchComponent: boolean;
}

interface InputProps extends React.ComponentProps<'input'> {
  url: string;
  follower: number;
}

const FollowerInput = React.forwardRef<HTMLInputElement, FollowerInputProps>(
  ({ className, type, url, follower, showRefetchComponent = false, ...props }, ref) => {
    const [isChange, setIsChange] = useState<boolean>(showRefetchComponent);
    const youtubeMatch = url.match(/^https:\/\/www\.youtube\.com\/@([^/?]+)/);
    const tiktokMatch = url.match(/^https:\/\/www\.tiktok\.com\/@([^/?]+)/);
    const facebookMatch = url.match(/^https:\/\/www\.facebook\.com\/([^/?]+)/);
    const instagramMatch = url.match(/^https:\/\/www\.instagram\.com\/([^/?]+)/);

    const handleChangeComponent = () => {
      if (youtubeMatch && tiktokMatch && facebookMatch && instagramMatch) {
        toast.error('Not support this platform or URL');
      } else {
        setIsChange(true);
      }
    };

    return isChange ? (
      <InputWithRefetch
        {...props}
        className={cn(className)}
        data-slot="input"
        type={type}
        readOnly={true}
        follower={follower}
        url={url}
        ref={ref}
      />
    ) : (
      <div className="flex gap-2">
        <InputWithNoRefetch
          {...props}
          className={cn(className)}
          data-slot="input"
          type={type}
          readOnly={true}
          follower={follower}
          url={url}
          ref={ref}
        />
        <Button
          type="button"
          variant="ghost"
          className="rounded-full"
          size="icon"
          onClick={handleChangeComponent}
        >
          <Icons.refreshCcw />
        </Button>
      </div>
    );
  },
);
FollowerInput.displayName = 'FollowerInput';

export { FollowerInput };

const InputWithNoRefetch = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, follower, ...props }, ref) => {
    return (
      <Input
        {...props}
        className={cn(className)}
        data-slot="input"
        type={type}
        readOnly={true}
        value={follower ?? 0}
        ref={ref}
      />
    );
  },
);
InputWithNoRefetch.displayName = 'InputWithNoRefetch';

const InputWithRefetch = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, url, follower, ...props }, ref) => {
    let identify: string = '';
    const youtubeMatch = url.match(/^https:\/\/www\.youtube\.com\/@([^/?]+)/);
    const tiktokMatch = url.match(/^https:\/\/www\.tiktok\.com\/@([^/?]+)/);
    const facebookMatch = url.match(/^https:\/\/www\.facebook\.com\/([^/?]+)/);
    const instagramMatch = url.match(/^https:\/\/www\.instagram\.com\/([^/?]+)/);
    if (youtubeMatch) {
      identify = youtubeMatch[1];
    } else if (tiktokMatch) {
      identify = tiktokMatch[1];
    }
    if (facebookMatch) {
      identify = facebookMatch[1];
    }
    if (instagramMatch) {
      identify = instagramMatch[1];
    }

    const {
      data: youtubeData,
      refetch: youtubeRefetch,
      isLoading: isYoutubeLoading,
    } = useGetSubcriberCountFromYoutubeQuery(
      {
        channelName: identify,
      },
      { skip: !youtubeMatch },
    );
    const {
      data: tiktokData,
      refetch: tiktokRefetch,
      isLoading: isTiktokLoading,
    } = useGetFollowerCountFromTiktokQuery(
      {
        uniqueId: identify,
      },
      { skip: !tiktokMatch },
    );
    const {
      data: facebookData,
      refetch: facebookRefetch,
      isLoading: isFacebookLoading,
    } = useGetFollowerCountFromFacebookQuery({ pageName: identify }, { skip: !facebookMatch });
    const {
      data: instagramData,
      refetch: instagramRefetch,
      isLoading: isInstagramLoading,
    } = useGetFollowerCountFromInstagramQuery(
      { code_or_id_or_url: identify },
      { skip: !instagramMatch },
    );
    let currentFollower: number | undefined = follower;
    if (youtubeData) {
      currentFollower = youtubeData.data.subcriber_count;
    } else if (tiktokMatch) {
      currentFollower = tiktokData?.data.followerCount;
    } else if (facebookMatch) {
      currentFollower = facebookData?.data.followers;
    } else if (instagramMatch) {
      currentFollower = instagramData?.data.followers;
    }

    useEffect(() => {
      if (props.onChange) {
        props.onChange({
          target: { value: Number(currentFollower ?? 0) },
        } as any);
      }
      // eslint-disable-next-line
    }, [currentFollower]);

    const handleRefetch = () => {
      if (youtubeMatch) {
        if (youtubeData) youtubeRefetch();
        else toast.error('Bạn cần nhập URL hợp lệ trước khi tải lại thông tin mới!');
      } else if (tiktokMatch) {
        if (tiktokData) tiktokRefetch();
        else toast.error('Bạn cần nhập URL hợp lệ trước khi tải lại thông tin mới!');
      } else if (facebookMatch) {
        if (facebookData) facebookRefetch();
        else toast.error('Bạn cần nhập URL hợp lệ trước khi tải lại thông tin mới!');
      } else if (instagramMatch) {
        if (instagramData) instagramRefetch();
        else toast.error('Bạn cần nhập URL hợp lệ trước khi tải lại thông tin mới!');
      } else {
        toast.error('Bạn cần nhập URL hợp lệ trước khi tải lại thông tin mới!');
      }
    };

    const isLoading =
      (isYoutubeLoading || isTiktokLoading || isFacebookLoading || isInstagramLoading) ?? false;
    return (
      <div className="flex gap-2">
        <Input
          {...props}
          className={cn(className)}
          data-slot="input"
          type={type}
          readOnly={true}
          value={isLoading ? 'Loading...' : (currentFollower ?? 0)}
          ref={ref}
        />
        <Button
          type="button"
          variant="ghost"
          className="rounded-full"
          size="icon"
          onClick={handleRefetch}
        >
          <Icons.refreshCcw />
        </Button>
      </div>
    );
  },
);

InputWithRefetch.displayName = 'InputWithRefetch';
