import { Outlet, useNavigate } from 'react-router';

// import AppFooter from '@/components/layouts/app/footer';
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
      <AppHeader onLogout={handleLogout} />
      <main className="container mx-auto px-20 py-8 relative">
        <Outlet />
        <PopUpTrigger />
      </main>
      {/* <AppFooter /> */}
    </div>
  );
}

export default AppLayout;
