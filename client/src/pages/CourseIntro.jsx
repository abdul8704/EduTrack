import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { CourseDetails } from '../components/CourseDetails';
import '../styles/courseIntro.css';
import { Navbar } from '../components/Navbar';
export const CourseIntro = () => {
  const { userId, courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [contents, setContents] = useState([]);
  const [perc, setPerc] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/user/${userId}/${courseId}`);
        setCourse(response.data.data);
        setContents(response.data.contents);
        setPerc(response.data.percentComplete);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching course data:', error);
        setLoading(false);
      }
    };
    fetchCourseData();
  }, [userId, courseId]);
  if (loading) return <div>Loading course...</div>;
  if (!course) return <div>Course not found.</div>;

  return (
    <>
      <Navbar />
      <div className="course-page">
        <CourseDetails uId={userId} id={courseId} courseData={course} contentsData={contents} percent={perc} />
      </div>
    </>
  );
};
