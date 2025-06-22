import { baseApi } from '@/redux/baseApi';

import type { ApplicationResponse } from './application.type';
import type { CommonPageableRequest } from '../common/common.type';

export const applicationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getApplicationsByInfluencer: builder.query<ApplicationResponse, CommonPageableRequest>({
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
