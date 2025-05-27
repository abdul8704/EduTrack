import React from 'react'
import { EnrolledCourses } from './EnrolledCourses'
import { AvailableCourses } from './AvailableCourses'

export const Home = () => {
  return (
    <>    
        <EnrolledCourses/>
        <AvailableCourses/>
    </>
  )
}
