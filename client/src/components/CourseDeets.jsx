import React from 'react';
import '../styles/coursedeets.css';
import defaultImage from '../assets/react.svg'; // Adjust the path as necessary
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from "axios"
export const CourseDeets = ({ profile }) => {
  const {courseId} = useParams()
  const [navCourse, setCourse] = useState(null);
  const [navContents, setContents] = useState([]);
  const [navLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/admin/bob@example.com/${courseId}`);
        setCourse(response.data.data);
        setContents(response.data.contents);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching course data:', error);
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [courseId]);
  

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
    {
      id: 5,
      name: 'Olivia Brown',
      designation: 'Software Engineer',
      progress: 70,
      imageUrl: 'https://randomuser.me/api/portraits/women/29.jpg',
    },
    {
      id: 6,
      name: 'Sophia Green',
      designation: 'Full Stack Developer',
      progress: 60,
      imageUrl: 'https://randomuser.me/api/portraits/men/20.jpg',
    },
    {
      id: 7,
      name: 'Lily White',
      designation: 'Python Developer',
      progress: 40,
      imageUrl: 'https://randomuser.me/api/portraits/men/30.jpg',
    },
    {
      id: 8,
      name: 'Mia Black',
      designation: 'Data Analyst',
      progress: 20,
      imageUrl: 'https://randomuser.me/api/portraits/men/40.jpg',
    },
    {
      id: 5,
      name: 'Olivia Brown',
      designation: 'Software Engineer',
      progress: 70,
      imageUrl: 'https://randomuser.me/api/portraits/women/29.jpg',
    },
    {
      id: 6,
      name: 'Sophia Green',
      designation: 'Full Stack Developer',
      progress: 60,
      imageUrl: 'https://randomuser.me/api/portraits/men/20.jpg',
    },
    {
      id: 7,
      name: 'Lily White',
      designation: 'Python Developer',
      progress: 40,
      imageUrl: 'https://randomuser.me/api/portraits/men/30.jpg',
    },
    {
      id: 8,
      name: 'Mia Black',
      designation: 'Data Analyst',
      progress: 20,
      imageUrl: 'https://randomuser.me/api/portraits/men/40.jpg',
    },
  ];

  return (
    <div className="coursedeets-container">
      {/* Sidebar */}
      <aside className="coursedeets-navbar">
        <button className="coursedeets-back-button" onClick={() => window.history.back()}>
          ←
        </button>
        <div className="coursedeets-profile-section">
          <div className="coursedeets-profile-image">
            <img src="https://st2.depositphotos.com/1350793/8441/i/450/depositphotos_84415820-stock-photo-hand-drawing-online-courses-concept.jpg" alt="Course" />
          </div>
          <div className="coursedeets-profile-details">
            <div className="coursedeets-profile-name">{navCourse.courseName}</div>
            <div className="coursedeets-profile-email">{navCourse.courseInstructor}</div>
            <div className="coursedeets-profile-designation">{navCourse.courseRating} ⭐</div>
          </div>
        </div>
        <div className="coursedeets-divider">
          <div className="coursedeets-toc">
            <h3>Table of Contents</h3>
            {navContents.map((module, index) => (
              <div key={index} className="coursedeets-module">
                <strong >{module.moduleTitle}</strong>
                <ul>
                  {module.submodules.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
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
