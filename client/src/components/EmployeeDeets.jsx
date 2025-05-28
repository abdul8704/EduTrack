import React, { useEffect, useState } from 'react';
import '../styles/empdeets.css';
import { ProfileCard } from './ProfileCard';
import axios from 'axios';

export const EmployeeDeets = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/alice01');
        setUsers(response.data.allUsers || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="enrolled-container">
      <div className="enrolled-title">Employee Details</div>
      <div className="available-courses-container">
        {users.map((user) => (
          <ProfileCard
            key={user._id}
            photo={user.profilePicture}
            name={user.username}
            designation={user.position}
            email={user.email}
          />
        ))}
      </div>
    </div>
  );
};
