// src/components/ProtectedRoute.jsx
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LoginPopup from "./LoginPopup";

export default function ProtectedRoute({ children }) {
  const [isValid, setIsValid] = useState(false);
  const [checking, setChecking] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const verifyAdmin = async () => {
      const token = sessionStorage.getItem("adminToken");
      const expiry = Number(sessionStorage.getItem("adminTokenExpiry"));

      // 🧩 No token or expired → ask for login
      if (!token || Date.now() > expiry) {
        sessionStorage.clear();
        setShowLogin(true);
        setChecking(false);
        return;
      }

      try {
        const res = await fetch("/api/verify", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        if (res.ok && data.valid) {
          console.log("✅ Token verified");
          setIsValid(true);
        } else {
          console.warn("⚠️ Token invalid, showing login");
          sessionStorage.clear();
          setShowLogin(true);
        }
      } catch (err) {
        console.error("💥 Verify error:", err);
        sessionStorage.clear();
        setShowLogin(true);
      } finally {
        setChecking(false);
      }
    };

    verifyAdmin();
  }, []);

  // 🚀 Redirect to stats only after login success
  useEffect(() => {
    if (isValid && location.pathname === "/admin") {
      navigate("/admin/stats", { replace: true });
    }
  }, [isValid, location.pathname, navigate]);

  if (checking) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-gray-500 font-medium animate-pulse">
          Checking admin session...
        </p>
      </div>
    );
  }

  // 🧱 If login popup is showing, blur page and block interactions
  if (showLogin) {
    return (
      <div className="relative min-h-screen overflow-hidden">
        <div className="blur-sm pointer-events-none select-none">{children}</div>
        <LoginPopup
          onSuccess={() => {
            setIsValid(true);
            setShowLogin(false);
            navigate("/admin/stats");
          }}
          onClose={() => {
            // prevent closing popup — force login
            console.log("⚠️ Login required to access admin panel");
          }}
        />
      </div>
    );
  }

  // ✅ Authenticated — render admin content
  return children;
}
