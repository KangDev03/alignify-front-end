'use client';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { BarChart3, CreditCard, Flag, Home, Megaphone, MessageSquare, Users } from 'lucide-react';

import { Separator } from '@/components/ui/separator';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';

import { UserDropdown } from '@/components/layouts/app/user-dropdown';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { logout } from '@/features/auth/auth.slice';
import { useAppDispatch } from '@/hooks/redux';
import { baseApi } from '@/redux/baseApi';
import type { RootState } from '@/redux/store';

type AdminPage =
  | 'focus'
  | 'users'
  | 'campaigns'
  | 'forum-posts'
  | 'reports'
  | 'analytics'
  | 'subscription-plans';

interface AdminLayoutProps {
  children: React.ReactNode;
  currentPage: AdminPage;
  onPageChange: (page: AdminPage) => void;
}

const navigationItems = [
  {
    title: 'Tổng quan',
    items: [
      {
        title: 'Tiêu điểm tháng này',
        url: 'focus',
        icon: Home,
      },
      {
        title: 'Thống kê',
        url: 'analytics',
        icon: BarChart3,
      },
    ],
  },
  {
    title: 'Quản lý',
    items: [
      {
        title: 'Người dùng',
        url: 'users',
        icon: Users,
      },
      {
        title: 'Chiến dịch',
        url: 'campaigns',
        icon: Megaphone,
      },
      {
        title: 'Bài viết Forum',
        url: 'forum-posts',
        icon: MessageSquare,
      },
      {
        title: 'Báo cáo vi phạm',
        url: 'reports',
        icon: Flag,
      },
    ],
  },
  {
    title: 'Cài đặt',
    items: [
      {
        title: 'Gói đăng ký',
        url: 'subscription-plans',
        icon: CreditCard,
      },
    ],
  },
];

export function AdminLayout({ children, currentPage, onPageChange }: AdminLayoutProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { token, role } = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    if (!token || !role) {
      navigate('/auth/login');
      dispatch(logout());
    }
  }, [navigate, dispatch, token, role]);

  const handleLogout = () => {
    dispatch(baseApi.util.resetApiState());
    dispatch(logout());
    navigate('/auth/login');
  };

  return (
    <SidebarProvider className="gap-0">
      <Sidebar variant="inset" collapsible="icon">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <div className="flex items-center gap-2">
                <img src="/Alignify_logo.png" alt="Alignify logo" className="h-12 object-contain" />
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Admin Panel</span>
                  <span className="truncate text-xs">Alignify</span>
                </div>
              </div>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          {navigationItems.map((group) => (
            <SidebarGroup key={group.title}>
              <SidebarGroupLabel className="w-fit">{group.title}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={currentPage === item.url}
                        onClick={() => onPageChange(item.url as AdminPage)}
                        className="cursor-pointer transition-all duration-200 font-semibold"
                      >
                        <div>
                          <item.icon />
                          <span>{item.title}</span>
                        </div>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>
      </Sidebar>

      <SidebarInset className="mt-0 md:peer-data-[variant=inset]:m-4 md:peer-data-[variant=inset]:ml-2">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex items-center gap-2 flex-1">
            <h1 className="text-lg font-semibold">
              {navigationItems
                .flatMap((group) => group.items)
                .find((item) => item.url === currentPage)?.title || 'Dashboard'}
            </h1>
          </div>
          <ThemeToggle />
          <UserDropdown onLogout={handleLogout} />
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
