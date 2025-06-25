import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { getStompClient } from '@/lib/stom-client';
import type { RootState } from '@/redux/store';

import { setNotificationSending } from './notification.slice';
import type { NotificationSending } from './notification.type';

export function useSendNotification() {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state: RootState) => state.auth);

  const sendNotification = useCallback(
    async (notification: NotificationSending) => {
      if (!notification.userId || !token) return;
      const stompClient = await getStompClient(token);
      if (stompClient) {
        stompClient.send(`/app/notify/${notification.userId}`, {}, JSON.stringify(notification));
        dispatch(setNotificationSending(notification));
      }
    },
    [dispatch, token],
  );

  return sendNotification;
}
