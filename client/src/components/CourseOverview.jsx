import React from 'react';
// import '../styles/CourseOverview.css';

export const CourseOverview = () => {
  const overviewItems = [
    {
      id: 1,
      heading: 'What is IoT?',
      content: 'The Internet of Things (IoT) refers to a system of interrelated physical devices connected via the Internet, enabling them to collect and exchange data.',
    },
    {
      id: 2,
      heading: 'Course Objectives',
      content: `By the end of this course, you will be able to:
  • Describe the key layers and components of IoT architecture.
  • Understand different IoT platforms and ecosystems.
  • Develop simple IoT projects using Arduino and Raspberry Pi.
  • Apply communication protocols like MQTT and HTTP in IoT systems.`,
    },
    {
      id: 3,
      heading: 'Tools Used',
      content: 'This course includes hands-on practice with tools such as Arduino, Raspberry Pi, MQTT brokers, and cloud platforms.',
    },
  ];

  return (
    <div className="overview-container">
      <h2 className="overview-title">Course Overview</h2>
      <div className="overview-cards">
        {overviewItems.map((item) => (
          <div key={item.id} className="overview-card">
            <h3>{item.heading}</h3>
            <pre>{item.content}</pre> {/* This preserves newlines and formatting */}
          </div>
        ))}
      </div>
    </div>
  );
};
