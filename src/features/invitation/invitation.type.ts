import type { ApiReponseSuccess, Campaign, UserDTO } from '../common/common.type';

export interface InvitationsRequest {
  influencerIds: string[];
  campaignId: string;
  message: string;
}

export interface Invitation {
  invitationId: string;
  influencerId: string;
  user: UserDTO;
  campaign: Campaign;
  message: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  createdAt: string;
}

export interface InvitationResponse extends ApiReponseSuccess<Invitation[]> {
  data: Invitation[];
}

export interface ConfirmInvitationsRequest {
  campaignId: string;
  invitationId: string;
  accepted: boolean;
}
