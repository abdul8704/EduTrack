import React from 'react';
import '../styles/adminnavbar.css';

export const AdminNavbar = ({ modules, activeIndex, toggleModule, isCollapsed }) => {
  return (
    <div className={`course-navbar ${isCollapsed ? 'collapsed' : ''}`}>
      {modules.map((module, index) => (
        <div key={index} className="course-module-wrapper">
          <button
            className="course-nav-btn"
            onClick={() => toggleModule(index)}
          >
            {module.name}
          </button>

          {activeIndex === index && (
            <div className="course-submodule-list">
              {module.submodules.map((sub, subIndex) => (
                <div key={subIndex} className="course-submodule-item">
                  {sub}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
