import React, { useState, useEffect } from 'react';
import '../styles/CourseIntro.css';
import { useNavigate } from 'react-router-dom';
import { Popup } from './Popup';
import axios from 'axios';

// Enhanced helper to convert any YouTube URL or ID to embed format
const getEmbedUrl = (url) => {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=|embed\/)?([a-zA-Z0-9_-]{11})/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : '';
};

export const CourseDetails = ({ uId, id, courseData, contentsData, percent }) => {
  const [popup, setPopup] = useState(null);
  const navigate = useNavigate();

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

  const showPopup = (message, color) => {
    setPopup({ message, color });
    setTimeout(() => setPopup(null), 4000);
  };

  const [username, setName] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/user/${uId}/data/userinfo`);
        setName(response.data.username.username);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching course data:', error);
        setLoading(false);
      }
    };
    fetchCourseData();
  },);
  if (loading) return <div>Loading...</div>;
  if (!username) return <div>USER NOT FOUND...</div>

  const handleDownloadCertificate = async ({ userId, courseName, courseInstructor }) => {
    try {
      const response = await fetch('http://localhost:5000/api/certificate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: username,
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

      showPopup("Certificate generated successfully!", {
        background: "#d4edda",
        border: "#c3e6cb",
        text: "#155724"
      });

    } catch (error) {
      console.error(error);
      showPopup("Error downloading certificate: " + error.message, {
        background: "#f8d7da",
        border: "#f5c6cb",
        text: "#721c24"
      });
    }
  };

  const handleStartClick = () => {
    navigate(`/course/learn/${uId}/${id}/0/0`);
  };
  const handleEnrollClick = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/api/user/${uId}/${id}/enroll`);

      if (response.status === 200) {
        showPopup("Enrollment successful! You can now start the course.", {
          background: "#d4edda",
          border: "#c3e6cb",
          text: "#155724"
        });
        // Optional: navigate to course start or refresh component
        navigate(`/course/learn/${uId}/${id}/0/0`);
      } else {
        throw new Error('Enrollment failed. Please try again.');
      }
    } catch (error) {
      console.error('Enrollment error:', error);
      showPopup("Enrollment failed: " + error.message, {
        background: "#f8d7da",
        border: "#f5c6cb",
        text: "#721c24"
      });
    }
  };

  return (
    <div className="coursepage-fullcourse-container">
      <div className="coursepage-course-card">
        <div className="coursepage-course-info coursepage-corner-layout">
          {embedUrl && (
            <div className="coursepage-video-wrapper">
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

          <div className="coursepage-text-corner">
            <h2>{courseName}</h2>
            <p>{courseDescription}</p>
            <p><strong>Instructor:</strong> {courseInstructor}</p>
            <p><strong>Rating:</strong> ⭐ {courseRating}</p>

            <div className="coursepage-button-container" style={{ display: 'flex', gap: '1rem' }}>
              {percent === 100 ? (
                <>
                  <button
                    className="coursepage-start-button"
                    onClick={handleStartClick}
                  >
                    Start Over
                  </button>
                  <button
                    className="coursepage-certificate-button"
                    onClick={() => {
                      showPopup("Please hold... summoning the Certificate.\nEstimated arrival: just a few second away!", {
                        background: "#d4edda",
                        border: "#c3e6cb",
                        text: "#155724"
                      });
                      handleDownloadCertificate({
                        userId: uId,
                        courseName,
                        courseInstructor
                      });
                    }}
                  >
                    Download Certificate
                  </button>
                </>
              ) : (
                <button
                  className="coursepage-start-button"
                  onClick={percent >= 0 ? handleStartClick : handleEnrollClick}
                >
                  {percent >= 0 ? 'Continue Learning' : 'Enroll'}
                </button>
              )}
            </div>
            {percent >= 0 ? (
              <>
                <div className="coursepage-progress-label">Learning Progress</div>
                <div className="coursepage-progress-bar-bg">
                  <div
                    className="coursepage-progress-bar-fill"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </>
            ) : ''}
          </div>
        </div>

        <div className="coursepage-overview-container">
          <h1 className="coursepage-overview-title">Table of Contents</h1>
          <p className="coursepage-overview-label">Contents as follows</p>
          <div className="coursepage-overview-cards">
            {contentsData.map((module, idx) => (
              <div key={idx} className="coursepage-overview-card">
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

      {
        popup && (
          <Popup message={popup.message} color={popup.color} />
        )
      }
    </div >
  );
};
