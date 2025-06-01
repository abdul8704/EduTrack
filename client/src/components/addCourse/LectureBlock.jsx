import React, { useState, useEffect } from "react";
import "../../styles/addCourse.css";
import QuestionBlock from "./QuestionBlock";

// Generate unique question ID
const generateQuestionId = () => {
  return `question_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const LectureBlock = ({
  lectureId,
  moduleId,
  lectureNumber,
  lectureName,
  videoTitle,
  videoURL,
  lectureDescription,
  questions = [],
  onLectureChange,
  onRemoveLecture,
  onQuestionsChange,
  showPopup,
}) => {
  // Initialize with at least one question by default
  const initializeQuestions = () => {
    if (questions.length === 0) {
      return [{
        id: generateQuestionId(),
        questionText: "",
        choices: [],
        selectedAnswer: null,
      }];
    }
    return questions;
  };

  const [localQuestions, setLocalQuestions] = useState(initializeQuestions());

  // Update parent when questions change
  useEffect(() => {
    onQuestionsChange(localQuestions);
  }, [localQuestions, onQuestionsChange]);

  // Add new question
  const handleAddQuestion = () => {
    // Check if all existing questions are complete before adding new one
    const incompleteQuestion = localQuestions.find((question, index) => {
      if (!question.questionText.trim()) {
        if (showPopup) {
          showPopup(`Please enter question text for Question ${index + 1} before adding a new question.`, {
            background: "#f8d7da",
            border: "#f5c6cb",
            text: "#721c24",
          });
        }
        return true;
      }
      
      if (question.choices.length < 2) {
        if (showPopup) {
          showPopup(`Please add at least 2 choices for Question ${index + 1} before adding a new question.`, {
            background: "#f8d7da",
            border: "#f5c6cb",
            text: "#721c24",
          });
        }
        return true;
      }
      
      if (question.selectedAnswer === null) {
        if (showPopup) {
          showPopup(`Please select a correct answer for Question ${index + 1} before adding a new question.`, {
            background: "#f8d7da",
            border: "#f5c6cb",
            text: "#721c24",
          });
        }
        return true;
      }
      
      return false;
    });

    if (incompleteQuestion) {
      return;
    }

    const newQuestion = {
      id: generateQuestionId(),
      questionText: "",
      choices: [],
      selectedAnswer: null,
    };
    const updatedQuestions = [...localQuestions, newQuestion];
    setLocalQuestions(updatedQuestions);

    if (showPopup) {
      showPopup("Question added successfully!", {
        background: "#d4edda",
        border: "#c3e6cb",
        text: "#155724",
      });
    }
  };

  // Remove question (prevent removing if it's the last one)
  const handleRemoveQuestion = (questionId, resetCallback) => {
    if (localQuestions.length <= 1) {
      // Don't remove if it's the last question, just reset it
      const resetQuestion = {
        id: questionId,
        questionText: "",
        choices: [],
        selectedAnswer: null,
      };
      const updatedQuestions = [resetQuestion];
      setLocalQuestions(updatedQuestions);
      if (resetCallback) resetCallback();
      
      if (showPopup) {
        showPopup("Question reset successfully!", {
          background: "#d4edda",
          border: "#c3e6cb",
          text: "#155724",
        });
      }
      return;
    }
    
    const updatedQuestions = localQuestions.filter(q => q.id !== questionId);
    setLocalQuestions(updatedQuestions);
    if (resetCallback) resetCallback();
    
    if (showPopup) {
      showPopup("Question deleted successfully!", {
        background: "#d4edda",
        border: "#c3e6cb",
        text: "#155724",
      });
    }
  };

  // Update question text
  const handleQuestionTextChange = (questionId, text) => {
    const updatedQuestions = localQuestions.map(q =>
      q.id === questionId ? { ...q, questionText: text } : q
    );
    setLocalQuestions(updatedQuestions);
  };

  // Update question choices
  const handleChoicesChange = (questionId, choices) => {
    const updatedQuestions = localQuestions.map(q =>
      q.id === questionId ? { ...q, choices } : q
    );
    setLocalQuestions(updatedQuestions);
  };

  // Update selected answer
  const handleAnswerChange = (questionId, answer) => {
    const updatedQuestions = localQuestions.map(q =>
      q.id === questionId ? { ...q, selectedAnswer: answer } : q
    );
    setLocalQuestions(updatedQuestions);
  };

  return (
    <>
      {/* Lecture Card */}
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

      {/* Assignments Card */}
      <div className="assignments-card">
        <div className="assignments-header">
          <span className="assignments-title">Assignments for Lecture {lectureNumber}</span>
        </div>
        
        <div className="assignments-content">
          {localQuestions.map((question, index) => (
            <div key={question.id} className="assignment-block" style={{ marginBottom: "1.5rem" }}>
              {/* Assignment Title */}
              <div className="assignment-title" style={{ 
                marginBottom: "0.75rem",
                padding: "0.5rem 0.75rem",
                backgroundColor: "#e3f2fd",
                borderRadius: "6px",
                border: "1px solid #bbdefb"
              }}>
                <h5 style={{ 
                  margin: 0, 
                  fontSize: "1rem", 
                  fontWeight: "600", 
                  color: "#1976d2" 
                }}>
                  Assignment {index + 1}
                </h5>
              </div>
              
              {/* Question Block */}
              <QuestionBlock
                id={question.id}
                lectureId={lectureId}
                moduleId={moduleId}
                onRemove={handleRemoveQuestion}
                onChoicesChange={handleChoicesChange}
                onAnswerChange={handleAnswerChange}
                onQuestionTextChange={handleQuestionTextChange}
                questionData={question}
                questionIndex={index + 1}
                isFirstQuestion={false}
                isLastQuestion={index === localQuestions.length - 1}
                onAddQuestion={handleAddQuestion}
                showPopup={showPopup}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};