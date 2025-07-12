import { baseApi } from '@/redux/baseApi';

import type { InvitationsRequest } from './invitation.type';
import type { CampaignResponse } from '../my-campaign/campaign.type';

export const invitationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllRecruitingCampaign: builder.query<CampaignResponse, void>({
      query: () => ({
        url: '/campaigns/recruiting',
        method: 'GET',
      }),
    }),
    sendInvitations: builder.mutation<void, InvitationsRequest>({
      query: (data) => ({
        url: `/${data.campaignId}/invitations`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useGetAllRecruitingCampaignQuery, useSendInvitationsMutation } = invitationApi;
