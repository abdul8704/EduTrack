import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

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
  console.log("user",userId)
  // State to store progress matrix
  const [progressMatrix, setProgressMatrix] = useState(null);

  // Fetch progress data on mount or when userId/courseId changes
  useEffect(() => {
    if (!userId || !courseId) return;

    fetch(`http://localhost:5000/api/user/${userId}/${courseId}/progress`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.progressMatrix && data.progressMatrix.completedModules) {
          setProgressMatrix(data.progressMatrix.completedModules);
        }
      })
      .catch((err) => {
        console.error('Failed to fetch progress:', err);
      });
  }, [userId, courseId]);

  const handleSubmoduleClick = (moduleIdx, submoduleIdx) => {
    navigate(`/course/learn/${userId}/${courseId}/${moduleIdx}/${submoduleIdx}`);
  };

  return (
    <div className={`course-navbar ${isCollapsed ? 'collapsed' : ''}`}>
      {modules.map((module, index) => {
        const isActiveModule = Number(moduleNumber) === index;
        const showSubmodules = activeIndex === index || isActiveModule;

        // Check if all submodules in this module are completed
        const moduleCompleted =
          progressMatrix &&
          progressMatrix[index] &&
          progressMatrix[index].every((completed) => completed === true);

        return (
          <div key={module.moduleTitle} className="course-module-wrapper">
            <button
              className={`course-nav-btn ${
                isActiveModule ? 'course-active-module' : ''
              } ${moduleCompleted ? 'course-complete-module' : ''}`}
              onClick={() => toggleModule(index)}
            >
              {module.moduleTitle}
            </button>

            {showSubmodules && (
              <div className="course-submodule-list">
                {module.submodules &&
                  Array.isArray(module.submodules) &&
                  module.submodules.map((sub, subIndex) => {
                    const isActiveSubmodule =
                      isActiveModule && Number(subModuleNumber) === subIndex;

                    // Check if this submodule is completed
                    const submoduleCompleted =
                      progressMatrix &&
                      progressMatrix[index] &&
                      progressMatrix[index][subIndex] === true;

                    return (
                      <button
                        key={sub}
                        className={`course-submodule-item ${
                          isActiveSubmodule ? 'course-active-submodule' : ''
                        } ${submoduleCompleted ? 'course-complete-submodule' : ''}`}
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
