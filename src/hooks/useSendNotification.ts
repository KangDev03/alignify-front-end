import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { getStompClient } from '@/lib/stom-client';
import type { RootState } from '@/redux/store';

import { setNotificationSending } from '../features/notification/notification.slice';
import type { NotificationSending } from '../features/notification/notification.type';

export function useSendNotification() {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state: RootState) => state.auth);

  const sendNotification = useCallback(
    async (notification: NotificationSending) => {
      if (!notification.userId || !token) return;
      const stompClient = await getStompClient(token);
      if (stompClient) {
        stompClient.send(
          `/app/notify/${notification.userId}`,
          { Authorization: `Bearer ${token}` },
          JSON.stringify(notification),
        );
        dispatch(setNotificationSending(notification));
      }
    },
    [dispatch, token],
  );

  return sendNotification;
}
