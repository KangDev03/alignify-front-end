import type { ApiReponseSuccess, Campaign, ISupportedPlatforms } from '../common/common.type';

export interface CampaignState {
  campaigns: Campaign[];
}
export interface CampaignResponse extends ApiReponseSuccess<CampaignState> {
  data: CampaignState;
}

export interface ContractSubmitData {
  campaignId: string;
  contract: FormData;
}

export interface OneCampaignResponse extends ApiReponseSuccess<Campaign> {
  data: Campaign;
}

export interface CampaignTracking {
  campaignTrackingId: string;
  campaignId: string;
  brandId: string;
  influencerId: string;
  platformRequirementTracking: PlatformRequirementTracking[];
  process: number;
  status: string;
  createdAt: string;
}

export interface PlatformRequirementTracking {
  platform: string;
  post_type: string;
  quantity: number;
  details: PlatformRequirementDetailTracking[];
}
export interface PlatformRequirementDetailTracking {
  postUrl: string;
  status: string;
  uploadedAt: string;
  post_type: string;
  like: number;
  comment: number;
  share: number;
}

export interface CampaignTrackingResponse extends ApiReponseSuccess<CampaignTracking> {
  data: CampaignTracking;
}

export interface PostDetail {
  platform: string;
  post_type: string;
  index: number;
  postUrl?: string;
}

export interface PostDetailsSubmitData {
  postDetails: PostDetail[];
  campaignId: string;
  trackingId: string;
}

export interface StatsRequest {
  platform: ISupportedPlatforms;
  postId: string;
}
