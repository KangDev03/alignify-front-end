import './App.css'
import { Routes, Route } from "react-router";
import HomePage from "./pages/home";
import ContactPage from '@/pages/contact';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </>
  )
}

export default App
