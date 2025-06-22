import { baseApi } from '@/redux/baseApi';

import type { ApplicationByInfluencerResponse } from './application.type';
import type { CommonPageableRequest } from '../common/common.type';

export const applicationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getApplicationsByInfluencer: builder.query<
      ApplicationByInfluencerResponse,
      CommonPageableRequest
    >({
      query: (data) => ({
        url: '/campaigns/applications/influencer',
        method: 'GET',
        params: data,
      }),
      providesTags: ['Application'],
    }),
  }),
});

export const { useGetApplicationsByInfluencerQuery } = applicationApi;
