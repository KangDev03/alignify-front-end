import { baseApi } from '@/redux/baseApi';

import type { BrandProfileResponse, InfluencerProfileResponse, ProfileRequest } from './home.type';

export const getProfileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBrandProfiles: builder.query<BrandProfileResponse, ProfileRequest>({
      query: (param) => ({
        url: '/profiles',
        method: 'GET',
        params: { roleId: param.roleId, pageSize: param.pageSize, pageNumber: param.pageNumber },
      }),
      providesTags: ['Home'],
    }),
    getInfluencerProfiles: builder.query<InfluencerProfileResponse, ProfileRequest>({
      query: (param) => ({
        url: '/profiles',
        method: 'GET',
        params: { roleId: param.roleId, pageSize: param.pageSize, pageNumber: param.pageNumber },
      }),
      providesTags: ['Home'],
    }),
    getCampaigns: builder.query<CampaignResponse, CommonPageableRequest>({
      query: (param) => ({
        url: '/campaigns',
        method: 'GET',
        params: param,
      }),
      providesTags: ['Home'],
    }),
  }),
});

export const { useGetBrandProfilesQuery, useGetInfluencerProfilesQuery } = getProfileApi;
