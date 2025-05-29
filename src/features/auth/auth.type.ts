export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  success: boolean
  message: string
  data: {
    user: {
      id: string
      email: string
      name: string
      role: "influencer" | "brand"
      avatar?: string
    }
    token: string
    refreshToken: string
  }
}

export interface ApiError {
  success: false
  message: string
  errors?: Record<string, string[]>
}