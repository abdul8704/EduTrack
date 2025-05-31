import React from 'react'

export const Profile = () => {
  return (
    <div className="empprog-container">
      {/* Sidebar */}
      <aside className="empprog-navbar">
        <button className="coursedeets-back-button" onClick={() => window.history.back()}>
          ←
        </button>
        <div className="empprog-profile-section">
          <div className="empprog-profile-image">
            <img src={userData.profilePicture} alt="Profile" />
          </div>
          <div className="empprog-profile-details" >
            <div className="empprog-profile-name">{userData.username}</div>
            <div className="empprog-profile-designation">{userData.position}</div>
            <div className="empprog-profile-email">{userData.email}</div>
          </div>
        </div>
      </aside>

      {/* Content */}
      <main className="empprog-content">
        <h2 className="empprog-heading">Progress</h2>
        <div className="empprog-courses">
          {courses.length === 0 ? (
            <div>The person is very busy... not even one course enrolled...</div>
          ) : courses.map(course => (
            <div className="empprog-course-card" key={course._id} onClick={()=> handleCardClick(course.courseId)}>
              <img className="empprog-course-image" src={course.courseImage} alt={course.courseName} />
              <div className="empprog-course-details">
                <div className="empprog-course-name">{course.courseName}</div>
                <div className="empprog-course-instructor">Instructor: {course.courseInstructor}</div>
                <div className="empprog-progress-bar">
                  <div
                    className="empprog-progress-fill"
                    style={{ width: `${course.percentComplete}%` }}
                  />
                </div>
                <div className="empprog-progress-percent">{course.percentComplete}%</div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
