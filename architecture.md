# EduTrack Architecture Documentation

Welcome to the architectural specification for **EduTrack**, a full-stack e-learning and learning-management system built with React, Node.js, Express, and MongoDB.

---

## 1. System Overview

EduTrack follows a decoupled **Client-Server Architecture**:

- **Client**: Single Page Application (SPA) built with React 19, Vite, React Router v7, and Tailwind CSS.
- **Server**: RESTful API built on Node.js and Express.js with Mongoose ODM.
- **Database**: MongoDB instance managing user credentials, course details, module structures, interactive progress tracking, and activity statistics.
- **PDF Engine**: Headless Chromium instance managed via Puppeteer for on-the-fly certificate and monthly progress report generation.

```
+-----------------------+           HTTP/REST API           +-----------------------+
|                       | <-------------------------------> |                       |
|      React Client     |   (JSON / Multipart/PDF Streams)  |     Express Server    |
|   (Vite + React Router|                                   |  (Controllers/Routes) |
|     + Chart.js)       |                                   |                       |
+-----------------------+                                   +-----------+-----------+
                                                                        |
                                                       +----------------+----------------+
                                                       |                                 |
                                            +----------v----------+           +----------v----------+
                                            |   MongoDB Database  |           | Puppeteer Engine    |
                                            |  (Mongoose Schemas) |           | (Chrome PDF Render) |
                                            +---------------------+           +---------------------+
```

---

## 2. Component & Directory Layout

```
EduTrack/
├── client/                     # Frontend Application (React + Vite)
│   ├── src/
│   │   ├── components/         # Reusable UI components (Navbar, Cards, Modals, Charts)
│   │   ├── pages/              # Page views (Dashboard, Learn, Profile, Admin, Login)
│   │   ├── styles/             # Stylesheets (CSS modules and global overrides)
│   │   ├── App.jsx             # React Router route registry
│   │   └── main.jsx            # React root application bootstrap
│   └── vite.config.js          # Vite build configuration
│
└── server/                     # Backend Application (Node.js + Express)
    ├── controllers/            # Controller business logic (user, admin, login, cert, notes)
    ├── models/                 # Mongoose data models
    ├── routes/                 # Express Router endpoint definitions
    ├── middlewares/            # Error handlers and 404 middleware
    ├── utils/                  # OTP generation and Mailer transports
    ├── render-postinstall.js   # Linux Puppeteer Chrome browser install script
    └── server.js               # Express application entrypoint
```

---

## 3. Frontend Architecture (`client/`)

### 3.1 Tech Stack & UI Libraries
- **Core Framework**: React 19 & React Router v7
- **Bundler**: Vite
- **HTTP Client**: Axios
- **Styling**: Tailwind CSS & CSS modules
- **Data Visualization**: `chart.js` with `react-chartjs-2` & `recharts` for progress timeline tracking
- **Icons**: `lucide-react`

### 3.2 Application Routes & Navigation Matrix

| Route Path | Component | View Purpose | Role Access |
|---|---|---|---|
| `/` | `Login` | User Login, Registration, OTP Verification & Password Reset | Public |
| `/user/dashboard/:userId` | `UserDashboard` | Display enrolled & available courses | Learner |
| `/user/profile/:userId` | `Profile` | User details, completed courses, certificate downloads | Learner |
| `/course/intro/:userId/:courseId` | `CourseIntro` | Overview, introduction video, syllabus, enrollment button | Learner |
| `/course/learn/:userId/:courseId/:moduleNumber/:subModuleNumber` | `CourseLearn` | Video player, submodule content navigation, quiz validation | Learner |
| `/course/search/:userId/tags/:tags` | `SearchResult` | Tag-based course discovery | Learner |
| `/admin/dashboard/:userId/:navId/details` | `AdminDashboard` | Admin view for Employee List & Managed Courses | Admin |
| `/admin/dashboard/:userId/details/emp/:empId` | `EmpProgress` | Inspect individual employee course progress & promote users | Admin |
| `/admin/dashboard/:userId/details/course/:courseId` | `CourseDeets` | Inspect course syllabus & enrolled users with completion graphs | Admin |
| `/admin/dashboard/:userId/course/addcourse` | `AddCourse` | Multi-step form to add new courses, modules, lectures & quizzes | Admin |
| `*` | `NotFound` | Custom 404 page | Public |

---

## 4. Backend Architecture (`server/`)

### 4.1 Route Modules & Endpoint Mapping

- **Login Router (`/api/login`)**:
  - `POST /existinguser`: Authenticate email/password via Bcrypt.
  - `POST /signup/check`: Validate email availability.
  - `POST /signup/send-otp` / `verify-otp`: Standard 6-digit email OTP auth.
  - `POST /signup/newuser`: Register user with hashed password and default avatar.
  - `POST /forgot-password/*`: OTP verification & password reset flow.

- **User Router (`/api/user`)**:
  - `GET /:userid`: Fetch learner's enrolled, available, and completed courses.
  - `GET /:userid/:courseId`: Fetch course introduction and overview.
  - `GET /:userid/:courseId/module/:moduleNumber/:subModuleNumber`: Fetch specific submodule data (video link, quiz).
  - `POST /:userid/:courseid/enroll`: Enroll learner and initialize progress matrix.
  - `PATCH /:userid/:courseId/progress/:moduleNumber/:subModuleNumber`: Validate quiz submission and update completion matrix.
  - `GET /:userid/course/search`: Perform tag intersection search.
  - `POST /:userid/course/:courseid/feedback`: Submit course rating.
  - `GET /:userid/stats`: Retrieve learner activity metrics (streak, completion rate).

- **Admin Router (`/api/admin`)**:
  - `GET /:adminid/`: List all registered users.
  - `GET /:adminid/course/allcourses`: List catalog of courses for administration.
  - `GET /:adminid/progress/:employeeid`: Fetch employee course completion status.
  - `PUT /:adminid/promote/:userid`: Elevate user role to `admin`.
  - `POST /:adminid/course/addnewcourse`: Add new course and content structure.

- **Certificate Router (`/api/certificate`)**:
  - `POST /`: Generate course completion PDF certificate.
  - `GET /monthly/:userid`: Generate PDF monthly learning summary report (Rate-limited).

- **Notes Router (`/api/notes`)**:
  - CRUD operations for learner notes tied to specific modules.

---

## 5. Data Architecture & Schema Models

### 5.1 MongoDB Schemas

1. **`UserDetails` (`userDetails.js`)**:
   - Stores `username`, `email`, `userid`, `passwordHash`, `role` (`user` | `admin`), `position`, and `currentCourses` array.
2. **`CourseDetails` (`courseDetails.js`)**:
   - High-level course metadata: `courseId`, `courseName`, `courseDescription`, `courseRating`, `courseInstructor`, `courseImage`, `tags`, and `courseIntroVideo`.
3. **`CourseContent` (`courseContent.js`)**:
   - Hierarchical content schema:
     - `modules` -> Array of `moduleTitle` & `submodules`
     - `submodules` -> Array of `submoduleTitle`, `description`, `video` (`videoTitle`, `videoUrl`), and `quiz` (`questions` array with `questionText`, `options`, `correctAnswer`).
4. **`ProgressData` (`courseProgress.js`)**:
   - Stores learner course progress:
     - `percentComplete`: Overall percentage (0-100%).
     - `progressHistory`: Daily percentage history entries `[{ date, percent }]` for time-series charts.
     - `moduleStatus`: 2D Boolean matrix (`completedModules`) tracking submodule completions, and 2D Date matrix (`moduleCompletionDates`) recording completion timestamps.
5. **`UserStats` (`userStats.js`)**:
   - Aggregated metrics including `totalEnrolled`, `totalCompleted`, `totalOngoing`, `averageProgress`, and `learningStreak`.
6. **`CourseNote` (`courseNote.js`)**:
   - Module-scoped learner notes.

### 5.2 2D Progress Matrix Mechanism

Submodule completion is tracked via a 2D boolean grid corresponding to the module structure:
$$\text{Percent Complete} = \left( \frac{\text{Total Completed Submodules}}{\text{Total Submodules across all Modules}} \right) \times 100$$

When a learner submits correct quiz answers for module $M$ and submodule $S$:
1. `completedModules[M][S]` is set to `true`.
2. `moduleCompletionDates[M][S]