import React, { useEffect, useState } from "react";
import Card from "./Card";

const CardContainer = () => {
  const [companies, setCompanies] = useState([]);
  const [visibleCount, setVisibleCount] = useState(9);
  const [loading, setLoading] = useState(false);

  // Fetch companies from backend
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
    <div className="flex flex-col items-center">
      <div className="flex flex-wrap justify-center gap-4 w-full p-4">
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
                company.tags?.style,
                company.tags?.stack,
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
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
        >
          View More Examples
        </button>
      )}
    </div>
  );
};

export default CardContainer;
