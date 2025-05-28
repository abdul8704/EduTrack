import React from 'react';
import { FullCourse } from './FullCourse.jsx';
import IotImage from '../assets/react.svg'; // Your image
import '../styles/CoursePage.css';

export const CoursePage = () => {
  const courseData = {
    name: "Internet of Things",
    img: IotImage,
    id: 1,
  };

  return (
    <div className="course-page">
      <FullCourse name={courseData.name} img={courseData.img} id={courseData.id} />
    </div>
  );
};
