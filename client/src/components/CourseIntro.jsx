import React from 'react'
import '../styles/CoursePage.css';
import IotImage from '../assets/zuntraLogo.avif';
export const CourseIntro = ({name}) => {
    return (
        <div className="course-page">
            <div className="course-card">
                <div className="course-info corner-layout">
                    <img className="big-image" src={IotImage} alt="IoT" />
                    <div className="text-corner">
                        <h2>{name}</h2>
                        <p>
                            This course enriches the learners to describe components of IoT Architecture and platforms of IoT ecosystem, and understand how to use Arduino to build prototypes.

                            This comprehensive course is designed to provide learners with a deep understanding of the fundamental components and architecture of the Internet of Things (IoT). You will explore various platforms and ecosystems that support IoT development, including cloud services, communication protocols, and data analytics tools.
                        </p>
                        <button className="start-button">Start</button>
                    </div>
                </div>

                <div className="progress-label">Learning Progress</div>
                <div className="progress-bar-bg">
                    <div className="progress-bar-fill" style={{ width: '50%' }}></div>
                </div>
                <p className="progress-status">Status: Started</p>

                <div className="certificate-generate">
                    <span>Generate Certificate</span>
                    <button className="download-button">Download</button>
                </div>
            </div>
        </div>
    )
}
