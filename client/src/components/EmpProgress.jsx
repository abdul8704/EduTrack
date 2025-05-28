import React from 'react';
import '../styles/empprogress.css';

export const EmpProgress = ({ profile }) => {
  const defaultImage = 'https://randomuser.me/api/portraits/women/49.jpg';

  const defaultProfile = {
    name: 'Mary Smith',
    designation: 'Software Engineer',
    email: 'mary.smith@example.com',
    imageUrl: defaultImage,
  };

  const user = profile || defaultProfile;

  const courses = [
    {
      id: 1,
      name: 'React Basics',
      instructor: 'John Smith',
      progress: 80,
      image: 'https://randomuser.me/api/portraits/women/34.jpg',
    },
    {
      id: 2,
      name: 'Python for Beginners',
      instructor: 'Jane Doe',
      progress: 50,
      image: 'https://randomuser.me/api/portraits/women/24.jpg',
    },
    {
      id: 3,
      name: 'Machine Learning',
      instructor: 'Alice Johnson',
      progress: 30,
      image: 'https://randomuser.me/api/portraits/women/14.jpg',
    },
  ];

  return (
    <div className="empprog-container">
      {/* Left Profile Sidebar */}
      <div className="empprog-navbar">
        <div className="empprog-profile-section">
          <div className="empprog-profile-image">
            <img src={user.imageUrl} alt="Profile" />
          </div>
          <div className="empprog-profile-details">
            <div className="empprog-profile-name">{user.name}</div>
            <div className="empprog-profile-designation">{user.designation}</div>
            <div className="empprog-profile-email">{user.email}</div>
          </div>
        </div>
      </div>

      {/* Right Content Section */}
      <div className="empprog-content">
        <h2 className="empprog-heading">Progress</h2>
        <div className="emprog-cont">
        {courses.map(course => (
          <div className="empprog-course-card" key={course.id}>
            <img className="empprog-course-image" src={course.image} alt={course.name} />
            <div className="empprog-course-details">
              <div className="empprog-course-name">{course.name}</div>
              <div className="empprog-course-instructor">Instructor: {course.instructor}</div>
              <div className="empprog-progress-bar">
                <div
                  className="empprog-progress-fill"
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
              <div className="empprog-progress-percent">{course.progress}%</div>
            </div>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
};
