import { Route, Routes } from "react-router";

import AppLayout from "@/components/layouts/app/app-layout";
import ForgotPasswordPage from "@/pages/auth/forgot-password";
import LoginPage from "@/pages/auth/login";
import { SelectRolePage } from "@/pages/auth/select-role";
import ContactPage from '@/pages/contact';
import HomePage from "@/pages/home";

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
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
        </Route>
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </>
  )
}

export default Router 
