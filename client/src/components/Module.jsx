import React, { useState } from 'react';
import '../styles/course.css';

export const Module = ({ title, videoUrl, description, questions }) => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [results, setResults] = useState({});

  const handleOptionChange = (questionIndex, option) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: option,
    }));
  };

  const validateAnswers = () => {
    const newResults = {};
    questions.forEach((question, idx) => {
      newResults[idx] = selectedAnswers[idx] === question.correctAnswer;
    });
    setResults(newResults);
  };

  return (
    <div className="module-container">
      <h1 className="module-title">{title}</h1>

      <div className="module-video-wrapper">
        <iframe
          src={videoUrl}
          title="Module Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="module-video"
        />
      </div>

      <h2>Description</h2>
      <p className="module-description">{description}</p>

      <h2>Quiz</h2>
      <form className="module-quiz-form">
        {questions.map((question, idx) => (
          <div key={question._id} className="quiz-question-card">
            <p className="module-quiz-question-text">{question.questionText}</p>
            <div className="module-quiz-options">
              {question.options.map((option, oidx) => (
                <label
                  key={oidx}
                  className={`module-quiz-option-label ${
                    selectedAnswers[idx] === option ? 'selected' : ''
                  }`}
                >
                  <input
                    type="radio"
                    name={`question-${idx}`}
                    value={option}
                    checked={selectedAnswers[idx] === option}
                    onChange={() => handleOptionChange(idx, option)}
                    className="module-quiz-option-input"
                  />
                  <span className="module-custom-radio" />
                  {option}
                </label>
              ))}
            </div>

            {results.hasOwnProperty(idx) && (
              <p
                className={`module-quiz-feedback ${
                  results[idx] ? 'correct' : 'incorrect'
                }`}
              >
                {results[idx] ? '✔ Correct!' : `✘ Incorrect! Correct answer: ${question.correctAnswer}`}
              </p>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={validateAnswers}
          className="module-quiz-submit-btn"
        >
          Submit Answers
        </button>
      </form>
    </div>
  );
};
