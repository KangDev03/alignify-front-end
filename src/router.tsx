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
import ContactPage from '@/pages/contact';
import { HomePage } from '@/pages/home';
import { UserProfilePage } from '@/pages/profile';
import { BrandProfile } from '@/pages/profile/brand-profile';
import { Settings } from '@/pages/setting';

// import ApplicationsPage from './pages/applications';
import RegisterPage from './pages/auth/sign-up';
import MyCampaignPage from './pages/my-campaign';

export const mockInfluencer = {
  id: '1',
  name: 'Nguyễn Văn Duy Khang',
  avatar: '@/assets/avatar-small.png',
  dateOfBirth: '2004-02-03',
  gender: 'male',
  bio: 'Content creator passionate about lifestyle and technology',
  socialMediaLinks: {
    instagram: 'https://www.instagram.com/_dkhng.uya_/',
    facebook: 'https://www.facebook.com/kangdev.324',
    youtube: 'youtube.com/@kangdev03',
  },
  rating: 4.8,
  category: ['Công nghệ', 'Đời sống', 'Games'],
  followers: {
    instagram: 50000,
    youtube: 75000,
    facebook: 25000,
  },
  totalFollowers: 250000,
  engagementRate: 5.2,
  completedCampaigns: 15,
  location: 'TP. Đà Nẵng',
};

const mockInfluencer2 = {
  id: '1',
  name: 'Nguyễn Thị Lan',
  avatar: '/placeholder.svg?height=120&width=120',
  dateOfBirth: '1995-03-15',
  gender: 'Nữ',
  bio: 'Content creator chuyên về lifestyle và beauty. Yêu thích chia sẻ những trải nghiệm cuộc sống và tips làm đẹp.',
  socialMediaLinks: {
    instagram: 'https://instagram.com/nguyenthilan',
    tiktok: 'https://tiktok.com/@nguyenthilan',
    youtube: 'https://youtube.com/nguyenthilan',
    facebook: 'https://facebook.com/nguyenthilan',
  },
  rating: 4.8,
  category: ['Thời trang', 'Làm đẹp', 'Lifestyle'],
  followers: {
    instagram: 125000,
    tiktok: 89000,
    youtube: 45000,
    facebook: 67000,
  },
  totalFollowers: 326000,
  engagementRate: 3.2,
  completedCampaigns: 24,
  location: 'TP. Hồ Chí Minh',
};

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
          <Route
            path="/settings"
            element={
              <Settings
                userRole="influencer"
                userName="John"
                userAvatar="avatar.png"
                onBack={() => {}}
              />
            }
          />
          <Route path="/applications" element={<ApplicationsPage />} />
          <Route path="/applicants" element={<Applicants />} />
          <Route path="/my-campaign" element={<MyCampaignPage />} />
          <Route path="/user-profile" element={<UserProfilePage influencer={mockInfluencer} />} />
          <Route path="/user-profile2" element={<BrandProfile brand={mockBrand} />} />
        </Route>
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </>
  );
}

export default Router;
