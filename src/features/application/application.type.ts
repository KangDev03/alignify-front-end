import type { ApiReponseSuccess, Campaign } from '../common/common.type';

export interface ApplicationsByCampaginResponse {
  campaignResponse: Campaign;
  applications: ApplicationByInfluencer[];
}

export interface ApplicationByInfluencer {
  applicationId: string;
  campaignId: string;
  influencerId: string;
  brandId: string;
  limited: number;
  status: string;
  createdAt: string;
  cv_url: string;
}
export interface ApplicationResponse extends ApiReponseSuccess<ApplicationsByCampaginResponse[]> {
  data: ApplicationsByCampaginResponse[];
}

export interface ApplicationSubmitData {
  campaignId: string;
  CV: FormData;
}
