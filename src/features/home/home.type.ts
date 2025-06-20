import type { ApiReponseSuccess, Category } from '../common/common.type';

export interface ProfileRequest {
  roleId: string;
}

export interface UserProfile {
  id: string;
  avatarUrl?: string | null;
  backgroundUrl?: string | null;
  name: string;
  bio?: string | null;
  socialMediaLinks?: { [key: string]: string } | null;
  category?: Category[] | null;
}

export interface BrandProfile extends UserProfile {
  contacts?: { [key: string]: string } | null;
  totalCampaign: number;
  establishDate?: Date | null;
}

export interface InfluencerProfile extends UserProfile {
  rating: number;
  follower: number;
  isPublic: boolean;
}

export interface BrandProfileResponse extends ApiReponseSuccess<BrandProfile[]> {
  data: BrandProfile[];
}

export interface InfluencerProfileResponse extends ApiReponseSuccess<InfluencerProfile[]> {
  data: InfluencerProfile[];
}
