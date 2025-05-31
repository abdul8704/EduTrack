import React from 'react';
import '../styles/CoursePage.css';
import { useNavigate } from 'react-router-dom';
// Enhanced helper to convert any YouTube URL or ID to embed format
const getEmbedUrl = (url) => {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=|embed\/)?([a-zA-Z0-9_-]{11})/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : '';
};
const handleDownloadCertificate = async ({ userId, courseName, courseInstructor }) => {
  try {
    const response = await fetch('http://localhost:5000/api/certificate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: userId,
        course: courseName,
        instructor: courseInstructor,
        date: new Date().toLocaleDateString()
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Backend error:', errorText);
      throw new Error('Failed to generate certificate');
    }

    const blob = await response.blob();
    if (blob.type !== 'application/pdf') {
      const text = await blob.text();
      console.error('Unexpected response:', text);
      throw new Error('Invalid PDF content received');
    }

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${courseName}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);

  } catch (error) {
    console.error(error);
    alert('Error downloading certificate: ' + error.message);
  }
};

export const FullCourse = ({ uId, id, courseData, contentsData, percent }) => {
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
  const navigate = useNavigate();
  const handleStartClick = () => {
    navigate(`/course/${uId}/${id}/0/0`);
  };
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
            <div className="button-container" style={{ display: 'flex', gap: '1rem' }}>
              {percent === 100 ? (
                <>
                  <button
                    className="start-button"
                    onClick={() => handleStartClick()}
                  >
                    Start Over
                  </button>
                  <button
                    className="certificate-button"
                    onClick={() =>
                      handleDownloadCertificate({
                        userId: uId,
                        courseName: courseName,
                        courseInstructor: courseInstructor,
                      })
                    }
                  >
                    Download Certificate
                  </button>
                </>
              ) : (
                <button
                  className="start-button"
                  onClick={handleStartClick}
                >
                  {percent > 0 ? 'Continue Learning' : 'Start'}
                </button>
              )}
            </div>


            <div className="progress-label">Learning Progress</div>
            <div className="progress-bar-bg">
              <div className="progress-bar-fill" style={{ width: `${percent}%` }}
              />
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
