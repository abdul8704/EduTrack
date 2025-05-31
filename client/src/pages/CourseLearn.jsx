import React, { useEffect, useState } from 'react';
import '../styles/courseLearn.css';
import { CourseNavbar } from '../components/CourseNavbar';
import { Module } from '../components/Module';
import { useParams } from 'react-router-dom';
import axios from "axios";

export const CourseLearn = () => {
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
  }, [userId, courseId]);

  const [subModuleVideo, setSubModuleVideo] = useState([]);
  const [subModuleQuiz, setSubModuleQuiz] = useState([]);
  const [subModuleTitle, setSubModuleTitle] = useState(null);
  const [subModuleDesc, setSubModuleDesc] = useState(null);
  const [subModuleLoading, setSubModuleLoading] = useState(true);
  const [progressReloadTrigger, setProgressReloadTrigger] = useState(0);

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
        setSubModuleLoading(false);
      }
    };

    if (userId && courseId && moduleNumber !== undefined && subModuleNumber !== undefined) {
      fetchSubModuleData();
    }
  }, [userId, courseId, moduleNumber, subModuleNumber]);

  if (subModuleLoading || navLoading) return <div>Loading course...</div>;
  if (!navCourse) return <div>Course not found.</div>;

  return (
    <div className="course-container">
      <CourseNavbar
        modules={navContents}
        activeIndex={activeIndex}
        toggleModule={toggleModule}
        isCollapsed={isCollapsed}
        moduleNo={moduleNumber}
        subModuleNo={subModuleNumber}
        progressReloadTrigger={progressReloadTrigger}
        userId={userId}
        courseId={courseId}
      />
      <button className="course-hamburger" onClick={toggleNavbar}>
        {isCollapsed ? '>' : '<'}
      </button>
      <Module
        userId={userId}
        courseId={courseId}
        moduleNumber={moduleNumber}
        subModuleNumber={subModuleNumber}
        title={subModuleTitle}
        videoUrl="https://www.youtube.com/embed/1CViJDo_YGk?si=qcTBuL77FfFpIqqu"
        description={subModuleDesc}
        questions={subModuleQuiz.questions}
        onProgressUpdated={() => setProgressReloadTrigger(prev => prev + 1)}
      />
    </div>
  );
};
