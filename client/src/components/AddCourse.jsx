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
            assignments: [
              {
                question: "",
                choices: ["", ""],
              },
            ],
          },
        ],
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

  const handleAssignmentChange = (
    moduleIndex,
    lectureIndex,
    assignmentIndex,
    field,
    value
  ) => {
    const newModules = [...courseData.modules];
    newModules[moduleIndex].lectures[lectureIndex].assignments[
      assignmentIndex
    ][field] = value;
    setCourseData({ ...courseData, modules: newModules });
  };

  const handleChoiceChange = (
    moduleIndex,
    lectureIndex,
    assignmentIndex,
    choiceIndex,
    value
  ) => {
    const newModules = [...courseData.modules];
    newModules[moduleIndex].lectures[lectureIndex].assignments[
      assignmentIndex
    ].choices[choiceIndex] = value;
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
              assignments: [{ question: "", choices: ["", ""] }],
            },
          ],
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

  const deleteModule = (index) => {
    const newModules = [...courseData.modules];
    newModules.splice(index, 1);
    setCourseData({ ...courseData, modules: newModules });
  };

  const addLecture = (moduleIndex) => {
    const newModules = [...courseData.modules];
    newModules[moduleIndex].lectures.push({
      title: "",
      description: "",
      videoTitle: "",
      videoLink: "",
      assignments: [{ question: "", choices: ["", ""] }],
    });
    setCourseData({ ...courseData, modules: newModules });
  };

  const deleteLecture = (moduleIndex, lectureIndex) => {
    const newModules = [...courseData.modules];
    newModules[moduleIndex].lectures.splice(lectureIndex, 1);
    setCourseData({ ...courseData, modules: newModules });
  };

  const addAssignment = (moduleIndex, lectureIndex) => {
    const newModules = [...courseData.modules];
    newModules[moduleIndex].lectures[lectureIndex].assignments.push({
      question: "",
      choices: ["", ""],
    });
    setCourseData({ ...courseData, modules: newModules });
  };

  const deleteAssignment = (moduleIndex, lectureIndex, assignmentIndex) => {
    const newModules = [...courseData.modules];
    newModules[moduleIndex].lectures[lectureIndex].assignments.splice(
      assignmentIndex,
      1
    );
    setCourseData({ ...courseData, modules: newModules });
  };

  const addAssignmentChoice = (moduleIndex, lectureIndex, assignmentIndex) => {
    const newModules = [...courseData.modules];
    newModules[moduleIndex].lectures[lectureIndex].assignments[
      assignmentIndex
    ].choices.push("");
    setCourseData({ ...courseData, modules: newModules });
  };

  const deleteChoice = (
    moduleIndex,
    lectureIndex,
    assignmentIndex,
    choiceIndex
  ) => {
    const newModules = [...courseData.modules];
    newModules[moduleIndex].lectures[lectureIndex].assignments[
      assignmentIndex
    ].choices.splice(choiceIndex, 1);
    setCourseData({ ...courseData, modules: newModules });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
      console.log("Submitted data:", courseData);
    setCourseData({
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
            assignments: [
              {
                question: "",
                choices: ["", ""],
              },
            ],
          },
        ],
      },
    ],
    })    
  };

  return (
    <div className="addcourse-wrapper">
      <div className="page-container">
        <form className="addcourse-form" onSubmit={handleSubmit}>
          <h1 className="addcourse-title">Create New Course</h1>

          {/* Course Intro */}
          <div className="addcourse-section">
            <div className="addcourse-section-header">
              <h2>Course Introduction</h2>
              <hr />
            </div>
            <input
              name="courseName"
              placeholder="Course Name"
              className="addcourse-input"
              value={courseData.courseName}
              onChange={handleCourseChange}
            />
            <input
              name="courseId"
              placeholder="Course ID"
              className="addcourse-input"
              value={courseData.courseId}
              onChange={handleCourseChange}
            />
            <input
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
              name="courseImage"
              placeholder="Course Image URL"
              className="addcourse-input"
              value={courseData.courseImage}
              onChange={handleCourseChange}
            />
            <input
              name="introVideoTitle"
              placeholder="Intro Video Title"
              className="addcourse-input"
              value={courseData.introVideoTitle}
              onChange={handleCourseChange}
            />
            <input
              name="introVideo"
              placeholder="Intro Video URL"
              className="addcourse-input"
              value={courseData.introVideo}
              onChange={handleCourseChange}
            />
            <input
              name="tags"
              placeholder="Tags (e.g: reactjs,javascript)"
              className="addcourse-input"
              value={courseData.tags}
              onChange={handleCourseChange}
            />
          </div>

          {/* Modules */}
          <div className="addcourse-section">
            <div className="addcourse-section-header">
              <h2>Modules</h2>
              <button
                type="button"
                className="addcourse-button-small"
                onClick={addModule}
              >
                + Add Module
              </button>
            </div>
            <hr />
            {courseData.modules.map((module, moduleIndex) => (
              <div key={moduleIndex} className="addcourse-module">
                <button
                  type="button"
                  className="delete-button"
                  onClick={() => deleteModule(moduleIndex)}
                >
                  ✕
                </button>
                <input
                  placeholder="Module Name"
                  className="addcourse-input"
                  value={module.name}
                  onChange={(e) =>
                    handleModuleChange(moduleIndex, "name", e.target.value)
                  }
                />

                <div className="addcourse-lectures">
                  <h3>Lectures</h3>
                  {module.lectures.map((lecture, lectureIndex) => (
                    <div key={lectureIndex} className="addcourse-lecture">
                      <button
                        type="button"
                        className="delete-button"
                        onClick={() =>
                          deleteLecture(moduleIndex, lectureIndex)
                        }
                      >
                        ✕
                      </button>
                      <input
                        placeholder="Lecture Title"
                        className="addcourse-input"
                        value={lecture.title}
                        onChange={(e) =>
                          handleLectureChange(
                            moduleIndex,
                            lectureIndex,
                            "title",
                            e.target.value
                          )
                        }
                      />
                      <textarea
                        placeholder="Lecture Description"
                        className="addcourse-textarea"
                        value={lecture.description}
                        onChange={(e) =>
                          handleLectureChange(
                            moduleIndex,
                            lectureIndex,
                            "description",
                            e.target.value
                          )
                        }
                      />
                      <input
                        placeholder="Video Title"
                        className="addcourse-input"
                        value={lecture.videoTitle}
                        onChange={(e) =>
                          handleLectureChange(
                            moduleIndex,
                            lectureIndex,
                            "videoTitle",
                            e.target.value
                          )
                        }
                      />
                      <input
                        placeholder="Video Link"
                        className="addcourse-input"
                        value={lecture.videoLink}
                        onChange={(e) =>
                          handleLectureChange(
                            moduleIndex,
                            lectureIndex,
                            "videoLink",
                            e.target.value
                          )
                        }
                      />

                      <div className="addcourse-assignments">
                        <h4>Assignments</h4>
                        {lecture.assignments.map(
                          (assignment, assignmentIndex) => (
                            <div
                              key={assignmentIndex}
                              className="addcourse-assignment"
                            >
                              <button
                                type="button"
                                className="delete-button"
                                onClick={() =>
                                  deleteAssignment(
                                    moduleIndex,
                                    lectureIndex,
                                    assignmentIndex
                                  )
                                }
                              >
                                ✕
                              </button>
                              <textarea
                                placeholder="Assignment Question"
                                className="addcourse-textarea"
                                value={assignment.question}
                                onChange={(e) =>
                                  handleAssignmentChange(
                                    moduleIndex,
                                    lectureIndex,
                                    assignmentIndex,
                                    "question",
                                    e.target.value
                                  )
                                }
                              />
                              {assignment.choices.map(
                                (choice, choiceIndex) => (
                                  <div
                                    key={choiceIndex}
                                    className="choice-container"
                                  >
                                    <input
                                      type="text"
                                      placeholder={`Choice ${choiceIndex + 1}`}
                                      className="addcourse-input"
                                      value={choice}
                                      onChange={(e) =>
                                        handleChoiceChange(
                                          moduleIndex,
                                          lectureIndex,
                                          assignmentIndex,
                                          choiceIndex,
                                          e.target.value
                                        )
                                      }
                                    />
                                    <button
                                      type="button"
                                      className="delete-button"
                                      onClick={() =>
                                        deleteChoice(
                                          moduleIndex,
                                          lectureIndex,
                                          assignmentIndex,
                                          choiceIndex
                                        )
                                      }
                                    >
                                      ✕
                                    </button>
                                  </div>
                                )
                              )}
                              <button
                                type="button"
                                className="addcourse-button-small"
                                onClick={() =>
                                  addAssignmentChoice(
                                    moduleIndex,
                                    lectureIndex,
                                    assignmentIndex
                                  )
                                }
                              >
                                + Add Choice
                              </button>
                            </div>
                          )
                        )}
                        <button
                          type="button"
                          className="addcourse-button-small"
                          onClick={() =>
                            addAssignment(moduleIndex, lectureIndex)
                          }
                        >
                          + Add Assignment
                        </button>
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="addcourse-button-small"
                    onClick={() => addLecture(moduleIndex)}
                  >
                    + Add Lecture
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              className="addcourse-button-small"
              onClick={addModule}
            >
              + Add Module
            </button>
          </div>

          <div className="addcourse-submit-container">
            <button type="submit" className="addcourse-submit-button">
              Submit Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
