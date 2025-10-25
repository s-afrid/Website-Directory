import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Layout from "./components/Layout";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Explore from "./pages/Explore";
import PrivacyAndPolicy from "./pages/PrivacyAndPolicy";
import TermsAndConditions from "./pages/TermsAndConditions.jsx";
import Details from "./pages/Details";

import { SelectedCompanyProvider } from "./context/SelectedCompanyContext.jsx";

export default function App() {
  const [openForm, setOpenForm] = useState(null); // 🔹 controls which popup is open

  return (
    <SelectedCompanyProvider>
      <Routes>
        {/* Layout route — Navbar & Footer auto render */}
        <Route
          path="/"
          element={<Layout openForm={openForm} setOpenForm={setOpenForm} />}
        >
          <Route index element={<Home />} key={window.location.pathname} />
          <Route path="about" element={<About />} key={window.location.pathname} />
          <Route path="contact" element={<Contact />} key={window.location.pathname} />
          <Route path="explore" element={<Explore />} key={window.location.pathname} />
          <Route path="privacyandpolicy" element={<PrivacyAndPolicy />} key={window.location.pathname} />
          <Route path="termsandconditions" element={<TermsAndConditions />} key={window.location.pathname} />
          <Route path="details/:id" element={<Details />} />
        </Route>
      </Routes>
    </SelectedCompanyProvider>
  );
}
