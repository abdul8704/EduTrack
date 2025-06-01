import React, { useState, useEffect } from "react";
import "../../styles/addCourse.css";
import { LectureBlock } from "./LectureBlock";

const ModuleBlock = ({
  moduleNumber,
  moduleTitle,
  onClose,
  onTitleChange,
  totalModules,
  resetModule,
  onAddModule,
  moduleIndex,
}) => {
  const [title, setTitle] = useState(moduleTitle);
  const [lectures, setLectures] = useState([
    {
      lectureName: "",
      videoTitle: "",
      videoURL: "",
      lectureDescription: "",
    },
  ]);

  useEffect(() => {
    setTitle(moduleTitle);
  }, [moduleTitle]);

  const handleTitleChange = (e) => {
    const newValue = e.target.value;
    setTitle(newValue);
    if (onTitleChange) {
      onTitleChange(newValue);
    }
  };

  const handleCloseClick = () => {
    if (onClose) onClose();
  };

  const handleAddModuleClick = () => {
    if (onAddModule) onAddModule(moduleIndex);
  };

  const handleLectureChange = (index, field, value) => {
    const updated = [...lectures];
    updated[index][field] = value;
    setLectures(updated);
  };

  const handleRemoveLecture = (index) => {
    const updated = lectures.filter((_, i) => i !== index);
    setLectures(updated);
  };

  const handleAddLecture = () => {
    setLectures([
      ...lectures,
      {
        lectureName: "",
        videoTitle: "",
        videoURL: "",
        lectureDescription: "",
      },
    ]);
  };

  return (
    <div className="module-wrapper">

      {/* 🟦 Module Header Card */}
      <div className="module-header-card">
        <span className="add-module-number">Module {moduleNumber}</span>
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          className="add-module-title-input"
          placeholder="Module Title"
        />
        <button
          className="add-module-close-btn"
          onClick={handleCloseClick}
          aria-label={`Remove module ${moduleNumber}`}
        >
          ×
        </button>
      </div>

      {/* 🟨 Lecture Cards */}
      {lectures.map((lecture, index) => (
        <div key={index} className="lecture-card">
          <LectureBlock
            subModuleNumber={index + 1}
            lecture={lecture}
            onLectureChange={(field, value) =>
              handleLectureChange(index, field, value)
            }
            onRemoveLecture={() => handleRemoveLecture(index)}
          />
        </div>
      ))}

{/* button  */}
<div className="add-card">
  <div className="add-buttons-row">
    <button className="add-module-btn" onClick={handleAddModuleClick}>
      + Add Module
    </button>
    <button className="add-lecture-btn" onClick={handleAddLecture}>
      + Add Lecture
    </button>
  </div>
</div>


    </div>
  );
};

export default ModuleBlock;
