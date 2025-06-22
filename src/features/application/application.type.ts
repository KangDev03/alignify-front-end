import type { ApiReponseSuccess, Campaign } from '../common/common.type';

interface ApplicationsByCampaginResponse {
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
  createdAt: number[];
}
export interface ApplicationResponse extends ApiReponseSuccess<ApplicationsByCampaginResponse[]> {
  data: ApplicationsByCampaginResponse[];
}
