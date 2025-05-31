  import React from 'react';
  import { useNavigate, useParams } from 'react-router-dom';
  import '../styles/courseLearn.css';
  export const CourseNavbar = ({
    modules,
    activeIndex,
    toggleModule,
    isCollapsed,
    moduleNo,
    subModuleNo,
  }) => {
    const navigate = useNavigate();
    const { userId, courseId, moduleNumber, subModuleNumber } = useParams();

    const handleSubmoduleClick = (moduleIdx, submoduleIdx) => {
      navigate(`/course/learn/${userId}/${courseId}/${moduleIdx}/${submoduleIdx}`);
    };

    return (
      <div className={`course-navbar ${isCollapsed ? 'collapsed' : ''}`}>
        {modules.map((module, index) => {
          const isActiveModule = Number(moduleNumber) === index;
          const showSubmodules = activeIndex === index || isActiveModule;

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
                  {module.submodules && Array.isArray(module.submodules) &&
                    module.submodules.map((sub, subIndex) => {
                      const isActiveSubmodule = isActiveModule && Number(subModuleNumber) === subIndex;

                      return (
                        <button
                          key={sub}
                          className={`course-submodule-item ${isActiveSubmodule ? 'course-active-submodule' : ''}`}
                          onClick={() => handleSubmoduleClick(index, subIndex)}
                        >
                          {sub}
                        </button>
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
