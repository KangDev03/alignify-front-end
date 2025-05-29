import { Route, Routes } from "react-router";

// import avatar from "@/assets/avatar-small.png";
import AppLayout from "@/components/layouts/app/app-layout";
import ForgotPasswordPage from "@/pages/auth/forgot-password";
import LoginPage from "@/pages/auth/login";
import { SelectRolePage } from "@/pages/auth/select-role";
import ContactPage from '@/pages/contact';
import HomePage from "@/pages/home";
import { UserProfilePage } from "@/pages/profile";

import RegisterPage from "./pages/auth/register";

export const mockInfluencer = {
  id: "1",
  name: "Nguyễn Văn Duy Khang",
  avatar: "@/assets/avatar-small.png",
  dateOfBirth: "2004-02-03",
  gender: "male",
  bio: "Content creator passionate about lifestyle and technology",
  socialMediaLinks: {
    instagram: "https://www.instagram.com/_dkhng.uya_/",
    facebook: "https://www.facebook.com/kangdev.324",
    youtube: "youtube.com/@kangdev03",
  },
  rating: 4.8,
  category: ["Công nghệ", "Đời sống", "Games"],
  followers: {
    instagram: 50000,
    youtube: 75000,
    facebook: 25000
  },
  totalFollowers: 250000,
  engagementRate: 5.2,
  completedCampaigns: 15,
  location: "TP. Đà Nẵng"
}

function Router() {
  return (
    <>
      <Routes>
        <Route path="/auth">
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          {/* <Route path="reset-password" element={<ResetPasswordPage />} /> */}
          <Route path="select-role" element={<SelectRolePage />} />
          {/* <Route path="verify-otp" element={<VerifyOtpPage />} /> */}
        </Route>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route 
            path="/user-profile" 
            element={<UserProfilePage influencer={mockInfluencer} />} 
          />
        </Route>
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </>
  )
}

export default Router 
