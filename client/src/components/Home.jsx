import React, { useEffect, useState } from 'react';
import { EnrolledCourses } from './EnrolledCourses';
import { AvailableCourses } from './AvailableCourses';
import axios from 'axios';

export const Home = () => {
  const [courses, setCourses] = useState({
    enrolledCourses: [],
    availableCourses: []
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        // "bobsmith92"
        const response = await axios.get('http://localhost:5000/api/user/alice@gmail.com');
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
