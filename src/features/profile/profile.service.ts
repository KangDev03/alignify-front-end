import { baseApi } from '@/redux/baseApi';

import type { ChangeAvatarRequest, ChangeAvatarResponses } from './profile.type';

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    changeAvatar: builder.mutation<ChangeAvatarResponses, ChangeAvatarRequest>({
      query: ({ image }) => ({
        url: `/profiles/avatar`,
        method: 'POST',
        body: image,
      }),
      invalidatesTags: ['Auth'],
    }),
  }),
});
export const { useChangeAvatarMutation } = profileApi;
