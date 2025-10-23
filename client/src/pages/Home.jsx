import React from 'react'
import Navbar from '../components/Navbar'
import HeroBanner from '../components/HeroBanner'
import SearchFilter from '../components/SearhFilter'
import Card from '../components/Card'

const Home = () => {
    
  return (
    <div>
        <Navbar/>
        <HeroBanner />
        <SearchFilter />
    </div>
  )
}

export default Home