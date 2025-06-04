import React, { useState, useEffect } from 'react';
import '../styles/UserDetails.css';

const UserDetails = () => {
  const [userDetails, setUserDetails] = useState({
    username: '',
    userid: '',
    email: '',
    passwordHash: '',
    profilePicture: 'default-profile-pic.png',
    role: 'user',
    position: 'Software Engineer',
    currentCourses: []
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedDetails, setEditedDetails] = useState({ ...userDetails });
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [newProfileURL, setNewProfileURL] = useState('');

  useEffect(() => {
    const mockUserData = {
      username: 'john_doe',
      userid: 'USER123456',
      email: 'john.doe@example.com',
      passwordHash: '••••••••',
      profilePicture: 'default-profile-pic.png',
      role: 'user',
      position: 'Senior Software Engineer',
      currentCourses: ['React Fundamentals', 'Node.js Advanced', 'MongoDB Basics']
    };
    setUserDetails(mockUserData);
    setEditedDetails(mockUserData);
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedDetails({ ...userDetails });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setShowProfilePopup(false);
    setEditedDetails({ ...userDetails });
  };

  const handleSave = () => {
    setUserDetails({
      ...userDetails,
      username: editedDetails.username,
      profilePicture: editedDetails.profilePicture
    });
    setIsEditing(false);
    setShowProfilePopup(false);
    console.log('Saved:', editedDetails);
  };

  const handleInputChange = (field, value) => {
    setEditedDetails(prev => ({ ...prev, [field]: value }));
  };

  const openProfilePopup = () => {
    setNewProfileURL('');
    setShowProfilePopup(true);
  };

  const applyNewProfilePicture = () => {
    if (newProfileURL.trim()) {
      handleInputChange('profilePicture', newProfileURL.trim());
      setShowProfilePopup(false);
    }
  };

  return (
    <div className="deets-container">
      <div className="deets-header">
        <h1 className="deets-title">User Details</h1>
        {!isEditing ? (
          <button className="deets-edit-btn" onClick={handleEdit}>Edit Profile</button>
        ) : (
          <div className="deets-action-buttons">
            <button className="deets-save-btn" onClick={handleSave}>Save</button>
            <button className="deets-cancel-btn" onClick={handleCancel}>Cancel</button>
          </div>
        )}
      </div>

      <div className="deets-content">
        <div className="deets-profile-section">
          <div className="deets-profile-picture">
            <img 
              src={isEditing ? editedDetails.profilePicture : userDetails.profilePicture} 
              alt="Profile" 
              className="deets-profile-img"
            />
          </div>
            {isEditing && (
              <span className="deets-change-link" onClick={openProfilePopup}>
                Change Profile Picture
              </span>
            )}
        </div>

        <div className="deets-form-section">
          <div className="deets-field-group">
            <label className="deets-label">Username</label>
            {isEditing ? (
              <input
                type="text"
                value={editedDetails.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                className="deets-input"
              />
            ) : (
              <div className="deets-value">{userDetails.username}</div>
            )}
          </div>

          <div className="deets-field-group">
            <label className="deets-label">User ID</label>
            <div className="deets-value deets-readonly">{userDetails.userid}</div>
          </div>

          <div className="deets-field-group">
            <label className="deets-label">Email</label>
            <div className="deets-value">{userDetails.email}</div>
          </div>

          <div className="deets-field-group">
            <label className="deets-label">Password</label>
            <div className="deets-value">{userDetails.passwordHash}</div>
          </div>

          <div className="deets-field-group">
            <label className="deets-label">Role</label>
            <div className="deets-value deets-role">{userDetails.role}</div>
          </div>

          <div className="deets-field-group">
            <label className="deets-label">Position</label>
            <div className="deets-value">{userDetails.position}</div>
          </div>

          <div className="deets-field-group">
            <label className="deets-label">Current Courses</label>
            <ul className="deets-courses-container">
              {userDetails.currentCourses.map((course, idx) => (
                <li key={idx} className="deets-course-item">
                  {course}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {showProfilePopup && (
        <div className="deets-popup-overlay">
          <div className="deets-popup">
            <h3>Enter Image URL</h3>
            <input
              type="text"
              value={newProfileURL}
              onChange={(e) => setNewProfileURL(e.target.value)}
              placeholder="https://example.com/profile.jpg"
              className="deets-popup-input"
            />
            <div className="deets-popup-buttons">
              <button className="deets-popup-btn" onClick={applyNewProfilePicture}>Apply</button>
              <button className="deets-popup-btn cancel" onClick={() => setShowProfilePopup(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetails;
