import type { ApiReponseSuccess, Campaign } from '../common/common.type';

export interface CampaignRequest {
  pageNumber: number | 0;
  pageSize: number | 10;
}

export interface CampaignState {
  campaigns: Campaign[];
}
export interface CampaignResponse extends ApiReponseSuccess<CampaignState> {
  data: CampaignState;
}
