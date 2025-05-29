import React, { useEffect, useState } from 'react';
import '../styles/course.css';
import { CourseNavbar } from './CourseNavbar';
import { Module } from './Module';
import { useParams } from 'react-router-dom';
import axios from "axios"

const courseModules = [
  {
    name: "Module 1",
    submodules: ["Part A", "Part B", "Assignment"]
  },
  {
    name: "Module 2",
    submodules: ["Lecture 1", "Lecture 2", "Assignment"]
  },
  {
    name: "Module 3",
    submodules: ["Part A", "Part B", "Assignment"]
  },
  {
    name: "Module 4",
    submodules: ["Reading", "Video", "Test"]
  },
  {
    name: "Module 5",
    submodules: ["Final Project", "Resources", "FAQ"]
  }
];

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
  if (navLoading) return <div>Loading course...</div>;
  if (!navCourse) return <div>Course not found.</div>;
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
        title="Introduction to Machine Learning"
        videoUrl="https://www.youtube.com/embed/ukzFI9rgwfU"
        description="In this module, we explore the foundational ideas behind Machine Learning, including the distinction between supervised and unsupervised learning, real-world use cases, and the intuition behind model training and testing."
        questions={assignmentQuestions}
      />
    </div>
  );
};
