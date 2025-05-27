import React, { useState } from 'react';
import '../styles/course.css';

const courseModules = [
  {
    name: "Module 1",
    submodules: ["Part A", "Part B", "Assignment"]
  },
  {
    name: "Module 2",
    submodules: ["Part A", "Part B", "Assignment"]
  },
  {
    name: "Module 3",
    submodules: ["Part A", "Part B", "Assignment"]
  },
  {
    name: "Module 4",
    submodules: ["Part A", "Part B", "Assignment"]
  },
  {
    name: "Module 5",
    submodules: ["Part A", "Part B", "Assignment"]
  }
];

export const Course = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [collapsed, setCollapsed] = useState(window.innerWidth <= 600); // start collapsed on small screens

  const toggleModule = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="course-container">
      <div className={`course-navbar ${collapsed ? 'collapsed' : ''}`}>
        {courseModules.map((module, index) => (
          <div key={index} className="course-module-wrapper">
            <button
              className="course-nav-btn"
              onClick={() => toggleModule(index)}
              disabled={collapsed} // disable buttons when collapsed
            >
              {module.name}
            </button>

            {activeIndex === index && !collapsed && (
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

        {/* Arrow for toggling collapse */}
        <div className="course-collapse-bar" onClick={toggleCollapsed}>
          &gt;
        </div>
      </div>

      <div className="course-module">
        {/* Right-side content will go here later */}
      </div>
    </div>
  );
};
