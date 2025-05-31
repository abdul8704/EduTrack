import React, { useRef } from 'react';
import '../styles/EnrolledCourses.css';
import { CoursesCard } from './CoursesCard';
import { useParams } from 'react-router-dom';

export const AvailableCourses = ({ available }) => {
  const scrollRef = useRef(null);
  const { userId } = useParams();
  return (
    <div className="enrolled-container">
      <div className="enrolled-title">Available Courses</div>
      <div className="available-courses-container" ref={scrollRef}>
        {Array.isArray(available) && available.map((course) => (
          <CoursesCard
            key={course._id}
            userId={userId}
            courseId={course.courseId}
            image={course.courseImage}
            title={course.courseName}
            instructor={course.courseInstructor}
            rating={course.courseRating}
          />
        ))}
      </div>
    </div>
  );
};
