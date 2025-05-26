import { Route, Routes } from "react-router";

import LandingLayout from "@/components/layouts/landing/layout";
import ContactPage from '@/pages/contact';

import LandingPage from "./pages/landing";

function Router() {

  return (
    <>
      <Routes>
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
