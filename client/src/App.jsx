import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Explore from "./pages/Explore";
import PrivacyAndTerms from "./pages/PrivacyAndTerms";

export default function App() {
  return (
    <Routes>
      {/* Layout route — Navbar & Footer auto render */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="explore" element={<Explore />} />
        <Route path="privacyandterm" element={<PrivacyAndTerms />} />
      </Route>
    </Routes>
  );
}
