import type { ApiReponseSuccess, Campaign } from '../common/common.type';

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
  view: number;
}

export interface CampaignTrackingResponse extends ApiReponseSuccess<CampaignTracking> {
  data: CampaignTracking;
}

export interface PostDetail {
  platform: string;
  post_type: string;
  index: number;
  postUrl?: string;
  like: number;
  comment: number;
}

export interface PostDetailsSubmitData {
  postDetails: PostDetail[];
  campaignId: string;
  trackingId: string;
}

export interface StatsRequest {
  platform: string;
  postId: string;
  reqIndex: number;
  contentIndex: number;
  post_type: string;
  postUrl?: string;
}

export interface PostDetailStats {
  comment_count: number;
  share_count: number;
  view_count: number;
  play_count: number;
  like_count: number;
  created_at_utc: string;
  thumbnail_url: string;
  video_url: string;
}

export interface PostDetailStatsResponse extends ApiReponseSuccess<PostDetailStats> {
  data: PostDetailStats;
}
