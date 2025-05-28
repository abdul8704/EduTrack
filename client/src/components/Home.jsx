import React from 'react'
import { EnrolledCourses } from './EnrolledCourses'
import { AvailableCourses } from './AvailableCourses'
import axios from 'axios'

const getCourseData = async (req, res) => {
  const data = await axios.get('/api/user/')
  console.log(data);
  return data;
}

export const Home = () => {
  const course = getCourseData();
  return (
    <>    
        <EnrolledCourses/>
        <AvailableCourses/>
    </>
  )
}
