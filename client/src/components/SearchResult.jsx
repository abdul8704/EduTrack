import React, { useState, useEffect } from 'react';
import { AvailableCourses } from './AvailableCourses';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export const SearchResult = () => {
  const { tags } = useParams();
  const tag = tags.trim().split(/\s+/).join(',');
  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/user/alice@example.com/course/search?tags=${tag}`
        );
        setCourse(response.data.courses);
      } catch (error) {
        console.error('Error fetching course data:', error); // ✅ now inside catch
        setCourse([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [tag]);

  if (loading) return <div>Loading...</div>;

  const hasResults = course && course.length > 0;

  return (
    <AvailableCourses
      title={hasResults ? 'Search Results' : 'No Results!'}
      available={course}
    />
  );
};
