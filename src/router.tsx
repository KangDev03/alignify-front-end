import { Route, Routes } from "react-router";

import LandingLayout from "@/components/layouts/landing/layout";
import ForgotPasswordPage from "@/pages/auth/forgot-password";
import LoginPage from "@/pages/auth/login";
import { SelectRolePage } from "@/pages/auth/select-role";
import ContactPage from '@/pages/contact';

import LandingPage from "./pages/landing";

function Router() {

  return (
    <>
      <Routes>
        <Route path="/auth">
          <Route path="login" element={<LoginPage />} />
          {/* <Route path="register" element={<RegisterPage />} /> */}
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          {/* <Route path="reset-password" element={<ResetPasswordPage />} /> */}
          <Route path="select-role" element={<SelectRolePage />} />
          {/* <Route path="verify-otp" element={<VerifyOtpPage />} /> */}
        </Route>
        <Route element={<LandingLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<LandingPage />} />
        </Route>
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </>
  )
}

export default Router 
