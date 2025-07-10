import { baseApi } from '@/redux/baseApi';

import type { PermissionBlockRequest, PermissionResponse } from './admin.type';

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
  }),
});

export const { useGetAllPermissionQuery, useBlockPermissionMutation } = adminApi;
