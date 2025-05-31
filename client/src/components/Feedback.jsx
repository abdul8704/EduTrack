import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/Feedback.css';

export const Feedback = () => {
  const { userId, courseId } = useParams();
  const navigate = useNavigate();

  const smilies = [
    { emoji: '😠', label: 'Very Bad' },
    { emoji: '😕', label: 'Bad' },
    { emoji: '😐', label: 'Okay' },
    { emoji: '🙂', label: 'Good' },
    { emoji: '😍', label: 'Excellent' }
  ];

  const handleClick = (index) => {
    const feedback = {
      rating: index + 1,
      emoji: smilies[index].emoji,
      label: smilies[index].label,
    };
    
    console.log("Feedback Submitted:", feedback);
    navigate(`/course/intro/${userId}/${courseId}`);
  };

  return (
    <div className="feedback-popup-overlay">
      <div className="feedback-popup">
        <h2>How was the course?</h2>
        <div className="feedback-emojis">
          {smilies.map((item, index) => (
            <button
              key={index}
              className="feedback-emoji"
              title={item.label}
              onClick={() => handleClick(index)}
            >
              {item.emoji}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
