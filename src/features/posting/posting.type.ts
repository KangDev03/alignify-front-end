import type { ApiReponseSuccess, Campaign } from '../common/common.type';

export interface CampaignPosting {
  campaignName: string;
  content: string;
  budget: number;
  influencerCountExpected: number;
  startAt: Date;
  dueAt: Date;
  influencerRequirements: string[];
  contentRequirements: { content: string; quantity: number }[];
  categoryIds?: string[];
}

export interface CampaignPostingRequest {
  formData: FormData;
}

export interface CampaignPostingResponse extends ApiReponseSuccess<Campaign> {
  data: Campaign;
}

export interface ContentPostingRequest {
  formData: FormData;
}

export interface ContentPostingResponse extends ApiReponseSuccess<null> {
  data: null;
}

export interface ContentPosting {
  contentName: string;
  content: string;
  categoryIds?: string[];
}
