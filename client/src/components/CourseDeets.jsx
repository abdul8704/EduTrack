import React from 'react';
import '../styles/coursedeets.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from "axios"
import { useNavigate } from 'react-router-dom';

export const CourseDeets = () => {
  const { courseId } = useParams()
  const [navCourse, setCourse] = useState(null);
  const [navContents, setContents] = useState([]);
  const [navLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/admin/bob@example.com/${courseId}`);
        setCourse(response.data.data);
        setContents(response.data.contents);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching course data:', error);
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [courseId]);
  const [enrolledUsers, setEnrolledUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(true);

  useEffect(() => {
    const fetchEnrolledUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/admin/bob@example.com/allusers/${courseId}`);
        setEnrolledUsers(response.data.data);
        setUsersLoading(false);
      } catch (error) {
        console.error('Error fetching enrolled users:', error);
        setUsersLoading(false);
      }
    };

    fetchEnrolledUsers();
  }, [courseId]);
  const navigate = useNavigate();

  const handleCardClick = (userEmail) => {
    if (userEmail) {
      navigate(`/empprogress/${userEmail}`);
    }
  };
  if (navLoading || !navCourse) return <div>Loading...</div>;
  if (usersLoading || !enrolledUsers) return <div>Loading users...</div>;




  return (
    <div className="coursedeets-container">
      {/* Sidebar */}
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
                <strong >{module.moduleTitle}</strong>
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

      {/* Content */}
      <main className="coursedeets-content">
        <h2 className="coursedeets-heading">Enrolled</h2>
        <div className="coursedeets-courses">
          {enrolledUsers.map(person => (
            <div className="coursedeets-course-card" key={person.Userid} onClick={()=> handleCardClick(person.userId)}>
              <img className="coursedeets-course-image" src={person.imageUrl} alt={person.username} />
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
  );
};
