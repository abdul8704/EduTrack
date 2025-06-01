import React, { useState, useEffect } from "react";
import "../../styles/addCourse.css";
import { LectureBlock } from "./LectureBlock";

const ModuleBlock = ({
  moduleId,
  moduleNumber,
  moduleTitle,
  onClose,
  onTitleChange,
  totalModules,
  onAddModule,
  moduleIndex,
  onLectureValidationChange,
}) => {
  const [title, setTitle] = useState(moduleTitle);
  const [lectures, setLectures] = useState([
    {
      id: 1,
      lectureName: "",
      videoTitle: "",
      videoURL: "",
      lectureDescription: "",
    },
  ]);

  useEffect(() => {
    setTitle(moduleTitle);
  }, [moduleTitle]);

  useEffect(() => {
    const allLecturesFilled = lectures.every(
      (lec) =>
        lec.lectureName.trim() !== "" &&
        lec.videoTitle.trim() !== "" &&
        lec.videoURL.trim() !== "" &&
        lec.lectureDescription.trim() !== ""
    );
    
    console.log(`Module ${moduleNumber} lecture validation:`, allLecturesFilled);
    
    if (onLectureValidationChange) {
      onLectureValidationChange(allLecturesFilled);
    }
  }, [lectures, onLectureValidationChange, moduleNumber]);

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
    console.log("Add module button clicked, title:", title);
    
    if (title.trim() === "") {
      console.log("Module title is empty, button should be disabled");
      return;
    }
    
    if (onAddModule) {
      console.log("Calling onAddModule with index:", moduleIndex);
      onAddModule(moduleIndex);
    }
  };

  const handleLectureChange = (lectureId, field, value) => {
    const updated = lectures.map(lecture => 
      lecture.id === lectureId 
        ? { ...lecture, [field]: value }
        : lecture
    );
    setLectures(updated);
  };

  const handleRemoveLecture = (lectureId) => {
    const updated = lectures.filter(lecture => lecture.id !== lectureId);
    setLectures(updated);
  };

  const handleAddLecture = () => {
    const newId = lectures.length > 0 ? Math.max(...lectures.map(l => l.id)) + 1 : 1;
    setLectures([
      ...lectures,
      {
        id: newId,
        lectureName: "",
        videoTitle: "",
        videoURL: "",
        lectureDescription: "",
      },
    ]);
  };

  return (
    <div className="module-wrapper">
      {/* Module Header Card - Fixed class names */}
      <div className="module-header-card">
        <span className="add-module-number">Module {moduleNumber}</span>
        <input
          placeholder="Module title"
          className="add-module-title-input"
          type="text"
          value={title}
          onChange={handleTitleChange}
        />
        <button className="add-module-close-btn" onClick={handleCloseClick}>
          ✖
        </button>
      </div>

      {/* Lectures */}
      <div className="lecture-block-wrapper">
        {lectures.map((lecture, index) => (
          <LectureBlock
            key={lecture.id}
            lectureId={lecture.id}
            lectureNumber={index + 1}
            lectureName={lecture.lectureName}
            videoTitle={lecture.videoTitle}
            videoURL={lecture.videoURL}
            lectureDescription={lecture.lectureDescription}
            onLectureChange={(field, value) =>
              handleLectureChange(lecture.id, field, value)
            }
            onRemoveLecture={() => handleRemoveLecture(lecture.id)}
            isRemovable={lectures.length > 1}
          />
        ))}

        {/* Buttons in the same line */}
        <div className="buttons-container">
          <button className="add-lecture-btn" onClick={handleAddLecture}>
            + Add Lecture
          </button>
          <button
            className="add-module-btn"
            disabled={title.trim() === ""}
            onClick={handleAddModuleClick}
          >
            + Add Module
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModuleBlock;