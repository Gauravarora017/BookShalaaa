import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Header/Footer';
import About from '../About/About'

// import { Outlet } from 'react-router-dom';

const Home = () => {
  return (
    <main>
        <Header />
        <About/>
        <Footer/>
        
    </main>
  )
}

export default Home
