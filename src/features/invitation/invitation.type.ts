import type { Campaign, UserDTO } from '../common/common.type';
import type { CampaignResponse } from '../my-campaign/campaign.type';

export interface InvitationResponse {
  invitationId: string;
  campaign: Campaign;
  user: UserDTO;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  createdAt: string;
  repliedAt?: string;
  message: string;
}

export interface InvitationsRequest {
  influencerIds: string[];
  campaignId: string;
  message: string;
}

export interface Invitation {
  invitationId: string;
  influencerId: string;
  user: UserDTO;
  campaign: CampaignResponse;
  message: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  createdAt: string;
}
