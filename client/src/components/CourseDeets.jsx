import React from 'react';
import '../styles/coursedeets.css';

export const CourseDeets = ({ profile }) => {
  const defaultImage = 'https://randomuser.me/api/portraits/women/49.jpg';

 const defaultProfile = {
  courseName: 'React Basics',
  instructor: 'John Smith',
  ratings: 5,
  imageUrl: defaultImage,
  tableOfContents: [
    {
      title: 'Getting Started with Python',
      submodules: ['Introduction to Python', 'Installing Python'],
    },
    {
      title: 'Python Basics',
      submodules: ['Variables and Data Types', 'Operators'],
    },
    {
      title: 'Control Structures',
      submodules: ['Conditional Statements', 'Loops'],
    },
  ],
};


  const user = profile || defaultProfile;

  const enrolledPeople = [
    {
      id: 1,
      name: 'Emily Carter',
      designation: 'Frontend Developer',
      progress: 80,
      imageUrl: 'https://randomuser.me/api/portraits/women/34.jpg',
    },
    {
      id: 2,
      name: 'Sarah Lee',
      designation: 'Junior Python Developer',
      progress: 50,
      imageUrl: 'https://randomuser.me/api/portraits/women/24.jpg',
    },
    {
      id: 3,
      name: 'Alice Johnson',
      designation: 'Data Scientist',
      progress: 30,
      imageUrl: 'https://randomuser.me/api/portraits/women/14.jpg',
    },
    {
      id: 4,
      name: 'Grace Hill',
      designation: 'React Intern',
      progress: 90,
      imageUrl: 'https://randomuser.me/api/portraits/women/47.jpg',
    },
  ];

  return (
    <div className="coursedeets-container">
      {/* Sidebar */}
      <aside className="coursedeets-navbar">
        <div className="coursedeets-profile-section">
          <div className="coursedeets-profile-image">
            <img src={user.imageUrl} alt="Course" />
          </div>
          <div className="coursedeets-profile-details">
            <div className="coursedeets-profile-name">{user.courseName}</div>
            <div className="coursedeets-profile-email">{user.instructor}</div>
            <div className="coursedeets-profile-designation">{user.ratings} ⭐</div>
          </div>
        </div>
        <div className="coursedeets-toc">
  <h3>Table of Contents</h3>
  <p>Contents as follows</p>
  {user.tableOfContents && user.tableOfContents.map((module, index) => (
    <div key={index} className="coursedeets-module">
      <strong>{module.title}</strong>
      <ul>
        {module.submodules.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
  ))}
</div>
      </aside>

      {/* Content */}
      <main className="coursedeets-content">
        <h2 className="coursedeets-heading">Enrolled</h2>
        <div className="coursedeets-courses">
          {enrolledPeople.map(person => (
            <div className="coursedeets-course-card" key={person.id}>
              <img className="coursedeets-course-image" src={person.imageUrl} alt={person.name} />
              <div className="coursedeets-course-details">
                <div className="coursedeets-course-name">{person.name}</div>
                <div className="coursedeets-course-instructor">{person.designation}</div>
                <div className="coursedeets-progress-bar">
                  <div
                    className="coursedeets-progress-fill"
                    style={{ width: `${person.progress}%` }}
                  />
                </div>
                <div className="coursedeets-progress-percent">{person.progress}%</div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};
