import React from "react";
import "../../styles/addCourse.css";

export const LectureBlock = ({
  lectureId,
  lectureNumber,
  lectureName,
  videoTitle,
  videoURL,
  lectureDescription,
  onLectureChange,
  onRemoveLecture,
}) => {
  return (
    <div className="lecture-card">
      <div className="lecture-header">
        <span className="lecture-title">Lecture {lectureNumber}</span>
        <button
          className="close-btn"
          onClick={() => onRemoveLecture(lectureId)}
        >
          ✖
        </button>
      </div>

      <div className="lecture-line">
        <input
          placeholder="Lecture Name"
          type="text"
          value={lectureName}
          onChange={(e) => onLectureChange("lectureName", e.target.value)}
        />
        <input
          placeholder="Video Title"
          type="text"
          value={videoTitle}
          onChange={(e) => onLectureChange("videoTitle", e.target.value)}
        />
      </div>

      <div className="lecture-line">
        <input
          placeholder="Video URL"
          type="text"
          value={videoURL}
          onChange={(e) => onLectureChange("videoURL", e.target.value)}
        />
      </div>

      <textarea
        placeholder="Lecture Description"
        className="lecture-description"
        value={lectureDescription}
        onChange={(e) =>
          onLectureChange("lectureDescription", e.target.value)
        }
      />
    </div>
  );
};
