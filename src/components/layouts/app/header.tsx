'use client';

import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';

import { Button } from '@/components/ui/button';

import { Icons } from '@/components/icons/icons';
import { UserDropdown } from '@/components/layouts/app/user-dropdown';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import ChatSheet from '@/features/chatting/components/chat-sheet';
import NotificationTrigger from '@/features/notification/components/notification-trigger';
import type { RootState } from '@/redux/store';

type InfluencerPage = 'home' | 'my-campaign' | 'applications';
type BrandPage = 'home' | 'campaign-management' | 'applicants';
type CurrentPage = InfluencerPage | BrandPage;

interface HeaderProps {
  onLogout: () => void;
}

export function AppHeader({ onLogout }: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const userRole = useSelector((state: RootState) => state.auth.role);

  const currentPage = (): CurrentPage | undefined => {

    if (location.pathname.includes('/user-profile')) return undefined;
    if (location.pathname.includes('/settings')) return undefined;

    if (userRole === 'INFLUENCER') {
      if (location.pathname.includes('/my-campaign')) return 'my-campaign';
      if (location.pathname.includes('/applications')) return 'applications';
      return 'home';
    } else {
      if (location.pathname.includes('/campaign-management')) return 'campaign-management';
      if (location.pathname.includes('/applicants')) return 'applicants';
      return 'home';
    }
  };

  const handlePageChange = (page: CurrentPage) => {
    if (userRole === 'INFLUENCER') {
      if (page === 'home') navigate('/home');
      else if (page === 'my-campaign') navigate('/my-campaign');
      else if (page === 'applications') navigate('/applications');
    } else {
      if (page === 'home') navigate('/home');
      else if (page === 'campaign-management') navigate('/campaign-management');
      else if (page === 'applicants') navigate('/applicants');
    }
  };

  const navigationItems =
    userRole === 'INFLUENCER'
      ? [
          { id: 'home', label: 'Trang chủ', icon: Icons.home },
          { id: 'my-campaign', label: 'Chiến dịch của tôi', icon: Icons.megaphone },
          { id: 'applications', label: 'Đơn ứng tuyển', icon: Icons.fileText },
          // { id: 'analytics', label: 'Thống kê', icon: Icons.barChart3 },
        ]
      : [
          { id: 'home', label: 'Trang chủ', icon: Icons.home },
          { id: 'campaign-management', label: 'Quản lí chiến dịch', icon: Icons.megaphone },
          { id: 'applicants', label: 'Ứng viên', icon: Icons.fileText },
          // { id: 'analytics', label: 'Báo cáo', icon: Icons.barChart3 },
        ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-16">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <div
              className="flex items-center space-x-1 cursor-pointer"
              onClick={() => navigate('/home')}
            >
              <img src="/Alignify_logo.png" alt="Alignify logo" className="h-16 object-contain" />
              <span className="font-extrabold text-3xl text-primary">Alignify</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={currentPage() === item.id ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => handlePageChange(item.id as CurrentPage)}
                  className="flex justify-center items-center space-x-2 h-9"
                >
                  <Icon />
                  <span>{item.label}</span>
                </Button>
              );
            })}
          </nav>

          <div className="flex items-center space-x-2">
            <NotificationTrigger />
            <ChatSheet />
            <ThemeToggle />
            <UserDropdown onLogout={onLogout} />
          </div>
        </div>
      </div>
    </header>
  );
}
