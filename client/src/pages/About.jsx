import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AboutHeader from '../components/AboutHeader'
import AboutContent from '../components/AboutContent'

const About = () => {
  return (
    <div>
        <Navbar />
        <AboutHeader />
        <AboutContent />
        <Footer />
    </div>
  )
}

export default About