import React, { useState, useEffect } from 'react';

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
      <style jsx>{`
        .popup {
          position: fixed;
          top: 15%;
          right: 2rem;
          padding: 16px 20px;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          z-index: 1000;
          animation: slideIn 0.3s ease-out;
          max-width: 400px;
          min-width: 300px;
        }

        .popup-success {
          background-color: #d4edda;
          border: 1px solid #c3e6cb;
          color: #155724;
        }

        .popup-error {
          background-color: #f8d7da;
          border: 1px solid #f5c6cb;
          color: #721c24;
        }

        .popup-content {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .popup-icon {
          font-size: 18px;
          font-weight: bold;
          flex-shrink: 0;
        }

        .success-icon {
          color: #28a745;
        }

        .error-icon {
          color: #dc3545;
        }

        .popup-message {
          font-size: 14px;
          line-height: 1.4;
        }

        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

