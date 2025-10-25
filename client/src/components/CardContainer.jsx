import React, { useEffect, useState } from "react";
import Card from "./Card";

const CardContainer = ({ batchSize = 9 }) => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);

  const fetchCompanies = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/companies?skip=${skip}&limit=${batchSize}`);
      const data = await res.json();

      if (Array.isArray(data.companies)) {
        setCompanies((prev) => [...prev, ...data.companies]);
        setTotal(data.total || 0);
        setSkip((prev) => prev + data.companies.length);
      } else {
        console.error("Invalid API response:", data);
      }
    } catch (err) {
      console.error("Error fetching companies:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch first batch on mount
  useEffect(() => {
    fetchCompanies();
  }, []);

  return (
    <div className="flex flex-col items-center px-4 py-8">
      <div className="flex flex-wrap justify-center gap-6 w-full max-w-7xl">
        {companies.map((company) => (
          <Card key={company.id || company._id} company={company} />
        ))}
      </div>

      {skip < total && (
        <button
          onClick={fetchCompanies}
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
