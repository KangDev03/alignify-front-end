import { baseApi } from '@/redux/baseApi';

import type { ApplicationResponse } from './application.type';
import type { CommonPageableRequest } from '../common/common.type';

export const applicationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getApplicationsByBrand: builder.query<ApplicationResponse, CommonPageableRequest>({
      query: (data) => ({
        url: '/campaigns/applications/brand',
        method: 'GET',
        params: data,
      }),
      providesTags: ['Auth'],
    }),
    getApplicationsByInfluencer: builder.query<ApplicationResponse, CommonPageableRequest>({
      query: (data) => ({
        url: '/campaigns/applications/influencer',
        method: 'GET',
        params: data,
      }),
      providesTags: ['Auth'],
    }),
  }),
});

export const { useGetApplicationsByBrandQuery, useGetApplicationsByInfluencerQuery } =
  applicationApi;
