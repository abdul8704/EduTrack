import React from 'react';
import '../styles/empprogress.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from "axios";
export const EmpProgress = () => {
  const defaultImage = 'https://randomuser.me/api/portraits/women/49.jpg';
  const useremail = useParams();
  console.log(useremail);
  const defaultProfile = {
    name: 'Mary Smith',
    designation: 'Software Engineer',
    email: 'mary.smith@example.com',
    imageUrl: defaultImage,
  };

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
  console.log(courses)
  if (loading) return <div>Loading...</div>;
  if (courses.length === 0) return <div>The person is very busy... not even one course enrolled</div>;



  return (
    <div className="empprog-container">
      {/* Sidebar */}
      <aside className="empprog-navbar">
        <div className="empprog-profile-section">
          <div className="empprog-profile-image">
            <img src={} alt="Profile" />
          </div>
          <div className="empprog-profile-details">
            <div className="empprog-profile-name">{user.name}</div>
            <div className="empprog-profile-designation">{user.designation}</div>
            <div className="empprog-profile-email">{user.email}</div>
          </div>
        </div>
      </aside>

      {/* Content */}
      <main className="empprog-content">
        <h2 className="empprog-heading">Progress</h2>
        <div className="empprog-courses">
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
                  />
                </div>
                <div className="empprog-progress-percent">{course.progress}%</div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};
