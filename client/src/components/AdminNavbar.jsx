import React from 'react';
import '../styles/adminnavbar.css';

export const AdminNavbar = ({ modules, toggleModule, isCollapsed }) => {
  return (
    <div className={`admnav-navbar ${isCollapsed ? 'admnav-collapsed' : ''}`}>
      {modules.map((module, index) => (
        <div key={index} className="admnav-module-wrapper">
          <button
            className="admnav-nav-btn"
            onClick={() => toggleModule(index)}
          >
            {module.name}
          </button>
        </div>
      ))}
    </div>
  );
};
