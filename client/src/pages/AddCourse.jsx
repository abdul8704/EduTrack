import React, { useState, useEffect } from "react";
import CourseIntroduction from "../components/addCourse/CourseIntroduction";
import SubmitSection from "../components/addCourse/SubmitSection";
import ModuleBlock from "../components/addCourse/ModuleBlock";
import { Popup } from "../components/Popup"; // Adjust path if needed

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

  // Form validation logic - updates reactively
  useEffect(() => {
    const isValid =
      courseData.courseName.trim() !== "" &&
      courseData.instructorName.trim() !== "" &&
      courseData.courseId.trim() !== "" &&
      courseData.courseDescription.trim() !== "" &&
      courseData.introVideoTitle.trim() !== "" &&
      courseData.videoURL.trim() !== "" &&
      courseData.tags.trim() !== "" &&
      modules.length > 0 &&
      modules.every((mod) => mod.moduleTitle.trim() !== "");

    setIsFormValid(isValid);
  }, [courseData, modules]);

  // Helper to show popup
  const showPopup = (message, color) => {
    setPopupMessage(message);
    setPopupColor(color);
    setTimeout(() => {
      setPopupMessage("");
      setPopupColor(null);
    }, 3000);
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
  };

  const removeModule = (id) => {
    setModules((prevModules) => prevModules.filter((mod) => mod.id !== id));
  };

  const addModule = (index) => {
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
      showPopup(`Please fill the "${emptyField.label}" field before adding a new module.`, {
        background: "#f8d7da",
        border: "#f5c6cb",
        text: "#721c24",
      });
      return;
    }

    const emptyModule = modules.find((mod) => mod.moduleTitle.trim() === "");
    if (emptyModule) {
      showPopup(`Please fill all module titles before adding a new module.`, {
        background: "#f8d7da",
        border: "#f5c6cb",
        text: "#721c24",
      });
      return;
    }

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
      setSubmitError("Please fill all course details and all module titles.");
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
          moduleNumber={index + 1}
          moduleTitle={moduleTitle}
          totalModules={modules.length}
          onTitleChange={(value) => onModuleTitleChange(id, value)}
          onClose={() => handleCloseModule(id, moduleTitle, modules.length)}
          moduleIndex={index}
          onAddModule={addModule}
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
