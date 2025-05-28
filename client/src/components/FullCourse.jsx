import React from 'react';
import '../styles/CoursePage.css';

export const FullCourse = ({ name, img, id }) => {
    const courseArray = [
        {
            id: 1,
            info: "This comprehensive course is designed to provide learners with a deep understanding of the fundamental components and architecture of the Internet of Things (IoT).",
            label: "contents as follows",
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
        }

    ];

    const selectedCourse = courseArray.find(course => course.id === id);

    return (
        <div className= "fullcourse-container" >
        <div className="course-card" >
            <div className="course-info corner-layout" >
                <img className="big-image" src = { img } alt = { name } />
                    <div className="text-corner" >
                        <h2>{ name } </h2>
                        < p > { selectedCourse.info } </p>
                        < button className = "start-button" > Start </button>
                            </div>
                            </div>

                            < div className = "progress-label" > Learning Progress </div>
                                < div className = "progress-bar-bg" >
                                    <div className="progress-bar-fill" style = {{ width: '50%' }
} />
    </div>
    < p className = "progress-status" > Status: Started </p>

        < div className = "certificate-generate" >
            <span>Generate Certificate </span>
                < button className = "download-button" > Download </button>
                    </div>
                    </div>

                    < div className = "overview-container" >
                        <h1 className="overview-title" > Tables of Contents </h1>
                            < p className = "overview-label" > { selectedCourse.label } </p>
                                < div className = "overview-cards" >
                                    {
                                        selectedCourse.overviewItems.map((item, idx) => (
                                            <div key= { idx } className = "overview-card" >
                                            <h3>{ item.heading } </h3>
              {
                                                Array.isArray(item.content) ? (
                                                    <ul>
                                                    {
                                                        item.content.map((line, i) => (
                                                            <li key= { i } > { line } </li>
                                                        ))}
                                            </ul>
                                        ) : (
                                            <p>{ item.content } </p>
                                        )}
</div>
          ))}
</div>
    </div>
    </div>
  );
};
