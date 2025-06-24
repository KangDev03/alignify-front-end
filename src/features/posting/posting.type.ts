import type { ApiReponseSuccess, Campaign } from '../common/common.type';
import type { ContentPosting } from '../home/home.type';

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

export interface ForumPosting {
  contentName: string;
  content: string;
  categoryIds?: string[];
}

export interface PostingRequest {
  formData: FormData;
}

export interface CampaignPostingResponse extends ApiReponseSuccess<Campaign> {
  data: Campaign;
}

export interface ForumPostingResponse extends ApiReponseSuccess<ContentPosting> {
  data: ContentPosting;
}
