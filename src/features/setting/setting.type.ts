import type { ApiReponseSuccess } from '../common/common.type';

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
  passwordConfirm: string;
}
export interface SocialMedia {
  platform: string;
  url: string;
  follower: number;
}

export interface Contact {
  contact_type: string;
  contact_infor: string;
}
export interface InfluencerProfileRequest {
  name?: string;
  bio?: string;
  gender?: string;
  doB?: string;
  avatarUrl?: string;
  categoryIds?: string[];
  socialMediaLinks?: SocialMedia[];
  isPublic?: boolean;
}
export interface BrandProfileRequest {
  name?: string;
  bio?: string;
  contacts?: Contact[];
  socialMediaLinks?: SocialMedia[];
  establishDate?: string;
  avatarUrl?: string;
  categoryIds?: string[];
}
export interface ChangePasswordResponse extends ApiReponseSuccess<null> {
  data: null;
}

export interface UserStatsFromTiktok {
  videoCount: number;
  friendCount: number;
  diggCount: number;
  followerCount: number;
  followingCount: number;
  heartCount: number;
  heart: number;
}
export interface UserStatsFromTiktokResponse extends ApiReponseSuccess<UserStatsFromTiktok> {
  data: UserStatsFromTiktok;
}

export interface USerStatsFromYoutube {
  subcriber_count: number;
}
export interface UserStatsFromYoutubeResponse extends ApiReponseSuccess<USerStatsFromYoutube> {
  data: USerStatsFromYoutube;
}

export interface UserstatsFromMeta {
  followers: number;
}

export interface UserStatsFromMetaResponse extends ApiReponseSuccess<UserstatsFromMeta> {
  data: UserstatsFromMeta;
}
