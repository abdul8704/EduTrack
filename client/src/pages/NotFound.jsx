import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/notfound.css';

export const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="error-number">404</div>
        <h1 className="error-title">Page Not Found</h1>
        <p className="error-description">
          Oops! The page you're looking for seems to have wandered off into the digital wilderness.
        </p>
        <button className="home-button" onClick={handleGoHome}>
          Take Me Home
        </button>
      </div>
      <div className="decorative-elements">
        <div className="floating-circle circle-1"></div>
        <div className="floating-circle circle-2"></div>
        <div className="floating-circle circle-3"></div>
      </div>
    </div>
  );
};
