import { Outlet, useNavigate } from 'react-router';

// import AppFooter from '@/components/layouts/app/footer';
import { AppHeader } from '@/components/layouts/app/header';
import { logout } from '@/features/auth/auth.slice';
import PopUpTrigger from '@/features/posting/components/popUp-trigger';
import { useAppDispatch } from '@/hooks/redux';
import { baseApi } from '@/redux/baseApi';

function AppLayout() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(baseApi.util.resetApiState());
    dispatch(logout());
    navigate('/auth/login');
  };

  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader onLogout={handleLogout} />
      <main className="container mx-auto px-20 py-8 relative layout-main">
        <Outlet />
        <PopUpTrigger />
      </main>
      {/* <AppFooter /> */}
    </div>
  );
}

export default AppLayout;
