import React, { useState, useRef } from "react";
import {Navbar} from "./Navbar";
import {Footer} from "./Footer";
import "../styles/addcourse.css";

export const AddCourse = () => {
  const introRef = useRef(null);
  const moduleRef = useRef(null);
  const quizRef = useRef(null);

  const scrollTo = (ref) => ref.current.scrollIntoView({ behavior: "smooth" });

  const [courseData, setCourseData] = useState({
    courseName: "",
    instructorName: "",
    description: "",
    introVideo: "",
    modules: [
      {
        name: "",
        lectures: [{ title: "", description: "", videoLink: "" }],
        assignments: [{ question: "", choices: [""] }],
      },
    ],
    quiz: [{ question: "", choices: [""] }],
  });

  const handleCourseChange = (e) => setCourseData({ ...courseData, [e.target.name]: e.target.value });

  const handleModuleChange = (index, field, value) => {
    const newModules = [...courseData.modules];
    newModules[index][field] = value;
    setCourseData({ ...courseData, modules: newModules });
  };

  const handleLectureChange = (moduleIndex, lectureIndex, field, value) => {
    const newModules = [...courseData.modules];
    newModules[moduleIndex].lectures[lectureIndex][field] = value;
    setCourseData({ ...courseData, modules: newModules });
  };

  const handleAssignmentChange = (moduleIndex, assignmentIndex, field, value) => {
    const newModules = [...courseData.modules];
    newModules[moduleIndex].assignments[assignmentIndex][field] = value;
    setCourseData({ ...courseData, modules: newModules });
  };

  const handleChoiceChange = (type, moduleIndex, index, choiceIndex, value) => {
    const updated = [...courseData[type]];
    updated[index].choices[choiceIndex] = value;
    setCourseData({ ...courseData, [type]: updated });
  };

  const addModule = () => {
    setCourseData({
      ...courseData,
      modules: [
        ...courseData.modules,
        {
          name: "",
          lectures: [{ title: "", description: "", videoLink: "" }],
          assignments: [{ question: "", choices: [""] }],
        },
      ],
    });
  };

  const addLecture = (moduleIndex) => {
    const newModules = [...courseData.modules];
    newModules[moduleIndex].lectures.push({ title: "", description: "", videoLink: "" });
    setCourseData({ ...courseData, modules: newModules });
  };

  const addAssignment = (moduleIndex) => {
    const newModules = [...courseData.modules];
    newModules[moduleIndex].assignments.push({ question: "", choices: [""] });
    setCourseData({ ...courseData, modules: newModules });
  };

  const addAssignmentChoice = (moduleIndex, assignmentIndex) => {
    const newModules = [...courseData.modules];
    newModules[moduleIndex].assignments[assignmentIndex].choices.push("");
    setCourseData({ ...courseData, modules: newModules });
  };

  const handleQuizChange = (index, field, value) => {
    const newQuiz = [...courseData.quiz];
    newQuiz[index][field] = value;
    setCourseData({ ...courseData, quiz: newQuiz });
  };

  const addQuizQuestion = () => {
    setCourseData({
      ...courseData,
      quiz: [...courseData.quiz, { question: "", choices: [""] }],
    });
  };

  const addQuizChoice = (questionIndex) => {
    const newQuiz = [...courseData.quiz];
    newQuiz[questionIndex].choices.push("");
    setCourseData({ ...courseData, quiz: newQuiz });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure to complete the submission?")) {
      window.location.reload();
    }
  };

  return (
    <div className="addcourse-wrapper">
     
      <div className="page-container">
        <aside className="sidebar-fixed">
          <div className="sidebar">
            <button onClick={() => scrollTo(introRef)}>Intro</button>
            <button onClick={() => scrollTo(moduleRef)}>Modules</button>
            <button onClick={() => scrollTo(quizRef)}>Final Quiz</button>
          </div>
        </aside>
        <div className="scrollable-content">
          <form className="addcourse-form" onSubmit={handleSubmit}>
            <h1 className="addcourse-title">Create New Course</h1>
            {/* Intro Section */}
            <div ref={introRef} className="addcourse-intro-section" id="intro">
  <h2>Course Introduction</h2>
  <input
    type="text"
    name="courseName"
    placeholder="Course Name"
    className="addcourse-input"
    value={courseData.courseName}
    onChange={handleCourseChange}
  />
  <input
    type="text"
    name="instructorName"
    placeholder="Instructor Name"
    className="addcourse-input"
    value={courseData.instructorName}
    onChange={handleCourseChange}
  />
  <textarea
    name="description"
    placeholder="Course Description"
    className="addcourse-textarea"
    value={courseData.description}
    onChange={handleCourseChange}
  ></textarea>
  <input
    type="text"
    name="introVideo"
    placeholder="Intro Video Link"
    className="addcourse-input"
    value={courseData.introVideo}
    onChange={handleCourseChange}
  />
</div>

            {/* Modules */}
            <div className="addcourse-modules addcourse-section" ref={moduleRef}>
              <h2>Modules</h2>
              {courseData.modules.map((module, moduleIndex) => (
                <div key={moduleIndex} className="addcourse-module">
                  <input type="text" placeholder="Module Name" className="addcourse-input" value={module.name} onChange={(e) => handleModuleChange(moduleIndex, "name", e.target.value)} />

                  {/* Lectures */}
                  <div className="addcourse-lectures">
                    <h3>Lectures</h3>
                    {module.lectures.map((lecture, lectureIndex) => (
                      <div key={lectureIndex} className="addcourse-lecture">
                        <input type="text" placeholder="Lecture Title" className="addcourse-input" value={lecture.title} onChange={(e) => handleLectureChange(moduleIndex, lectureIndex, "title", e.target.value)} />
                        <textarea placeholder="Lecture Description" className="addcourse-textarea" value={lecture.description} onChange={(e) => handleLectureChange(moduleIndex, lectureIndex, "description", e.target.value)}></textarea>
                        <input type="text" placeholder="Video Link" className="addcourse-input" value={lecture.videoLink} onChange={(e) => handleLectureChange(moduleIndex, lectureIndex, "videoLink", e.target.value)} />
                      </div>
                    ))}
                    <button type="button" className="addcourse-button-small" onClick={() => addLecture(moduleIndex)}>+ Add Lecture</button>
                  </div>

                  {/* Assignments */}
                  <div className="addcourse-assignments">
                    <h3>Assignments</h3>
                    {module.assignments.map((assignment, assignmentIndex) => (
                      <div key={assignmentIndex} className="addcourse-assignment">
                        <textarea placeholder="Assignment Question" className="addcourse-textarea" value={assignment.question} onChange={(e) => handleAssignmentChange(moduleIndex, assignmentIndex, "question", e.target.value)}></textarea>
                        {assignment.choices.map((choice, choiceIndex) => (
                          <input key={choiceIndex} type="text" placeholder={`Choice ${choiceIndex + 1}`} className="addcourse-input" value={choice} onChange={(e) => {
                            const newModules = [...courseData.modules];
                            newModules[moduleIndex].assignments[assignmentIndex].choices[choiceIndex] = e.target.value;
                            setCourseData({ ...courseData, modules: newModules });
                          }} />
                        ))}
                        <button type="button" className="addcourse-button-small" onClick={() => addAssignmentChoice(moduleIndex, assignmentIndex)}>+ Add Choice</button>
                      </div>
                    ))}
                    <button type="button" className="addcourse-button-small" onClick={() => addAssignment(moduleIndex)}>+ Add Assignment</button>
                  </div>
                </div>
              ))}
              <button type="button" className="addcourse-button" onClick={addModule}>+ Add Module</button>
            </div>

            {/* Final Quiz */}
            <div className="addcourse-final-quiz addcourse-section" ref={quizRef}>
              <h2>Final Quiz</h2>
              {courseData.quiz.map((q, qIndex) => (
                <div key={qIndex} className="addcourse-quiz-question-block">
                  <textarea placeholder="Quiz Question" className="addcourse-textarea" value={q.question} onChange={(e) => handleQuizChange(qIndex, "question", e.target.value)}></textarea>
                  {q.choices.map((choice, cIndex) => (
                    <input key={cIndex} type="text" placeholder={`Choice ${cIndex + 1}`} className="addcourse-input" value={choice} onChange={(e) => handleChoiceChange("quiz", null, qIndex, cIndex, e.target.value)} />
                  ))}
                  <button type="button" className="addcourse-button-small" onClick={() => addQuizChoice(qIndex)}>+ Add Choice</button>
                </div>
              ))}
              <button type="button" className="addcourse-button" onClick={addQuizQuestion}>+ Add Quiz Question</button>
            </div>

            {/* Submit */}
            <div className="addcourse-submit-container">
              <button type="submit" className="addcourse-submit-button">Submit Course</button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};
