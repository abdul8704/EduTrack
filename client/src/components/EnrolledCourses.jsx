import React, { useRef } from 'react';
import { CoursesCard } from './CoursesCard';
import '../styles/EnrolledCourses.css';

export const EnrolledCourses = ({enrolled}) => {
  const scrollRef = useRef(null);
  const scrollAmount = 300;

  const handleLeftClick = () => {
    const container = scrollRef.current;
    if (!container) return;

    if (container.scrollLeft === 0) {
      container.scrollTo({ left: container.scrollWidth, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };

  const handleRightClick = () => {
    const container = scrollRef.current;
    if (!container) return;

    if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 1) {
      container.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="enrolled-container">
      <div className="enrolled-title">Enrolled Courses</div>
      <div className="enrolled-carousel-wrapper">
        <div className="enrolled-arrow enrolled-left-arrow" onClick={handleLeftClick}>&lt;</div>
        <div className="enrolled-courses-container" ref={scrollRef}>
          {Array.isArray(enrolled) && enrolled.map((course) => ( 
            <CoursesCard
              key={course.courseId}
              title={course.courseName}
              image={course.courseImage}
              instructor={course.courseInstructor}
              rating={course.courseRating}
            />
          ))}
        </div>
        <div className="enrolled-arrow enrolled-right-arrow" onClick={handleRightClick}>&gt;</div>
      </div>
    </div>
  );
};
