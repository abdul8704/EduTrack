# EduTrack Architecture Documentation

## System Overview
EduTrack is a full-stack e-learning and learning management platform designed for course browsing, module progression, quiz evaluations, learning analytics, and administrative management.

## Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | React 19, Vite, React Router v7, Tailwind CSS, Axios, Chart.js, Recharts |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose ODM |
| Document Engine | Puppeteer (Headless Chrome PDF Rendering) |
| Mailer & Security | Nodemailer (Gmail SMTP), Bcrypt (Password Hashing) |

## System Architecture

```
[ Frontend: React SPA (Vite) ]
          |
          | HTTP REST API (JSON & PDF Blobs)
          v
[ Backend: Express.js API Layer ]
   ├── Middlewares (CORS, Error Handler, Rate Limiter)
   ├── Controllers & Routers (Auth, User, Admin, Certificate, Notes)
   └── Services (Puppeteer PDF Generator, Nodemailer SMTP Engine)
          |
          v
[ Database: MongoDB / Mongoose ODM ]
```

## Repository & Component Layout

### Frontend Architecture (`/client`)
- **`src/pages/`**: Page views representing major user routes (`Login`, `UserDashboard`, `AdminDashboard`, `CourseIntro`, `CourseLearn`, `CourseDeets`, `EmpProgress`, `AddCourse`, `Profile`, `NotFound`).
- **`src/components/`**: Modular components:
  - `Navbar`: Main navbar with integrated tag-based course search.
  - `CourseNavbar` & `CourseLayout`: Dynamic course navigation sidebars for module hierarchy.
  - `Module`: Submodule video player and interactive quiz validator.
  - `UserProgressChartJS` & `UserProgressGraph`: Progress timeline visualizations.
  - `EditProfile`, `ProfileCard`, `Popup`, `Feedback`: UI dialogs and feedback components.
- **`src/styles/`**: Component-level CSS and Tailwind utility overrides.

### Backend Architecture (`/server`)
- **`server.js`**: Application entry point, Express app configuration, CORS rules, database setup, and route mounting.
- **`controllers/`**: API business logic:
  - `user.js`: Course fetching, progress tracking grid updates, course rating, tag search, and analytics calculation.
  - `admin.js`: Role checks, participant lookup, administrative course creation, and user promotion.
  - `login.js` & `otpAuth.js`: Bcrypt authentication, email validation, and OTP verification.
  - `certificate.js`: Puppeteer-powered HTML-to-PDF rendering for certificates and monthly summary reports.
  - `notes.js`: Learner module notes management.
- **`models/`**: Mongoose schemas defining data storage contracts (`UserDetails`, `CourseDetails`, `CourseContent`, `ProgressData`, `CourseNote`, `UserStats`, `authOTP`).
- **`routes/`**: Express route definitions (`userRouter`, `adminRouter`, `loginRouter`, `certificateRouter`, `notesRouter`, `common`).

## Data Models & Schema Design

- **`UserDetails`**: Stores authentication details (`passwordHash`), role (`user` | `admin`), email, designation (`position`), and currently enrolled course IDs.
- **`CourseDetails`**: Top-level course metadata (title, instructor, rating, total completions, tags array, image, and intro video link).
- **`CourseContent`**: Curriculum hierarchy containing modules, submodules, video metadata, and quiz questions with answer keys.
- **`ProgressData`**: Learner course progression data. Contains percentage completion, boolean matrix grid (`completedModules`), module completion timestamps (`moduleCompletionDates`), and daily history entries (`progressHistory`).
- **`UserStats`**: Aggregated learner statistics including completion counts, average progress, streak calculation, and active dates.
- **`CourseNote`**: Contextual learner notes tied to specific course modules.
- **`authOTP`**: Ephemeral store for email verification and password reset OTP codes.

## Core Subsystems & Operational Workflows

1. **Authentication & OTP Verification**:
   - Passwords are encrypted using salted `bcrypt` hashes.
   - Registration and password resets trigger 6-digit OTP codes sent via Nodemailer SMTP.
2. **Curriculum Engine & Quiz Validation**:
   - Module progression evaluates multiple-choice quizzes on the backend.
   - Successful quiz completion updates the `completedModules` grid matrix and recalculates progress percentage.
3. **PDF Certificate & Report Generation**:
   - `certificateController` launches a Puppeteer headless browser to synthesize dynamic HTML templates into PDF downloads for certificates and monthly summaries.
   - `render-postinstall.js` ensures Chromium binaries are installed on Linux host environments.