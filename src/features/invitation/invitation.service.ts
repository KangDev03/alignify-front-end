import { baseApi } from '@/redux/baseApi';

import type {
  ConfirmInvitationsRequest,
  InfluencersAssistantRequest,
  InvitationResponse,
  InvitationsRequest,
  RecommendInfluencersAssistantResponse,
} from './invitation.type';
import type { CampaignResponse } from '../my-campaign/campaign.type';

export const invitationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllRecruitingCampaign: builder.query<CampaignResponse, void>({
      query: () => ({
        url: '/campaigns/recruiting',
        method: 'GET',
      }),
    }),
    getInfluencersForInvitation: builder.query<
      RecommendInfluencersAssistantResponse,
      InfluencersAssistantRequest
    >({
      query: (data) => ({
        url: data.assistant
          ? `/assistant/campaigns/${data.campaignId}/influencers`
          : '/campaigns/invitations/influencers',
        method: 'GET',
        params: data.assistant
          ? undefined
          : { pageSize: data.pageSize, pageNumber: data.pageNumber },
      }),
      providesTags: ['Home'],
    }),
    sendInvitations: builder.mutation<void, InvitationsRequest>({
      query: (data) => ({
        url: `/campaigns/${data.campaignId}/invitations`,
        method: 'POST',
        body: data,
      }),
    }),
    getAllInvitations: builder.query<InvitationResponse, { roleName: string }>({
      query: (data) => ({
        url: `/invitations/${data.roleName.toLowerCase()}`,
        method: 'GET',
      }),
    }),
    confirmInvitation: builder.mutation<void, ConfirmInvitationsRequest>({
      query: (data) => ({
        url: `/campaigns/${data.campaignId}/invitations/${data.invitationId}/confirm`,
        method: 'POST',
        params: { accepted: data.accepted },
      }),
    }),
    getRecommendInfluencers: builder.query<
      RecommendInfluencersAssistantResponse,
      { campaignId: string }
    >({
      query: (data) => ({
        url: `/assistant/campaigns/${data.campaignId}/influencers`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetAllRecruitingCampaignQuery,
  useSendInvitationsMutation,
  useGetAllInvitationsQuery,
  useConfirmInvitationMutation,
  useGetInfluencersForInvitationQuery,
} = invitationApi;
