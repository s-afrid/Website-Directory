import React from "react";
import LoginPopup from "../components/LoginPopup";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <LoginPopup
        onSuccess={() => {
          console.log("✅ Login success → redirecting to /admin/stats");
          sessionStorage.setItem("adminLoggedIn", "true");
          navigate("/admin/stats");
        }}
      />
    </div>
  );
}
