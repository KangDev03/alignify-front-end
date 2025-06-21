import { baseApi } from '@/redux/baseApi';

import type { BrandProfileResponse, InfluencerProfileResponse, ProfileRequest } from './home.type';

export const getProfileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBrandProfiles: builder.query<BrandProfileResponse, ProfileRequest>({
      query: (param) => ({
        url: '/profiles',
        method: 'GET',
        params: { roleId: param.roleId },
      }),
      providesTags: ['Home'],
    }),
    getInfluencerProfiles: builder.query<InfluencerProfileResponse, ProfileRequest>({
      query: (param) => ({
        url: '/profiles',
        method: 'GET',
        params: { roleId: param.roleId },
      }),
      providesTags: ['Home'],
    }),
  }),
});

export const { useGetBrandProfilesQuery, useGetInfluencerProfilesQuery } = getProfileApi;
