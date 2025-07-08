'use client';

import { useState } from 'react';

import { AdminLayout } from '@/components/layouts/admin/admin-layout';
import { AdminDashboard } from '@/features/admin/components/admin-dashboard';
import { Analytics } from '@/features/admin/components/analytics';
import { CampaignsManagement } from '@/features/admin/components/campaigns-management';
import { ForumPostsManagement } from '@/features/admin/components/forum-posts-management';
import { ReportsManagement } from '@/features/admin/components/reports-management';
import { SubscriptionPlans } from '@/features/admin/components/subscription-plans';
import { UsersManagement } from '@/features/admin/components/users-management';

type AdminPage =
  | 'focus'
  | 'users'
  | 'campaigns'
  | 'forum-posts'
  | 'reports'
  | 'analytics'
  | 'subscription-plans';

export default function AdminPage() {
  const [currentPage, setCurrentPage] = useState<AdminPage>('focus');

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'focus':
        return <AdminDashboard />;
      case 'users':
        return <UsersManagement />;
      case 'campaigns':
        return <CampaignsManagement />;
      case 'forum-posts':
        return <ForumPostsManagement />;
      case 'reports':
        return <ReportsManagement />;
      case 'analytics':
        return <Analytics />;
      case 'subscription-plans':
        return <SubscriptionPlans />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <AdminLayout currentPage={currentPage} onPageChange={setCurrentPage}>
      {renderCurrentPage()}
    </AdminLayout>
  );
}
