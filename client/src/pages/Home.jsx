import React, { useEffect, useState } from 'react';
import { EnrolledCourses } from '../components/EnrolledCourses';
import { AvailableCourses } from '../components/AvailableCourses';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export const Home = () => {
  const [courses, setCourses] = useState({
    enrolledCourses: [],
    availableCourses: []
  });

  const [loading, setLoading] = useState(true);
  const { userId } = useParams();
  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        // "bobsmith92"
        const response = await axios.get(`http://localhost:5000/api/user/${userId}`);
        setCourses({
          enrolledCourses: response.data.enrolledCourses,
          availableCourses: response.data.availableCourses
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching course data:', error);
        setLoading(false);
      }
    };

    fetchCourseData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <EnrolledCourses enrolled={courses.enrolledCourses} />
      <AvailableCourses available={courses.availableCourses} />
    </>
  );
};
