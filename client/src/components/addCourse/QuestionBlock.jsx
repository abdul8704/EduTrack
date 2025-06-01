import React, { useState, useEffect } from "react";
import "../../styles/addCourse.css";


const QuestionBlock = ({ 
  id, 
  lectureId, 
  moduleId, 
  onRemove, 
  onChoicesChange, 
  onAnswerChange, 
  onQuestionTextChange, 
  questionData, 
  questionIndex, 
  isFirstQuestion, 
  isLastQuestion, 
  onAddQuestion 
}) => {
  const [questionText, setQuestionText] = useState(questionData.questionText || "");
  const [choices, setChoices] = useState(questionData.choices || []);
  const [newChoiceText, setNewChoiceText] = useState("");
  const [selectedAnswer, setSelectedAnswer] = useState(questionData.selectedAnswer);

  useEffect(() => {
    setQuestionText(questionData.questionText || "");
    setChoices(questionData.choices || []);
    setSelectedAnswer(questionData.selectedAnswer);
  }, [questionData]);

  const handleCheckboxChange = (choice) => {
    const newSelected = selectedAnswer === choice ? null : choice;
    setSelectedAnswer(newSelected);
    onAnswerChange(moduleId, lectureId, id, newSelected);
  };

  const handleAddChoice = () => {
    const trimmed = newChoiceText.trim();
    if (trimmed === "") return;
    if (choices.includes(trimmed)) {
      alert("Choice already exists");
      return;
    }
    const newChoices = [...choices, trimmed];
    setChoices(newChoices);
    onChoicesChange(moduleId, lectureId, id, newChoices);
    setNewChoiceText("");
  };

  const handleRemoveChoice = (choice) => {
    const newChoices = choices.filter((c) => c !== choice);
    setChoices(newChoices);
    onChoicesChange(moduleId, lectureId, id, newChoices);
    if (selectedAnswer === choice) {
      setSelectedAnswer(null);
      onAnswerChange(moduleId, lectureId, id, null);
    }
  };

  const resetInputs = () => {
    setQuestionText("");
    setChoices([]);
    setSelectedAnswer(null);
    onQuestionTextChange(moduleId, lectureId, id, "");
    onChoicesChange(moduleId, lectureId, id, []);
    onAnswerChange(moduleId, lectureId, id, null);
  };

  const handleRemoveClick = () => {
    onRemove(moduleId, lectureId, id, resetInputs);
  };

  const handleQuestionTextChange = (e) => {
    setQuestionText(e.target.value);
    onQuestionTextChange(moduleId, lectureId, id, e.target.value);
  };

  return (
    <>
      <div className="add-lecture-card" style={{ marginBottom: "1rem" }}>
        <div className="add-row-inputs">
          {/* Assignment header for first question */}
          {isFirstQuestion && (
            <p className="add-subtitle" style={{ margin: 0, flex: "0 0 auto", marginRight: "1rem" }}>
              Assignment {questionIndex}
            </p>
          )}

          {/* Question input */}
          <input
            type="text"
            placeholder="Question"
            className="add-input-field"
            value={questionText}
            onChange={handleQuestionTextChange}
            style={{ flex: 1 }}
          />

          {/* Remove button */}
          <button
            type="button"
            className="add-icon-btn remove"
            onClick={handleRemoveClick}
            title="Remove question"
            style={{ marginLeft: "0.5rem" }}
          >
            ×
          </button>
        </div>
      </div>

      <div className="add-lecture-card add-choices-card">
        {choices.map((choice, index) => (
          <div key={index} className="add-row-inputs choice-with-radio" style={{ marginBottom: "0.5rem" }}>
            <input 
              type="checkbox" 
              checked={selectedAnswer === choice} 
              onChange={() => handleCheckboxChange(choice)} 
              className="add-checkbox-btn" 
            />
            <input 
              type="text" 
              value={choice} 
              className="add-input-field add-choice-input" 
              disabled 
              style={{ flexGrow: 1, marginRight: "0.5rem" }} 
            />
            <div className="add-icon-buttons">
              <button 
                type="button" 
                className="add-icon-btn remove" 
                onClick={() => handleRemoveChoice(choice)} 
                title="Remove choice"
              >
                ×
              </button>
            </div>
          </div>
        ))}

        <div className="add-row-inputs choice-with-radio">
          <input 
            type="checkbox" 
            disabled 
            className="add-checkbox-btn" 
            style={{ visibility: "hidden", marginRight: "0.5rem" }} 
          />
          <input 
            type="text" 
            placeholder="Add new choice" 
            className="add-input-field add-choice-input" 
            style={{ flexGrow: 1, marginRight: "0.5rem" }} 
            value={newChoiceText} 
            onChange={(e) => setNewChoiceText(e.target.value)} 
            onKeyDown={(e) => { 
              if (e.key === "Enter") { 
                e.preventDefault(); 
                handleAddChoice(); 
              } 
            }} 
          />
          <div className="add-icon-buttons">
            <button 
              type="button" 
              className="add-icon-btn" 
              onClick={handleAddChoice} 
              title="Add choice"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Add question button below choices card (only for last question) */}
      {isLastQuestion && (
        <div style={{ textAlign: "center", marginBottom: "1rem" }}>
          <button
            type="button"
            className="add-icon-btn"
            onClick={onAddQuestion}
            title="Add question to this assignment"
          >
            + Add Question
          </button>
        </div>
      )}
    </>
  );
};

export default QuestionBlock;