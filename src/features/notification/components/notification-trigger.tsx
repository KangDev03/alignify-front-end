import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { Icons } from '@/components/icons/icons';
import { useAppDispatch } from '@/hooks/redux';
import type { RootState } from '@/redux/store';

import NotificationCard from './notification-card';
import { useGetAllNotificationsQuery } from '../notification.service';
import { setReceivedNotification } from '../notification.slice';

export default function NotificationTrigger() {
  const dispatch = useAppDispatch();
  const { data: rawData } = useGetAllNotificationsQuery({}, { refetchOnMountOrArgChange: true });
  useEffect(() => {
    dispatch(setReceivedNotification(rawData!));
  }, [dispatch, rawData]);
  const { received } = useSelector((state: RootState) => state.notification);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Icons.bell className="h-4 w-4" />
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs"></span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-3 pr-1 m-0 border-none rounded-2xl bg-card w-[350px] h-[400px]">
        <div className="overflow-auto scrollbar-thin h-[100%] pr-1">
          {received && received.length > 0 ? (
            received.map((notify, idx) => (
              <NotificationCard key={notify.notificationId ?? '' + idx} notification={notify} />
            ))
          ) : (
            <p className="text-sm px-4 py-3 text-center">Bạn chưa có thông báo mới nào</p>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
