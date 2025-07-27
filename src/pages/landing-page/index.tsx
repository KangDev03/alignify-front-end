'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';

import { Icons } from '@/components/icons/icons';
import { useTheme } from '@/components/theme/theme-provider';
import { LandingFeatures } from '@/features/landing-page/components/landing-features';
import { LandingFooter } from '@/features/landing-page/components/landing-footer';
import { LandingHeader } from '@/features/landing-page/components/landing-header';
import { LandingHero } from '@/features/landing-page/components/landing-hero';
import { LandingPricing } from '@/features/landing-page/components/landing-pricing';
import { LandingTestimonials } from '@/features/landing-page/components/landing-testimonials';

export function LandingPage() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('brands');

  const brandFeatures = [
    {
      icon: <Icons.target className="h-6 w-6" />,
      title: 'Tìm kiếm Influencer thông minh',
      description: 'AI-powered matching giúp tìm đúng influencer phù hợp với thương hiệu',
    },
    {
      icon: <Icons.barChart3 className="h-6 w-6" />,
      title: 'Quản lý chiến dịch toàn diện',
      description: 'Theo dõi hiệu suất, ROI và engagement từ một dashboard duy nhất',
    },
    {
      icon: <Icons.users className="h-6 w-6" />,
      title: 'Collaboration tools',
      description: 'Chat trực tiếp, chia sẻ brief và feedback với influencer',
    },
    {
      icon: <Icons.shield className="h-6 w-6" />,
      title: 'Thanh toán an toàn',
      description: 'Hệ thống escrow bảo vệ cả brand và influencer',
    },
  ];

  const influencerFeatures = [
    {
      icon: <Icons.camera className="h-6 w-6" />,
      title: 'Portfolio chuyên nghiệp',
      description: 'Showcase work của bạn với media kit tự động tạo',
    },
    {
      icon: <Icons.trendingUp className="h-6 w-6" />,
      title: 'Analytics chi tiết',
      description: 'Theo dõi engagement, reach và thu nhập từ các chiến dịch',
    },
    {
      icon: <Icons.messageSquare className="h-6 w-6" />,
      title: 'Networking community',
      description: 'Kết nối với influencer khác và chia sẻ kinh nghiệm',
    },
    {
      icon: <Icons.zap className="h-6 w-6" />,
      title: 'Opportunities matching',
      description: 'Nhận thông báo về các cơ hội phù hợp với niche của bạn',
    },
  ];

  const testimonials = [
    {
      name: 'Nguyễn Minh Anh',
      role: 'Marketing Director, Fashion Brand',
      avatar: '/placeholder.svg?height=40&width=40',
      content:
        'Platform này đã giúp chúng tôi tìm được những influencer phù hợp và tăng ROI lên 300%. Quá tuyệt vời!',
      rating: 5,
    },
    {
      name: 'Trần Thị Hương',
      role: 'Beauty Influencer, 500K followers',
      avatar: '/placeholder.svg?height=40&width=40',
      content:
        'Tôi đã tìm được nhiều brand uy tín và tăng thu nhập gấp đôi nhờ platform này. Highly recommended!',
      rating: 5,
    },
    {
      name: 'Lê Văn Đức',
      role: 'CEO, Tech Startup',
      avatar: '/placeholder.svg?height=40&width=40',
      content:
        'Dashboard analytics rất chi tiết, giúp chúng tôi track performance và optimize campaign hiệu quả.',
      rating: 5,
    },
  ];

  const stats = [
    { number: '10,000+', label: 'Influencers' },
    { number: '5,000+', label: 'Brands' },
    { number: '50,000+', label: 'Campaigns' },
    { number: '20,000+', label: 'Post' },
  ];

  const backgroundImage =
    theme === 'dark' ||
    (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
      ? '/background-dark.png'
      : '/background-light.png';

  return (
    <div
      className="min-h-screen flex-col bg-cover bg-no-repeat bg-fixed"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <LandingHeader />

      <LandingHero stats={stats} />

      <LandingFeatures
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        brandFeatures={brandFeatures}
        influencerFeatures={influencerFeatures}
      />

      <LandingPricing />

      <LandingTestimonials testimonials={testimonials} />

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Sẵn sàng bắt đầu?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Tham gia cộng đồng hàng nghìn brands và influencers đang phát triển mạnh mẽ
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 dark:from-blue-600 dark:to-purple-600 dark:hover:from-blue-700 dark:hover:to-purple-700"
          >
            Bắt đầu ngay hôm nay
            <Icons.arrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
}
