import React from "react";
import "../../styles/addCourse.css";

const CourseIntroduction = ({ courseData, onCourseDataChange }) => {
  const handleInputChange = (field) => (e) => {
    onCourseDataChange(field, e.target.value);
  };

  return (
    <div className="add-subtitle-card">
      <p className="add-subtitle">Course Introduction</p>

      <div className="add-row-inputs">
        <input
          type="text"
          placeholder="Course Name"
          className="add-input-field"
          value={courseData.courseName}
          onChange={handleInputChange("courseName")}
        />
        <input
          type="text"
          placeholder="Instructor Name"
          className="add-input-field"
          value={courseData.instructorName}
          onChange={handleInputChange("instructorName")}
        />
        <input
          type="text"
          placeholder="Course ID"
          className="add-input-field"
          value={courseData.courseId}
          onChange={handleInputChange("courseId")}
        />
      </div>

      <textarea
        placeholder="Course Description"
        className="add-textarea-field"
        rows={4}
        value={courseData.courseDescription}
        onChange={handleInputChange("courseDescription")}
      />

      <div className="add-row-inputs">
        <input
          type="text"
          placeholder="Intro Video Title"
          className="add-input-field"
          value={courseData.introVideoTitle}
          onChange={handleInputChange("introVideoTitle")}
        />
        <input
          type="text"
          placeholder="Video URL"
          className="add-input-field"
          value={courseData.videoURL}
          onChange={handleInputChange("videoURL")}
        />
        <input
          type="text"
          placeholder="Tags (comma separated)"
          className="add-input-field"
          value={courseData.tags}
          onChange={handleInputChange("tags")}
        />
      </div>
    </div>
  );
};

export default CourseIntroduction;