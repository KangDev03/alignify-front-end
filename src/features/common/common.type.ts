export type RoleName = 'INFLUENCER' | 'BRAND' | 'ADMIN' | null;

export interface ApiReponseSuccess<T> {
  status: number | string;
  message: string;
  data: T | null;
  timestamp: Date;
  path?: string;
}

export interface ApiReponseError {
  status: number | string;
  error: string;
  timestamp: Date;
  path?: string;
}

export interface PageableResponse<T> {
  content?: T[];
  pageable?: {
    pageNumber?: number;
    pageSize?: number;
    sort?: {
      empty?: boolean;
      sorted?: boolean;
      unsorted?: boolean;
    };
    offset?: number;
    paged?: boolean;
    unpaged?: boolean;
  };
  totalPages?: number;
  totalElements?: number;
  last?: boolean;
  numberOfElements?: number;
  size?: number;
  number?: number;
  sort?: {
    empty?: boolean;
    sorted?: boolean;
    unsorted?: boolean;
  };
  first?: boolean;
  empty?: boolean;
}

// export interface PageableResponse<T> {
//   content: T[];
//   pageable: {
//     pageNumber: number;
//     pageSize: number;
//     sort: {
//       empty: boolean;
//       sorted: boolean;
//       unsorted: boolean;
//     };
//     offset: number;
//     paged: boolean;
//     unpaged: boolean;
//   };
//   totalPages: number;
//   totalElements: number;
//   last: boolean;
//   numberOfElements: number;
//   size: number;
//   number: number;
//   sort: {
//     empty: boolean;
//     sorted: boolean;
//     unsorted: boolean;
//   };
//   first: boolean;
//   empty: boolean;
// }

export interface Category {
  categoryId: string;
  categoryName: string;
}

export interface CategoriesResponse extends ApiReponseSuccess<Category[]> {
  data: Category[];
}

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

export interface RolesResponse extends ApiReponseSuccess<Role[]> {
  data: Role[];
}

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
    }[];
  }[];
  influencerRequirements: {
    platform: 'FACEBOOK' | 'TIKTOK' | 'YOUTUBE' | 'INSTAGRAM';
    followers: number;
  }[];
  influencerCountExpected: number;
  influencerCountCurrent: number | 0;
  applicationTotal: number | 0;
  appliedInfluencerIds?: string[];
}

export interface CommonPageableRequest {
  pageNumber?: number | 0;
  pageSize?: number | 10;
  categoryId?: string;
}

export interface UserDTO {
  userId: string;
  name: string;
  avatarUrl: string | null;
}

export const SupportedPlatforms: ISupportedPlatforms[] = [
  'tiktok',
  'youtube',
  'facebook',
  'instagram',
];

export type ISupportedPlatforms = 'tiktok' | 'youtube' | 'facebook' | 'instagram';

export type PostType = 'video' | 'post' | 'reel' | 'story';

type PostDetail = 'like' | 'comment' | 'share';

type RequiredPost = {
  [post in PostType]?: PostDetail[];
};

type PostTypeByPlatform = {
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
      post: ['like', 'comment'],
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
      video: ['like', 'comment'],
    },
  ],
};
