import type { Campaign, UserDTO } from '../common/common.type';

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
