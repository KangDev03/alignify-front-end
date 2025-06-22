import { baseApi } from '@/redux/baseApi';

import type { ChangePasswordRequest, ChangePasswordResponse } from './setting.type';

export const settingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    changePassword: builder.mutation<ChangePasswordResponse, ChangePasswordRequest>({
      query: (data) => ({
        url: '/auth/change-password',
        method: 'PUT',
        body: {
          oldPassword: data.oldPassword,
          newPassword: data.newPassword,
          passwordConfirm: data.passwordConfirm,
        },
      }),
      invalidatesTags: ['Auth'],
    }),
  }),
});

export const { useChangePasswordMutation } = settingApi;
