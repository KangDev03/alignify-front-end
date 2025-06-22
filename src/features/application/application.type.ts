import type { ApiReponseSuccess } from '../common/common.type';

export interface ApplicationsRequest {
  pageNumber: number | 0;
  pageSize: number | 10;
}

export interface Campaign {
  campaignId: string;
  brandName: string;
  campaignName: string;
  content: string;
  imageUrl: string;
  categories?: Category[] | [];
  createdDate: number[];
  endDate: number[];
  status: string;
  budget: number;
  campaignRequirements: { [key: string]: number };
  influencerRequirements: string[];
  influencerCountExpected: number;
  influencerCountCurrent: number;
}

interface Category {
  categoryId: string;
  categoryName: string;
}

export interface ApplicationsByInfluencer {
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

export interface ApplicationByInfluencerResponse
  extends ApiReponseSuccess<ApplicationsByInfluencer[]> {
  data: ApplicationsByInfluencer[];
}
