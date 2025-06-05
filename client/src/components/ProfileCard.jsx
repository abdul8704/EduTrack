import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/profilecard.css';

export const ProfileCard = ({ adminId, photo, name, designation, email, userid }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/admin/dashboard/${adminId}/details/emp/${userid}`);
  };

  return (
    <div className="profile-card" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <div className="profile-top"></div>
      <img src={photo} alt={name} className="profile-photo" />
      <div className="profile-details">
        <h2 className="profile-name">{name}</h2>
        <p className="profile-designation">{designation}</p>
        <p className="profile-email">{email}</p>
      </div>
    </div>
  );
};
