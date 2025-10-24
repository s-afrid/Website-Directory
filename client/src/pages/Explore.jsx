import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CardContainer from '../components/CardContainer'
import SearchFilterHeader from '../components/ExploreHeader'

const Explore = () => {
  return (
    <div>
      <Navbar />
      <SearchFilterHeader />
      <CardContainer />
      <Footer />
    </div>
  )
}

export default Explore
