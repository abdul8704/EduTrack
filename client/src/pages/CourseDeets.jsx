// CourseDeets.jsx
import React from 'react';
import '../styles/coursedeets.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from "axios";
import { Navbar } from '../components/Navbar';

export const CourseDeets = () => {
  const { userId, courseId } = useParams();
  const [navCourse, setCourse] = useState(null);
  const [navContents, setContents] = useState([]);
  const [navLoading, setLoading] = useState(true);
  const [enrolledUsers, setEnrolledUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/admin/${userId}/courseinfo/${courseId}`);
        setCourse(response.data.course);
        setContents(response.data.tableOfContents);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching course data:', error);
        setLoading(false);
      }
    };
    fetchCourseData();
  }, [courseId]);

  useEffect(() => {
    const fetchEnrolledUsers = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/admin/${userId}/allusers/${courseId}`);
        setEnrolledUsers(response.data.data);
        setUsersLoading(false);
      } catch (error) {
        console.error('Error fetching enrolled users:', error);
        setUsersLoading(false);
      }
    };
    fetchEnrolledUsers();
  }, [courseId]);

  const handleCardClick = (userEmail) => {
    if (userEmail) {
      navigate(`/admin/dashboard/${userId}/details/emp/${userEmail}`);
    }
  };
  useEffect(() => {
    document.body.classList.add('empprog-lock-scroll');
    return () => {
      document.body.classList.remove('empprog-lock-scroll');
    };
  }, []);

  if (navLoading || usersLoading || !navCourse || !enrolledUsers) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <Navbar/>
    <div className="coursedeets-container">
      <aside className="coursedeets-navbar">
        <button className="coursedeets-back-button" onClick={() => window.history.back()}>
          ←
        </button>
        <div className="coursedeets-profile-section">
          <div className="coursedeets-profile-image">
            <img src={navCourse.courseImage} alt="Course" />
          </div>
          <div className="coursedeets-profile-details">
            <div className="coursedeets-profile-name">{navCourse.courseName}</div>
            <div className="coursedeets-profile-email">{navCourse.courseInstructor}</div>
            <div className="coursedeets-profile-designation">{navCourse.courseRating} ⭐</div>
          </div>
        </div>
        <div className="coursedeets-divider">
          <div className="coursedeets-toc">
            <h3>Table of Contents</h3>
            {navContents.map((module, index) => (
              <div key={index} className="coursedeets-module">
                <strong>{module.moduleTitle}</strong>
                <ul>
                  {module.submodules.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </aside>

      <main className="coursedeets-content">
        <h2 className="coursedeets-heading">Enrolled</h2>
        <div className="coursedeets-courses">
          {enrolledUsers.map(person => (
            <div className="coursedeets-course-card" key={person.userId} onClick={() => handleCardClick(person.userId)}>
              <img
                className="coursedeets-course-image"
                src={person.profilePicture}
                onError={(e) => (e.target.src = '/default-user.png')}
                alt={person.username}
              />
              <div className="coursedeets-course-details">
                <div className="coursedeets-course-name">{person.username}</div>
                <div className="coursedeets-course-instructor">software engineer</div>
                <div className="coursedeets-progress-bar">
                  <div
                    className="coursedeets-progress-fill"
                    style={{ width: `${person.completion}%` }}
                  />
                </div>
                <div className="coursedeets-progress-percent">{person.completion}%</div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
    </>
  );
};