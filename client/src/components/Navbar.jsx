import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';
import logo from '../assets/zuntraLogo.avif';

const NavbarInput = () => {
  return (
    <form className="navbar-form">
      <button className="navbar-search-button" type="submit" aria-label="Search">
        <svg width={17} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" role="img">
          <path
            d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
            stroke="currentColor"
            strokeWidth="1.333"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <input className="navbar-input" placeholder="Type your text" required type="text" />
      <button className="navbar-reset" type="reset" aria-label="Reset search input">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="navbar-reset-icon"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </form>
  );
};

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const hamburgerRef = useRef(null);
  const dropdownRef = useRef(null);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  // Close menu on window resize if desktop and toggle body scroll lock
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [menuOpen]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('navbar-menu-open');
    } else {
      document.body.classList.remove('navbar-menu-open');
    }
  }, [menuOpen]);

  return (
    <nav className={`navbar-navbar ${menuOpen ? 'navbar-expanded' : ''}`}>
      <div className="navbar-left-section-row">
        <div className="navbar-logo-container">
          <img src={logo} alt="Logo" className="navbar-logo" />
        </div>

        <div className="navbar-hamburger-container" ref={hamburgerRef}>
          <button
            className="navbar-hamburger"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? '✕' : '≡'}
          </button>
          {menuOpen && (
            <div className="navbar-mobile-menu" ref={dropdownRef}>
              <div className="navbar-search-mobile">
                <NavbarInput />
              </div>
              <div>
              <Link to="/">Home</Link>
              <Link to="/about">About</Link>
              <Link to="/contact">Contact</Link>
              </div>
              <div>
                <Link to="/login" className="navbar-button">
                  Login
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Desktop right section */}
      <div className="navbar-right-section">
        <div className="navbar-search-desktop">
          <NavbarInput />
        </div>
              <div>
              <Link to="/">Home</Link>
              <Link to="/about">About</Link>
              <Link to="/contact">Contact</Link>
              </div>
        <Link to="/login" className="navbar-button">
          Login
        </Link>
      </div>
    </nav>
  );
};
