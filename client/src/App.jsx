import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Explore from "./pages/Explore";
import PrivacyAndPolicy from "./pages/PrivacyAndPolicy";
import TermsAndConditions from "./pages/TermsAndConditions.jsx";
import Details from "./pages/Details";
import Admin from "./pages/Admin";
import LoginPopup from "./components/LoginPopup"; // ensure this is imported
import { SelectedCompanyProvider } from "./context/SelectedCompanyContext.jsx";
import { FilterProvider } from "./context/FilterContext.jsx";

// 🔒 Protected Route

export default function App() {
  const [openForm, setOpenForm] = useState(null);

  return (
    <SelectedCompanyProvider>
      <FilterProvider>
        <Routes>
          {/* Public pages */}
          <Route
            path="/"
            element={<Layout openForm={openForm} setOpenForm={setOpenForm} />}
          >
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="explore" element={<Explore />} />
            <Route path="privacyandpolicy" element={<PrivacyAndPolicy />} />
            <Route path="termsandconditions" element={<TermsAndConditions />} />
            <Route path="details/:id" element={<Details />} />
          </Route>

          {/* Protected Admin */}
          <Route
  path="/admin/*"
  element={
    <ProtectedRoute>
      <Admin />
    </ProtectedRoute>
  }
/>
        </Routes>
      </FilterProvider>
    </SelectedCompanyProvider>
  );
}
