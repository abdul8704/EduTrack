import React from 'react';

export const Module = () => {
  const assignmentQuestions = [
    'What are the key takeaways from the video?',
    'Explain the main concept discussed using your own words.',
    'List any real-world applications related to this module.',
    'Create a summary diagram or mind map based on the video.',
  ];

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: 'auto', fontFamily: 'sans-serif' }}>
      <h1 style={{ marginBottom: '1rem' }}>Module Title: Introduction to Machine Learning</h1>

      <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, marginBottom: '2rem' }}>
        <iframe
          src="https://www.youtube.com/embed/ukzFI9rgwfU"
          title="Module Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        />
      </div>

      <h2>Description</h2>
      <p style={{ marginBottom: '2rem' }}>
        In this module, we explore the foundational ideas behind Machine Learning, including the distinction between supervised
        and unsupervised learning, real-world use cases, and the intuition behind model training and testing.
      </p>

      <h2>Assignment Questions</h2>
      <ul>
        {assignmentQuestions.map((q, index) => (
          <li key={index} style={{ marginBottom: '0.5rem' }}>{q}</li>
        ))}
      </ul>
    </div>
  );
};
