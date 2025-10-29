import React from 'react';
import { User, Calendar, Users, MapPin, DollarSign, Briefcase } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useSelectedCompany } from '../context/SelectedCompanyContext';

const PageDetails = () => {
  const location = useLocation();
  const { selectedCompany, setSelectedCompany } = useSelectedCompany();

  const company = location.state?.company || selectedCompany;

  React.useEffect(() => {
    if (location.state?.company) {
      setSelectedCompany(location.state.company);
    }
  }, [location.state, setSelectedCompany]);

  if (!company) return <div>Loading...</div>;


  const {
    details = {},
    tags = {},
    fullDesc = ''
  } = company;

  // Map API data to stat items
  const statItems = [
    { icon: User, title: 'Founder', value: details.founder || 'N/A', color: 'text-[#12B76A]' },
    { icon: Calendar, title: 'Founded', value: details.year || 'N/A', color: 'text-[#12B76A]' },
    { icon: Users, title: 'Team Size', value: details.size || 'N/A', color: 'text-[#12B76A]' },
    { icon: MapPin, title: 'Location', value: details.location || 'N/A', color: 'text-[#12B76A]' },
    { icon: DollarSign, title: 'Monthly Revenue', value: details.monRevenue || 'N/A', color: 'text-[#12B76A]' },
    { icon: Briefcase, title: 'Funding', value: details.funding || 'N/A', color: 'text-[#12B76A]' },
  ];

  const additionalDetails = [
    { label: 'Industry', value: tags.industry || 'N/A' },
    { label: 'Type', value: tags.type || 'N/A' },
    { label: 'Style', value: tags.style || 'N/A' },
    { label: 'Stack', value: tags.stack || 'N/A' },
  ];

  return (
    <div className="w-full bg-white flex justify-center py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Description and Key Stats */}
        <div className="lg:col-span-2">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Description</h2>
          <div className="space-y-6 text-gray-700 text-lg">
            <p>{fullDesc}</p>
          </div>

          {/* Key Stats Grid */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {statItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition duration-300"
              >
                <div className={`p-3 rounded-full bg-white mr-4 shadow-sm border border-gray-100`}>
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-500">{item.title}</span>
                  <span className="text-base font-semibold text-gray-900">
                    {item.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Additional Details (Sidebar) */}
        <div className="lg:col-span-1 border-t pt-8 lg:border-t-0 lg:pt-0">
          <div className="bg-white p-6 rounded-xl">
            <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-3">Additional Detail</h2>
            <div className="space-y-4">
              {additionalDetails.map((detail, index) => (
                <div key={index} className="flex flex-col">
                  <span className="text-sm text-gray-500 mb-1">{detail.label}</span>
                  <span className="text-base font-medium text-black hover:text-gray-900 underline underline-offset-1 cursor-pointer">
                    {detail.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PageDetails;
