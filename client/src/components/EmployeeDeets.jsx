import React from 'react';
import '../styles/empdeets.css';
import { ProfileCard } from './ProfileCard';
import { useParams } from 'react-router-dom';

export const EmployeeDeets = ({ profile }) => {
  const { userId } = useParams();
  console.log(userId)
  if (!profile || profile.length === 0) {
    return <div>No employee data available.</div>;
  }
  ``
  return (
    <div className="enrolled-container">
      <h2 className="enrolled-title">Employee Details</h2>
      <div className="available-courses-container">
        {profile.map((user) => (
          <ProfileCard
            key={user._id}
            adminId={userId}
            photo={user.profilePicture}
            name={user.username}
            designation={user.position}
            email={user.email}
            userid={user.userid}
          />
        ))}
      </div>
    </div>
  );
};
