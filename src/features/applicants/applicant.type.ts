import type { ApplicationByInfluencer } from '../application/application.type';
import type { ApiReponseSuccess, Campaign } from '../common/common.type';

export interface ApplicantByBrand extends ApplicationByInfluencer {
  influencerName: string;
  avatarUrl?: string | null;
  follower?: number | 0;
  rating?: number | 0;
}

export interface ApplicantsByBrand {
  campaignResponse: Campaign;
  applications: ApplicantByBrand[];
}
export interface ApplicationByBrandResponse extends ApiReponseSuccess<ApplicantsByBrand[]> {
  data: ApplicantsByBrand[];
}

export interface SpecificApplicants {
  waiting: ApplicantByBrand[];
  accepted: ApplicantByBrand[];
  rejected: ApplicantByBrand[];
}

export type Status = 'PENDING' | 'ACCEPTED' | 'REJECTED';

export interface ConfirmApplicantRequest {
  applicationId: string;
  accepted: boolean;
}
