import { baseApi } from '@/redux/baseApi';

import type { NotificationResponse } from './notification.type';
import type { CommonPageableRequest } from '../common/common.type';

const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllNotifications: builder.query<NotificationResponse, CommonPageableRequest>({
      query: (data) => ({
        url: '/notifications',
        method: 'GET',
        params: data,
      }),
      providesTags: ['Notification'],
    }),
  }),
});

export const { useGetAllNotificationsQuery } = notificationApi;
