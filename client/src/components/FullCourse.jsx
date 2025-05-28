import React from 'react';
import { FullCourse } from './FullCourse';
import '../styles/CoursePage.css';

export const CoursePage = () => {
  const courseData = {
    name: "Internet of Things",
    img: "https://www.youtube.com/embed/bTqVqk7FSmY", 
    id: 1,
  };

  return (
    <div className="course-page">
      <FullCourse name={courseData.name} img={courseData.img} id={courseData.id} />
    </div>
  );
};
