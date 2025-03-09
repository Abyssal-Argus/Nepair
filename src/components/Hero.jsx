import React from 'react'
import './hero.css'
import Navbar from '../components/Navbar';
import BG from '../assets/BG.jpg';
import Heroimg from '../assets/heroimg.png';

const Hero = () => {
  return (
    <>
    <Navbar/>
    <div className='hero-container' style={{ backgroundImage: `url(${BG})` }}>
      <div className='herowrapper'>
      <div>
        <img data-aos='zoom-in' data-aos-duration='1500' src={Heroimg} alt="owl" />
      </div>
      <div>
        <p data-aos='fade-down' data-aos-duration='1000' data-aos-delay='300' className='heading'>NepAir</p>
        <p data-aos='fade-up' data-aos-duration='1000' data-aos-delay='400' className='herotext'>Stay Informed About Nepal’s Air Quality with NepAir</p>
        <p data-aos='fade-up' data-aos-duration='1000' data-aos-delay='450' className='herotext'>Nepal’s air quality can fluctuate significantly throughout the year,</p>
        <p data-aos='fade-up' data-aos-duration='1000' data-aos-delay='500' className='herotext'> affecting health, outdoor activities, and daily life. With NepAir,</p>
        <p data-aos='fade-up' data-aos-duration='1000' data-aos-delay='550' className='herotext'> you get real-time updates on the Air Quality Index (AQI)</p>
        <p data-aos='fade-up' data-aos-duration='1000' data-aos-delay='600' className='herotext'> across various regions of Nepal, helping you make informed decisions</p>
        <p data-aos='fade-up' data-aos-duration='1000' data-aos-delay='650' className='herotext'> about when it’s safe to go outside, exercise, or take precautions against pollution.</p>
      </div>
      </div>
    </div>
    </>
  )
}

export default Hero
