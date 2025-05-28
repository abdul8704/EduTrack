import React, { useState } from 'react';
import '../styles/CoursePage.css';
import { CourseIntro } from './CourseIntro';
import { CourseOverview } from './CourseOverview';
import IotImage from '../assets/zuntraLogo.avif';
import Iot from '../assets/react.svg';

export const CoursePage = () => {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className="course-page">
            <CourseIntro name={"Internet"} img={Iot} info={"This comprehensive course is designed to provide learners with a deep understanding of the fundamental components and architecture of the Internet of Things (IoT). You will explore various platforms and ecosystems that support IoT development, including cloud services, communication protocols, and data analytics tools."
                } />
            <div className="course-overview">
                <h3>Overview</h3>
    
                <p>By the end of this course, you will be able to:</p>
                <ul>
                    <li>Describe the key layers and components of IoT architecture.</li>
                    <li>Understand different IoT platforms and ecosystems.</li>
                    <li>Develop simple IoT projects using Arduino and Raspberry Pi.</li>
                    <li>Apply communication protocols like MQTT and HTTP in IoT systems.</li>
                    <li>Analyze IoT data for actionable insights.</li>
                </ul>
                <p>
                    Whether you're a beginner or have some experience, this course will equip you with the essential knowledge and hands-on skills to confidently create and manage IoT applications.
                </p>

                <h4>Table of Contents</h4>
                <ul>
                    <li>📘 IoT Platforms Overview</li>
                    <li>📘 Internet of Things 101</li>
                    <li>📘 Internet of Things 201</li>
                </ul>
            </div>
        </div>
    );
};
