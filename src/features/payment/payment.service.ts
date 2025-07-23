import { baseApi } from '@/redux/baseApi';

import type { payOSRequest, payOSResponse, paypalRequest } from './payment.type';

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPayOS: builder.mutation<payOSResponse, payOSRequest>({
      query: (data) => ({
        url: '/order/create',
        method: 'POST',
        body: data,
      }),
    }),
    createPaypal: builder.mutation<{ redirectUrl: string }, paypalRequest>({
      query: (data) => ({
        url: '/pay',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});
export const { useCreatePayOSMutation, useCreatePaypalMutation } = paymentApi;
