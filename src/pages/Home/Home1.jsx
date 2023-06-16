import React from 'react';
import Header from '../../components/Header/Header1';
import Footer from '../../components/Header/Footer';
import { Outlet } from 'react-router-dom';

const Home = () => {
  return (
    <main>
        <Header />
        <Outlet />
        <Footer/>
        
    </main>
  )
}

export default Home
