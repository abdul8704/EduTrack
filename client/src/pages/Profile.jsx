// Profile.jsx
import React, { useState, useEffect } from 'react';
import { Download, RotateCcw } from 'lucide-react';
import '../styles/profile.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const fetchUserData = async (userId) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/user/${userId}/data/userinfo`);
    return response.data.username;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
}

const fetchCourses = async (userId) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/user/${userId}`);
    return response.data.completedCourses;
  } catch (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
}

const downloadCertificate = async ({ username, courseName, courseInstructor }) => {
  try {
    const response = await fetch('http://localhost:5000/api/certificate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: username,
        course: courseName,
        instructor: courseInstructor,
        date: new Date().toLocaleDateString()
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Backend error:', errorText);
      throw new Error('Failed to generate certificate');
    }

    const blob = await response.blob();
    if (blob.type !== 'application/pdf') {
      const text = await blob.text();
      console.error('Unexpected response:', text);
      throw new Error('Invalid PDF content received');
    }

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${courseName}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);

    showPopup("Certificate generated successfully!", {
      background: "#d4edda",
      border: "#c3e6cb",
      text: "#155724"
    });

  } catch (error) {
    console.error(error);
    showPopup("Error downloading certificate: " + error.message, {
      background: "#f8d7da",
      border: "#f5c6cb",
      text: "#721c24"
    });
  }
};

export const Profile =  () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const fetchedUser = await fetchUserData(userId);
      const fetchedCourses = await fetchCourses(userId);
      setUserData(fetchedUser);
      setCourses(fetchedCourses);
      setLoading(false);
    };

    loadData();
  }, []);

  const handleCardClick = (courseId) => {
    navigate(`/course/learn/${userId}/${courseId}/0/0`);
  };

  const handleDownloadCertificate = (e, courseId) => {
    e.stopPropagation();
    downloadCertificate({
      username: userData.username,
      courseName: courses.find(course => course.courseId === courseId)?.courseName || 'Unknown Course',
      courseInstructor: courses.find(course => course.courseId === courseId)?.courseInstructor || 'Unknown Instructor'
    })
  };

  const handleStartOver = (e, courseId) => {
    e.stopPropagation();
    navigate(`/course/learn/${userId}/${courseId}/0/0`);
  };

  if (loading) return <div className="profile-loading">Loading...</div>;

  return (
    <div className="profile-container">
      <aside className="profile-navbar">
        <button className="profile-backButton" onClick={() => window.history.back()}>
          ←
        </button>
        <div className="profile-profileSection">
          <div className="profile-profileImage">
            <img src={userData.profilePicture} alt="Profile" className="profile-profileImg" />
          </div>
          <div className="profile-profileDetails">
            <div className="profile-profileName">{userData.username}</div>
            <div className="profile-profileDesignation">{userData.position}</div>
            <div className="profile-profileEmail">{userData.email}</div>
          </div>
        </div>
      </aside>

      <main className="profile-content">
        <h2 className="profile-heading">Progress</h2>
        <div className="profile-courses">
          {courses.length === 0 ? (
            <div>The person is very busy... not even one course enrolled...</div>
          ) : (
            courses.map(course => (
              <div
                className="profile-courseCard"
                key={course._id}
                onClick={() => handleCardClick(course.courseId)}
              >
                <img className="profile-courseImage" src={course.courseImage} alt={course.courseName} />
                <div className="profile-courseDetails">
                  <div className="profile-courseName">{course.courseName}</div>
                  <div className="profile-courseInstructor">Instructor: {course.courseInstructor}</div>
                </div>
                <div className="profile-actionButtons">
                  <button
                    className="profile-actionButton"
                    onClick={(e) => handleStartOver(e, course.courseId)}
                    title="Start Over"
                  >
                    <RotateCcw size={18} />
                  </button>
                  <button
                    className="profile-actionButton"
                    onClick={(e) => handleDownloadCertificate(e, course.courseId)}
                    title="Download Certificate"
                  >
                    <Download size={18} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};
