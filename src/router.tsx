import { Routes, Route } from "react-router";
import LandingPage from "./pages/landing";
import ContactPage from '@/pages/contact';
import LandingLayout from "@/components/layouts/landing/layout";

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
