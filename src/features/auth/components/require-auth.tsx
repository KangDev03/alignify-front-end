import type { JSX } from 'react';
import { Navigate, useLocation } from 'react-router';

import { useAppSelector } from '@/hooks/redux';

export function RequireAuth({ children }: { children: JSX.Element }) {
  const token = useAppSelector((state) => state.auth.token);
  const location = useLocation();

  if (!token) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }
  return children;
}
