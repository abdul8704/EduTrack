import React, { useState, useEffect, useRef } from "react";
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

  // Popup state
  const [popupMessage, setPopupMessage] = useState("");
  const [popupColor, setPopupColor] = useState(null);

  // Keep track of lecture validations from child modules
  const lectureValidationMap = useRef({ 1: false }); // Initialize with first module
  
  // Add a state to force re-validation when lecture validation changes
  const [validationTrigger, setValidationTrigger] = useState(0);

  // Form validation logic - updates reactively
  useEffect(() => {
    const courseFieldsValid = 
      courseData.courseName.trim() !== "" &&
      courseData.instructorName.trim() !== "" &&
      courseData.courseId.trim() !== "" &&
      courseData.courseDescription.trim() !== "" &&
      courseData.introVideoTitle.trim() !== "" &&
      courseData.videoURL.trim() !== "" &&
      courseData.tags.trim() !== "";

    const modulesValid = 
      modules.length > 0 &&
      modules.every((mod) => mod.moduleTitle.trim() !== "");

    const lecturesValid = modules.every((mod) => 
      lectureValidationMap.current[mod.id] === true
    );

    const isValid = courseFieldsValid && modulesValid && lecturesValid;
    setIsFormValid(isValid);
  }, [courseData, modules, validationTrigger]);

  // Helper to show popup with better reliability
  const showPopup = (message, color) => {
    console.log("Showing popup:", message); // Debug log
    setPopupMessage(message);
    setPopupColor(color);
    
    // Clear any existing timeout
    if (window.popupTimeout) {
      clearTimeout(window.popupTimeout);
    }
    
    // Set new timeout
    window.popupTimeout = setTimeout(() => {
      setPopupMessage("");
      setPopupColor(null);
      window.popupTimeout = null;
    }, 4000); // Increased to 4 seconds for better visibility
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
  };

  const removeModule = (id) => {
    setModules((prevModules) => prevModules.filter((mod) => mod.id !== id));
    delete lectureValidationMap.current[id];
  };

  // This is called by ModuleBlock to inform AddCourses if all lectures are valid for that module
  const onLectureValidationChange = (moduleId, isValid) => {
    lectureValidationMap.current[moduleId] = isValid;
    // Trigger re-validation by updating the validation trigger
    setValidationTrigger(prev => prev + 1);
  };

  const addModule = (index) => {
    console.log("Add module clicked for index:", index); // Debug log
    
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
      console.log("Empty course field found:", emptyField.label); // Debug log
      showPopup(`Please fill the "${emptyField.label}" field before adding a new module.`, {
        background: "#f8d7da",
        border: "#f5c6cb",
        text: "#721c24",
      });
      return;
    }

    // Check if any module title is empty
    const emptyModule = modules.find((mod) => mod.moduleTitle.trim() === "");
    if (emptyModule) {
      console.log("Empty module title found"); // Debug log
      showPopup(`Please fill all module titles before adding a new module.`, {
        background: "#f8d7da",
        border: "#f5c6cb",
        text: "#721c24",
      });
      return;
    }

    // Check lecture validation for current module (the module at index)
    const currentModule = modules[index];
    if (!lectureValidationMap.current[currentModule.id]) {
      console.log("Lecture validation failed for module:", currentModule.id); // Debug log
      showPopup(
        `Please fill all lecture fields in Module ${index + 1} before adding a new module.`,
        {
          background: "#f8d7da",
          border: "#f5c6cb",
          text: "#721c24",
        }
      );
      return;
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
      setSubmitError("Please fill all course details, module titles and lectures.");
      return;
    }

    setSubmitError("");
    setIsSubmitting(true);

    console.log("Submitting course data:", courseData);
    console.log("Modules:", modules);

    setTimeout(() => {
      alert("Course submitted!");
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
          moduleId={id} // Pass the actual module ID
          moduleNumber={index + 1}
          moduleTitle={moduleTitle}
          totalModules={modules.length}
          onTitleChange={(value) => onModuleTitleChange(id, value)}
          onClose={() => handleCloseModule(id, moduleTitle, modules.length)}
          moduleIndex={index}
          onAddModule={addModule}
          onLectureValidationChange={(isValid) => onLectureValidationChange(id, isValid)}
        />
      ))}

      <SubmitSection
        isFormValid={isFormValid}
        onSubmit={onSubmit}
        disabled={isSubmitting}
        errorMessage={submitError}
      />

      {popupMessage && <Popup message={popupMessage} color={popupColor} />}
    </div>
  );
};

export default AddCourses;