import React from 'react'
import Navbar from '../components/Navbar'
import HeroBanner from '../components/HeroBanner'
import SearchFilter from '../components/SearhFilter'
import CardContainer from '../components/CardContainer'
import Footer from '../components/Footer'

const Home = () => {
    
  return (
    <div>
      
        <HeroBanner />
        <SearchFilter />
        <CardContainer batchSize={9}/>
        
    </div>
  )
}

export default Home