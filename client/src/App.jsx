import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import SearchFilter from './components/SearchFilter'
import CardContainer from './components/cardContainer'
import Footer from './components/Footer'


function App() {

  return (
    <>
     <Navbar />
     <Hero />
     <SearchFilter />

     <CardContainer />

     <Footer />
    </>
  )
}

export default App
