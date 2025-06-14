import { Outlet, useNavigate } from 'react-router';

import AppFooter from '@/components/layouts/app/footer';
import { AppHeader } from '@/components/layouts/app/header';
import PopUpTrigger from '@/features/posting/components/popUp-trigger';

function AppLayout() {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate('/auth/login');
    console.log('User logged out');
  };

  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader
        userRole={'influencer'}
        currentPage={'home'}
        onPageChange={(page) => console.log(`Page changed to: ${page}`)}
        onLogout={handleLogout}
        userName={'KangDev'}
        userAvatar={'https://avatars.githubusercontent.com/u/12345678?v=4'}
      />
      <main className="container mx-auto px-20 py-8 relative">
        <Outlet />
        <PopUpTrigger />
      </main>
      <AppFooter />
    </div>
  );
}

export default AppLayout;
