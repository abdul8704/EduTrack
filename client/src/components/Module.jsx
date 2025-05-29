import React from 'react';
import '../styles/course.css';

export const Module = ({ title, videoUrl, description, questions }) => {
  return (
    <div className="module-container">
      <h1 className="module-title">Module Title: {title}</h1>

      <div className="module-video-wrapper">
        <iframe
          src={videoUrl}
          title="Module Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="module-video"
        />
      </div>

      <h2>Description</h2>
      <p className="module-description">{description}</p>

      <h2>Assignment Questions</h2>
      <ul className="module-assignment-list">
        {questions.map((q, index) => (
          <li key={index} className="module-assignment-item">{q}</li>
        ))}
      </ul>
    </div>
  );
};
