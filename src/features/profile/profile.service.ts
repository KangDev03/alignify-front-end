import { baseApi } from '@/redux/baseApi';

import type { ChangeAvatarRequest, ChangeAvatarResponses } from './profile.type';

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    changeAvatar: builder.mutation<ChangeAvatarResponses, ChangeAvatarRequest>({
      query: ({ id, formData }) => ({
        url: `/profile/avatar/${id}`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Auth'],
    }),
  }),
});
export const { useChangeAvatarMutation } = profileApi;
