import React, { useState, useCallback } from "react";
import "../styles/addcourse.css";
import axios from "axios";

// Constants
const INITIAL_ASSIGNMENT = {
  question: "",
  choices: ["", ""],
  correctAnswer: "",
};

const INITIAL_LECTURE = {
  title: "",
  description: "",
  videoTitle: "",
  videoLink: "",
  assignments: [INITIAL_ASSIGNMENT],
};

const INITIAL_MODULE = {
  name: "",
  lectures: [INITIAL_LECTURE],
};

const INITIAL_COURSE_DATA = {
  courseName: "",
  courseId: "",
  instructorName: "",
  description: "",
  courseImage: "",
  introVideoTitle: "",
  introVideo: "",
  tags: "",
  modules: [INITIAL_MODULE],
};

export const AddCourse = () => {
  const [courseData, setCourseData] = useState(INITIAL_COURSE_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Basic course field handlers
  const handleCourseChange = useCallback((e) => {
    const { name, value } = e.target;
    setCourseData(prev => ({ ...prev, [name]: value }));
  }, []);

  // Module handlers
  const handleModuleChange = useCallback((index, field, value) => {
    setCourseData(prev => {
      const newModules = [...prev.modules];
      newModules[index] = { ...newModules[index], [field]: value };
      return { ...prev, modules: newModules };
    });
  }, []);

  const addModule = useCallback(() => {
    setCourseData(prev => ({
      ...prev,
      modules: [...prev.modules, { ...INITIAL_MODULE }],
    }));
  }, []);

  const deleteModule = useCallback((index) => {
    if (courseData.modules.length <= 1) {
      alert("At least one module is required.");
      return;
    }
    if (window.confirm("Are you sure you want to delete this module?")) {
      setCourseData(prev => ({
        ...prev,
        modules: prev.modules.filter((_, i) => i !== index),
      }));
    }
  }, [courseData.modules.length]);

  // Lecture handlers
  const handleLectureChange = useCallback((moduleIndex, lectureIndex, field, value) => {
    setCourseData(prev => {
      const newModules = [...prev.modules];
      newModules[moduleIndex].lectures[lectureIndex] = {
        ...newModules[moduleIndex].lectures[lectureIndex],
        [field]: value,
      };
      return { ...prev, modules: newModules };
    });
  }, []);

  const addLecture = useCallback((moduleIndex) => {
    setCourseData(prev => {
      const newModules = [...prev.modules];
      newModules[moduleIndex].lectures.push({ ...INITIAL_LECTURE });
      return { ...prev, modules: newModules };
    });
  }, []);

  const deleteLecture = useCallback((moduleIndex, lectureIndex) => {
    if (courseData.modules[moduleIndex].lectures.length <= 1) {
      alert("At least one lecture is required per module.");
      return;
    }
    if (window.confirm("Are you sure you want to delete this lecture?")) {
      setCourseData(prev => {
        const newModules = [...prev.modules];
        newModules[moduleIndex].lectures = newModules[moduleIndex].lectures.filter(
          (_, i) => i !== lectureIndex
        );
        return { ...prev, modules: newModules };
      });
    }
  }, [courseData.modules]);

  // Assignment handlers
  const handleAssignmentChange = useCallback((moduleIndex, lectureIndex, assignmentIndex, field, value) => {
    setCourseData(prev => {
      const newModules = [...prev.modules];
      newModules[moduleIndex].lectures[lectureIndex].assignments[assignmentIndex] = {
        ...newModules[moduleIndex].lectures[lectureIndex].assignments[assignmentIndex],
        [field]: value,
      };
      return { ...prev, modules: newModules };
    });
  }, []);

  const addAssignment = useCallback((moduleIndex, lectureIndex) => {
    setCourseData(prev => {
      const newModules = [...prev.modules];
      newModules[moduleIndex].lectures[lectureIndex].assignments.push({ ...INITIAL_ASSIGNMENT });
      return { ...prev, modules: newModules };
    });
  }, []);

  const deleteAssignment = useCallback((moduleIndex, lectureIndex, assignmentIndex) => {
    if (window.confirm("Are you sure you want to delete this assignment?")) {
      setCourseData(prev => {
        const newModules = [...prev.modules];
        newModules[moduleIndex].lectures[lectureIndex].assignments =
          newModules[moduleIndex].lectures[lectureIndex].assignments.filter(
            (_, i) => i !== assignmentIndex
          );
        return { ...prev, modules: newModules };
      });
    }
  }, []);

  // Choice handlers
  const handleChoiceChange = useCallback((moduleIndex, lectureIndex, assignmentIndex, choiceIndex, value) => {
    setCourseData(prev => {
      const newModules = [...prev.modules];
      newModules[moduleIndex].lectures[lectureIndex].assignments[assignmentIndex].choices[choiceIndex] = value;
      return { ...prev, modules: newModules };
    });
  }, []);

  const addChoice = useCallback((moduleIndex, lectureIndex, assignmentIndex) => {
    setCourseData(prev => {
      const newModules = [...prev.modules];
      newModules[moduleIndex].lectures[lectureIndex].assignments[assignmentIndex].choices.push("");
      return { ...prev, modules: newModules };
    });
  }, []);

  const deleteChoice = useCallback((moduleIndex, lectureIndex, assignmentIndex, choiceIndex) => {
    const assignment = courseData.modules[moduleIndex].lectures[lectureIndex].assignments[assignmentIndex];
    if (assignment.choices.length <= 2) {
      alert("At least two choices are required per assignment.");
      return;
    }
    if (window.confirm("Are you sure you want to delete this choice?")) {
      setCourseData(prev => {
        const newModules = [...prev.modules];
        newModules[moduleIndex].lectures[lectureIndex].assignments[assignmentIndex].choices =
          newModules[moduleIndex].lectures[lectureIndex].assignments[assignmentIndex].choices.filter(
            (_, i) => i !== choiceIndex
          );
        return { ...prev, modules: newModules };
      });
    }
  }, [courseData.modules]);

  // Form validation
  const validateForm = () => {
    if (!courseData.tags.trim()) {
      alert("Tags cannot be empty!");
      return false;
    }

    // Check if all required fields are filled
    const requiredFields = ['courseName', 'courseId', 'instructorName', 'description', 'courseImage', 'introVideoTitle', 'introVideo'];
    for (const field of requiredFields) {
      if (!courseData[field].trim()) {
        alert(`${field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} is required!`);
        return false;
      }
    }

    return true;
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/bob@example.com/course/addnewcourse", // TODO: Replace with actual admin email
        courseData
      );

      if (response.data.success) {
        alert("Course created successfully!");
        setCourseData(INITIAL_COURSE_DATA); // Reset form
      } else {
        alert("Failed to create course: " + response.data.message);
      }
    } catch (error) {
      console.error("Error creating course:", error);
      alert("An error occurred while creating the course.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="addcourse-wrapper">
      <div className="page-container">
        <form className="addcourse-form" onSubmit={handleSubmit}>
          <h1 className="addcourse-title">Create New Course</h1>

          {/* Course Introduction Section */}
          <CourseIntroSection
            courseData={courseData}
            onChange={handleCourseChange}
          />

          {/* Modules Section */}
          <ModulesSection
            modules={courseData.modules}
            onModuleChange={handleModuleChange}
            onAddModule={addModule}
            onDeleteModule={deleteModule}
            onLectureChange={handleLectureChange}
            onAddLecture={addLecture}
            onDeleteLecture={deleteLecture}
            onAssignmentChange={handleAssignmentChange}
            onAddAssignment={addAssignment}
            onDeleteAssignment={deleteAssignment}
            onChoiceChange={handleChoiceChange}
            onAddChoice={addChoice}
            onDeleteChoice={deleteChoice}
          />

          <div className="addcourse-submit-container">
            <button
              type="submit"
              className="addcourse-submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating Course..." : "Submit Course"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Course Introduction Component
const CourseIntroSection = ({ courseData, onChange }) => (
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
      onChange={onChange}
      required
    />
    <input
      name="courseId"
      placeholder="Course ID"
      className="addcourse-input"
      value={courseData.courseId}
      onChange={onChange}
      required
    />
    <input
      name="instructorName"
      placeholder="Instructor Name"
      className="addcourse-input"
      value={courseData.instructorName}
      onChange={onChange}
      required
    />
    <textarea
      name="description"
      placeholder="Course Description"
      className="addcourse-textarea"
      value={courseData.description}
      onChange={onChange}
      required
    />
    <input
      name="courseImage"
      placeholder="Course Image URL"
      className="addcourse-input"
      value={courseData.courseImage}
      onChange={onChange}
      required
    />
    <input
      name="introVideoTitle"
      placeholder="Intro Video Title"
      className="addcourse-input"
      value={courseData.introVideoTitle}
      onChange={onChange}
      required
    />
    <input
      name="introVideo"
      placeholder="Intro Video URL"
      className="addcourse-input"
      value={courseData.introVideo}
      onChange={onChange}
      required
    />
    <input
      name="tags"
      placeholder="Tags (e.g: reactjs,javascript)"
      className="addcourse-input"
      value={courseData.tags}
      onChange={onChange}
      required
    />
  </div>
);

// Modules Section Component
const ModulesSection = ({
  modules,
  onModuleChange,
  onAddModule,
  onDeleteModule,
  onLectureChange,
  onAddLecture,
  onDeleteLecture,
  onAssignmentChange,
  onAddAssignment,
  onDeleteAssignment,
  onChoiceChange,
  onAddChoice,
  onDeleteChoice,
}) => (
  <div className="addcourse-section">
    <div className="addcourse-section-header">
      <h2>Modules</h2>
      <button
        type="button"
        className="addcourse-button-small"
        onClick={onAddModule}
      >
        + Add Module
      </button>
    </div>
    <hr />
    {modules.map((module, moduleIndex) => (
      <ModuleComponent
        key={moduleIndex}
        module={module}
        moduleIndex={moduleIndex}
        onModuleChange={onModuleChange}
        onDeleteModule={onDeleteModule}
        onLectureChange={onLectureChange}
        onAddLecture={onAddLecture}
        onDeleteLecture={onDeleteLecture}
        onAssignmentChange={onAssignmentChange}
        onAddAssignment={onAddAssignment}
        onDeleteAssignment={onDeleteAssignment}
        onChoiceChange={onChoiceChange}
        onAddChoice={onAddChoice}
        onDeleteChoice={onDeleteChoice}
      />
    ))}
  </div>
);

// Module Component
const ModuleComponent = ({
  module,
  moduleIndex,
  onModuleChange,
  onDeleteModule,
  onLectureChange,
  onAddLecture,
  onDeleteLecture,
  onAssignmentChange,
  onAddAssignment,
  onDeleteAssignment,
  onChoiceChange,
  onAddChoice,
  onDeleteChoice,
}) => (
  <div className="addcourse-module">
    <button
      type="button"
      className="delete-button"
      onClick={() => onDeleteModule(moduleIndex)}
    >
      ✕
    </button>
    <input
      placeholder="Module Name"
      className="addcourse-input"
      value={module.name}
      onChange={(e) => onModuleChange(moduleIndex, "name", e.target.value)}
      required
    />

    <div className="addcourse-lectures">
      <h3>Lectures</h3>
      {module.lectures.map((lecture, lectureIndex) => (
        <LectureComponent
          key={lectureIndex}
          lecture={lecture}
          moduleIndex={moduleIndex}
          lectureIndex={lectureIndex}
          onLectureChange={onLectureChange}
          onDeleteLecture={onDeleteLecture}
          onAssignmentChange={onAssignmentChange}
          onAddAssignment={onAddAssignment}
          onDeleteAssignment={onDeleteAssignment}
          onChoiceChange={onChoiceChange}
          onAddChoice={onAddChoice}
          onDeleteChoice={onDeleteChoice}
        />
      ))}
      <button
        type="button"
        className="addcourse-button-small"
        onClick={() => onAddLecture(moduleIndex)}
      >
        + Add Lecture
      </button>
    </div>
  </div>
);

// Lecture Component
const LectureComponent = ({
  lecture,
  moduleIndex,
  lectureIndex,
  onLectureChange,
  onDeleteLecture,
  onAssignmentChange,
  onAddAssignment,
  onDeleteAssignment,
  onChoiceChange,
  onAddChoice,
  onDeleteChoice,
}) => (
  <div className="addcourse-lecture">
    <button
      type="button"
      className="delete-button"
      onClick={() => onDeleteLecture(moduleIndex, lectureIndex)}
    >
      ✕
    </button>
    <input
      placeholder="Lecture Title"
      className="addcourse-input"
      value={lecture.title}
      onChange={(e) => onLectureChange(moduleIndex, lectureIndex, "title", e.target.value)}
      required
    />
    <textarea
      placeholder="Lecture Description"
      className="addcourse-textarea"
      value={lecture.description}
      onChange={(e) => onLectureChange(moduleIndex, lectureIndex, "description", e.target.value)}
      required
    />
    <input
      placeholder="Video Title"
      className="addcourse-input"
      value={lecture.videoTitle}
      onChange={(e) => onLectureChange(moduleIndex, lectureIndex, "videoTitle", e.target.value)}
      required
    />
    <input
      placeholder="Video Link"
      className="addcourse-input"
      value={lecture.videoLink}
      onChange={(e) => onLectureChange(moduleIndex, lectureIndex, "videoLink", e.target.value)}
    />

    <div className="addcourse-assignments">
      <h4>Assignments</h4>
      {lecture.assignments.map((assignment, assignmentIndex) => (
        <AssignmentComponent
          key={assignmentIndex}
          assignment={assignment}
          moduleIndex={moduleIndex}
          lectureIndex={lectureIndex}
          assignmentIndex={assignmentIndex}
          onAssignmentChange={onAssignmentChange}
          onDeleteAssignment={onDeleteAssignment}
          onChoiceChange={onChoiceChange}
          onAddChoice={onAddChoice}
          onDeleteChoice={onDeleteChoice}
        />
      ))}
      <button
        type="button"
        className="addcourse-button-small"
        onClick={() => onAddAssignment(moduleIndex, lectureIndex)}
      >
        + Add Assignment
      </button>
    </div>
  </div>
);

// Assignment Component
const AssignmentComponent = ({
  assignment,
  moduleIndex,
  lectureIndex,
  assignmentIndex,
  onAssignmentChange,
  onDeleteAssignment,
  onChoiceChange,
  onAddChoice,
  onDeleteChoice,
}) => (
  <div className="addcourse-assignment">
    <button
      type="button"
      className="delete-button"
      onClick={() => onDeleteAssignment(moduleIndex, lectureIndex, assignmentIndex)}
    >
      ✕
    </button>
    <textarea
      placeholder="Assignment Question"
      className="addcourse-textarea"
      value={assignment.question}
      onChange={(e) => onAssignmentChange(moduleIndex, lectureIndex, assignmentIndex, "question", e.target.value)}
      required
    />
    <input
      type="text"
      placeholder="Correct Answer"
      className="addcourse-input"
      value={assignment.correctAnswer}
      onChange={(e) => onAssignmentChange(moduleIndex, lectureIndex, assignmentIndex, "correctAnswer", e.target.value)}
      required
    />
    <h4>Choices</h4>
    {assignment.choices.map((choice, choiceIndex) => (
      <div key={choiceIndex} className="choice-container">
        <input
          type="text"
          placeholder={`Choice ${choiceIndex + 1}`}
          className="addcourse-input"
          value={choice}
          onChange={(e) => onChoiceChange(moduleIndex, lectureIndex, assignmentIndex, choiceIndex, e.target.value)}
          required
        />
        <button
          type="button"
          className="delete-button"
          onClick={() => onDeleteChoice(moduleIndex, lectureIndex, assignmentIndex, choiceIndex)}
        >
          ✕
        </button>
      </div>
    ))}
    <button
      type="button"
      className="addcourse-button-small"
      onClick={() => onAddChoice(moduleIndex, lectureIndex, assignmentIndex)}
    >
      + Add Choice
    </button>
  </div>
);