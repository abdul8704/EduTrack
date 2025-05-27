import { Link } from 'react-router-dom';
import React from 'react';
import '../styles/navbar.css';
import logo from '../assets/zuntraLogo.avif'; 

export const Navbar = () => {
  return (
    <nav className="navbar-navbar">
      <div className="navbar-left-section">
        <div className="navbar-logo-container">
          <img src={logo} alt="Logo" className="navbar-logo" />
        </div>
        <div className="navbar-search-container">
          <NavbarInput />
        </div>
      </div>
      <div className="navbar-right-section">
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Contact</a>
        <Link to="/login" className="navbar-button">Login</Link>
      </div>
    </nav>
  );
};

const NavbarInput = () => {
  return (
    <form className="navbar-form">
      <button className="navbar-search-button">
        <div className="navbar-shadow-input" />
        <svg width={17} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="search">
          <path d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9" stroke="currentColor" strokeWidth="1.333" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <input className="navbar-input" placeholder="Type your text" required type="text" />
      <button className="navbar-reset" type="reset">
        <svg xmlns="http://www.w3.org/2000/svg" className="navbar-reset-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </form>
  );
};

 