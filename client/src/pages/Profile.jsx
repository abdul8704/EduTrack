// Profile.jsx
import React, { useState, useEffect } from 'react';
import { Download, RotateCcw } from 'lucide-react';
import '../styles/profile.css';

export const Profile = () => {
  const sampleUserData = {
    username: "Jane Doe",
    position: "Software Engineer",
    email: "jane.doe@example.com",
    profilePicture: "https://randomuser.me/api/portraits/women/49.jpg"
  };

  const sampleCourses = [
    {
      _id: "course1",
      courseId: "101",
      courseName: "React Basics",
      courseInstructor: "John Smith",
      courseImage: "https://randomuser.me/api/portraits/women/49.jpg",
      percentComplete: 75
    },
    {
      _id: "course2",
      courseId: "102",
      courseName: "Advanced CSS",
      courseInstructor: "Emily Johnson",
      courseImage: "https://via.placeholder.com/150",
      percentComplete: 40
    },
    {
      _id: "course3",
      courseId: "103",
      courseName: "JavaScript Mastery",
      courseInstructor: "Michael Brown",
      courseImage: "https://via.placeholder.com/150",
      percentComplete: 90
    }
  ];

  const [userData, setUserData] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setUserData(sampleUserData);
      setCourses(sampleCourses);
      setLoading(false);
    }, 1000);
  }, []);

  const handleCardClick = (courseId) => {
    console.log(`Navigating to course details: ${courseId}`);
  };

  const handleDownloadCertificate = (e, courseId) => {
    e.stopPropagation();
    console.log(`Downloading certificate for course: ${courseId}`);
  };

  const handleStartOver = (e, courseId) => {
    e.stopPropagation();
    console.log(`Starting over course: ${courseId}`);
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
