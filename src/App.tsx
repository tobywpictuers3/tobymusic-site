import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Header, Footer } from "./components/shared";
import Home from "./pages/Home";
import Members from "./pages/Members";
import { About, Performances, Orchestras, Contact, NotFound } from "./pages/pages2";
import { Students, Sheets, Blog } from "./pages/pages3";
import { Accessibility, Privacy } from "./pages/pages4";
import Admin from "./pages/Admin";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/performances" element={<Performances />} />
          <Route path="/orchestras" element={<Orchestras />} />
          <Route path="/students" element={<Students />} />
          <Route path="/sheets" element={<Sheets />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/members" element={<Members />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/accessibility" element={<Accessibility />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/admin" element={<Admin />} />
          {/* הפניות מנתיבי הגרסה הקודמת */}
          <Route path="/teaching" element={<Navigate to="/students" replace />} />
          <Route path="/scores" element={<Navigate to="/sheets" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
