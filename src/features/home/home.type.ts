import type { ApiReponseSuccess, Category, CommonPageableRequest } from '../common/common.type';

export type homeTab = 'campaign' | 'brand' | 'influencer' | 'forum';

export interface ProfileRequest extends CommonPageableRequest {
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

export interface Comment {
  commentId?: string;
  userId: string;
  contentId: string;
  content: string;
  createdDate: string;
  avatarUrl?: string;
  name?: string;
  count?: number
}

export interface ContentPosting {
  contentId: string;
  contentName: string;
  userId: string;
  userName: string;
  content: string;
  imageUrl: string;
  categories: Category[] | [];
  createdDate: string;
  isPublic: boolean;
  commentCount: number;
  likeCount: number;
  userAvatar?: string | null;
  isLiked?: boolean | false;
  comment?: Comment[]
}

export interface ContentPostingResponse extends ApiReponseSuccess<ContentPosting[]> {
  data: ContentPosting[];
}
