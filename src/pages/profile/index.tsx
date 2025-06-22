'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { ForumPost } from '@/components/forum-post/forum-post';
import { Icons } from '@/components/icons/icons';
import type { ContentPosting } from '@/features/home/forum-api/forum.type';
import { ProfileHeader } from '@/features/profile/components/profile-header';
import { ProfileInfo } from '@/features/profile/components/profile-info';
import { ProfilePerformance } from '@/features/profile/components/profile-performance';
import { ProfileSocialLinks } from '@/features/profile/components/profile-social-links';
import { ProfileStats } from '@/features/profile/components/profile-stats';
import type { InfluencerData } from '@/features/profile/types/profile.types';
import { formatDateToTimestamp } from '@/utils/format';

interface InfluencerProfileProps {
  influencer: InfluencerData;
}

const forumPosts: ContentPosting[] = [
  {
    contentId: '1',
    contentName: 'Tips chụp ảnh sản phẩm đẹp với ánh sáng tự nhiên',
    content:
      'Chia sẻ một số mẹo nhỏ giúp các bạn influencer chụp ảnh sản phẩm đẹp hơn với ánh sáng tự nhiên. Đầu tiên, hãy chọn thời điểm golden hour (khoảng 1 giờ sau bình minh hoặc 1 giờ trước hoàng hôn) để có ánh sáng mềm mại nhất...',
    categories: [
      {
        categoryId: '1',
        categoryName: 'Làm đẹp',
      },
    ],
    createdDate: formatDateToTimestamp(new Date()),
    likeCount: 156,
    commentCount: 23,
    // views: 1200,
    imageUrl: '/placeholder.svg?height=200&wcontentIdth=300',
    userAvatar: '/placeholder.svg?height=200&wcontentIdth=300',
    isPublic: true,
    userId: '1',
    userName: 'Khang Nguyen',
  },
  {
    contentId: '2',
    contentName: 'Kinh nghiệm làm việc với brand lần đầu',
    content:
      'Khi mới bắt đầu làm influencer, việc hợp tác với brand có thể khiến bạn cảm thấy lo lắng. Hôm nay mình sẽ chia sẻ những kinh nghiệm quý báu từ những lần hợp tác đầu tiên của mình...',
    categories: [
      {
        categoryId: '2',
        categoryName: 'Kinh nghiệm',
      },
    ],
    createdDate: formatDateToTimestamp(new Date()),
    likeCount: 89,
    commentCount: 15,
    // views: 890,
    imageUrl: '/placeholder.svg?height=200&wcontentIdth=300',
    userAvatar: '/placeholder.svg?height=200&wcontentIdth=300',
    isPublic: true,
    userId: '1',
    userName: 'Khang Nguyen',
  },
  {
    contentId: '3',
    contentName: 'Cách tăng engagement rate hiệu quả',
    content:
      'Engagement rate là một trong những chỉ số quan trọng nhất đối với influencer. Sau 2 năm làm content creator, mình đã tìm ra những cách hiệu quả để tăng tỷ lệ tương tác...',
    categories: [
      {
        categoryId: '3',
        categoryName: 'Tips & Tricks',
      },
    ],
    createdDate: formatDateToTimestamp(new Date()),
    likeCount: 234,
    commentCount: 45,
    // views: 1850,
    imageUrl: '/placeholder.svg?height=200&wcontentIdth=300',
    userAvatar: '/placeholder.svg?height=200&wcontentIdth=300',
    isPublic: true,
    userId: '1',
    userName: 'Khang Nguyen',
  },
  {
    contentId: '4',
    contentName: 'Review setup quay video tại nhà với budget thấp',
    content:
      'Nhiều bạn hỏi mình về setup quay video tại nhà mà không tốn quá nhiều tiền. Hôm nay mình sẽ chia sẻ setup hiện tại của mình với tổng chi phí chỉ khoảng 3 triệu đồng...',
    categories: [
      {
        categoryId: '4',
        categoryName: 'Công nghệ',
      },
    ],
    createdDate: formatDateToTimestamp(new Date()),
    likeCount: 178,
    commentCount: 32,
    // views: 1456,
    imageUrl: '/placeholder.svg?height=200&wcontentIdth=300',
    userAvatar: '/placeholder.svg?height=200&wcontentIdth=300',
    isPublic: true,
    userId: '1',
    userName: 'Khang Nguyen',
  },
];

export function UserProfilePage({ influencer }: InfluencerProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<Partial<InfluencerData>>(influencer);

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(influencer);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <div className="space-y-6">
        <ProfileHeader
          influencer={influencer}
          isEditing={isEditing}
          onEditToggle={() => setIsEditing(true)}
          onCancel={handleCancel}
        />

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="profile">Thông tin cá nhân</TabsTrigger>
            <TabsTrigger value="posts">Bài viết của tôi ({forumPosts.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <ProfileInfo influencer={influencer} />

                <ProfileSocialLinks socialMediaLinks={influencer.socialMediaLinks} />
              </div>

              {/* Thống kê */}
              <div className="space-y-6">
                <ProfileStats influencer={influencer} />
                <ProfilePerformance
                  engagementRate={influencer.engagementRate}
                  rating={influencer.rating}
                  completedCampaigns={influencer.completedCampaigns}
                />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="posts" className="mt-6">
            <div className="space-y-4">
              {forumPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {forumPosts.map((post) => (
                    <ForumPost key={post.contentId} contentPosting={post} />
                  ))}
                </div>
              ) : (
                <Card className="border-2 border-dashed border-muted bg-muted/20">
                  <CardContent className="p-12 text-center">
                    <div className="space-y-4">
                      <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
                        <Icons.messageCircle className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Chưa có bài viết nào</h3>
                        <p className="text-muted-foreground">
                          Bạn chưa đăng bài viết nào trong forum.
                        </p>
                      </div>
                      <Button>
                        <Icons.messageCircle className="h-4 w-4 mr-2" />
                        Viết bài đầu tiên
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
