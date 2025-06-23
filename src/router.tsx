import { Route, Routes } from 'react-router';

// import avatar from "@/assets/avatar-small.png";
import AppLayout from '@/components/layouts/app/app-layout';
import { Applicants } from '@/pages/applicants';
import { ApplicationsPage } from '@/pages/applications';
import ForgotPasswordPage from '@/pages/auth/forgot-password';
import ResetPasswordPage from '@/pages/auth/reset-password';
import { SelectRolePage } from '@/pages/auth/select-role';
import LoginPage from '@/pages/auth/sign-in';
import VerifyOtpPage from '@/pages/auth/verify-otp';
import { HomePage } from '@/pages/home';
import UserProfilePage from '@/pages/profile';
import { BrandProfile } from '@/pages/profile/brand-profile';
import { Settings } from '@/pages/setting';

import { useAppSelector } from './hooks/redux';
// import ApplicationsPage from './pages/applications';
import RegisterPage from './pages/auth/sign-up';
import MyCampaignPage from './pages/my-campaign';
import type { RootState } from './redux/store';

const mockBrand = {
  id: '1',
  name: 'Beauty Plus Vietnam',
  avatar: '/placeholder.svg?height=120&width=120',
  companyName: 'Công ty TNHH Beauty Plus Vietnam',
  category: ['Làm đẹp', 'Chăm sóc da'],
  bio: 'Thương hiệu mỹ phẩm hàng đầu Việt Nam, chuyên cung cấp các sản phẩm chăm sóc da và làm đẹp chất lượng cao.',
  contactInfo: {
    email: 'contact@beautyplus.vn',
    phone: '+84 28 1234 5678',
    address: '123 Nguyễn Huệ, Quận 1, TP. HCM',
  },
  website: 'https://beautyplus.vn',
  establishedYear: 2018,
  companySize: '50-100 nhân viên',
  verificationStatus: 'verified' as const,
  campaignHistory: 45,
  budgetRange: '10-50 triệu VNĐ',
  industry: 'Mỹ phẩm & Chăm sóc sức khỏe',
};

function Router() {
  const { role: roleName } = useAppSelector((state: RootState) => state.auth);

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/auth">
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="reset-password/:token" element={<ResetPasswordPage />} />
          <Route path="select-role" element={<SelectRolePage />} />
          <Route path="verify-otp" element={<VerifyOtpPage />} />
        </Route>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/applications" element={<ApplicationsPage />} />
          <Route path="/applicants" element={<Applicants />} />
          <Route path="/my-campaign" element={<MyCampaignPage />} />
          {roleName === 'INFLUENCER' && (
            <Route path="/user-profile" element={<UserProfilePage />} />
          )}
          {roleName === 'BRAND' && (
            <Route path="/user-profile" element={<BrandProfile brand={mockBrand} />} />
          )}
        </Route>
      </Routes>
    </>
  );
}

export default Router;
