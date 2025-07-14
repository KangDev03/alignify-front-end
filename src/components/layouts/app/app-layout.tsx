import { useCallback, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { toast } from 'sonner';
import Stomp from 'stompjs';

// import AppFooter from '@/components/layouts/app/footer';
import { AppHeader } from '@/components/layouts/app/header';
import { useTheme } from '@/components/theme/theme-provider';
import ChatBot from '@/features/assitant/components/chatbot';
import { logout } from '@/features/auth/auth.slice';
import type { UserBan } from '@/features/auth/auth.type';
import { addReceivedNotification } from '@/features/notification/notification.slice';
import type { RecievedNotification } from '@/features/notification/notification.type';
import PopUpTrigger from '@/features/posting/components/popUp-trigger';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { getStompClient } from '@/lib/stom-client';
import { cn } from '@/lib/utils';
import { baseApi } from '@/redux/baseApi';
import type { RootState } from '@/redux/store';
import { formatDate, formatTime, parseIsoToDateTime } from '@/utils/format';

function AppLayout() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { theme } = useTheme();
  const location = useLocation();

  const handleLogout = useCallback(() => {
    dispatch(baseApi.util.resetApiState());
    dispatch(logout());
    navigate('/auth/login');
  }, [dispatch, navigate]);
  const { id: userId, token, role: roleName } = useAppSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!token || !userId) return;
    let subscription: any;
    getStompClient(token).then((client) => {
      subscription = client.subscribe(`/topic/users/${userId}`, (res: Stomp.Message) => {
        try {
          const received: UserBan = JSON.parse(res.body);
          if (received && received.userId && received.userId === userId) {
            toast.warning(
              'Tài khoản của bạn đã bị khóa vào lúc: ' +
                formatTime(parseIsoToDateTime(received.createdAt)) +
                ' ' +
                formatDate(parseIsoToDateTime(received.createdAt)),
            );
            handleLogout();
          }
        } catch (error) {
          console.error('Error parsing STOMP message:', error);
        }
      });
    });
    return () => {
      if (subscription) subscription.unsubscribe();
    };
  }, [token, userId, dispatch, handleLogout]);

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

  useEffect(() => {
    if (token && userId) {
      getStompClient(token!).then((client) => {
        if (client.connected) {
          client.send(`/app/checkBanned/${userId}`, { Authorization: `Bearer ${token}` });
        }
      });
    }
  }, [token, userId]);

  let backgroundImage: string | undefined = undefined;
  if (roleName !== 'ADMIN') {
    backgroundImage =
      theme === 'dark' ||
      (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
        ? '/background-dark.png'
        : '/background-light.png';
  }

  return (
    <div
      className="flex min-h-screen flex-col bg-cover bg-no-repeat bg-fixed"
      style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {}}
    >
      <AppHeader onLogout={handleLogout} />
      <main
        className={cn(
          !location.pathname.includes('/dashboard') && 'container mx-auto px-6 py-8 relative ',
        )}
      >
        <Outlet />
        <PopUpTrigger />
        <ChatBot />
      </main>
      {/* <AppFooter /> */}
    </div>
  );
}

export default AppLayout;
