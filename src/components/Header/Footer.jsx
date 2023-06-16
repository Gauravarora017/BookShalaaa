import React from 'react';
import './Footer.css'; // Import your custom CSS file for styling

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p className="footer__text">© 2023 Bookshala. All rights reserved.</p>
        <ul className="footer__links">
          <li><a href="#">Terms of Service</a></li>
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Contact Us</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;