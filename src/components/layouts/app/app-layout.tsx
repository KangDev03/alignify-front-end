import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router';

// import AppFooter from '@/components/layouts/app/footer';
import { AppHeader } from '@/components/layouts/app/header';
import PopUpTrigger from '@/features/posting/components/popUp-trigger';

type CurrentPage = 'home' | 'my-campaign' | 'applications';

function AppLayout() {
  const [currentPage, setCurrentPage] = useState<CurrentPage>("home")
  const navigate = useNavigate();

  const handlePageChange = (page: CurrentPage) => {
    setCurrentPage(page);
    if (page === 'home') navigate('/home');
    else if (page === 'my-campaign') navigate('/my-campaign');
    else if (page === 'applications') navigate('/applications');
  };

  const handleLogout = () => {
    navigate('/auth/login');
    console.log('User logged out');
  };

  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader
        userRole={'influencer'}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onLogout={handleLogout}
        userName={'KangDev'}
        userAvatar={'https://avatars.githubusercontent.com/u/12345678?v=4'}
      />
      <main className="container mx-auto px-20 py-8 relative">
        <Outlet />
        <PopUpTrigger />
      </main>
      {/* <AppFooter /> */}
    </div>
  );
}

export default AppLayout;
