"use client"

import { useState } from "react"

import { ProfileHeader } from "@/features/profile/components/profile-header"
import { ProfileInfo } from "@/features/profile/components/profile-info"
import { ProfilePerformance } from "@/features/profile/components/profile-performance"
import { ProfileSocialLinks } from "@/features/profile/components/profile-social-links"
import { ProfileStats } from "@/features/profile/components/profile-stats"
import type { InfluencerData } from "@/features/profile/types/profile.types"

interface InfluencerProfileProps {
  influencer: InfluencerData
}

export function UserProfilePage({ influencer }: InfluencerProfileProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState<Partial<InfluencerData>>(influencer)

  const handleSave = () => {
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditData(influencer)
    setIsEditing(false)
  }

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <div className="space-y-6">
        <ProfileHeader
          influencer={influencer}
          isEditing={isEditing}
          onEditToggle={() => setIsEditing(true)}
          onCancel={handleCancel}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <ProfileInfo
              influencer={influencer}
              editData={editData}
              isEditing={isEditing}
              onSave={handleSave}
              onEditDataChange={setEditData}
            />

            <ProfileSocialLinks
              socialMediaLinks={influencer.socialMediaLinks}
            />
          </div>

          {/* Thống kê */}
          <div className="space-y-6">
            <ProfileStats
              totalFollowers={influencer.totalFollowers}
              followers={influencer.followers}
            />
            <ProfilePerformance
              engagementRate={influencer.engagementRate}
              rating={influencer.rating}
              completedCampaigns={influencer.completedCampaigns}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
