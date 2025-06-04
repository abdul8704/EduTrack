import React, { useState, useEffect } from 'react';
import '../styles/userdetails.css';

export const UserDetails = () => {
    const [isEditing, setIsEditing] = useState(false);
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
    const [editedDetails, setEditedDetails] = useState({});
    const [newCourse, setNewCourse] = useState('');

    // Mock data - replace with actual API call
    useEffect(() => {
        // Simulate fetching user data
        const mockUserData = {
            username: 'john_doe',
            userid: 'user_12345',
            email: 'john.doe@example.com',
            passwordHash: '••••••••••••',
            profilePicture: 'default-profile-pic.png',
            role: 'user',
            position: 'Software Engineer',
            currentCourses: ['React Development', 'Node.js Fundamentals', 'MongoDB Basics']
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
        setEditedDetails({ ...userDetails });
        setNewCourse('');
    };

    const handleSave = () => {
        // Here you would typically make an API call to save the data
        setUserDetails({ ...editedDetails });
        setIsEditing(false);
        setNewCourse('');
        console.log('Saving user details:', editedDetails);
    };

    const handleInputChange = (field, value) => {
        setEditedDetails(prev => ({
            ...prev,
            [field]: value
        }));
    };


    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // In a real app, you'd upload the file and get a URL
            const fileName = file.name;
            handleInputChange('profilePicture', fileName);
        }
    };

    return (
        <div className="deets-container">
            <div className="deets-header">
                <h1 className="deets-title">User Details</h1>
                {!isEditing ? (
                    <button className="deets-edit-btn" onClick={handleEdit}>
                        Edit Profile
                    </button>
                ) : (
                    <div className="deets-action-buttons">
                        <button className="deets-save-btn" onClick={handleSave}>
                            Save Changes
                        </button>
                        <button className="deets-cancel-btn" onClick={handleCancel}>
                            Cancel
                        </button>
                    </div>
                )}
            </div>

            <div className="deets-content">
                <div className="deets-profile-section">
                    <div className="deets-profile-picture">
                        <img 
                            src={`/images/${isEditing ? editedDetails.profilePicture : userDetails.profilePicture}`} 
                            alt="Profile"
                            className="deets-profile-img"
                            onError={(e) => {
                                e.target.src = '/images/default-profile-pic.png';
                            }}
                        />
                        {isEditing && (
                            <div className="deets-file-input-wrapper">
                                <input
                                    type="file"
                                    id="profilePicture"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="deets-file-input"
                                />
                                <label htmlFor="profilePicture" className="deets-file-label">
                                    Change Picture
                                </label>
                            </div>
                        )}
                    </div>
                </div>

                <div className="deets-form-grid">
                    <div className="deets-field">
                        <label className="deets-label">Username</label>
                        {isEditing ? (
                            <input
                                type="text"
                                value={editedDetails.username}
                                onChange={(e) => handleInputChange('username', e.target.value)}
                                className="deets-input"
                            />
                        ) : (
                            <span className="deets-value">{userDetails.username}</span>
                        )}
                    </div>

                    <div className="deets-field">
                        <label className="deets-label">User ID</label>
                        {isEditing ? (
                            <input
                                type="text"
                                value={editedDetails.userid}
                                onChange={(e) => handleInputChange('userid', e.target.value)}
                                className="deets-input"
                            />
                        ) : (
                            <span className="deets-value">{userDetails.userid}</span>
                        )}
                    </div>

                    <div className="deets-field">
                        <label className="deets-label">Email</label>
                        {isEditing ? (
                            <input
                                type="email"
                                value={editedDetails.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                className="deets-input"
                            />
                        ) : (
                            <span className="deets-value">{userDetails.email}</span>
                        )}
                    </div>

                    <div className="deets-field">
                        <label className="deets-label">Password</label>
                        {isEditing ? (
                            <input
                                type="password"
                                value={editedDetails.passwordHash}
                                onChange={(e) => handleInputChange('passwordHash', e.target.value)}
                                className="deets-input"
                                placeholder="Enter new password"
                            />
                        ) : (
                            <span className="deets-value">{userDetails.passwordHash}</span>
                        )}
                    </div>

                    <div className="deets-field">
                        <label className="deets-label">Role</label>
                        {isEditing ? (
                            <select
                                value={editedDetails.role}
                                onChange={(e) => handleInputChange('role', e.target.value)}
                                className="deets-select"
                            >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                        ) : (
                            <span className="deets-value deets-role">{userDetails.role}</span>
                        )}
                    </div>

                    <div className="deets-field">
                        <label className="deets-label">Position</label>
                        {isEditing ? (
                            <input
                                type="text"
                                value={editedDetails.position}
                                onChange={(e) => handleInputChange('position', e.target.value)}
                                className="deets-input"
                            />
                        ) : (
                            <span className="deets-value">{userDetails.position}</span>
                        )}
                    </div>

                    <div className="deets-field deets-courses-field">
                        <label className="deets-label">Current Courses</label>
                        <div className="deets-courses-container">
                            {(isEditing ? editedDetails.currentCourses : userDetails.currentCourses).map((course, index) => (
                                <div key={index} className="deets-course-tag">
                                    <span>{course}</span>
                                    {isEditing && (
                                        <button
                                            onClick={() => handleRemoveCourse(index)}
                                            className="deets-remove-course"
                                        >
                                            ×
                                        </button>
                                    )}
                                </div>
                            ))}
                            {isEditing && (
                                <div className="deets-add-course">
                                    <input
                                        type="text"
                                        value={newCourse}
                                        onChange={(e) => setNewCourse(e.target.value)}
                                        placeholder="Add new course"
                                        className="deets-course-input"
                                        onKeyPress={(e) => e.key === 'Enter' && handleAddCourse()}
                                    />
                                    <button onClick={handleAddCourse} className="deets-add-course-btn">
                                        Add
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};