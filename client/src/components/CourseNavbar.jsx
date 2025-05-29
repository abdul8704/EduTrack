import React from 'react';
import '../styles/course.css';

export const CourseNavbar = ({
  modules,
  activeIndex,
  toggleModule,
  isCollapsed,
  moduleNumber,
  subModuleNumber
}) => {
  return (
    <div className={`course-navbar ${isCollapsed ? 'collapsed' : ''}`}>
      {modules.map((module, index) => {
        const isActiveModule = Number(moduleNumber) === index;
        const showSubmodules = activeIndex === index || isActiveModule;  // <-- updated condition

        return (
          <div key={module.moduleTitle} className="course-module-wrapper">
            <button
              className={`course-nav-btn ${isActiveModule ? 'course-active-module' : ''}`}
              onClick={() => toggleModule(index)}
            >
              {module.moduleTitle}
            </button>

            {showSubmodules && (
              <div className="course-submodule-list">
                {module.submodules && Array.isArray(module.submodules) && module.submodules.map((sub, subIndex) => {
                  const isActiveSubmodule = isActiveModule && Number(subModuleNumber) === subIndex;
                  return (
                    <div
                      key={sub}
                      className={`course-submodule-item ${isActiveSubmodule ? 'course-active-submodule' : ''}`}
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
