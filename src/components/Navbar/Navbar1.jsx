import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logoImg from '../../images/logo.png';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import { FaShoppingCart } from 'react-icons/fa';
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const handleNavbar = () => setToggleMenu(!toggleMenu);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Additional logic if needed
        window.location.href = "/"; // Redirect to the login page or any other desired page
      })
      .catch((error) => {
        // Handle logout error if needed
        console.error("Logout error:", error);
      });
  };

  return (
    <nav className="navbar" id="navbar">
      <div className="container navbar-content flex">
        <div className="brand-and-toggler flex flex-sb">
          <Link to="/" className="navbar-brand flex">
            <img src={logoImg} alt="site logo" />
            <span className="text-uppercase fw-7 fs-24 ls-1">BookShala</span>
          </Link>
          <button type="button" className="navbar-toggler-btn" onClick={handleNavbar}>
            <HiOutlineMenuAlt3 size={35} style={{ color: `${toggleMenu ? '#fff' : '#010101'}` }} />
          </button>
        </div>

        <div className={toggleMenu ? 'navbar-collapse show-navbar-collapse' : 'navbar-collapse'}>
          <ul className="navbar-nav">
            {/* <li className="nav-item">
              <Link to="/book" className="nav-link text-uppercase text-white fs-22 fw-6 ls-1">
                Home
              </Link>
            </li> */}
            <li className="nav-item">
              <Link to="about" className="nav-link text-uppercase text-white fs-22 fw-6 ls-1">
                About
              </Link>
            </li>
            <li className="nav-item">
              <button className="nav-link text-uppercase text-white fs-22 fw-6 ls-1" onClick={handleLogout}>
                Logout
              </button>
            </li>
            <li className="nav-item">
              <div className="cart-container">
                <Link to="cart" className="cart-button">
                  <FaShoppingCart size={24} />
                  {/* <span className="cart-count"></span> */}
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;