import React from 'react';
import '../styles/CoursePage.css';

// Enhanced helper to convert any YouTube URL or ID to embed format
const getEmbedUrl = (url) => {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=|embed\/)?([a-zA-Z0-9_-]{11})/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : '';
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

  const embedUrl = getEmbedUrl(courseIntroVideo?.videoUrl || '');
  const isValidEmbed = embedUrl.includes("youtube.com/embed");

  return (
    <div className="fullcourse-container">
      <div className="course-card">
        <div className="course-info corner-layout">
          {embedUrl && (
            <div className="video-wrapper">
              {isValidEmbed ? (
                <iframe
                  width="560"
                  height="315"
                  src={embedUrl}
                  title={courseIntroVideo.videoTitle || "Course Introduction"}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <p>Invalid video URL provided</p>
              )}
            </div>
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
