import { baseApi } from '@/redux/baseApi';

import type { BrandProfileResponse, InfluencerProfileResponse } from './profile.types';

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfileUser: builder.query<InfluencerProfileResponse | BrandProfileResponse, void>({
      query: () => ({
        url: '/profiles/me',
        method: 'GET',
      }),
      // transformResponse: (response: any, meta, arg: ProfileRequest) => {
      //   if (arg.roleId === 'INFLUENCER') {
      //     return response as InfluencerProfileResponse;
      //   } else if (arg.roleId === 'BRAND') {
      //     return response as BrandProfileResponse;
      //   } else {
      //     throw new Error('Unknown roleId');
      //   }
      // },
      providesTags: ['Profile'],
    }),
  }),
});
export const { useGetProfileUserQuery } = profileApi;
