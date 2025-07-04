import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { toast } from 'sonner';
import Stomp from 'stompjs';

// import AppFooter from '@/components/layouts/app/footer';
import { AppHeader } from '@/components/layouts/app/header';
import { logout } from '@/features/auth/auth.slice';
import { addReceivedNotification } from '@/features/notification/notification.slice';
import type { RecievedNotification } from '@/features/notification/notification.type';
import PopUpTrigger from '@/features/posting/components/popUp-trigger';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { getStompClient } from '@/lib/stom-client';
import { baseApi } from '@/redux/baseApi';
import type { RootState } from '@/redux/store';

function AppLayout() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(baseApi.util.resetApiState());
    dispatch(logout());
    navigate('/auth/login');
  };
  const { id: userId, token } = useAppSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!token || !userId) return;
    let subscription: any;
    getStompClient(token).then((client) => {
      subscription = client.subscribe(`/topic/notifications/${userId}`, (res: Stomp.Message) => {
        try {
          const received: RecievedNotification = JSON.parse(res.body);
          if (received && received.userId === userId) {
            const { name: title, content: description } = received;
            toast.success(title, { description });
          }
          dispatch(addReceivedNotification(received));
        } catch (error) {
          console.error('Error parsing STOMP message:', error);
        }
      });
    });
    return () => {
      if (subscription) subscription.unsubscribe();
    };
  }, [token, userId, dispatch]);

  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader onLogout={handleLogout} />
      <main className="container mx-auto px-6 py-8 relative">
        <Outlet />
        <PopUpTrigger />
      </main>
      {/* <AppFooter /> */}
    </div>
  );
}

export default AppLayout;
