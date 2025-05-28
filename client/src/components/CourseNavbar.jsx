import React, { useState } from 'react';
import '../styles/course.css';

export const CourseNavbar = ({ modules, activeIndex, toggleModule, isCollapsed }) => {
  const [selectedSubmoduleKey, setSelectedSubmoduleKey] = useState(null);

  const handleSubmoduleClick = (moduleIndex, subIndex) => {
    setSelectedSubmoduleKey(`${moduleIndex}-${subIndex}`);
  };

  // Extract active module index from selected submodule key
  const activeModuleFromSub = selectedSubmoduleKey ? selectedSubmoduleKey.split('-')[0] : null;

  return (
    <div className={`course-navbar ${isCollapsed ? 'collapsed' : ''}`}>
      {modules.map((module, index) => {
        const isModuleActive = parseInt(activeModuleFromSub) === index;

        return (
          <div key={index} className="course-module-wrapper">
            <button
              className={`course-nav-btn ${isModuleActive ? 'course-active-module' : ''}`}
              onClick={() => toggleModule(index)}
            >
              {module.name}
            </button>

            {activeIndex === index && (
              <div className="course-submodule-list">
                {module.submodules.map((sub, subIndex) => {
                  const key = `${index}-${subIndex}`;
                  const isSubActive = selectedSubmoduleKey === key;

                  return (
                    <div
                      key={subIndex}
                      className={`course-submodule-item ${isSubActive ? 'course-active-submodule' : ''}`}
                      onClick={() => handleSubmoduleClick(index, subIndex)}
                    >
                      {sub}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
