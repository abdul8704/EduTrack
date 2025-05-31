import React, { useState, useEffect } from 'react';
import "../styles/popup.css"
export const Popup = ({ success, message }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`popup ${success ? 'popup-success' : 'popup-error'}`}>
      <div className="popup-content">
        <span className={`popup-icon ${success ? 'success-icon' : 'error-icon'}`}>
          {success ? '✓' : '✗'}
        </span>
        <span className="popup-message">{message}</span>
      </div>
    </div>
  );
};

