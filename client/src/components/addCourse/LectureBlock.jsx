import React from "react";
import "../../styles/addCourse.css"
export const LectureBlock = ({
  subModuleNumber,
  lecture,
  onLectureChange,
  onRemoveLecture,
}) => {
  const handleChange = (field, value) => {
    onLectureChange(field, value);
  };

  return (
    <div className="lecture-block">
      <div className="lecture-header">
        <span className="lecture-title">SubModule {subModuleNumber}</span>
        <button className="close-btn" onClick={onRemoveLecture}>
          ×
        </button>
      </div>

      <div className="lecture-line">
        <input
          type="text"
          placeholder="Lecture Name"
          value={lecture.lectureName}
          onChange={(e) => handleChange("lectureName", e.target.value)}
        />
        <input
          type="text"
          placeholder="Video Title"
          value={lecture.videoTitle}
          onChange={(e) => handleChange("videoTitle", e.target.value)}
        />
        <input
          type="text"
          placeholder="Video URL"
          value={lecture.videoURL}
          onChange={(e) => handleChange("videoURL", e.target.value)}
        />
      </div>

      <textarea
        placeholder="Lecture Description"
        value={lecture.lectureDescription}
        onChange={(e) => handleChange("lectureDescription", e.target.value)}
        className="lecture-description"
      />
    </div>
  );
};
