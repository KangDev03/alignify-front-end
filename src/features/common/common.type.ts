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

export interface Role {
  roleId: string;
  roleName: RoleName;
}

export interface RolesResponse extends ApiReponseSuccess<Role[]> {
  data: Role[];
}

export interface Campaign {
  campaignId: string;
  brandName: string;
  brandAvartar: string;
  campaignName: string;
  content: string;
  imageUrl: string;
  budget: number;
  status: string;
  createdAt: number[];
  dueAt: number[];
  startAt: number[];
  categories: Category[];
  campaignRequirements: { [key: string]: number };
  influencerRequirements: string[];
  influencerCountExpected: number;
  influencerCountCurrent: number;
}

export interface CommonPageableRequest {
  pageNumber?: number | 0;
  pageSize?: number | 10;
}

export interface UserDTO {
  userId: string;
  name: string;
  avatarUrl: string | null;
}
