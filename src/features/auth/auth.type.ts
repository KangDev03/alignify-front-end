export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  id: string;
  token: string;
}

export interface ApiError {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}
export interface Role {
  roleId: string;
  roleName: 'INFLUENCER' | 'BRAND' | 'ADMIN';
}

export interface RolesResponse {
  roles: Role[];
}

export interface RegisterRequest {
  email: string;
  password: string;
  roleId: string;
  name: string;
}

export interface RegisterResponse {
  message: string;
}

export interface RequestOTPResponse {
  message: string;
}

export interface RequestOTPRequest {
  email: string;
}
