import { Route, Routes } from 'react-router';

import AppLayout from '@/components/layouts/app/app-layout';
import { RequireAuth } from '@/features/auth/components/require-auth';
import AdminPage from '@/pages/admin';
import { Applicants } from '@/pages/applicants';
import { ApplicationsPage } from '@/pages/applications';
import ForgotPasswordPage from '@/pages/auth/forgot-password';
import ResetPasswordPage from '@/pages/auth/reset-password';
import { SelectRolePage } from '@/pages/auth/select-role';
import LoginPage from '@/pages/auth/sign-in';
import VerifyOtpPage from '@/pages/auth/verify-otp';
import { CampaignManagement } from '@/pages/campaign-management';
import { HomePage } from '@/pages/home';
import Invitation from '@/pages/invitation';
import { LandingPage } from '@/pages/landing-page';
import { BrandProfilePage } from '@/pages/profile/brand-profile';
import InfluencerProfilePage from '@/pages/profile/influencer-profile';
import { Settings } from '@/pages/setting';
import { Statistics } from '@/pages/statistics';
import { UpgradePlan } from '@/pages/upgrade-plan';

import { useAppSelector } from './hooks/redux';
import RegisterPage from './pages/auth/sign-up';
import MyCampaignPage from './pages/my-campaign';
import type { RootState } from './redux/store';

function Router() {
  const { role: roleName } = useAppSelector((state: RootState) => state.auth);

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth">
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="reset-password/:token" element={<ResetPasswordPage />} />
          <Route path="select-role" element={<SelectRolePage />} />
          <Route path="verify-otp" element={<VerifyOtpPage />} />
        </Route>
        <Route element={
          <RequireAuth>
            <AppLayout />
          </RequireAuth>
        }>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/applications" element={<ApplicationsPage />} />
          <Route path="/applicants" element={<Applicants />} />
          <Route path="/my-campaign" element={<MyCampaignPage />} />
          <Route path="/campaign-management" element={<CampaignManagement />} />
          <Route path="/invitation" element={<Invitation />} />
          <Route path="/statistics" element={<Statistics userRole={roleName} />} />
          <Route path="/upgrade-plan" element={<UpgradePlan userRole={roleName} />} />
          {roleName === 'INFLUENCER' && (
            <Route path="/user-profile" element={<InfluencerProfilePage />} />
          )}
          {roleName === 'BRAND' && <Route path="/user-profile" element={<BrandProfilePage />} />}
          <Route path="/influencer/:userId" element={<InfluencerProfilePage />} />
          <Route path="/brand/:userId" element={<BrandProfilePage />} />
          {roleName === 'ADMIN' && <Route path="/dashboard" element={<AdminPage />} />}
        </Route>
      </Routes>
    </>
  );
}

export default Router;
