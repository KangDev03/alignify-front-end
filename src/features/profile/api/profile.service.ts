import { baseApi } from '@/redux/baseApi';

import type { InfluencerProfileResponse, ProfileRequest } from './profile.types';

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getInfluencerProfile: builder.query<InfluencerProfileResponse, ProfileRequest>({
      query: (data) => ({
        url: '/profiles/me',
        method: 'GET',
        params: data,
      }),
      providesTags: ['Profile'],
    }),
  }),
});
export const { useGetInfluencerProfileQuery } = profileApi;
