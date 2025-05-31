import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/navbar.css';
import logo from '../assets/zuntraLogo.avif';

const DEFAULT_PROFILE_PIC = "https://static.vecteezy.com/system/resources/thumbnails/005/544/718/small_2x/profile-icon-design-free-vector.jpg";

const NavbarInput = ({ userId }) => {
  const navigate = useNavigate();
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      const encoded = encodeURIComponent(input.trim());
      navigate(`/course/search/${userId}/tags/${encoded}`);
    }
  };

  const handleReset = () => setInput('');

  return (
    <form className="navbar-form" onSubmit={handleSubmit}>
      <input
        className="navbar-input"
        placeholder="Type your text"
        required
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <div className="navbar-buttons-container">
        {input && (
          <button
            className="navbar-reset"
            type="button"
            onClick={handleReset}
            aria-label="Reset search input"
          >
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
        )}
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
      </div>
    </form>
  );
};

export const Navbar = () => {
  const { userId } = useParams();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profilePicture, setProfilePicture] = useState(DEFAULT_PROFILE_PIC);
  const hamburgerRef = useRef(null);
  const dropdownRef = useRef(null);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  useEffect(() => {
    const fetchProfilePic = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/user/${userId}/data/userinfo`);
        if (response.data?.username?.profilePicture) {
          setProfilePicture(response.data.username.profilePicture);
        }
      } catch (error) {
        console.error('Error fetching profile picture:', error);
      }
    };

    if (userId) fetchProfilePic();
  }, [userId]);

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
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [menuOpen]);

  useEffect(() => {
    document.body.classList.toggle('navbar-menu-open', menuOpen);
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
                <NavbarInput userId={userId} />
              </div>
              <div className="navbar-mobile-links">
                <Link to="/">Home</Link>
              </div>
              <div className="navbar-profile-desktop">
                <Link to={`/user/profile/${userId}`}>
                  <img
                    src={profilePicture}
                    alt="Profile"
                    className="navbar-profile-picture"
                  />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="navbar-right-section">
        <div className="navbar-search-desktop">
          <NavbarInput userId={userId} />
        </div>
        <Link to="/">Home</Link>
        <div className="navbar-profile-desktop">
          <Link to={`/user/profile/${userId}`}>
            <img
              src={profilePicture}
              alt="Profile"
              className="navbar-profile-picture"
            />
          </Link>
        </div>
      </div>
    </nav>
  );
};
