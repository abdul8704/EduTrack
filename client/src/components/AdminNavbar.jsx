import '../styles/adminnavbar.css';
import { Users, BookOpen } from 'lucide-react';
import { EmployeeDeets } from './EmployeeDeets.jsx'
import { AdminAvailableCourse } from './AdminAvailableCourse.jsx';
import React, { useState, useEffect } from 'react'; 
import axios from 'axios'; 
import { useParams } from 'react-router-dom';


export const AdminNavbar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { userId } = useParams();
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
  const [courses, setCourses] = useState({
    enrolledCourses: [],
    availableCourses: []
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/user/alice@example.com');
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

  

  const [userLoading, setULoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/alice@example.com');
        const allUsers = response.data.allUsers;
        setUsers(allUsers); // Store in state
        setULoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setULoading(false);
      }
    };

    fetchUserData();
  }, []);
  if (userLoading) return <div>Loading...</div>;
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
        {activeIndex === 0 && <div><EmployeeDeets profile={users}/></div>}
        {activeIndex === 1 && <div><AdminAvailableCourse available={courses.availableCourses} /></div>}
      </div>
    </div>
  );
};
