import type { ApiReponseSuccess } from '../common/common.type';

export interface AssistantRequest {
  question: string;
}

export interface CampaignRecommendation {
  campaignId: string;
  brandName: string;
  brandAvatar: string;
  campaignName: string;
  imageUrl: string;
  categoryName: string[];
  reasonForMatch: string;
}

export interface AssistantMessage {
  id: string;
  roomId: string;
  senderId: string;
  senderType: 'USER' | 'ASSISTANT';
  messageType: 'TEXT' | 'CAMPAIGN_RECOMMENDATIONS';
  content: string;
  createdAt: string;
}

export interface AssistantMessageResponse extends ApiReponseSuccess<AssistantMessage[]> {
  data: AssistantMessage[];
}

export interface AssistantResponse {
  data: AssistantMessage[];
  responseStatus: string;
}
