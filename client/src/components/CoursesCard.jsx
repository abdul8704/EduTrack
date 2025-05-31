import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/EnrolledCourses.css'

export const CoursesCard = ({ userId, courseId, title, image, instructor, rating }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/course/intro/${userId}/${courseId}`);
  };

  return (
    <div className="enrolled-course-card" onClick={handleClick}>
      <img src={image} alt={title} className="enrolled-course-image" />
      <div className="enrolled-course-title">{title}</div>
      <div className="enrolled-course-bottom">
        <div className="enrolled-course-instructor">by {instructor}</div>
        <div className="enrolled-course-rating">⭐ {rating}</div>
      </div>
    </div>
  )
}
