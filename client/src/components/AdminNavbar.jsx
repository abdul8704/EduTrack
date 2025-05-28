import '../styles/adminnavbar.css';
import { Users, BookOpen } from 'lucide-react';
import { EmployeeDeets } from './EmployeeDeets.jsx'
import { AvailableCourses } from './AvailableCourses.jsx';
import React, { useState, useEffect } from 'react'; 
import axios from 'axios'; 


export const AdminNavbar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const options = [
    { label: 'Employee Progress', icon: <Users size={18} className="admnav-icon" /> },
    { label: 'Manage Course', icon: <BookOpen size={18} className="admnav-icon" /> }
  ];

  const toggleModule = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const toggleNavbar = () => {
    setIsCollapsed(!isCollapsed);
  };
  const [courses, setCourses] = useState({
    enrolledCourses: [],
    availableCourses: []
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/user/');
        setCourses({
          enrolledCourses: response.data.enrolledCourses,
          availableCourses: response.data.availableCourses
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching course data:', error);
        setLoading(false);
      }
    };

    fetchCourseData();
  }, []);

  if (loading) return <div>Loading...</div>;
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
        {activeIndex === 1 && <div><AvailableCourses available={courses.availableCourses} /></div>}
      </div>
    </div>
  );
};
