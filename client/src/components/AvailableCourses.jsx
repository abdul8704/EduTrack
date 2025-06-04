import React, { useRef } from 'react';
import '../styles/enrolledCourses.css';
import { CoursesCard } from './CoursesCard';
import { useParams } from 'react-router-dom';

export const AvailableCourses = ({ title, available }) => {
  const scrollRef = useRef(null);
  const { userId } = useParams();
  return (
    <div className="enrolled-container">
      <div className="enrolled-title">{title}</div>
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
