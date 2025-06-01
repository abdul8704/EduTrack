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
  showPopup, // Parent's showPopup function
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

    if (onLectureValidationChange) {
      onLectureValidationChange(moduleId, allLecturesFilled); // Pass moduleId here
    }
  }, [lectures, onLectureValidationChange, moduleId]); // Use moduleId instead of moduleNumber

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
    if (title.trim() === "") return;
    if (onAddModule) {
      onAddModule(moduleIndex);
    }
  };

  const handleLectureChange = (lectureId, field, value) => {
    const updated = lectures.map((lecture) =>
      lecture.id === lectureId
        ? { ...lecture, [field]: value }
        : lecture
    );
    setLectures(updated);
  };

  const handleRemoveLecture = (lectureId) => {
    if (lectures.length === 1) {
      // Reset lecture instead of removing
      setLectures((prev) =>
        prev.map((lecture) =>
          lecture.id === lectureId
            ? {
                ...lecture,
                lectureName: "",
                videoTitle: "",
                videoURL: "",
                lectureDescription: "",
              }
            : lecture
        )
      );
      
      // Show popup for lecture reset using parent's showPopup
      if (showPopup) {
        showPopup("Lecture reset successfully!", {
          background: "#d4edda",
          border: "#c3e6cb",
          text: "#155724",
        });
      }
    } else {
      setLectures((prev) => prev.filter((lec) => lec.id !== lectureId));
      
      // Show popup for lecture deletion using parent's showPopup
      if (showPopup) {
        showPopup("Lecture deleted successfully!", {
          background: "#d4edda",
          border: "#c3e6cb",
          text: "#155724",
        });
      }
    }
  };

  const generateNewId = () => {
    return Math.max(...lectures.map(l => l.id)) + 1;
  };

  const handleAddLecture = () => {
    const isAnyLectureIncomplete = lectures.some(
      (lecture) =>
        !lecture.lectureName.trim() ||
        !lecture.videoTitle.trim() ||
        !lecture.videoURL.trim() ||
        !lecture.lectureDescription.trim()
    );

    if (isAnyLectureIncomplete) {
      if (showPopup) {
        showPopup("Please complete all existing lecture fields before adding a new lecture.", {
          background: "#f8d7da",
          border: "#f5c6cb",
          text: "#721c24",
        });
      }
      return;
    }

    // Add new lecture
    setLectures((prev) => [
      ...prev,
      { 
        id: generateNewId(), 
        lectureName: "", 
        videoTitle: "", 
        videoURL: "", 
        lectureDescription: "" 
      },
    ]);

    // Show success popup for lecture creation
    if (showPopup) {
      showPopup("Lecture created successfully!", {
        background: "#d4edda",
        border: "#c3e6cb",
        text: "#155724",
      });
    }
  };

  return (
    <div className="module-wrapper">
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
            onRemoveLecture={handleRemoveLecture}
          />
        ))}

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