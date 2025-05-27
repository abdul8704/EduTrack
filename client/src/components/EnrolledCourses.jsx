import React from 'react';
import "../styles/EnrolledCourses.css"
export const EnrolledCourses = () => {
  const courses = [
    { id: 1, title: 'Machine Learning Basics', instructor: 'Prof. Ravindran' },
    { id: 2, title: 'Deep Learning', instructor: 'Andrew Ng' },
    { id: 3, title: 'Full Stack Web Dev', instructor: 'Angela Yu' }
  ];

  return (
    <div className="enrolled-container">
      <div className="enrolled-title">Enrolled Courses</div>
      <div className="enrolled-courses-container">
        {courses.map(course => (
          <div key={course.id} className="course-card">
            <div className="course-title">{course.title}</div>
            <div className="course-instructor">by {course.instructor}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
