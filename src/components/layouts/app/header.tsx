'use client';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';

import { Button } from '@/components/ui/button';

import { Icons } from '@/components/icons/icons';
import { UserDropdown } from '@/components/layouts/app/user-dropdown';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import ChatSheet from '@/features/chatting/components/chat-sheet';
import NotificationTrigger from '@/features/notification/components/notification-trigger';
import type { RootState } from '@/redux/store';

type InfluencerPage =
  | 'home'
  | 'my-campaign'
  | 'applications'
  | 'invitations'
  | 'statistics'
  | 'upgrade-plan';
type BrandPage =
  | 'home'
  | 'campaign-management'
  | 'applicants'
  | 'invitations'
  | 'statistics'
  | 'upgrade-plan';
type CurrentPage = InfluencerPage | BrandPage;

interface HeaderProps {
  onLogout: () => void;
}

export function AppHeader({ onLogout }: HeaderProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const location = useLocation();
  const userRole = useSelector((state: RootState) => state.auth.role);

  const currentPage = (): CurrentPage | undefined => {
    if (location.pathname.includes('/user-profile')) return undefined;
    if (location.pathname.includes('/settings')) return undefined;

    if (userRole === 'INFLUENCER') {
      if (location.pathname.includes('/my-campaign')) return 'my-campaign';
      if (location.pathname.includes('/applications')) return 'applications';
      if (location.pathname.includes('/invitation')) return 'invitations';
      if (location.pathname.includes('/statistics')) return 'statistics';
      if (location.pathname.includes('/upgrade-plan')) return 'upgrade-plan';
      return 'home';
    } else {
      if (location.pathname.includes('/campaign-management')) return 'campaign-management';
      if (location.pathname.includes('/applicants')) return 'applicants';
      if (location.pathname.includes('/invitation')) return 'invitations';
      if (location.pathname.includes('/statistics')) return 'statistics';
      if (location.pathname.includes('/upgrade-plan')) return 'upgrade-plan';
      return 'home';
    }
  };

  const getPathByPage = (page: CurrentPage): string => {
    switch (page) {
      case 'home': return '/home';
      case 'my-campaign': return '/my-campaign';
      case 'applications': return '/applications';
      case 'invitations': return '/invitation';
      case 'statistics': return '/statistics';
      case 'upgrade-plan': return '/upgrade-plan';
      case 'campaign-management': return '/campaign-management';
      case 'applicants': return '/applicants';
      default: return '/home';
    }
  };

  const handleScrollToTop = (path: string) => {
    if (location.pathname === path) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate(path);
    }
  };

  const handleToLandingPage = () => {
    if (location.pathname !== '/') {
      navigate('/')
    }
  }

  const handlePageChange = (page: CurrentPage) => {
    if (userRole === 'INFLUENCER') {
      if (page === 'home') navigate('/home');
      else if (page === 'my-campaign') navigate('/my-campaign');
      else if (page === 'applications') navigate('/applications');
      else if (page === 'invitations') navigate('/invitation');
      else if (page === 'statistics') navigate('/statistics');
      else if (page === 'upgrade-plan') navigate('/upgrade-plan');
    } else {
      if (page === 'home') navigate('/home');
      else if (page === 'campaign-management') navigate('/campaign-management');
      else if (page === 'applicants') navigate('/applicants');
      else if (page === 'invitations') navigate('/invitation');
      else if (page === 'statistics') navigate('/statistics');
      else if (page === 'upgrade-plan') navigate('/upgrade-plan');
    }
  };

  const navigationItems =
    userRole === 'INFLUENCER'
      ? [
        { id: 'home', label: t('header.nav.home'), icon: Icons.home },
        { id: 'my-campaign', label: t('header.nav.myCampaign'), icon: Icons.megaphone },
        { id: 'applications', label: t('header.nav.applications'), icon: Icons.fileText },
        { id: 'invitations', label: t('header.nav.invitations'), icon: Icons.mail },
        { id: 'statistics', label: t('header.nav.statistics'), icon: Icons.barChart3 },
      ]
      : [
        { id: 'home', label: t('header.nav.home'), icon: Icons.home },
        { id: 'campaign-management', label: t('header.nav.campaignManagement'), icon: Icons.megaphone },
        { id: 'applicants', label: t('header.nav.applicants'), icon: Icons.fileText },
        { id: 'invitations', label: t('header.nav.invitations'), icon: Icons.mail },
        { id: 'statistics', label: t('header.nav.reports'), icon: Icons.barChart3 },
      ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 cursor-pointer" onClick={handleToLandingPage}>
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
                  onClick={() => handleScrollToTop(getPathByPage(item.id as CurrentPage))}
                  className="flex justify-center items-center space-x-2 h-9"
                >
                  <Icon />
                  <span>{item.label}</span>
                </Button>
              );
            })}
          </nav>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handlePageChange('upgrade-plan' as CurrentPage)}
              className="flex items-center space-x-2 text-white dark:text-black bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 dark:from-blue-600 dark:to-purple-600 dark:hover:from-blue-700 dark:hover:to-purple-700 border-0 shadow-md hover:text-none transition duration-200"
            >
              <Icons.crown className="h-4 w-4" />
              <span className="hidden md:inline">{t('header.nav.upgrade')}</span>
            </Button>
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
