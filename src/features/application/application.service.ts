import { baseApi } from '@/redux/baseApi';

import type { ApplicationResponse } from './application.type';

export const applicationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getApplicationsByInfluencer: builder.query<ApplicationResponse, void>({
      query: () => ({
        url: '/campaigns/applications/influencer',
        method: 'GET',
      }),
      providesTags: ['Application'],
    }),
  }),
});

export const { useGetApplicationsByInfluencerQuery } = applicationApi;
