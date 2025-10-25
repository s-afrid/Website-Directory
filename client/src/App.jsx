import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";
import Layout from "./components/Layout";
import LoginPopup from "./components/LoginPopup.jsx";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Explore from "./pages/Explore";
import PrivacyAndPolicy from "./pages/PrivacyAndPolicy";
import TermsAndConditions from "./pages/TermsAndConditions.jsx";
import Details from "./pages/Details";
import Admin from "./pages/Admin";

import { SelectedCompanyProvider } from "./context/SelectedCompanyContext.jsx";
import { FilterProvider } from "./context/FilterContext.jsx";

// 🔒 Protected Route component
function ProtectedRoute({ isAuthenticated, onLoginRequired, children }) {
  if (!isAuthenticated) {
    onLoginRequired?.();
    return null; // Don't render the protected content
  }
  return children;
}

export default function App() {
  const [openForm, setOpenForm] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [redirectPath, setRedirectPath] = useState("/");

  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setShowLogin(false);
    navigate(redirectPath); // redirect after successful login
  };

  return (
    <SelectedCompanyProvider>
      <FilterProvider>
        {/* Login Popup */}
        {showLogin && (
          <LoginPopup
            onClose={() => setShowLogin(false)}
            onSuccess={handleLoginSuccess}
          />
        )}

        <Routes>
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

            {/* Admin Protected Route */}
            <Route
              path="admin"
              element={
                <ProtectedRoute
                  isAuthenticated={isAuthenticated}
                  onLoginRequired={() => {
                    setRedirectPath("/admin"); // remember the attempted path
                    setShowLogin(true);
                  }}
                >
                  <Admin />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </FilterProvider>
    </SelectedCompanyProvider>
  );
}
