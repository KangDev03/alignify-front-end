'use client';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { AlertCircleIcon } from 'lucide-react';

import { Alert, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { Icons } from '@/components/icons/icons';
import { ForumPost } from '@/features/home/components/forum-post';
import { ProfileHeader } from '@/features/profile/components/profile-header';
import { ProfileInfo } from '@/features/profile/components/profile-info';
import { ProfileSocialLinks } from '@/features/profile/components/profile-social-links';
import { ProfileStats } from '@/features/profile/components/profile-stats';
import {
  useGetInfluencerProfileUserQuery,
  useGetPostMeQuery,
} from '@/features/profile/profile.service';
import { setContents } from '@/features/profile/profile.slice';
import { useAppDispatch } from '@/hooks/redux';
import type { RootState } from '@/redux/store';

export default function InfluencerProfilePage() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  let userId = location.pathname.split('/').pop() || undefined;
  userId = userId === 'user-profile' ? undefined : userId;

  const { data: contentPosting } = useGetPostMeQuery({
    page: { pageNumber: 0, pageSize: 10 },
    userId: userId,
  });

  const { contents } = useSelector((state: RootState) => state.profile);

  const { data: profileRaw } = useGetInfluencerProfileUserQuery(userId ? userId : undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });
  // const { data: campaignsResponse } = useGetAllCampaignsOfInfluencerQuery({
  //   pageNumber: 0,
  //   pageSize: 10,
  // });
  useEffect(() => {
    if (contentPosting && !userId) dispatch(setContents(contentPosting));
  }, [contentPosting, dispatch, userId]);
  if (!profileRaw?.data) {
    return <div>Loading...</div>;
  }
  const profile = profileRaw?.data;
  // const campaigns: Campaign[] = Array.isArray(campaignsResponse?.data?.campaigns)
  //   ? campaignsResponse.data.campaigns
  //   : [];
  // const completedAppliedCampaigns: Campaign[] = campaigns.filter(
  //   (campaign) => campaign.status === 'COMPLETED',
  // );

  return (
    <div className="min-h-screen transition-colors duration-300">
      <div className="space-y-6">
        <ProfileHeader me={userId === undefined} profile={profile} />

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="profile">Thông tin cá nhân</TabsTrigger>
            <TabsTrigger value="posts">
              {userId ? 'Bài viết' : 'Bài viết của tôi'} (
              {userId === undefined ? (contents.length ?? 0) : (contentPosting?.data.length ?? 0)})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <ProfileInfo profile={profile} />

                <ProfileSocialLinks socialMediaLinks={profile.socialMediaLinks ?? []} />
              </div>

              {/* Thống kê */}
              <div className="space-y-6">
                <ProfileStats socialMedias={profile.socialMediaLinks ?? []} />
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
              {userId === undefined ? (
                contents.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {contents.map((post) => (
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
                )
              ) : contentPosting?.data.length && contentPosting?.data.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {contentPosting.data.map((post) => (
                    <ForumPost key={post.contentId} contentPosting={post} />
                  ))}
                </div>
              ) : (
                <Alert variant="default">
                  <AlertCircleIcon />
                  <AlertTitle>Không bài viết nào</AlertTitle>
                </Alert>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
