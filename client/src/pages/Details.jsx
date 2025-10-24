import React from 'react'
import Navbar from '../components/Navbar'
import DetailsHeader from '../components/DetailsHeader'
import PageDetails from '../components/PageDetails'
import CardContainer from '../components/CardContainer'
import Footer from '../components/Footer'

const Details = () => {
  return (
    <div>
        <Navbar />
        <DetailsHeader />
        <PageDetails />

        <div className="bg-gray-50/50 py-16 px-4 sm:px-6 lg:px-8">
      {/* Content wrapper with max-width for centering on large screens */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1F2937]"> {/* Dark blue/navy text color */}
          Similar Website Examples
        </h2>
        <p className="mt-2 text-lg text-gray-700">
          Explore stunning SaaS website designs for inspiration and creative ideas.
        </p>
      </div>
    </div>

        <CardContainer />
        <Footer />
    </div>
  )
}

export default Details