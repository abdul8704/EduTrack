import React, { useState, useEffect, useRef, useCallback } from "react";
import CourseIntroduction from "../components/addCourse/CourseIntroduction";
import SubmitSection from "../components/addCourse/SubmitSection";
import ModuleBlock from "../components/addCourse/ModuleBlock";
import { Popup } from "../components/Popup";

const AddCourses = () => {
  const [courseData, setCourseData] = useState({
    courseName: "",
    instructorName: "",
    courseId: "",
    courseDescription: "",
    introVideoTitle: "",
    videoURL: "",
    tags: "",
  });

  const [modules, setModules] = useState([{ id: 1, moduleTitle: "" }]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  // Improved popup state management
  const [popupMessage, setPopupMessage] = useState("");
  const [popupColor, setPopupColor] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);
  
  // Use useRef for timeout to avoid conflicts
  const popupTimeoutRef = useRef(null);

  // Keep track of lecture validations from child modules
  const lectureValidationMap = useRef({ 1: false }); // Initialize with first module
  
  // NEW: Keep track of questions data for all modules and lectures
  const questionsDataMap = useRef({});

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (popupTimeoutRef.current) {
        clearTimeout(popupTimeoutRef.current);
      }
    };
  }, []);

  // NEW: Function to validate questions - each question must have at least 2 choices and selected answer
  const validateQuestions = useCallback(() => {
    for (const moduleId in questionsDataMap.current) {
      const moduleQuestions = questionsDataMap.current[moduleId];
      for (const lectureId in moduleQuestions) {
        const lectureQuestions = moduleQuestions[lectureId];
        for (const question of lectureQuestions) {
          // Each question must have text, at least 2 choices, and a selected answer
          if (!question.questionText.trim() || 
              question.choices.length < 2 || 
              !question.selectedAnswer) {
            return false;
          }
        }
      }
    }
    return true;
  }, []);

  // Create a stable validation function using useCallback
  const validateForm = useCallback(() => {
    // Course fields validation
    const courseFieldsValid = 
      courseData.courseName.trim() !== "" &&
      courseData.instructorName.trim() !== "" &&
      courseData.courseId.trim() !== "" &&
      courseData.courseDescription.trim() !== "" &&
      courseData.introVideoTitle.trim() !== "" &&
      courseData.videoURL.trim() !== "" &&
      courseData.tags.trim() !== "";

    // Modules validation
    const modulesValid = 
      modules.length > 0 &&
      modules.every((mod) => mod.moduleTitle.trim() !== "");

    // Lectures validation
    const lecturesValid = modules.every((mod) => 
      lectureValidationMap.current[mod.id] === true
    );

    // NEW: Questions validation
    const questionsValid = validateQuestions();

    const isValid = courseFieldsValid && modulesValid && lecturesValid && questionsValid;
    setIsFormValid(isValid);
  }, [courseData, modules, validateQuestions]);

  // Form validation logic - updates reactively
  useEffect(() => {
    validateForm();
  }, [validateForm]);

  // Improved popup function with better reliability
  const showPopup = (message, color) => {
    console.log("Showing popup:", message); // Debug log
    
    // Clear any existing timeout first
    if (popupTimeoutRef.current) {
      clearTimeout(popupTimeoutRef.current);
      popupTimeoutRef.current = null;
    }
    
    // Force hide any existing popup first
    setPopupVisible(false);
    setPopupMessage("");
    setPopupColor(null);
    
    // Use setTimeout to ensure state updates are processed
    setTimeout(() => {
      setPopupMessage(message);
      setPopupColor(color);
      setPopupVisible(true);
      
      // Set new timeout for auto-hide
      popupTimeoutRef.current = setTimeout(() => {
        setPopupVisible(false);
        setPopupMessage("");
        setPopupColor(null);
        popupTimeoutRef.current = null;
      }, 4000);
    }, 50);
  };

  const onCourseDataChange = (field, value) => {
    setCourseData((prev) => ({ ...prev, [field]: value }));
  };

  const onModuleTitleChange = (id, value) => {
    setModules((prevModules) =>
      prevModules.map((mod) =>
        mod.id === id ? { ...mod, moduleTitle: value } : mod
      )
    );
  };

  const resetSingleModule = () => {
    setModules([{ id: 1, moduleTitle: "" }]);
    lectureValidationMap.current = { 1: false };
    // Clear questions data for reset module
    questionsDataMap.current = {};
  };

  const removeModule = (id) => {
    setModules((prevModules) => prevModules.filter((mod) => mod.id !== id));
    delete lectureValidationMap.current[id];
    // Clear questions data for removed module
    delete questionsDataMap.current[id];
  };

  // FIXED: Use useCallback to create a stable function reference
  const onLectureValidationChange = useCallback((moduleId, isValid) => {
    const currentValue = lectureValidationMap.current[moduleId];
    
    // Only update if the value actually changed
    if (currentValue !== isValid) {
      lectureValidationMap.current[moduleId] = isValid;
      // Trigger validation directly instead of using a counter
      validateForm();
    }
  }, [validateForm]);

  // NEW: Function to handle questions data updates
  const onQuestionsDataChange = useCallback((moduleId, lectureId, questions) => {
    if (!questionsDataMap.current[moduleId]) {
      questionsDataMap.current[moduleId] = {};
    }
    questionsDataMap.current[moduleId][lectureId] = questions;
    
    // Trigger form validation when questions change
    validateForm();
  }, [validateForm]);

  const addModule = (index) => {
    console.log("Add module clicked for index:", index);
    
    // Check course intro fields first
    const courseIntroFields = [
      { key: "courseName", label: "Course Name" },
      { key: "instructorName", label: "Instructor Name" },
      { key: "courseId", label: "Course ID" },
      { key: "courseDescription", label: "Course Description" },
      { key: "introVideoTitle", label: "Intro Video Title" },
      { key: "videoURL", label: "Video URL" },
      { key: "tags", label: "Tags" },
    ];

    const emptyField = courseIntroFields.find(
      (field) => !courseData[field.key] || courseData[field.key].trim() === ""
    );

    if (emptyField) {
      console.log("Empty course field found:", emptyField.label);
      showPopup(`Please fill the "${emptyField.label}" field before adding a new module.`, {
        background: "#f8d7da",
        border: "#f5c6cb",
        text: "#721c24",
      });
      return;
    }

    // Check ALL existing modules for validation - both title and lectures
    for (let i = 0; i < modules.length; i++) {
      const module = modules[i];
      
      // Check if module title is empty
      if (!module.moduleTitle || module.moduleTitle.trim() === "") {
        console.log(`Empty module title found for Module ${i + 1}`);
        showPopup(`Please fill the Module Title for Module ${i + 1} before adding a new module.`, {
          background: "#f8d7da",
          border: "#f5c6cb",
          text: "#721c24",
        });
        return;
      }
      
      // Check if lectures are valid for this module
      if (!lectureValidationMap.current[module.id]) {
        console.log(`Lecture validation failed for Module ${i + 1}`);
        showPopup(`Please fill all lecture fields in Module ${i + 1} before adding a new module.`, {
          background: "#f8d7da",
          border: "#f5c6cb",
          text: "#721c24",
        });
        return;
      }

      // NEW: Check if questions are valid for this module
      const moduleQuestions = questionsDataMap.current[module.id];
      if (!moduleQuestions) {
        showPopup(`Please add questions to all lectures in Module ${i + 1} before adding a new module.`, {
          background: "#f8d7da",
          border: "#f5c6cb",
          text: "#721c24",
        });
        return;
      }

      for (const lectureId in moduleQuestions) {
        const lectureQuestions = moduleQuestions[lectureId];
        for (const question of lectureQuestions) {
          if (!question.questionText.trim()) {
            showPopup(`Please fill all question texts in Module ${i + 1} before adding a new module.`, {
              background: "#f8d7da",
              border: "#f5c6cb",
              text: "#721c24",
            });
            return;
          }
          if (question.choices.length < 2) {
            showPopup(`Each question must have at least 2 choices in Module ${i + 1} before adding a new module.`, {
              background: "#f8d7da",
              border: "#f5c6cb",
              text: "#721c24",
            });
            return;
          }
          if (!question.selectedAnswer) {
            showPopup(`Please select correct answers for all questions in Module ${i + 1} before adding a new module.`, {
              background: "#f8d7da",
              border: "#f5c6cb",
              text: "#721c24",
            });
            return;
          }
        }
      }
    }

    // Passed all validation - add new module
    setModules((prevModules) => {
      const newId =
        prevModules.length > 0
          ? Math.max(...prevModules.map((m) => m.id)) + 1
          : 1;

      const newModules = [
        ...prevModules.slice(0, index + 1),
        { id: newId, moduleTitle: "" },
        ...prevModules.slice(index + 1),
      ];

      // Initialize lecture validation for new module to false
      lectureValidationMap.current[newId] = false;

      return newModules;
    });

    showPopup("Module created successfully!", {
      background: "#d4edda",
      border: "#c3e6cb",
      text: "#155724",
    });
  };

  const handleCloseModule = (id, moduleTitle, totalModules) => {
    if (totalModules === 1) {
      if (moduleTitle.trim() === "") {
        showPopup("At least one Module Required...", {
          background: "#f8d7da",
          border: "#f5c6cb",
          text: "#721c24",
        });
      } else {
        resetSingleModule();
        showPopup("Module Reset", {
          background: "#d4edda",
          border: "#c3e6cb",
          text: "#155724",
        });
      }
    } else {
      removeModule(id);
      showPopup("Module is deleted", {
        background: "#d4edda",
        border: "#c3e6cb",
        text: "#155724",
      });
    }
  };

  const onSubmit = () => {
    if (!isFormValid) {
      setSubmitError("Please fill all course details, module titles, lectures, and questions with at least 2 choices each.");
      showPopup("Please complete all required fields before submitting.", {
        background: "#f8d7da",
        border: "#f5c6cb",
        text: "#721c24",
      });
      return;
    }

    setSubmitError("");
    setIsSubmitting(true);

    // NEW: Prepare complete course data with questions
    const completeModulesData = modules.map(module => {
      const moduleQuestions = questionsDataMap.current[module.id] || {};
      return {
        ...module,
        lectures: Object.keys(moduleQuestions).map(lectureId => ({
          lectureId: parseInt(lectureId),
          questions: moduleQuestions[lectureId]
        }))
      };
    });

    const completeCourseData = {
      courseInfo: courseData,
      modules: completeModulesData,
      totalModules: modules.length,
      totalQuestions: Object.values(questionsDataMap.current)
        .flatMap(moduleQuestions => Object.values(moduleQuestions))
        .reduce((total, lectureQuestions) => total + lectureQuestions.length, 0)
    };

    console.log("=== COMPLETE COURSE SUBMISSION DATA ===");
    console.log("Course Information:", courseData);
    console.log("Modules with Questions:", completeModulesData);
    console.log("Questions Data Map:", questionsDataMap.current);
    console.log("Complete Course Data:", completeCourseData);
    console.log("=== END SUBMISSION DATA ===");

    setTimeout(() => {
      showPopup("Course submitted successfully!", {
        background: "#d4edda",
        border: "#c3e6cb",
        text: "#155724",
      });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="add-container">
      <CourseIntroduction
        courseData={courseData}
        onCourseDataChange={onCourseDataChange}
      />

      <div className="add-subtitle-card">
        <p className="add-subtitle">Modules</p>
      </div>

      {modules.map(({ id, moduleTitle }, index) => (
        <ModuleBlock
          key={id}
          moduleId={id}
          moduleNumber={index + 1}
          moduleTitle={moduleTitle}
          totalModules={modules.length}
          onTitleChange={(value) => onModuleTitleChange(id, value)}
          onClose={() => handleCloseModule(id, moduleTitle, modules.length)}
          moduleIndex={index}
          onAddModule={addModule}
          onLectureValidationChange={onLectureValidationChange}
          onQuestionsDataChange={onQuestionsDataChange}
          showPopup={showPopup}
        />
      ))}

      <SubmitSection
        isFormValid={isFormValid}
        onSubmit={onSubmit}
        disabled={isSubmitting}
        errorMessage={submitError}
      />

      {popupVisible && (
        <Popup key={popupMessage} message={popupMessage} color={popupColor} />
      )}
    </div>
  );
};

export default AddCourses;