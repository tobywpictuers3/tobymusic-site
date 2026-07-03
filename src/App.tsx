import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Header, Footer } from "./components/shared";
import Home from "./pages/Home";
import Members from "./pages/Members";
import {
  About,
  Performances,
  Orchestras,
  Teaching,
  Scores,
  Blog,
  Contact,
  NotFound,
} from "./pages/pages";

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
          <Route path="/teaching" element={<Teaching />} />
          <Route path="/scores" element={<Scores />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/members" element={<Members />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
