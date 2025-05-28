import React from 'react';
import '../styles/CoursePage.css';

export const FullCourse = ({ name, img, id }) => {
    const courseArray = [
        {
            id: 1,
            info: "This compdifkwfhkwejhkfjhkfjhrehensive course is designed to provide learners with a deep understanding of the fundamental components and architecture of the Internet of Things (IoT).",
            label: "Contents as follows",
            overviewItems: [
                {
                    heading: "What is IoT?",
                    content: "The Internet of Things (IoT) refers to a system of interrelated physical devices connected via the Internet, enabling them to collect and exchange data."
                },
                {
                    heading: "Internet of Things 101",
                    content: [
                        "Describe the key layers and components of IoT architecture.",
                        "Understand different IoT platforms and ecosystems.",
                        "Develop simple IoT projects using Arduino and Raspberry Pi.",
                        "Apply communication protocols like MQTT and HTTP in IoT systems."
                    ]
                },
                {
                    heading: "Internet of Things 201",
                    content: [
                        "Edge computing in IoT",
                        "Real-world IoT case studies",
                        "Data processing pipelines",
                        "Advanced IoT security strategies"
                    ]
                }
            ]
        },
        {
            id: 2,
            info: "This comprehensive course introduces Machine Learning concepts including supervised and unsupervised learning, essential algorithms, and practical applications.",
            label: "Contents as follows",
            overviewItems: [
                {
                    heading: "What is Machine Learning?",
                    content: "Machine Learning is a field of computer science that enables computers to learn from data and improve their performance without being explicitly programmed."
                },
                {
                    heading: "Machine Learning Basics",
                    content: [
                        "Understand types: Supervised, Unsupervised, Reinforcement Learning.",
                        "Learn training/testing, overfitting, and underfitting.",
                        "Explore Linear Regression, K-Nearest Neighbors (KNN)."
                    ]
                },
                {
                    heading: "Intermediate Machine Learning",
                    content: [
                        "Decision Trees, Random Forests, Support Vector Machines.",
                        "Model evaluation: accuracy, precision, recall, F1-score.",
                        "Cross-validation, hyperparameter tuning."
                    ]
                }
            ]
        }
    ];

    const selectedCourse = courseArray.find(course => course.id === id);

    return (
        <div className="fullcourse-container">
            <div className="course-card">
                <div className="course-info corner-layout">
                    {img.includes("youtube.com/embed") ? (
                        <iframe
                            className="big-image"
                            width="560"
                            height="315"
                            src={img}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    ) : (
                        <img className="big-image" src={img} alt={name} />
                    )}
                    <div className="text-corner">
                        <h2>{name}</h2>
                        <p>{selectedCourse.info}</p>
                        <button className="start-button">Start</button>
                        <div className="progress-label">Learning Progress</div>
                        <div className="progress-bar-bg">
                            <div className="progress-bar-fill" style={{ width: '50%' }} />
                        </div>
                    </div>
                </div>


                <div className="overview-container">
                    <h1 className="overview-title">Table of Contents</h1>
                    <p className="overview-label">{selectedCourse.label}</p>
                    <div className="overview-cards">
                        {selectedCourse.overviewItems.map((item, idx) => (
                            <div key={idx} className="overview-card">
                                <h3>{item.heading}</h3>
                                {Array.isArray(item.content) ? (
                                    <ul>
                                        {item.content.map((line, i) => (
                                            <li key={i}>{line}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>{item.content}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
