import React from 'react';
import Navbar from "../Navbar/Navbar1";
import SearchForm from "../SearchForm/SearchForm";
import "./Header.css";

const Header = () => {
  return (
    <div className='holder'>
        <header className='header'>
            <Navbar />
            <div className='header-content flex flex-c text-center text-white'>
                <h2 className='header-title text-capitalize'>Unlock a World of Knowledge with Bookshala.</h2><br />
                <p className='header-text fs-18 fw-3'>Your Gateway to Seamless Library Management</p>
                <SearchForm />
            </div>
        </header>
    </div>
  )
}

export default Header