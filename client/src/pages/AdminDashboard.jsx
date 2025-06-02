import '../styles/adminDashboard.css';
import { Users, BookOpen, House } from 'lucide-react';
import { EmployeeDeets } from '../components/EmployeeDeets.jsx';
import { AdminAvailableCourse } from '../components/AdminAvailableCourse.jsx';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useLocation, Navigate } from 'react-router-dom';
import { Popup } from '../components/Popup';  // import Popup

export const AdminDashboard = () => {
  const { userId, navId } = useParams();
  const location = useLocation();
  const popupMessage = location.state?.popupMessage;  // get popup message from state

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [courses, setCourses] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userLoading, setULoading] = useState(true);

  const options = [
    { id: 'home', label: 'Home', icon: <House size={18} className="admnav-icon" /> },
    { id: 'employee', label: 'Employee Progress', icon: <Users size={18} className="admnav-icon" /> },
    { id: 'course', label: 'Manage Course', icon: <BookOpen size={18} className="admnav-icon" /> }
  ];

  const toggleNavbar = () => setIsCollapsed(!isCollapsed);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/admin/${userId}/course/allcourses`);
        setCourses(response.data.allCourses);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching course data:', error);
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [userId]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/admin/alice@example.com`);
        setUsers(response.data.allUsers);
        setULoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setULoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (userLoading || loading) return <div>Loading...</div>;

  const validNavIds = options.map(option => option.id);
  if (!validNavIds.includes(navId)) {
    return <Navigate to="*" replace />;
  }

  return (
    <div className="admnav-container">
      {/* Show popup if message exists */}
      {popupMessage && <Popup success={popupMessage.success} message={popupMessage.message} />}

      <div className={`admnav-navbar ${isCollapsed ? 'admnav-collapsed' : ''}`}>
        {options.map((item, index) => (
          <div key={index} className="admnav-module-wrapper">
            <button
              className={`admnav-nav-btn ${navId === item.id ? 'admnav-active-module' : ''}`}
              onClick={() => {
                if (item.id === 'home') {
                  window.location.href = `/user/dashboard/${userId}`;
                } else {
                  window.location.href = `/admin/dashboard/${userId}/${item.id}/details`;
                }
              }}

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
        {navId === 'employee' && <EmployeeDeets profile={users} />}
        {navId === 'course' && <AdminAvailableCourse available={courses} />}
      </div>
    </div>
  );
};
