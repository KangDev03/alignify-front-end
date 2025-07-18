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
