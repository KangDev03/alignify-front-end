import { baseApi } from '@/redux/baseApi';

import type { BrandStatistics, InfluencerStatistics } from './statistics.type';


export const statisticsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBrandStatistics: builder.query<BrandStatistics, number>({
      query: (brandId) => `statistics/brand?brandId=${brandId}`,
    }),
    getInfluencerStatistics: builder.query<InfluencerStatistics, number>({
      query: (influencerId) => `statistics/influencer?influencerId=${influencerId}`,
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetBrandStatisticsQuery,
  useGetInfluencerStatisticsQuery,
} = statisticsApi;
