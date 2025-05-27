import React, { useRef } from 'react';
import '../styles/EnrolledCourses.css';
import { CoursesCard } from './CoursesCard'; // ✅ Import the reusable component

export const AvailableCourses = () => {
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
      title: '6',
      instructor: 'Prof. Ravindran',
      image: 'https://www.citystgeorges.ac.uk/__data/assets/image/0010/685342/varieties/breakpoint-max.jpg',
      rating: 4.5,
    },
    {
      id: 7,
      title: '7',
      instructor: 'Andrew Ng',
      image: 'https://wealthcreator.co.in/wp-content/uploads/2022/12/Free-Online-Courses-with-Certificates.jpg',
      rating: 4.8,
    },
    {
      id: 8,
      title: '8',
      instructor: 'Angela Yu',
      image: 'https://www.uplers.com/wp-content/uploads/2021/12/full-stack-web-developers.png',
      rating: 4.7,
    },
    {
      id: 9,
      title: '9',
      instructor: 'Robert Sedgewick',
      image: 'https://miro.medium.com/v2/resize:fit:1400/1*J38nYZU7gzu-4lQmtjlSUw.jpeg',
      rating: 4.3,
    },
    {
      id: 10,
      title: '10',
      instructor: 'Dan Abramov',
      image: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
      rating: 4.6,
    },
  ];

  const scrollRef = useRef(null);

  return (
    <div className="enrolled-container">
      <div className="enrolled-title">Available Courses</div>
      <div className="available-courses-container" ref={scrollRef}>
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
    </div>
  );
};
