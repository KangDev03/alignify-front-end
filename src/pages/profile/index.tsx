'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import { ForumPost } from '@/components/forum-post/forum-post';
import { Icons } from '@/components/icons/icons';
import { useGetAllContentPostingQuery } from '@/features/home/forum-api/forum.service';
import { useGetProfileUserQuery } from '@/features/profile/api/profile.service';
import { ProfileHeader } from '@/features/profile/components/profile-header';
import { ProfileInfo } from '@/features/profile/components/profile-info';
import { ProfilePerformance } from '@/features/profile/components/profile-performance';
import { ProfileSocialLinks } from '@/features/profile/components/profile-social-links';
import { ProfileStats } from '@/features/profile/components/profile-stats';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';

export default function UserProfilePage() {
  const { data: contentPosting, isLoading } = useGetAllContentPostingQuery({
    pageNumber: 0,
    pageSize: 10,
  });
  const { data: profileRaw } = useGetProfileUserQuery();
  console.log(contentPosting?.data);

  if (!profileRaw?.data) {
    return <div>Loading...</div>;
  }
  const profile = profileRaw?.data;

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <div className="space-y-6">
        <ProfileHeader profile={profile} />

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="profile">Thông tin cá nhân</TabsTrigger>
            <TabsTrigger value="posts">
              Bài viết của tôi ({contentPosting?.data.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <ProfileInfo profile={profile} />

                {/* <ProfileSocialLinks socialMediaLinks={profile.socialMediaLinks} /> */}
              </div>

              {/* Thống kê */}
              <div className="space-y-6">
                <ProfileStats profile={profile} />
                {/* <ProfilePerformance
                  engagementRate={profile.engagementRate}
                  rating={profile.rating}
                  completedCampaigns={profile.completedCampaigns}
                /> */}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="posts" className="mt-6">
            <div className="space-y-4">
              {contentPosting?.data && contentPosting?.data.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {contentPosting.data.map((post) => (
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
