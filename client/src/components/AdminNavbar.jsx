import React, { useState } from 'react';
import '../styles/adminnavbar.css';
import { Users, BookOpen } from 'lucide-react';
import { EmployeeDeets } from './EmployeeDeets.jsx'
import { AvailableCourses } from './AvailableCourses.jsx';

export const AdminNavbar = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const options = [
    { label: 'Employee Progress', icon: <Users size={18} className="admnav-icon" /> },
    { label: 'Manage Course', icon: <BookOpen size={18} className="admnav-icon" /> }
  ];

  const toggleModule = (index) => {
    setActiveIndex(index);
  };

  const toggleNavbar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="admnav-container">
      <div className={`admnav-navbar ${isCollapsed ? 'admnav-collapsed' : ''}`}>
        {options.map((item, index) => (
          <div key={index} className="admnav-module-wrapper">
            <button
              className={`admnav-nav-btn ${activeIndex === index ? 'admnav-active-module' : ''}`}
              onClick={() => toggleModule(index)}
            >
              {item.icon}
              <span className="admnav-label">{item.label}</span>
            </button>
          </div>
        ))}
      </div>

      <button className="admnav-hamburger" onClick={toggleNavbar}>
        {isCollapsed ? '>' : '<'}
      </button>

      <div className="admnav-module">
        {activeIndex === 0 && <div><EmployeeDeets/></div>}
        {activeIndex === 1 && <div><AvailableCourses/></div>}
      </div>
    </div>
  );
};
