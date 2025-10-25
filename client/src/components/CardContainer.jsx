import React, { useEffect, useState, useContext } from "react";
import Card from "./Card";
import { FilterContext } from "../context/FilterContext";

const CardContainer = ({ batchSize = 9 }) => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);
  const [url, setUrl] = useState(""); // 🔹 Track current URL
  const { filters } = useContext(FilterContext);

  // 🔹 Update URL whenever filters or skip change
  useEffect(() => {
    const filterQuery = filters
      ? Object.entries(filters)
          .map(
            ([key, value]) =>
              `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
          )
          .join("&")
      : "";

    const newUrl = `/api/companies?skip=${skip}&limit=${batchSize}${filterQuery ? `&${filterQuery}` : ""}`;
    console.log("Current URL:", newUrl);
    setUrl(newUrl);
  }, [filters, skip, batchSize]);

  // 🔹 Fetch companies only when URL changes
  useEffect(() => {
    if (!url) return;
    const fetchCompanies = async () => {
      setLoading(true);
      try {
        const res = await fetch(url);
        const data = await res.json();
        if (Array.isArray(data.companies)) {
          // If skip is 0, replace; otherwise append
          setCompanies((prev) => (skip === 0 ? data.companies : [...prev, ...data.companies]));
          setTotal(data.total || 0);
        }
      } catch (err) {
        console.error("Error fetching companies:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCompanies();
  }, [url]); // ✅ Only runs when URL changes

  return (
    <div className="flex flex-col items-center px-4 py-8">
      <div className="flex flex-wrap justify-center gap-6 w-full max-w-7xl">
        {companies.map((company) => (
          <Card key={company.id || company._id} company={company} />
        ))}
      </div>

      {skip + companies.length < total && (
        <button
          onClick={() => setSkip((prev) => prev + batchSize)}
          disabled={loading}
          className="mt-8 px-6 py-3 bg-black text-white rounded-full hover:bg-gray-900 transition-colors disabled:opacity-50"
        >
          {loading ? "Loading..." : "Load More Examples"}
        </button>
      )}
    </div>
  );
};

export default CardContainer;
