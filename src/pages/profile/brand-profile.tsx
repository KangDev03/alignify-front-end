'use client';

import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { toast } from 'sonner';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

import { useGetAllCampaignsOfBrandNoPageQuery } from '@/features/my-campaign/campaign.service';
import { ContactInfoCard } from '@/features/profile/components/brand-contact';
import { BrandHeaderCard } from '@/features/profile/components/brand-header';
import { BrandInfoCard } from '@/features/profile/components/brand-info';
import { BrandProfileSkeletion } from '@/features/profile/components/profile-skeletion';
import { ProfileSocialLinks } from '@/features/profile/components/profile-social-links';
import { useGetBrandProfileUserQuery } from '@/features/profile/profile.service';

export function BrandProfilePage() {
  const navigate = useNavigate();
  const location = useLocation();
  let userId = location.pathname.split('/').pop() || undefined;
  userId = userId === 'user-profile' ? undefined : userId;

  const {
    data: profileRaw,
    isLoading,
    isError,
  } = useGetBrandProfileUserQuery(userId, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  useEffect(() => {
    if (isError) {
      navigate('/home');
      toast.error('Đã có lỗi bất ngờ xảy ra. Vui lòng thử lại!');
    }
  }, [isError, navigate]);

  const { data: campaignsRaw } = useGetAllCampaignsOfBrandNoPageQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });
  const campaigns = Array.isArray(campaignsRaw?.data) ? campaignsRaw.data : [];

  const runningCampaigns = campaigns.filter((c) => c.status === 'RECRUITING');
  const completedCampaigns = campaigns.filter((c) => c.status === 'COMPLETED');
  if (isLoading || !profileRaw?.data) {
    return <BrandProfileSkeletion />;
  }

  const profile = profileRaw?.data;
  const contactMap = Array.isArray(profile.contacts)
    ? Object.fromEntries(profile.contacts.map((c: any) => [c.contact_type, c.contact_infor]))
    : {};

  // const getVerificationBadge = () => {
  //   switch (brand.verificationStatus) {
  //     case 'verified':
  //       return (
  //         <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
  //           Đã xác minh
  //         </Badge>
  //       );
  //     case 'pending':
  //       return (
  //         <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
  //           Đang xác minh
  //         </Badge>
  //       );
  //     default:
  //       return <Badge variant="secondary">Chưa xác minh</Badge>;
  //   }
  // };

  return (
    <div className="min-h-screen transition-colors duration-300">
      <div className="space-y-6">
        <BrandHeaderCard
          me={userId === undefined}
          profile={profile}
          campaignCompleted={completedCampaigns.length}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Thông tin công ty */}
          <div className="lg:col-span-2 space-y-6">
            <BrandInfoCard profile={profile} />
            <ContactInfoCard
              email={contactMap.email}
              phone={contactMap.phone}
              address={contactMap.address}
            />

            <ProfileSocialLinks socialMediaLinks={profile.socialMediaLinks ?? []} />
          </div>

          {/* Thống kê và trạng thái */}
          <div className="space-y-6">
            {/* <Card className="border-2 border-primary/20 bg-card shadow-lg">
              <CardHeader>
                <CardTitle>Trạng thái tài khoản</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Trạng thái xác minh</span>
                  <div className="flex items-center space-x-2">
                    {brand.verificationStatus === 'verified' && (
                      <Icons.checkCircle className="h-4 w-4 text-green-500" />
                    )}
                    {getVerificationBadge()}
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Năm thành lập</span>
                    <span className="font-medium">{brand.establishedYear}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Quy mô công ty</span>
                    <span className="font-medium">{brand.companySize}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Ngân sách chiến dịch</span>
                    <span className="font-medium">{brand.budgetRange}</span>
                  </div>
                </div>
              </CardContent>
            </Card> */}

            <Card className="border-2 border-primary/20 bg-card shadow-lg">
              <CardHeader>
                <CardTitle>Thống kê chiến dịch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-primary">
                    {runningCampaigns.length + completedCampaigns.length}
                  </div>
                  <p className="text-sm text-muted-foreground">Tổng số chiến dịch</p>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Chiến dịch đang chạy</span>
                    <span className="font-medium">{runningCampaigns.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Chiến dịch hoàn thành</span>
                    <span className="font-medium">{completedCampaigns.length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
