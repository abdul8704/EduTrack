import React from 'react';
import '../styles/empprogress.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from "axios";
export const EmpProgress = () => {
  const defaultImage = 'https://randomuser.me/api/portraits/women/49.jpg';
  const useremail = useParams();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/admin/bob@example.com/progress/${useremail.userId}`);
        setCourses(response.data.progress || []);
      } catch (error) {
        console.error('Error fetching course data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [useremail]);

  const [userData, setUserData] = useState(null);
  const [Uloading, setULoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/admin/bob@example.com/userdata/${useremail.userId}`);
        setUserData(response.data.user || null);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setULoading(false);
      }
    };

    fetchUserData();
  }, [useremail]);
  const navigate = useNavigate();

  const handleCardClick = (courseId) => {
    if (courseId) {
      navigate(`/coursedeets/${courseId}`);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (Uloading) return <div>Loading...</div>;



  return (
    <div className="empprog-container">
      {/* Sidebar */}
      <aside className="empprog-navbar">
        <button className="coursedeets-back-button" onClick={() => window.history.back()}>
          ←
        </button>
        <div className="empprog-profile-section">
          <div className="empprog-profile-image">
            <img src={userData.profilePicture} alt="Profile" />
          </div>
          <div className="empprog-profile-details" >
            <div className="empprog-profile-name">{userData.username}</div>
            <div className="empprog-profile-designation">{userData.position}</div>
            <div className="empprog-profile-email">{userData.email}</div>
          </div>
        </div>
      </aside>

      {/* Content */}
      <main className="empprog-content">
        <h2 className="empprog-heading">Progress</h2>
        <div className="empprog-courses">
          {courses.length === 0 ? (
            <div>The person is very busy... not even one course enrolled...</div>
          ) : courses.map(course => (
            <div className="empprog-course-card" key={course._id} onClick={()=> handleCardClick(course.courseId)}>
              <img className="empprog-course-image" src={course.courseImage} alt={course.courseName} />
              <div className="empprog-course-details">
                <div className="empprog-course-name">{course.courseName}</div>
                <div className="empprog-course-instructor">Instructor: {course.courseInstructor}</div>
                <div className="empprog-progress-bar">
                  <div
                    className="empprog-progress-fill"
                    style={{ width: `${course.percentComplete}%` }}
                  />
                </div>
                <div className="empprog-progress-percent">{course.percentComplete}%</div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};
