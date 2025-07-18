import type { Campaign } from '@/features/common/common.type';
import { baseApi } from '@/redux/baseApi';

import type { PermissionBlockRequest, PermissionResponse, ReasonResponse } from './admin.type';

const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPermission: builder.query<PermissionResponse, void>({
      query: () => ({
        url: '/admins/permissions',
        method: 'GET',
      }),
    }),
    blockPermission: builder.mutation<void, PermissionBlockRequest>({
      query: (data) => ({
        url: `/admins/users/${data.userId}/${data.permissionId}`,
        method: 'POST',
        params: {
          block: data.block,
        },
      }),
    }),
    getAllReasonForBanned: builder.query<ReasonResponse, void>({
      query: () => ({
        url: '/reasons',
        method: 'GET',
      }),
    }),
    getCampaignById: builder.query<Campaign, string>({
      query: (campaignId) => ({
        url: `/campaigns/${campaignId}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetAllPermissionQuery,
  useBlockPermissionMutation,
  useGetAllReasonForBannedQuery,
  useGetCampaignByIdQuery,
} = adminApi;
