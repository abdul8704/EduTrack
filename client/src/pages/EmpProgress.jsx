import React, { useState, useEffect } from 'react';
import '../styles/empprogress.css';
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import { Navbar } from '../components/Navbar';

export const EmpProgress = () => {
  const { userId, empId } = useParams();
  console.log(userId, "ee", empId)
  const defaultImage = 'https://randomuser.me/api/portraits/women/49.jpg';
  const useremail = useParams();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [userData, setUserData] = useState(null);
  const [Uloading, setULoading] = useState(true);

  const navigate = useNavigate();


  // Fetch courses data
  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/admin/${userId}/progress/${empId}`);
        setCourses(response.data.progress || []);
      } catch (error) {
        console.error('Error fetching course data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourseData();
  }, [useremail, userId]);

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/admin/${userId}/userdata/${empId}`);
        setUserData(response.data.user || null);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setULoading(false);
      }
    };
    fetchUserData();
  }, [useremail, userId]);

  // Scroll lock on body only for this page
  useEffect(() => {
    document.body.classList.add('empprog-lock-scroll');
    return () => {
      document.body.classList.remove('empprog-lock-scroll');
    };
  }, []);

  // Navigate to course details page
  const handleCardClick = (courseId) => {
    if (courseId) {
      navigate(`/admin/dashboard/${userId}/details/course/${courseId}`);
    }
  };

  const handleMakeAdmin = async () => {
    if (!userData) return alert("User data not loaded yet");

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/${userId}/promote/${useremail.userId}`
      );

      if (response.data.success) {
        alert("User promoted to admin successfully!");
      } else {
        alert("Failed to promote user: " + response.data.message);
      }
    } catch (error) {
      console.error("Error promoting user:", error);
      alert("Error promoting user to admin");
    }
  };


  if (loading) return <div>Loading...</div>;
  if (Uloading) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="empprog-container">
        {/* Sidebar */}
        <aside className="empprog-navbar">
          <button className="coursedeets-back-button" onClick={() => navigate(`/user/dashboard/${userId}`)}>
            ←
          </button>
          <div className="empprog-profile-section">
            <div className="empprog-profile-image">
              <img src={userData?.profilePicture || defaultImage} alt="Profile" />
            </div>
            <div className="empprog-profile-details">
              <div className="empprog-profile-name">{userData?.username || 'No Name'}</div>
              <div className="empprog-profile-designation">{userData?.position || 'No Position'}</div>
              <div className="empprog-profile-email">{userData?.email || 'No Email'}</div>
            </div>

            {/* Make as admin button */}
            <button className="make-admin-btn" onClick={handleMakeAdmin}>
              Make as admin
            </button>
          </div>
        </aside>

        {/* Content */}
        <main className="empprog-content">
          <h2 className="empprog-heading">Progress</h2>
          <div className="empprog-courses">
            {courses.length === 0 ? (
              <div>The person is very busy... not even one course enrolled...</div>
            ) : (
              courses.map(course => (
                <div
                  className="empprog-course-card"
                  key={course._id}
                  onClick={() => handleCardClick(course.courseId)}
                >
                  <img
                    className="empprog-course-image"
                    src={course.courseImage}
                    alt={course.courseName}
                  />
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
              ))
            )}
          </div>
        </main>
      </div>
    </>
  );
};
