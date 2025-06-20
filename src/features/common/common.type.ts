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
