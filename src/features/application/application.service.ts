import { baseApi } from '@/redux/baseApi';

import type { ApplicationBrandResponse, ApplicationByInfluencerResponse,ApplicationsRequest } from './application.type';

export const applicationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getApplicationsByBrand: builder.query<ApplicationBrandResponse, ApplicationsRequest>({
      query: (data) => ({
        url: '/campaigns/applications/brand',
        method: 'GET',
        params: data,
      }),
      providesTags: ['Auth'],
    }),
    getApplicationsByInfluencer: builder.query<ApplicationByInfluencerResponse, ApplicationsRequest>({
      query: (data) => ({
        url: '/campaigns/applications/influencer',
        method: 'GET',
        params: data,
      }),
      providesTags: ['Auth'],
    }),
  }),
});

export const { useGetApplicationsByBrandQuery, useGetApplicationsByInfluencerQuery } = applicationApi;
