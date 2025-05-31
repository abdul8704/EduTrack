import React, { useState, useEffect } from "react";
import "../styles/add.css";

const QuestionBlock = ({ id, lectureId, moduleId, onRemove, onChoicesChange, onAnswerChange, onQuestionTextChange, questionData }) => {
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
          <input type="text" placeholder="Question" className="add-input-field" value={questionText} onChange={handleQuestionTextChange} />
          <button type="button" className="add-icon-btn remove" onClick={handleRemoveClick} title="Remove question">×</button>
        </div>
      </div>

      <div className="add-lecture-card add-choices-card">
        {choices.map((choice, index) => (
          <div key={index} className="add-row-inputs choice-with-radio" style={{ marginBottom: "0.5rem" }}>
            <input type="checkbox" checked={selectedAnswer === choice} onChange={() => handleCheckboxChange(choice)} className="add-checkbox-btn" />
            <input type="text" value={choice} className="add-input-field add-choice-input" disabled style={{ flexGrow: 1, marginRight: "0.5rem" }} />
            <div className="add-icon-buttons">
              <button type="button" className="add-icon-btn remove" onClick={() => handleRemoveChoice(choice)} title="Remove choice">×</button>
            </div>
          </div>
        ))}

        <div className="add-row-inputs choice-with-radio">
          <input type="checkbox" disabled className="add-checkbox-btn" style={{ visibility: "hidden", marginRight: "0.5rem" }} />
          <input type="text" placeholder="Add new choice" className="add-input-field add-choice-input" style={{ flexGrow: 1, marginRight: "0.5rem" }} value={newChoiceText} onChange={(e) => setNewChoiceText(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleAddChoice(); } }} />
          <div className="add-icon-buttons">
            <button type="button" className="add-icon-btn" onClick={handleAddChoice} title="Add choice">+</button>
          </div>
        </div>
      </div>
    </>
  );
};

const LectureBlock = ({ id, moduleId, lectureData, onRemove, onLectureChange }) => {
  const [lectureName, setLectureName] = useState(lectureData.lectureName || "");
  const [videoName, setVideoName] = useState(lectureData.videoName || "");
  const [videoURL, setVideoURL] = useState(lectureData.videoURL || "");
  const [lectureDescription, setLectureDescription] = useState(lectureData.lectureDescription || "");

  useEffect(() => {
    setLectureName(lectureData.lectureName || "");
    setVideoName(lectureData.videoName || "");
    setVideoURL(lectureData.videoURL || "");
    setLectureDescription(lectureData.lectureDescription || "");
  }, [lectureData]);

  const handleChange = (field, value) => {
    switch (field) {
      case "lectureName":
        setLectureName(value);
        break;
      case "videoName":
        setVideoName(value);
        break;
      case "videoURL":
        setVideoURL(value);
        break;
      case "lectureDescription":
        setLectureDescription(value);
        break;
      default:
        break;
    }
    onLectureChange(moduleId, id, {
      lectureName,
      videoName,
      videoURL,
      lectureDescription,
      [field]: value,
    });
  };

  const handleRemoveClick = () => {
    onRemove(moduleId, id);
  };

  return (
    <div className="add-lecture-card" style={{ marginBottom: "1rem" }}>
      <div className="add-row-inputs" style={{ alignItems: "center" }}>
        <input type="text" placeholder="Lecture Name" className="add-input-field" value={lectureName} onChange={(e) => handleChange("lectureName", e.target.value)} />
        <input type="text" placeholder="Video Name" className="add-input-field" value={videoName} onChange={(e) => handleChange("videoName", e.target.value)} />
        <input type="text" placeholder="Video URL" className="add-input-field" value={videoURL} onChange={(e) => handleChange("videoURL", e.target.value)} />
        <button type="button" className="add-icon-btn remove" style={{ marginLeft: "0.5rem" }} onClick={handleRemoveClick} title="Remove lecture">×</button>
      </div>

      <textarea placeholder="Lecture Description" className="add-textarea-field" rows={3} value={lectureDescription} onChange={(e) => handleChange("lectureDescription", e.target.value)} style={{ marginTop: "0.5rem" }}></textarea>
    </div>
  );
};

export const Add = () => {
  // State for modules, each containing lectures with assignments
  const [modules, setModules] = useState([
    {
      id: Date.now(),
      moduleName: "",
      lecturesWithAssignments: [
        {
          id: Date.now() + 1,
          lectureData: { lectureName: "", videoName: "", videoURL: "", lectureDescription: "" },
          questions: [
            { id: Date.now() + 2, questionText: "", selectedAnswer: null, choices: [] }
          ]
        }
      ]
    }
  ]);

  // --- Module handlers ---
  const handleModuleNameChange = (moduleId, newName) => {
    setModules((prev) =>
      prev.map((module) =>
        module.id === moduleId ? { ...module, moduleName: newName } : module
      )
    );
  };

  const removeModule = (moduleId) => {
    if (modules.length > 1) {
      setModules((prev) => prev.filter((module) => module.id !== moduleId));
    } else {
      // If only one module, reset it instead of removing
      setModules([
        {
          id: Date.now(),
          moduleName: "",
          lecturesWithAssignments: [
            {
              id: Date.now() + 1,
              lectureData: { lectureName: "", videoName: "", videoURL: "", lectureDescription: "" },
              questions: [
                { id: Date.now() + 2, questionText: "", selectedAnswer: null, choices: [] }
              ]
            }
          ]
        }
      ]);
    }
  };

  const validateModuleCompletion = (module) => {
    // Check module name
    if (!module.moduleName.trim()) {
      return { isValid: false, message: "Please enter the module name." };
    }

    // Check if there's at least one lecture
    if (module.lecturesWithAssignments.length === 0) {
      return { isValid: false, message: "Each module must have at least one lecture." };
    }

    // Validate each lecture and its assignment
    for (const lectureWithAssignment of module.lecturesWithAssignments) {
      const lectureData = lectureWithAssignment.lectureData;
      
      // Check lecture fields
      if (
        !lectureData.lectureName.trim() ||
        !lectureData.videoName.trim() ||
        !lectureData.videoURL.trim() ||
        !lectureData.lectureDescription.trim()
      ) {
        return { isValid: false, message: "Please fill all fields for all lectures in the current module." };
      }

      // Check assignment questions
      if (lectureWithAssignment.questions.length === 0) {
        return { isValid: false, message: "Each lecture must have at least one assignment question." };
      }

      for (const question of lectureWithAssignment.questions) {
        if (!question.questionText.trim()) {
          return { isValid: false, message: "Please complete all question texts in the current module." };
        }
        if (question.choices.length < 2) {
          return { isValid: false, message: "Each question must have at least 2 choices." };
        }
        if (question.selectedAnswer === null || question.selectedAnswer === "") {
          return { isValid: false, message: "Please mark one choice as the correct answer for all questions." };
        }
      }
    }

    return { isValid: true, message: "" };
  };

  const addModule = () => {
    // Validate the last module
    const lastModule = modules[modules.length - 1];
    const validation = validateModuleCompletion(lastModule);
    
    if (!validation.isValid) {
      alert(validation.message);
      return;
    }

    const newModuleId = Date.now();
    setModules((prev) => [
      ...prev,
      {
        id: newModuleId,
        moduleName: "",
        lecturesWithAssignments: [
          {
            id: newModuleId + 1,
            lectureData: { lectureName: "", videoName: "", videoURL: "", lectureDescription: "" },
            questions: [
              { id: newModuleId + 2, questionText: "", selectedAnswer: null, choices: [] }
            ]
          }
        ]
      }
    ]);
  };

  // --- Questions handlers ---
  const handleQuestionTextChange = (moduleId, lectureId, questionId, newText) => {
    setModules((prev) =>
      prev.map((module) =>
        module.id === moduleId
          ? {
              ...module,
              lecturesWithAssignments: module.lecturesWithAssignments.map((lecture) =>
                lecture.id === lectureId
                  ? {
                      ...lecture,
                      questions: lecture.questions.map((q) =>
                        q.id === questionId ? { ...q, questionText: newText } : q
                      )
                    }
                  : lecture
              )
            }
          : module
      )
    );
  };

  const handleChoicesChange = (moduleId, lectureId, questionId, newChoices) => {
    setModules((prev) =>
      prev.map((module) =>
        module.id === moduleId
          ? {
              ...module,
              lecturesWithAssignments: module.lecturesWithAssignments.map((lecture) =>
                lecture.id === lectureId
                  ? {
                      ...lecture,
                      questions: lecture.questions.map((q) =>
                        q.id === questionId ? { ...q, choices: newChoices } : q
                      )
                    }
                  : lecture
              )
            }
          : module
      )
    );
  };

  const handleAnswerChange = (moduleId, lectureId, questionId, newAnswer) => {
    setModules((prev) =>
      prev.map((module) =>
        module.id === moduleId
          ? {
              ...module,
              lecturesWithAssignments: module.lecturesWithAssignments.map((lecture) =>
                lecture.id === lectureId
                  ? {
                      ...lecture,
                      questions: lecture.questions.map((q) =>
                        q.id === questionId ? { ...q, selectedAnswer: newAnswer } : q
                      )
                    }
                  : lecture
              )
            }
          : module
      )
    );
  };

  const removeQuestion = (moduleId, lectureId, questionId, resetCallback) => {
    setModules((prev) =>
      prev.map((module) => {
        if (module.id === moduleId) {
          return {
            ...module,
            lecturesWithAssignments: module.lecturesWithAssignments.map((lecture) => {
              if (lecture.id === lectureId) {
                if (lecture.questions.length > 1) {
                  return {
                    ...lecture,
                    questions: lecture.questions.filter((q) => q.id !== questionId)
                  };
                } else {
                  if (typeof resetCallback === "function") resetCallback();
                  return lecture;
                }
              }
              return lecture;
            })
          };
        }
        return module;
      })
    );
  };

  const addQuestion = (moduleId, lectureId) => {
    setModules((prev) =>
      prev.map((module) => {
        if (module.id === moduleId) {
          return {
            ...module,
            lecturesWithAssignments: module.lecturesWithAssignments.map((lecture) => {
              if (lecture.id === lectureId) {
                // Validate current questions before adding new one
                for (const q of lecture.questions) {
                  if (!q.questionText.trim()) {
                    alert("Please enter at least one question.");
                    return lecture;
                  }
                  if (q.choices.length < 2) {
                    alert("Each question must have at least 2 choices.");
                    return lecture;
                  }
                  if (q.selectedAnswer === null || q.selectedAnswer === "") {
                    alert("Please mark one choice as the correct answer.");
                    return lecture;
                  }
                }

                return {
                  ...lecture,
                  questions: [
                    ...lecture.questions,
                    { id: Date.now(), questionText: "", selectedAnswer: null, choices: [] }
                  ]
                };
              }
              return lecture;
            })
          };
        }
        return module;
      })
    );
  };

  // --- Lectures handlers ---
  const handleLectureChange = (moduleId, lectureId, newData) => {
    setModules((prev) =>
      prev.map((module) =>
        module.id === moduleId
          ? {
              ...module,
              lecturesWithAssignments: module.lecturesWithAssignments.map((lecture) =>
                lecture.id === lectureId
                  ? { ...lecture, lectureData: { ...lecture.lectureData, ...newData } }
                  : lecture
              )
            }
          : module
      )
    );
  };

  const removeLecture = (moduleId, lectureId) => {
    setModules((prev) =>
      prev.map((module) => {
        if (module.id === moduleId) {
          if (module.lecturesWithAssignments.length > 1) {
            return {
              ...module,
              lecturesWithAssignments: module.lecturesWithAssignments.filter((lecture) => lecture.id !== lectureId)
            };
          } else {
            // If only one lecture, reset it instead of removing
            return {
              ...module,
              lecturesWithAssignments: [
                {
                  id: Date.now(),
                  lectureData: { lectureName: "", videoName: "", videoURL: "", lectureDescription: "" },
                  questions: [
                    { id: Date.now() + 1, questionText: "", selectedAnswer: null, choices: [] }
                  ]
                }
              ]
            };
          }
        }
        return module;
      })
    );
  };

  const addLecture = (moduleId) => {
    setModules((prev) =>
      prev.map((module) => {
        if (module.id === moduleId) {
          // Check that all fields in the last lecture are filled
          const lastLecture = module.lecturesWithAssignments[module.lecturesWithAssignments.length - 1];
          const lastLectureData = lastLecture.lectureData;
          
          if (
            !lastLectureData.lectureName.trim() ||
            !lastLectureData.videoName.trim() ||
            !lastLectureData.videoURL.trim() ||
            !lastLectureData.lectureDescription.trim()
          ) {
            alert("Please fill all fields for the current lecture before adding a new one.");
            return module;
          }

          // Check that there is at least one complete assignment question
          const lastQuestions = lastLecture.questions;
          if (lastQuestions.length === 0) {
            alert("Please add at least one assignment question before adding a new lecture.");
            return module;
          }

          for (const q of lastQuestions) {
            if (!q.questionText.trim()) {
              alert("Please complete all question texts before adding a new lecture.");
              return module;
            }
            if (q.choices.length < 2) {
              alert("Each question must have at least 2 choices before adding a new lecture.");
              return module;
            }
            if (q.selectedAnswer === null || q.selectedAnswer === "") {
              alert("Please mark one choice as the correct answer for all questions before adding a new lecture.");
              return module;
            }
          }

          const newLectureId = Date.now();
          return {
            ...module,
            lecturesWithAssignments: [
              ...module.lecturesWithAssignments,
              {
                id: newLectureId,
                lectureData: { lectureName: "", videoName: "", videoURL: "", lectureDescription: "" },
                questions: [
                  { id: newLectureId + 1, questionText: "", selectedAnswer: null, choices: [] }
                ]
              }
            ]
          };
        }
        return module;
      })
    );
  };

  return (
    <div className="add-container">
      <div className="add-card">
        <h1>CREATE A NEW COURSE</h1>
      </div>

      <form className="add-card">
        {/* Course Introduction */}
        <div className="add-subtitle-card">
          <p className="add-subtitle">Course Introduction</p>

          <div className="add-row-inputs">
            <input type="text" placeholder="Course Name" className="add-input-field" />
            <input type="text" placeholder="Instructor Name" className="add-input-field" />
            <input type="text" placeholder="Course ID" className="add-input-field" />
          </div>

          <textarea placeholder="Course Description" className="add-textarea-field" rows={4}></textarea>

          <div className="add-row-inputs">
            <input type="text" placeholder="Intro Video Title" className="add-input-field" />
            <input type="text" placeholder="Video URL" className="add-input-field" />
            <input type="text" placeholder="Tags (comma separated)" className="add-input-field" />
          </div>
        </div>

        {/* Modules Header */}
        <div className="add-lecture-card">
          <div className="add-lecture-header">
            <p className="add-subtitle">Modules</p>
            <div className="add-lecture-buttons">
              <button type="button" className="add-icon-btn" onClick={addModule}>+</button>
            </div>
          </div>
        </div>

        {/* Render each module */}
        {modules.map((module, moduleIndex) => (
          <div key={module.id}>
            {/* Module Header */}
            <div className="add-subtitle-card">
              <div className="add-row-inputs add-row-tight">
                <p className="add-subtitle" style={{ margin: 0, flex: "0 0 auto" }}>Module {moduleIndex + 1}</p>
                <input 
                  type="text" 
                  placeholder="Module Name" 
                  className="add-input-field" 
                  value={module.moduleName}
                  onChange={(e) => handleModuleNameChange(module.id, e.target.value)}
                />
                <div className="add-lecture-buttons">
                  <button 
                    type="button" 
                    className="add-icon-btn" 
                    onClick={() => addLecture(module.id)}
                    title="Add lecture to this module"
                  >
                    +
                  </button>
                  {modules.length > 1 && (
                    <button 
                      type="button" 
                      className="add-icon-btn remove" 
                      onClick={() => removeModule(module.id)}
                      title="Remove entire module"
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Render each lecture with its assignment in this module */}
            {module.lecturesWithAssignments.map((lectureWithAssignment, lectureIndex) => (
              <div key={lectureWithAssignment.id}>
                {/* Assignment Section */}
                <div className="add-lecture-card">
                  <div className="add-lecture-header">
                    <p className="add-subtitle">Assignment {lectureIndex + 1}</p>
                    <div className="add-lecture-buttons">
                      <button 
                        type="button" 
                        className="add-icon-btn" 
                        onClick={() => addQuestion(module.id, lectureWithAssignment.id)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Questions for this assignment */}
                {lectureWithAssignment.questions.map((q) => (
                  <QuestionBlock 
                    key={q.id} 
                    id={q.id} 
                    lectureId={lectureWithAssignment.id}
                    moduleId={module.id}
                    onRemove={removeQuestion} 
                    onChoicesChange={handleChoicesChange} 
                    onAnswerChange={handleAnswerChange} 
                    onQuestionTextChange={handleQuestionTextChange} 
                    questionData={q} 
                  />
                ))}

                {/* Lecture Section */}
                <div className="add-lecture-card">
                  <div className="add-lecture-header">
                    <p className="add-subtitle">Lecture {lectureIndex + 1}</p>
                    {module.lecturesWithAssignments.length > 1 && (
                      <div className="add-lecture-buttons">
                        <button 
                          type="button" 
                          className="add-icon-btn remove" 
                          onClick={() => removeLecture(module.id, lectureWithAssignment.id)}
                          title="Remove lecture and its assignment"
                        >
                          ×
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <LectureBlock 
                  key={`lecture-${lectureWithAssignment.id}`}
                  id={lectureWithAssignment.id} 
                  moduleId={module.id}
                  lectureData={lectureWithAssignment.lectureData} 
                  onRemove={removeLecture} 
                  onLectureChange={handleLectureChange} 
                />
              </div>
            ))}
          </div>
        ))}
      </form>
    </div>
  );
};