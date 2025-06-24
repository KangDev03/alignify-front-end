'use client';

import { useLocation } from 'react-router';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

import { ContactInfoCard } from '@/features/profile/components/brand-contact';
import { BrandHeaderCard } from '@/features/profile/components/brand-header';
import { BrandInfoCard } from '@/features/profile/components/brand-info';
import { SocialMediaCard } from '@/features/profile/components/brand-social-links';
import { useGetBrandProfileUserQuery } from '@/features/profile/profile.service';

interface BrandData {
  id: string;
  name: string;
  avatar: string;
  companyName: string;
  category: string[];
  bio: string;
  contactInfo: {
    email: string;
    phone: string;
    address: string;
  };
  website: string;
  establishedYear: number;
  companySize: string;
  verificationStatus: 'verified' | 'pending' | 'unverified';
  campaignHistory: number;
  budgetRange: string;
  industry: string;
}

interface BrandProfileProps {
  brand: BrandData;
}

export function BrandProfilePage({ brand }: BrandProfileProps) {
  const location = useLocation();
  let userId = location.pathname.split('/').pop() || undefined;
  userId = userId === 'user-profile' ? undefined : userId;
  console.log(userId);

  const { data: profileRaw, isLoading } = useGetBrandProfileUserQuery(userId);

  if (isLoading || !profileRaw?.data) {
    return <div>Loading...</div>;
  }

  const profile = profileRaw?.data;

  const socialMediaLinks = Array.isArray(profile.socialMediaLinks)
    ? Object.fromEntries(
      profile.socialMediaLinks.map((item: any) =>
        typeof item === 'object' &&
          item !== null &&
          'key' in item &&
          'value' in item
          ? [item.key, item.value]
          : [String(item[0]), String(item[1])],
      ),
    )
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
    <div className="min-h-screen bg-background transition-colors duration-300">
      <div className="space-y-6">
        <BrandHeaderCard profile={profile} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Thông tin công ty */}
          <div className="lg:col-span-2 space-y-6">
            <BrandInfoCard profile={profile} />
            <ContactInfoCard {...brand.contactInfo} />
            <SocialMediaCard socialMediaLinks={socialMediaLinks} />
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
                  <div className="text-3xl font-bold text-primary">{brand.campaignHistory}</div>
                  <p className="text-sm text-muted-foreground">Tổng số chiến dịch</p>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Chiến dịch đang chạy</span>
                    <span className="font-medium">3</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Chiến dịch hoàn thành</span>
                    <span className="font-medium">{brand.campaignHistory - 3}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Tỷ lệ thành công</span>
                    <span className="font-medium text-green-600">94%</span>
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
