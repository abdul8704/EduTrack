// App.jsx (example usage)

import { CourseLayout } from './CourseLayout';

function App() {
  const sidebarContent = (
    <>
      <h2>Modules</h2>
      <button className="course-nav-btn">Module 1</button>
      <button className="course-nav-btn">Module 2</button>
      <button className="course-nav-btn">Module 3</button>
    </>
  );

  return (
    <CourseLayout sidebarContent={sidebarContent}>
      {/* Your main course content goes here */}
      <div>Your video, quiz, etc.</div>
    </CourseLayout>
  );
}

export default App;
