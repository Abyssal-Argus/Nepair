import React from 'react'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const UserDash = () => {
  return (
    <>
    <Navbar/>
    <div>
        <h1>User Dashboard</h1>
        <p>This is your personal dashboard where you can view and manage your NepAir account details.</p>
    </div>
    <Footer/>
    </>
  )
}

export default UserDash