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
  onModuleValidationChange,
  showPopup,
}) => {
  const [title, setTitle] = useState(moduleTitle);
  const [lectures, setLectures] = useState([
    {
      id: 1,
      lectureName: "",
      videoTitle: "",
      videoURL: "",
      lectureDescription: "",
      questions: []
    },
  ]);

  useEffect(() => {
    setTitle(moduleTitle);
  }, [moduleTitle]);

  // Comprehensive validation effect
  useEffect(() => {
    // Validate all lectures
    const lecturesValid = lectures.every(lecture => {
      const basicFieldsValid = 
        lecture.lectureName.trim() !== "" &&
        lecture.videoTitle.trim() !== "" &&
        lecture.videoURL.trim() !== "" &&
        lecture.lectureDescription.trim() !== "";

      // Validate questions - each question must have text and at least 2 choices
      const questionsValid = lecture.questions.every(question => 
        question.questionText.trim() !== "" &&
        question.choices.length >= 2 &&
        question.selectedAnswer !== null
      );

      return basicFieldsValid && questionsValid;
    });

    const validationData = {
      isValid: lecturesValid,
      moduleData: {
        lectures: lectures
      }
    };

    if (onModuleValidationChange) {
      onModuleValidationChange(moduleId, validationData);
    }
  }, [lectures, onModuleValidationChange, moduleId]);

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
    // Check if module title is filled
    if (title.trim() === "") {
      if (showPopup) {
        showPopup("Please enter a Module Title before adding a new module.", {
          background: "#f8d7da",
          border: "#f5c6cb",
          text: "#721c24",
        });
      }
      return;
    }

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

  const handleQuestionsChange = (lectureId, questions) => {
    const updated = lectures.map((lecture) =>
      lecture.id === lectureId
        ? { ...lecture, questions: questions }
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
                questions: []
              }
            : lecture
        )
      );
      
      if (showPopup) {
        showPopup("Lecture reset successfully!", {
          background: "#d4edda",
          border: "#c3e6cb",
          text: "#155724",
        });
      }
    } else {
      setLectures((prev) => prev.filter((lec) => lec.id !== lectureId));
      
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
    // Check if all existing lectures are complete
    const incompleteLecture = lectures.find((lecture, index) => {
      const basicFieldsIncomplete = 
        !lecture.lectureName.trim() ||
        !lecture.videoTitle.trim() ||
        !lecture.videoURL.trim() ||
        !lecture.lectureDescription.trim();

      const questionsIncomplete = lecture.questions.some(question => 
        !question.questionText.trim() ||
        question.choices.length < 2 ||
        question.selectedAnswer === null
      );

      if (basicFieldsIncomplete) {
        if (showPopup) {
          showPopup(`Please complete all basic fields in Lecture ${index + 1} before adding a new lecture.`, {
            background: "#f8d7da",
            border: "#f5c6cb",
            text: "#721c24",
          });
        }
        return true;
      }

      if (questionsIncomplete) {
        if (showPopup) {
          showPopup(`Please complete all questions with at least 2 choices each in Lecture ${index + 1} before adding a new lecture.`, {
            background: "#f8d7da",
            border: "#f5c6cb",
            text: "#721c24",
          });
        }
        return true;
      }

      return false;
    });

    if (incompleteLecture) {
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
        lectureDescription: "",
        questions: []
      },
    ]);

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
            moduleId={moduleId}
            lectureNumber={index + 1}
            lectureName={lecture.lectureName}
            videoTitle={lecture.videoTitle}
            videoURL={lecture.videoURL}
            lectureDescription={lecture.lectureDescription}
            questions={lecture.questions}
            onLectureChange={(field, value) =>
              handleLectureChange(lecture.id, field, value)
            }
            onQuestionsChange={(questions) =>
              handleQuestionsChange(lecture.id, questions)
            }
            onRemoveLecture={handleRemoveLecture}
            showPopup={showPopup}
          />
        ))}

        <div className="buttons-container">
          <button className="add-lecture-btn" onClick={handleAddLecture}>
            + Add Lecture
          </button>
          <button
            className="add-module-btn"
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