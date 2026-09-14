# EduTrack Architecture Documentation

## 1. Executive Overview
EduTrack is a full-stack e-learning platform designed for interactive course delivery, progress tracking, admin supervision, and automated certificate generation. The system operates on a dual-role access model (Learners vs. Admins) and features quiz validation, daily progress analytics, and PDF report generation.

## 2. Technology Stack & Core Dependencies
### Frontend (`/client`)
- **Core Library & Build Tool**: React 19, Vite
- **Routing**: `react-router-dom` (v7)
- **HTTP Client**: `axios`
- **Data Visualization**: `chart.js` with `react-chartjs-2`, `recharts`
- **Iconography & Styling**: `lucide-react`, TailwindCSS, Custom CSS Modules

### Backend (`/server`)
- **Runtime Environment**: Node.js, Express.js (v4)
- **Database & ODM**: MongoDB with Mongoose (v8)
- **Authentication & Security**: `bcrypt` password hashing, OTP verification via `nodemailer`
- **PDF Subsystem**: `puppeteer` (headless Chromium engine for PDF generation)

## 3. High-Level Architecture
```
[ Client (React + Vite) ]
       │
       ├── REST API Requests (Axios)
       ▼
[ Server (Express.js API) ] ── (Mongoose ODM) ──► [ MongoDB Database ]
       │
       ├── Headless Chrome Engine ──► [ Puppeteer (PDF Generation) ]