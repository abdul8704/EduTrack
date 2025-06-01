import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const CourseNavbar = ({
  modules,
  activeIndex,
  toggleModule,
  isCollapsed,
  moduleNo,
  subModuleNo,
  progressReloadTrigger,
  userId,
  courseId
}) => {
  const navigate = useNavigate();
  const [progressMatrix, setProgressMatrix] = useState(null);

  useEffect(() => {
    if (!userId || !courseId) return;

    fetch(`http://localhost:5000/api/user/${userId}/${courseId}/progress`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.progressMatrix?.completedModules) {
          setProgressMatrix(data.progressMatrix.completedModules);
        }
      })
      .catch((err) => {
        console.error('Failed to fetch progress:', err);
      });
  }, [userId, courseId, progressReloadTrigger]);

  const handleSubmoduleClick = (moduleIdx, submoduleIdx) => {
    navigate(`/course/learn/${userId}/${courseId}/${moduleIdx}/${submoduleIdx}`);
  };

  return (
    <div className={`course-navbar ${isCollapsed ? 'collapsed' : ''}`}>
        <button className="profile-backButton" onClick={() => window.history.back()}>
          ←
        </button>
      {modules.map((module, index) => {
        const isActiveModule = Number(moduleNo) === index;
        const showSubmodules = activeIndex === index || isActiveModule;

        const moduleCompleted =
          progressMatrix?.[index]?.every((completed) => completed === true);

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
                {module.submodules?.map((sub, subIndex) => {
                  const isActiveSubmodule =
                    isActiveModule && Number(subModuleNo) === subIndex;
                  const submoduleCompleted =
                    progressMatrix?.[index]?.[subIndex] === true;

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
