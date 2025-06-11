import { Outlet, useNavigate } from 'react-router';

import AppFooter from '@/components/layouts/app/footer';
import { AppHeader } from '@/components/layouts/app/header';

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
      <main className="container mx-auto px-20 py-8 bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px]">
        <Outlet />
      </main>
      <AppFooter />
    </div>
  );
}

export default AppLayout;
