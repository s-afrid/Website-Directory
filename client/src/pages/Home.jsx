import React from 'react'
import Navbar from '../components/Navbar'
import HeroBanner from '../components/HeroBanner'
import SearchFilter from '../components/SearhFilter'
import Card from '../components/Card'

const Home = () => {
    const website =  {
      title: "Nova Design",
      description: "Creative SaaS portfolio with minimal design.",
      tags: ["Portfolio", "Creative"],
      price: "$5K/Month",
      featured: false,
      sponsored: true,
      image: "https://saaspo.com/cdn-cgi/image/format=avif,quality=90/https://cdn.prod.website-files.com/6399d2d87f63ad4774e11dc2/68f69090164b2278f2535542_take---2025-10-20T203430.674-(1).jpeg",
      link: "#",
    }
  return (
    <div>
        <Navbar/>
        <HeroBanner />
        <SearchFilter />
        <Card {...website}/>
    </div>
  )
}

export default Home