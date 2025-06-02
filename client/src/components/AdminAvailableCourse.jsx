import React, { useRef } from 'react';
import '../styles/EnrolledCourses.css';
import { useNavigate, useParams } from 'react-router-dom';

export const AdminAvailableCourse = ({ available }) => {
  const { userId }=useParams();
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  const handleClick = (courseId) => {
    navigate(`/admin/dashboard/${userId}/details/course/${courseId}`);
  };

  const handleAddCourse = () => {
    navigate(`/admin/dashboard/${userId}/course/addcourse`);
  };

  return (
    <div className="enrolled-container">
      <div className="enrolled-title">Available Courses</div>
      <div className="available-courses-container" ref={scrollRef}>
        {Array.isArray(available) && available.map((course) => (
          <div
            key={course.courseId}
            className="enrolled-course-card"
            onClick={() => handleClick(course.courseId)}
          >
            <img
              src={course.courseImage}
              alt={course.courseName}
              className="enrolled-course-image"
            />
            <div className="enrolled-course-title">{course.courseName}</div>
            <div className="enrolled-course-bottom">
              <div className="enrolled-course-instructor">
                by {course.courseInstructor}
              </div>
              <div className="enrolled-course-rating">⭐ {course.courseRating}</div>
            </div>
          </div>
        ))}

        {/* Circular + Button */}
        <button className="add-course-button" onClick={handleAddCourse}>
          +
        </button>
      </div>
    </div>
  );
};
