import React, { useState } from 'react'
import Map from '../components/Map';
import Hero from '../components/Hero';
import OldData from '../components/OldData';
import Footer from '../components/Footer';

const Home = () => {
  const [showInfo, setShowInfo] = useState(false);
  return (
    <>
        <Hero/>
      <div className='content'>
        <Map showInfo={showInfo} setShowInfo={setShowInfo} />
        <OldData showInfo={showInfo} setShowInfo={setShowInfo} />
      </div>
      <Footer/>
    </>
  )
}

export default Home
