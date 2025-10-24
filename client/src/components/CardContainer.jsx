import React, { useEffect, useState } from "react";
import Card from "./Card";

const CardContainer = () => {
  const [companies, setCompanies] = useState([]);
  const [visibleCount, setVisibleCount] = useState(9);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/companies");
        const data = await res.json();
        setCompanies(data);
      } catch (err) {
        console.error("Error fetching companies:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCompanies();
  }, []);

  const handleViewMore = () => {
    setVisibleCount((prev) => prev + 9);
  };

  return (
    <div className="flex flex-col items-center px-4 py-8">
      <div className="flex flex-wrap justify-center gap-6 w-full max-w-7xl">
        {loading ? (
          <p className="text-gray-500 w-full text-center">Loading...</p>
        ) : (
          companies.slice(0, visibleCount).map((company) => (
            <Card
              key={company.id || company._id}
              title={company.title || "Untitled"}
              description={company.oneLineDesc || ""}
              tags={[
                company.tags?.industry,
                company.tags?.type,
              ].filter(Boolean)}
              price={company.details?.monRevenue || "N/A"}
              image={company.imageURL || ""}
              featured={company.isFeatured}
              sponsored={company.isSponsored}
              link={company.url || "#"}
            />
          ))
        )}
      </div>

      {visibleCount < companies.length && (
        <button
          onClick={handleViewMore}
          className="mt-8 px-6 py-3 bg-black text-white rounded-full hover:bg-gray-900 transition-colors"
        >
          View More Examples
        </button>
      )}
    </div>
  );
};

export default CardContainer;
