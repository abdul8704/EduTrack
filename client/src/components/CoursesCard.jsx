import React from 'react'
import '../styles/EnrolledCourses.css'

export const CoursesCard = ({ image, title, instructor, rating }) => {
  return (
    <div className="enrolled-course-card">
      <img src={image} alt={title} className="enrolled-course-image" />
      <div className="enrolled-course-title">{title}</div>
      <div className="enrolled-course-bottom">
        <div className="enrolled-course-instructor">by {instructor}</div>
        <div className="enrolled-course-rating">⭐ {rating}</div>
      </div>
    </div>
  )
}
