import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CardContainer from '../components/CardContainer'
import SearchFilterHeader from '../components/ExploreHeader'

const Explore = () => {
  return (
    <div>
      
      <SearchFilterHeader />
      <CardContainer batchSize={6}/>
      
    </div>
  )
}

export default Explore
