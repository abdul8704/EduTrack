import React from 'react';
import '../styles/coursedeets.css';

export const CourseDeets = ({ profile }) => {
  const defaultImage = 'https://randomuser.me/api/portraits/women/49.jpg';

  const defaultProfile = {
    courseName: 'React Basics',
    instructor: 'John Smith',
    ratings: 5,
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
    {
      id: 4,
      name: 'React Basics',
      instructor: 'John Smith',
      progress: 80,
      image: 'https://randomuser.me/api/portraits/women/34.jpg',
    },
    {
      id: 5,
      name: 'Python for Beginners',
      instructor: 'Jane Doe',
      progress: 50,
      image: 'https://randomuser.me/api/portraits/women/24.jpg',
    },
    {
      id: 6,
      name: 'Machine Learning',
      instructor: 'Alice Johnson',
      progress: 30,
      image: 'https://randomuser.me/api/portraits/women/14.jpg',
    },
    {
      id: 7,
      name: 'React Basics',
      instructor: 'John Smith',
      progress: 80,
      image: 'https://randomuser.me/api/portraits/women/34.jpg',
    },
    {
      id: 8,
      name: 'Python for Beginners',
      instructor: 'Jane Doe',
      progress: 50,
      image: 'https://randomuser.me/api/portraits/women/24.jpg',
    },
    {
      id: 9,
      name: 'Machine Learning',
      instructor: 'Alice Johnson',
      progress: 30,
      image: 'https://randomuser.me/api/portraits/women/14.jpg',
    },
  ];

  return (
    <div className="coursedeets-container">
      {/* Sidebar */}
      <aside className="coursedeets-navbar">
        <div className="coursedeets-profile-section">
          <div className="coursedeets-profile-image">
            <img src={user.imageUrl} alt="Profile" />
          </div>
          <div className="coursedeets-profile-details">
            <div className="coursedeets-profile-name">{user.courseName}</div>
            <div className="coursedeets-profile-email">{user.instructor}</div>
            <div className="coursedeets-profile-designation">{user.ratings} ⭐</div>            
          </div>
        </div>
      </aside>

      {/* Content */}
      <main className="coursedeets-content">
        <h2 className="coursedeets-heading">Progress</h2>
        <div className="coursedeets-courses">
          {courses.map(course => (
            <div className="coursedeets-course-card" key={course.id}>
              <img className="coursedeets-course-image" src={course.image} alt={course.name} />
              <div className="coursedeets-course-details">
                <div className="coursedeets-course-name">{course.name}</div>
                <div className="coursedeets-course-instructor">Instructor: {course.instructor}</div>
                <div className="coursedeets-progress-bar">
                  <div
                    className="coursedeets-progress-fill"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
                <div className="coursedeets-progress-percent">{course.progress}%</div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};
