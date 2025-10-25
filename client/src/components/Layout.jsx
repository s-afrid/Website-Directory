import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import SponsorInquiryForm from "./SponsorInquiryForm";
import SubmitToGetFeatured from "./SubmitForm";

export default function Layout({ openForm, setOpenForm }) {
  const closeForm = () => setOpenForm(null);

  return (
    <div className="flex flex-col min-h-screen relative">
      {/* 🧭 Navbar always visible */}
      <Navbar
        openSponsorForm={() =>
          setOpenForm(openForm === "sponsor" ? null : "sponsor")
        }
        openSubmitForm={() =>
          setOpenForm(openForm === "submit" ? null : "submit")
        }
      />

      {/* 🩶 Dimmed overlay when popup is open */}
      {openForm && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 z-40 backdrop-blur-sm"
          onClick={closeForm}
        ></div>
      )}

      {/* 🪟 Pop-up forms */}
      {openForm === "sponsor" && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <SponsorInquiryForm closeModal={closeForm} />
        </div>
      )}
      {openForm === "submit" && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <SubmitToGetFeatured closeModal={closeForm} />
        </div>
      )}

      {/* 🧩 Page content will render here */}
      <main className={`grow transition ${openForm ? "blur-sm" : ""}`}>
        <Outlet />
      </main>

      {/* ⚓ Footer always visible */}
      <Footer />
    </div>
  );
}
