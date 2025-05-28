import React from 'react';
import '../styles/ProfileCard.css';

export const ProfileCard = ({ photo, name, designation, email }) => {
  return (
    <div className="profile-card">
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
