import type { JSX } from 'react';
import { Navigate, useLocation } from 'react-router';

import { useAppSelector } from '@/hooks/redux';

export function RequireAuth({ children }: { children: JSX.Element }) {
  const token = useAppSelector((state) => state.auth.token);
  const location = useLocation();

  if (!token) {
    // Nếu chưa đăng nhập, chuyển hướng về landing-page
    return <Navigate to="/landing-page" state={{ from: location }} replace />;
  }
  return children;
}