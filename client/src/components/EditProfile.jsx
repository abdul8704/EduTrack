import React, { useState, useEffect } from 'react';
import '../styles/editprofile.css'; // CSS assumed

export const EditProfile = ({ onClose, onSave, userData = {} }) => {
  const [role, setRole] = useState('admin'); // Change to 'user' to test user mode

  const [formData, setFormData] = useState({
    username: '',
    profilePicture: '',
    role: '',
    position: ''
  });

  const [showImageUrlPopup, setShowImageUrlPopup] = useState(false);
  const [tempImageUrl, setTempImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (userData) {
      setFormData({
        username: userData.username || '',
        profilePicture: userData.profilePicture || 'default-profile-pic.png',
        role: userData.role || '',
        position: userData.position || ''
      });
    }
  }, [userData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUrlSubmit = (e) => {
    e.preventDefault();
    if (tempImageUrl.trim()) {
      setFormData(prev => ({
        ...prev,
        profilePicture: tempImageUrl.trim()
      }));
    }
    setShowImageUrlPopup(false);
    setTempImageUrl('');
  };

  const handleImageUrlCancel = () => {
    setShowImageUrlPopup(false);
    setTempImageUrl('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (onSave) onSave(formData);
      if (onClose) onClose();
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Error saving profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (onClose) onClose();
  };

  return (
    <div className="edit-profile-overlay">
      <div className="edit-profile-modal">
        <div className="edit-profile-header">
          <h2>Edit Profile</h2>
          <button className="close-btn" onClick={handleCancel} type="button">×</button>
        </div>

        <div className="edit-profile-form">
          {/* Profile Image Section (user only) */}
          {role === 'user' && (
            <div className="profile-image-section">
              <div className="image-preview-container">
                {formData.profilePicture && formData.profilePicture !== 'default-profile-pic.png' ? (
                  <img
                    src={formData.profilePicture}
                    alt="Profile preview"
                    className="profile-image-preview"
                    onError={(e) => {
                      e.target.src = 'default-profile-pic.png';
                    }}
                  />
                ) : (
                  <div className="profile-image-placeholder">
                    <span>Default Image</span>
                  </div>
                )}
              </div>
              <div className="image-upload-container">
                <button
                  type="button"
                  onClick={() => setShowImageUrlPopup(true)}
                  className="image-upload-btn"
                >
                  Change Photo
                </button>
              </div>
            </div>
          )}

          {/* Form Fields */}
          <div className="form-grid">
            {role === 'user' && (
              <>
                <div className="form-group full-width">
                  <label htmlFor="username">Username *</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                    placeholder="Enter your username"
                  />
                </div>

                <div className="form-group full-width">
                  <label>User ID</label>
                  <input
                    type="text"
                    value={userData.userid || ''}
                    className="form-input readonly"
                    readOnly
                    disabled
                  />
                </div>

                <div className="form-group full-width">
                  <label>Email</label>
                  <input
                    type="email"
                    value={userData.email || ''}
                    className="form-input readonly"
                    readOnly
                    disabled
                  />
                </div>
              </>
            )}

            {role === 'admin' && (
              <>
                <div className="form-group full-width">
                  <label htmlFor="role">Role</label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="form-input"
                  >
                    <option value="" disabled>Select Role</option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <div className="form-group full-width">
                  <label htmlFor="position">Position</label>
                  <input
                    type="text"
                    id="position"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Enter position"
                  />
                </div>
              </>
            )}
          </div>

          {/* Action Buttons */}
          <div className="form-actions">
            <button
              type="button"
              onClick={handleCancel}
              className="btn-cancel"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="btn-save"
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>

      {/* Image URL Popup */}
      {showImageUrlPopup && (
        <div className="popup-overlay">
          <div className="popup-modal">
            <div className="popup-header">
              <h3>Enter Image URL</h3>
              <button className="close-btn" onClick={handleImageUrlCancel} type="button">×</button>
            </div>
            <div className="popup-content">
              <form onSubmit={handleImageUrlSubmit}>
                <div className="form-group">
                  <label htmlFor="imageUrl">Image URL</label>
                  <input
                    type="url"
                    id="imageUrl"
                    value={tempImageUrl}
                    onChange={(e) => setTempImageUrl(e.target.value)}
                    className="form-input"
                    required
                    placeholder="https://example.com/image.jpg"
                    autoFocus
                  />
                </div>
                <div className="popup-actions">
                  <button type="button" onClick={handleImageUrlCancel} className="btn-cancel">Cancel</button>
                  <button type="submit" className="btn-save" disabled={!tempImageUrl.trim()}>Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
