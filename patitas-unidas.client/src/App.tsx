import { Routes, Route, useLocation } from "react-router-dom"
import { useEffect } from "react";
import Home from "../src/pages/Home"
import { Adopta } from "@/features/animals"
import { Foundations, FoundationDetail } from "@/features/foundations"
import { Dona } from "@/features/donations"
import { Voluntario } from "@/features/volunteers"
import NotFound from "../src/pages/NotFound"
import { WelcomeModal } from "@/components"
import { useWelcomeModal } from "@/hooks"

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  const { isOpen, closeModal } = useWelcomeModal();

  return (
    <>
      <ScrollToTop />
      <WelcomeModal isOpen={isOpen} onClose={closeModal} />
      <Routes>
        <Route path="/patitas-unidas" element={<Home />} />
        <Route path="/adopta" element={<Adopta />} />
        <Route path="/adopta/:id" element={<Adopta />} />
        <Route path="/dona" element={<Dona />} />
        <Route path="/voluntario" element={<Voluntario />} />
        <Route path="/foundations" element={<Foundations />} />
        <Route path="/foundations/:id" element={<FoundationDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
