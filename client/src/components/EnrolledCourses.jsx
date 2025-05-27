import React, { useRef } from 'react';
import { CoursesCard } from './CoursesCard';
import '../styles/EnrolledCourses.css';

export const EnrolledCourses = () => {
  const courses = [
    {
      id: 1,
      title: 'Machine Learning Basics',
      instructor: 'Prof. Ravindran',
      image: 'https://www.citystgeorges.ac.uk/__data/assets/image/0010/685342/varieties/breakpoint-max.jpg',
      rating: 4.5,
    },
    {
      id: 2,
      title: 'Deep Learning',
      instructor: 'Andrew Ng',
      image: 'https://wealthcreator.co.in/wp-content/uploads/2022/12/Free-Online-Courses-with-Certificates.jpg',
      rating: 4.8,
    },
    {
      id: 3,
      title: 'Full Stack Web Dev',
      instructor: 'Angela Yu',
      image: 'https://www.uplers.com/wp-content/uploads/2021/12/full-stack-web-developers.png',
      rating: 4.7,
    },
    {
      id: 4,
      title: 'Data Structures',
      instructor: 'Robert Sedgewick',
      image: 'https://miro.medium.com/v2/resize:fit:1400/1*J38nYZU7gzu-4lQmtjlSUw.jpeg',
      rating: 4.3,
    },
    {
      id: 5,
      title: 'React Fundamentals',
      instructor: 'Dan Abramov',
      image: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
      rating: 4.6,
    },
    {
      id: 6,
      title: 'Machine Learning Basics',
      instructor: 'Prof. Ravindran',
      image: 'https://www.citystgeorges.ac.uk/__data/assets/image/0010/685342/varieties/breakpoint-max.jpg',
      rating: 4.5,
    },
    {
      id: 7,
      title: 'Deep Learning',
      instructor: 'Andrew Ng',
      image: 'https://wealthcreator.co.in/wp-content/uploads/2022/12/Free-Online-Courses-with-Certificates.jpg',
      rating: 4.8,
    },
    {
      id: 8,
      title: 'Full Stack Web Dev',
      instructor: 'Angela Yu',
      image: 'https://www.uplers.com/wp-content/uploads/2021/12/full-stack-web-developers.png',
      rating: 4.7,
    },
    {
      id: 9,
      title: 'Data Structures',
      instructor: 'Robert Sedgewick',
      image: 'https://miro.medium.com/v2/resize:fit:1400/1*J38nYZU7gzu-4lQmtjlSUw.jpeg',
      rating: 4.3,
    },
    {
      id: 10,
      title: 'React Fundamentals',
      instructor: 'Dan Abramov',
      image: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
      rating: 4.6,
    },
  ];

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
          {courses.map((course) => (
            <CoursesCard
              key={course.id}
              image={course.image}
              title={course.title}
              instructor={course.instructor}
              rating={course.rating}
            />
          ))}
        </div>
        <div className="enrolled-arrow enrolled-right-arrow" onClick={handleRightClick}>&gt;</div>
      </div>
    </div>
  );
};
