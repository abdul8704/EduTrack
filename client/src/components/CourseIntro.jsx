import React from 'react'
import '../styles/CoursePage.css';
import IotImage from '../assets/zuntraLogo.avif';
export const CourseIntro = ({ name, img, info,label }) => {
    return (
        <div className="course-page">
            <div className="course-card">
                <div className="course-info corner-layout"  >
                    <img className="big-image" src={img} alt="IoT" />
                    <div className="text-corner">
                        <h2>{name}</h2>
                        <p>
                            {info}
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
