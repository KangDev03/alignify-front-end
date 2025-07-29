'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Bell, Lock, Palette, SettingsIcon, Shield, User } from 'lucide-react';

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
} from '@/components/ui/sidebar';

import AccountSection from '@/features/setting/components/account-section';
import AppearanceSection from '@/features/setting/components/appearance-section';
// import BillingSection from '@/features/setting/components/billing-section';
import NotificationsSection from '@/features/setting/components/notify-section';
import PrivacySection from '@/features/setting/components/privacy-section';
import ProfileSection from '@/features/setting/components/profile-section';
import SecuritySection from '@/features/setting/components/security-section';

type SettingsSection =
  | 'profile'
  | 'account'
  | 'security'
  | 'notifications'
  | 'appearance'
  | 'billing'
  | 'privacy';


export function Settings() {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState<SettingsSection>('profile');

  const sidebarItems = [
    {
      group: t('settings.groups.general'),
      items: [
        { id: 'profile', label: t('settings.items.profile'), icon: User },
        { id: 'account', label: t('settings.items.account'), icon: SettingsIcon },
        { id: 'security', label: t('settings.items.security'), icon: Shield },
      ],
    },
    {
      group: t('settings.groups.customization'),
      items: [
        { id: 'notifications', label: t('settings.items.notifications'), icon: Bell },
        { id: 'appearance', label: t('settings.items.appearance'), icon: Palette },
        { id: 'privacy', label: t('settings.items.privacy'), icon: Lock },
      ],
    },
    // {
    //   group: t('settings.groups.other'),
    //   items: [
    //     { id: 'billing', label: t('settings.items.billing'), icon: CreditCard },
    //   ],
    // },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return <ProfileSection />;
      case 'account':
        return <AccountSection />;
      case 'security':
        return <SecuritySection />;
      case 'notifications':
        return <NotificationsSection />;
      case 'appearance':
        return <AppearanceSection />;
      // case 'billing':
      //   return <BillingSection />;
      case 'privacy':
        return <PrivacySection />;
      default:
        return <ProfileSection />;
    }
  };

  return (
    <SidebarProvider>
      <div className="flex h-[calc(100vh-120px)] w-full">
        <Sidebar className="w-64 mt-16">
          <SidebarHeader className="border-b px-4 py-3">
            <div className="flex items-center space-x-2">
              <div>
                <h1 className="font-semibold">{t('settings.title')}</h1>
                <p className="text-sm text-muted-foreground">{t('settings.subtitle')}</p>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent className="p-2">
            {sidebarItems.map((group) => (
              <SidebarGroup key={group.group}>
                <SidebarGroupLabel className="px-2 py-1 text-xs font-medium text-muted-foreground ">
                  {group.group}
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {group.items.map((item) => {
                      const Icon = item.icon;
                      return (
                        <SidebarMenuItem key={item.id}>
                          <SidebarMenuButton
                            onClick={() => setActiveSection(item.id as SettingsSection)}
                            isActive={activeSection === item.id}
                            className="w-full justify-start transition-colors duration-300 cursor-pointer"
                          >
                            <Icon className="h-4 w-4" />
                            <span>{item.label}</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))}
          </SidebarContent>
        </Sidebar>
        <SidebarInset className="flex-1">
          <div className="flex h-full flex-col">
            <div className="flex-1 p-6">{renderContent()}</div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
