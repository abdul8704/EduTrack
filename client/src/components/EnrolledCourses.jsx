import React, { useRef, useState, useEffect } from 'react';
import { CoursesCard } from './CoursesCard';
import '../styles/EnrolledCourses.css';
import { useParams } from 'react-router-dom';
export const EnrolledCourses = ({ enrolled }) => {
  const { userId } = useParams();
  const scrollRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const scrollAmount = 300;

  const checkOverflow = () => {
    const container = scrollRef.current;
    if (container) {
      setIsOverflowing(container.scrollWidth > container.clientWidth);
    }
  };


  useEffect(() => {
    const timeout = setTimeout(checkOverflow, 100);

    window.addEventListener('resize', checkOverflow);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('resize', checkOverflow);
    };
  }, [enrolled]);

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

    const atEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 1;
    if (atEnd) {
      container.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="enrolled-container">
      <div className="enrolled-title">Enrolled Courses</div>
      <div className="enrolled-carousel-wrapper">
        {isOverflowing && (
          <div className="enrolled-arrow enrolled-left-arrow" onClick={handleLeftClick}>
            &lt;
          </div>
        )}

        <div className="enrolled-courses-container" ref={scrollRef}>
          {Array.isArray(enrolled) &&
            enrolled.map((course) => (
              <CoursesCard
                key={course._id}
                userId={userId}
                courseId={course.courseId}
                title={course.courseName}
                image={course.courseImage}
                instructor={course.courseInstructor}
                rating={course.courseRating}
              />
            ))}
        </div>

        {isOverflowing && (
          <div className="enrolled-arrow enrolled-right-arrow" onClick={handleRightClick}>
            &gt;
          </div>
        )}
      </div>
    </div>
  );
};
