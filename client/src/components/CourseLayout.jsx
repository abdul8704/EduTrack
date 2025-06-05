import React, { useState } from 'react';
// import './course.css';

export const CourseLayout = ({ sidebarContent, children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(open => !open);

  return (
    <div className="course-container">
      {/* HAMBURGER BUTTON (always in top-left) */}
      <button
        className="sidebar-toggle-btn"
        onClick={toggleSidebar}
        aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
      >
        {sidebarOpen ? '✕' : '≡'}
      </button>

      {/* SIDEBAR */}
      <nav className={`course-navbar ${sidebarOpen ? 'expanded' : 'collapsed'}`}>
        {sidebarContent}
      </nav>

      {/* MAIN CONTENT */}
      <main className="course-module">
        {children}
      </main>
    </div>
  );
};
