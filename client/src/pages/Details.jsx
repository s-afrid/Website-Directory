import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import DetailsHeader from '../components/DetailsHeader';
import PageDetails from '../components/PageDetails';
import CardContainer from '../components/CardContainer';

const Details = () => {
  const { id } = useParams(); // get _id from URL
  const [company, setCompany] = useState(null);

  useEffect(() => {
    setCompany(null);
    fetch(`/api/companies/${id}`)
      .then(res => res.json())
      .then(data => setCompany(data))
      .catch(err => console.log(err));
  }, [id]);

  if (!company) return <div>Loading...</div>;

  return (
    <div>
      <DetailsHeader company={company}/> {/* pass fetched company */}
      <PageDetails />

      <div className="bg-gray-50/50 py-5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1F2937]">
            Similar Website Examples
          </h2>
          <p className="mt-2 text-lg text-gray-700">
            Explore stunning SaaS website designs for inspiration and creative ideas.
          </p>
        </div>
      </div>

      <CardContainer batchSize={6}/>
    </div>
  )
}

export default Details;
