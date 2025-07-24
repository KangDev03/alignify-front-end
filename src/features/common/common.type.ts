import type { Permission } from '../admin/admin.type';

export type RoleName = 'INFLUENCER' | 'BRAND' | 'ADMIN';

export interface ApiReponseSuccess<T> {
  status: number | string;
  message: string;
  data: T | null;
  timestamp: Date;
  path: string;
}

export interface ErrorData {
  status: number | string;
  error: string;
  timestamp: Date;
  path: string;
}

export interface ApiResponseError {
  status: number | string;
  data: ErrorData;
}

export interface User {
  userId: string;
  name: string;
  email: string;
}

export interface Category {
  categoryId: string;
  categoryName: string;
}

export type CategoriesResponse = ApiReponseSuccess<Category[]>;

export interface SearchCampaignsResponse {
  campaigns: Campaign[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

export interface Role {
  roleId: string;
  roleName: RoleName;
}

export type RolesResponse = ApiReponseSuccess<Role[]>;

export interface Campaign {
  campaignId: string;
  brandId: string;
  brandName: string;
  brandAvartar: string;
  campaignName: string;
  content: string;
  imageUrl: string | null;
  budget: number;
  status: string;
  createdAt: string;
  dueAt: string;
  startAt: string;
  categories: Category[] | [];
  campaignRequirements: {
    platform: 'FACEBOOK' | 'TIKTOK' | 'YOUTUBE' | 'INSTAGRAM';
    post_type: string;
    quantity: number;
    details: {
      post_type: string;
      like: number;
      comment: number;
      share: number;
      view: number;
    }[];
  }[];
  influencerRequirements: {
    platform: 'FACEBOOK' | 'TIKTOK' | 'YOUTUBE' | 'INSTAGRAM';
    followers: number;
  }[];
  influencerCountExpected: number;
  joinedInfluencerIds: string[];
  applicationTotal: number | 0;
  appliedInfluencerIds?: string[];
  invitedInfluencerIds?: string[];
  contractUrl?: string;
}

export interface CommonPageableRequest {
  pageNumber?: number | 0;
  pageSize?: number | 10;
  categoryId?: string;
}

export interface UserDTO {
  userId: string;
  name: string;
  avatarUrl?: string;
  createdAt?: string;
  permissions?: Permission[];
  twoFA?: boolean;
  email?: string;
}

export const SupportedPlatforms: ISupportedPlatforms[] = [
  'tiktok',
  'youtube',
  'facebook',
  'instagram',
];

export type ISupportedPlatforms = 'tiktok' | 'youtube' | 'facebook' | 'instagram';

export type PostType = 'video' | 'post' | 'reel' | 'story';

export type PostDetail = 'like' | 'comment' | 'share' | 'view';

export type RequiredPost = {
  [post in PostType]?: PostDetail[];
};

export type PostTypeByPlatform = {
  [platform in ISupportedPlatforms]: RequiredPost[];
};

export const SupportedPostTypeByPlatform: PostTypeByPlatform = {
  tiktok: [
    {
      video: ['comment', 'like'],
    },
  ],
  facebook: [
    {
      post: ['like', 'comment', 'share'],
    },
  ],
  instagram: [
    {
      post: ['like', 'comment'],
    },
    {
      reel: ['like', 'comment'],
    },
    {
      story: ['like'],
    },
  ],
  youtube: [
    {
      video: ['view'],
    },
  ],
};
