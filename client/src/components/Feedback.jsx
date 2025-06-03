import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/feedback.css';
import axios from "axios";


export const Feedback =  () => {
  const { userId, courseId } = useParams();
  const navigate = useNavigate();
  const [popup, setPopup] = useState(null);
  const showPopup = (message, color) => {
    setPopup({ message, color });
    setTimeout(() => setPopup(null), 4000);
    };

  const smilies = [
    { emoji: '😠', label: 'Very Bad' },
    { emoji: '😕', label: 'Bad' },
    { emoji: '😐', label: 'Okay' },
    { emoji: '🙂', label: 'Good' },
    { emoji: '😍', label: 'Excellent' }
  ];

  const handleClick = async (index) => {
    const feedback = {
      rating: index + 1,
      emoji: smilies[index].emoji,
      label: smilies[index].label,
    };
    
    console.log("Feedback Submitted:", feedback);
    try{
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/user/${userId}/course/${courseId}/feedback`, {
        rating: feedback.rating
      })
        showPopup("FeedBack submitted successfuly!", {
          background: "#d4edda",
          border: "#c3e6cb",
          text: "#155724"
        });
    }catch(error){
      console.log(error)
    }

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
