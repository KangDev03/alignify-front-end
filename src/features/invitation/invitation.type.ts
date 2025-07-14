import type { ApiReponseSuccess, Campaign, Category, UserDTO } from '../common/common.type';
import type { SocialMedia } from '../setting/setting.type';

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

export interface RecommendInfluencer {
  userId: string;
  name: string;
  avatarUrl: string;
  DoB: string;
  gender: string;
  socialMediaLinks?: SocialMedia[];
  rating: number;
  categories: Category[];
  follower: number;
}

export interface RecommendInfluencersAssistantResponse
  extends ApiReponseSuccess<RecommendInfluencer[]> {
  data: RecommendInfluencer[];
}
