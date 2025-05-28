import React from 'react';
import '../styles/CoursePage.css';

// Helper to convert YouTube short URL to embed format
const getEmbedUrl = (url) => {
  const match = url.match(/(?:youtu\.be\/|v=)([^&?]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : url;
};

export const FullCourse = ({ courseData, contentsData }) => {
  if (!courseData) return <div>No course data available</div>;

  const {
    courseIntroVideo,
    courseName,
    courseDescription,
    courseRating,
    courseInstructor
  } = courseData;

  return (
    <div className="fullcourse-container">
      <div className="course-card">
        <div className="course-info corner-layout">
          {courseIntroVideo?.videoUrl && (
            <iframe
              className="big-image"
              width="560"
              height="315"
              src={getEmbedUrl(courseIntroVideo.videoUrl)}
              title={courseIntroVideo.videoTitle}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}

          <div className="text-corner">
            <h2>{courseName}</h2>
            <p>{courseDescription}</p>
            <p><strong>Instructor:</strong> {courseInstructor}</p>
            <p><strong>Rating:</strong> ⭐ {courseRating}</p>
            <button className="start-button">Start</button>
            <div className="progress-label">Learning Progress</div>
            <div className="progress-bar-bg">
              <div className="progress-bar-fill" style={{ width: '50%' }} />
            </div>
          </div>
        </div>

        <div className="overview-container">
          <h1 className="overview-title">Table of Contents</h1>
          <p className="overview-label">Contents as follows</p>
          <div className="overview-cards">
            {contentsData.map((module, idx) => (
              <div key={idx} className="overview-card">
                <h3>{module.moduleTitle}</h3>
                <ul>
                  {module.submodules.map((sub, i) => (
                    <li key={i}>{sub}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
