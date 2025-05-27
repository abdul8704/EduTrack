import React, { useState } from 'react';
import '../styles/course.css';

const courseModules = [
  {
    name: "Module 1",
    submodules: ["Part A", "Part B", "Assignment"]
  },
  {
    name: "Module 2",
    submodules: ["Lecture 1", "Lecture 2", "Assignment"]
  },
  {
    name: "Module 3",
    submodules: ["Part A", "Part B", "Assignment"]
  },
  {
    name: "Module 4",
    submodules: ["Reading", "Video", "Test"]
  },
  {
    name: "Module 5",
    submodules: ["Final Project", "Resources", "FAQ"]
  }
];

export const Course = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleModule = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="course-container">
      <div className="course-navbar">
        {courseModules.map((module, index) => (
          <div key={index} className="course-module-wrapper">
            <button
              className="course-nav-btn"
              onClick={() => toggleModule(index)}
            >
              {module.name}
            </button>

            {activeIndex === index && (
              <div className="course-submodule-list">
                {module.submodules.map((sub, subIndex) => (
                  <div key={subIndex} className="course-submodule-item">
                    {sub}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="course-module">
        {/* Right-side content will go here later */}
      </div>
    </div>
  );
};
