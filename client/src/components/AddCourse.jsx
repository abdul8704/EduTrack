import React, { useState } from "react";
import "../styles/addcourse.css";

export const AddCourse = () => {
  const [courseData, setCourseData] = useState({
    courseName: "",
    courseId: "",
    instructorName: "",
    description: "",
    courseImage: "",
    introVideoTitle: "",
    introVideo: "",
    tags: "",
    modules: [
      {
        name: "",
        lectures: [
          {
            title: "",
            description: "",
            videoTitle: "",
            videoLink: "",
          },
        ],
        assignments: [{ question: "", choices: [""] }],
      },
    ],
  });

  const handleCourseChange = (e) =>
    setCourseData({ ...courseData, [e.target.name]: e.target.value });

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

  const addModule = () => {
    setCourseData({
      ...courseData,
      modules: [
        ...courseData.modules,
        {
          name: "",
          lectures: [
            {
              title: "",
              description: "",
              videoTitle: "",
              videoLink: "",
            },
          ],
          assignments: [{ question: "", choices: [""] }],
        },
      ],
    });
  };

  const duplicateModule = (index) => {
    const newModules = [...courseData.modules];
    const clonedModule = JSON.parse(JSON.stringify(newModules[index]));
    newModules.splice(index + 1, 0, clonedModule);
    setCourseData({ ...courseData, modules: newModules });
  };

  const addLecture = (moduleIndex) => {
    const newModules = [...courseData.modules];
    newModules[moduleIndex].lectures.push({
      title: "",
      description: "",
      videoTitle: "",
      videoLink: "",
    });
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure to complete the submission?")) {
      window.location.reload();
    }
  };

  return (
    <div className="addcourse-wrapper">
      <div className="page-container">
        <div className="scrollable-content">
          <form className="addcourse-form" onSubmit={handleSubmit}>
            <h1 className="addcourse-title">Create New Course</h1>

            {/* Intro Section */}
            <div className="addcourse-section">
              <div className="addcourse-section-header">
                <h2>Course Introduction</h2>
                <hr />
              </div>
              <input type="text" name="courseName" placeholder="Course Name" className="addcourse-input" value={courseData.courseName} onChange={handleCourseChange} />
              <input type="text" name="courseId" placeholder="Course ID" className="addcourse-input" value={courseData.courseId} onChange={handleCourseChange} />
              <input type="text" name="instructorName" placeholder="Instructor Name" className="addcourse-input" value={courseData.instructorName} onChange={handleCourseChange} />
              <textarea name="description" placeholder="Course Description" className="addcourse-textarea" value={courseData.description} onChange={handleCourseChange}></textarea>
              <input type="text" name="courseImage" placeholder="Course Image URL" className="addcourse-input" value={courseData.courseImage} onChange={handleCourseChange} />
              <input type="text" name="introVideoTitle" placeholder="Intro Video Title" className="addcourse-input" value={courseData.introVideoTitle} onChange={handleCourseChange} />
              <input type="text" name="introVideo" placeholder="Intro Video URL" className="addcourse-input" value={courseData.introVideo} onChange={handleCourseChange} />
              <input type="text" name="tags" placeholder="Tags (comma separated)" className="addcourse-input" value={courseData.tags} onChange={handleCourseChange} />
            </div>

            {/* Modules Section */}
            <div className="addcourse-section">
              <div className="addcourse-section-header">
                <h2>Modules</h2>
                <button type="button" className="addcourse-button-small module-header-button" onClick={addModule}>
                  + Add Module
                </button>
              </div>
              <hr />
              {courseData.modules.map((module, moduleIndex) => (
                <div key={moduleIndex} className="addcourse-module">
                  <input
                    type="text"
                    placeholder="Module Name"
                    className="addcourse-input"
                    value={module.name}
                    onChange={(e) => handleModuleChange(moduleIndex, "name", e.target.value)}
                  />

                  <div className="addcourse-lectures">
                    <h3>Lectures</h3>
                    {module.lectures.map((lecture, lectureIndex) => (
                      <div key={lectureIndex} className="addcourse-lecture">
                        <input type="text" placeholder="Lecture Title" className="addcourse-input" value={lecture.title} onChange={(e) => handleLectureChange(moduleIndex, lectureIndex, "title", e.target.value)} />
                        <textarea placeholder="Lecture Description" className="addcourse-textarea" value={lecture.description} onChange={(e) => handleLectureChange(moduleIndex, lectureIndex, "description", e.target.value)}></textarea>
                        <input type="text" placeholder="Video Title" className="addcourse-input" value={lecture.videoTitle} onChange={(e) => handleLectureChange(moduleIndex, lectureIndex, "videoTitle", e.target.value)} />
                        <input type="text" placeholder="Video Link" className="addcourse-input" value={lecture.videoLink} onChange={(e) => handleLectureChange(moduleIndex, lectureIndex, "videoLink", e.target.value)} />
                      </div>
                    ))}
                    <button type="button" className="addcourse-button-small" onClick={() => addLecture(moduleIndex)}>+ Add Lecture</button>
                  </div>

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

              <div className="addcourse-bottom-addmodule">
                <button type="button" className="addcourse-button-small" onClick={addModule}>
                  + Add Module
                </button>
              </div>
            </div>

            <div className="addcourse-submit-container">
              <button type="submit" className="addcourse-submit-button">Submit Course</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
