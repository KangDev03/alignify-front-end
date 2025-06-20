import type { ApiReponseSuccess, Category } from '../common/common.type';

export interface Campaign {
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

export interface CampaignResponse {
  campaignId: string;
  brandName: string;
  campaignName: string;
  content: string;
  imageUrl: string;
  categories?: Category[] | [];
  status: string;
  budget: number;
  campaignRequirements: { [key: string]: number };
  influencerRequirements: string[];
  influencerCountExpected: number;
  influencerCountCurrent: number;
  influencerCount: number;
  applicationTotal: number;
  startAt: number[];
  dueAt: number[];
  createdAt: number[];
}

export interface CampaignPostingResponse extends ApiReponseSuccess<CampaignResponse> {
  data: CampaignResponse;
}

export interface ContentFormSchema {
  title: string;
  content: string;
  categoryIds?: string[];
}
