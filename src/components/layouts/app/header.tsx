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

type InfluencerPage = 'home' | 'my-campaign' | 'applications' | 'statistics' | 'upgrade-plan';
type BrandPage =
  | 'home'
  | 'campaign-management'
  | 'applicants'
  | 'invitations'
  | 'statistics'
  | 'upgrade-plan';
type AdminPage = 'home' | 'dashboard';
type CurrentPage = InfluencerPage | BrandPage | AdminPage;

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
      if (location.pathname.includes('/statistics')) return 'statistics';
      if (location.pathname.includes('/upgrade-plan')) return 'upgrade-plan';
      return 'home';
    } else if (userRole === 'BRAND') {
      if (location.pathname.includes('/campaign-management')) return 'campaign-management';
      if (location.pathname.includes('/applicants')) return 'applicants';
      if (location.pathname.includes('/invitation')) return 'invitations';
      if (location.pathname.includes('/statistics')) return 'statistics';
      if (location.pathname.includes('/upgrade-plan')) return 'upgrade-plan';
      return 'home';
    } else if (userRole === 'ADMIN') {
      if (location.pathname.includes('/dashboard')) return 'dashboard';
      return 'home';
    }
  };

  const handleScrollToTop = () => {
    if (location.pathname === '/home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/home');
    }
  };

  const handlePageChange = (page: CurrentPage) => {
    if (userRole === 'INFLUENCER') {
      if (page === 'home') navigate('/home');
      else if (page === 'my-campaign') navigate('/my-campaign');
      else if (page === 'applications') navigate('/applications');
      else if (page === 'statistics') navigate('/statistics');
      else if (page === 'upgrade-plan') navigate('/upgrade-plan');
    } else if (userRole === 'BRAND') {
      if (page === 'home') navigate('/home');
      else if (page === 'campaign-management') navigate('/campaign-management');
      else if (page === 'applicants') navigate('/applicants');
      else if (page === 'invitations') navigate('/invitation');
      else if (page === 'statistics') navigate('/statistics');
      else if (page === 'upgrade-plan') navigate('/upgrade-plan');
    } else if (userRole === 'ADMIN') {
      if (page === 'home') navigate('/home');
      else if (page === 'dashboard') navigate('/dashboard');
    } else {
      if (page === 'home') navigate('/home');
    }
  };

  const navigationItems =
    userRole === 'INFLUENCER'
      ? [
          { id: 'home', label: 'Trang chủ', icon: Icons.home },
          { id: 'my-campaign', label: 'Chiến dịch của tôi', icon: Icons.megaphone },
          { id: 'applications', label: 'Đơn ứng tuyển', icon: Icons.fileText },
          { id: 'statistics', label: 'Thống kê', icon: Icons.barChart3 },
        ]
      : userRole === 'BRAND'
        ? [
            { id: 'home', label: 'Trang chủ', icon: Icons.home },
            { id: 'campaign-management', label: 'Quản lí chiến dịch', icon: Icons.megaphone },
            { id: 'applicants', label: 'Ứng viên', icon: Icons.fileText },
            { id: 'invitations', label: 'Lời mời', icon: Icons.mail },
            { id: 'statistics', label: 'Báo cáo', icon: Icons.barChart3 },
          ]
        : userRole === 'ADMIN'
          ? [
              { id: 'home', label: 'Trang chủ', icon: Icons.home },
              { id: 'dashboard', label: 'Quản lý và thống kê', icon: Icons.layoutDashboard },
            ]
          : [{ id: 'home', label: 'Trang chủ', icon: Icons.home }];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 cursor-pointer" onClick={handleScrollToTop}>
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
            {userRole !== 'ADMIN' && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handlePageChange('upgrade-plan' as CurrentPage)}
                className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 border-0 shadow-md"
              >
                <Icons.crown className="h-4 w-4" />
                <span className="hidden md:inline">Nâng cấp</span>
              </Button>
            )}
            <NotificationTrigger />
            {userRole !== 'ADMIN' && <ChatSheet />}
            <ThemeToggle />
            <UserDropdown onLogout={onLogout} />
          </div>
        </div>
      </div>
    </header>
  );
}
