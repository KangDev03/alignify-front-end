export interface InfluencerData {
  id: string
  name: string
  avatar: string
  dateOfBirth: string
  gender: string
  bio: string
  socialMediaLinks: {
    instagram: string
    youtube: string
    facebook: string
  }
  rating: number
  category: string[]
  followers: {
    instagram: number
    youtube: number
    facebook: number
  }
  totalFollowers: number
  engagementRate: number
  completedCampaigns: number
  location: string
}

export interface EditableComponentProps {
  isEditing: boolean
  onSave?: () => void
}