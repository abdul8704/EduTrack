import React, { useEffect, useState } from 'react';
import '../styles/course.css';
import { CourseNavbar } from './CourseNavbar';
import { Module } from './Module';
import { useParams } from 'react-router-dom';
import axios from "axios"

// Define assignmentQuestions here
const assignmentQuestions = [
  'What are the key takeaways from the video?',
  'Explain the main concept discussed using your own words.',
  'List any real-world applications related to this module.',
  'Create a summary diagram or mind map based on the video.',
];

export const Course = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleModule = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const toggleNavbar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const { userId, courseId, moduleNumber, subModuleNumber } = useParams();
  const [navCourse, setCourse] = useState(null);
  const [navContents, setContents] = useState([]);
  const [navLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/user/${userId}/${courseId}`);
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
  const [subModuleVideo, setSubModuleVideo] = useState([]);
  const [subModuleQuiz, setSubModuleQuiz] = useState([]);
  const [subModuleTitle, setSubModuleTitle] = useState(null);
  const [subModuleDesc, setSubModuleDesc] = useState(null);
  const [subModuleLoading, setSubModuleLoading] = useState(true);
  
  useEffect(() => {
    const fetchSubModuleData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/user/${userId}/${courseId}/module/${moduleNumber}/${subModuleNumber}`
        );

        setSubModuleVideo(response.data.subModule.video);
        setSubModuleQuiz(response.data.subModule.quiz);
        setSubModuleTitle(response.data.subModule.submoduleTitle);
        setSubModuleDesc(response.data.subModule.description);
        setSubModuleLoading(false);
      } catch (error) {
        console.error('Error fetching submodule data:', error);
        setSubModuleLoading(false); // corrected
      }
    };

    if (courseId && moduleNumber !== null && subModuleNumber !== null) {
      fetchSubModuleData(); // corrected
    }
  }, [userId, courseId, moduleNumber, subModuleNumber]);

  if (subModuleLoading) return <div>Loading course...</div>;
  if (navLoading) return <div>Loading course...</div>;
  if (!navCourse) return <div>Course not found.</div>;
  console.log("Title:",subModuleTitle);
  return (
    <div className="course-container">
      <CourseNavbar
        modules={navContents}
        activeIndex={activeIndex}
        toggleModule={toggleModule}
        isCollapsed={isCollapsed}
        moduleNumber={moduleNumber}
        subModuleNumber={subModuleNumber}
      />
      <button className="course-hamburger" onClick={toggleNavbar}>
        {isCollapsed ? '>' : '<'}
      </button>
      <Module
        title={subModuleTitle}
        videoUrl="https://www.youtube.com/embed/1CViJDo_YGk?si=qcTBuL77FfFpIqqu"
        description={subModuleDesc}
        questions={subModuleQuiz.questions}
      />
    </div>
  );
};
