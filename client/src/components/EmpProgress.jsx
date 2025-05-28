import React from 'react';
import '../styles/empprogress.css';
import '../styles/EnrolledCourses.css';

export const EmpProgress = ({ profile }) => {
  const defaultImage = 'https://randomuser.me/api/portraits/women/44.jpg';
  
  const defaultProfile = {
    name: 'Keerthika',
    designation: 'Software Engineer',
    email: 'john.doe@example.com',
    imageUrl: defaultImage,
  };

  const user = profile || defaultProfile;

  return (
    <div className="empprog-navbar">
      <div className="empprog-profile-section">
        <div className="empprog-profile-image">
          <img src={user.imageUrl} alt="Profile" />
        </div>
        <div className="empprog-profile-details">
          <div className="empprog-profile-name">{user.name}</div>
          <div className="empprog-profile-designation">{user.designation}</div>
          <div className="empprog-profile-email">{user.email}</div>
        </div>
      </div>
    </div>
  );
};
