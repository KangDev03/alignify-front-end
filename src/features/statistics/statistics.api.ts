import { baseApi } from '@/redux/baseApi';

import type { BrandStatistics, InfluencerStatistics } from './statistics.type';


export const statisticsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBrandStatistics: builder.query<BrandStatistics, string>({
      query: (brandId) => ({
        url: `statistics/brand`,
        method: 'GET',
        params: {
          brandId,
        },
      }),
    }),
    getInfluencerStatistics: builder.query<InfluencerStatistics, string>({
      query: (influencerId) => ({
        url: `statistics/influencer`,
        method: 'GET',
        params: {
          influencerId,
        },
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetBrandStatisticsQuery,
  useGetInfluencerStatisticsQuery,
} = statisticsApi;
