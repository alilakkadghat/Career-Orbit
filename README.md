# 🚀 Career-Orbit : Student Edition
> **Transforming Campus Ambitions into Career Reality.**

**Career-Orbit** is a premium, AI-driven platform specifically designed for college students to bridge the gap between academic learning and high-stake global placements. By merging **Google Gemini AI** with immersive **3D Visualizations**, we turn career uncertainty into a calculated, visual, and actionable path.

---

## 📑 Table of Contents
- [✨ Key Highlights](#-key-highlights)
- [🧩 Modular Feature Breakdown](#-modular-feature-breakdown)
- [🛠️ Technical Architecture](#️-technical-architecture)
- [🚀 Installation & Setup](#-installation--setup)
- [📜 License](#-license)

---

## ✨ Key Highlights

- **Campus-First Focus**: Every tool is calibrated for the students' perspective—from internship hunting to final year placements.
- **AI-Powered Sidekick**: Integrated Gemini AI provides 24/7 career coaching, resume roasts, and mock interviews.
- **Visual Intelligence**: 3D neural networks and heatmaps reveal hidden market trends that traditional job sites miss.
- **Performance Driven**: Optimized for campus network speeds using modern lazy-loading and bundle splitting.

---

## 🧩 Modular Feature Breakdown

### 🧠 Career Intelligence (AI Module)
- **AI Resume Roaster**: Upload a PDF and get a "brutal" score with professional feedback on how to beat the ATS (Applicant Tracking Systems).
- **AI Mock Interviewer**: Practice role-specific technical and behavioral questions with instant feedback and improvement tips.
- **AI Cover Letter Generator**: Automatically cross-references your resume with a job description to write a unique, non-robotic cover letter.

### 🏢 Campus & Placements (Service Module)
- **The Placement Hub**: Track upcoming campus placement drives, company-specific eligibility, and application deadlines in one place.
- **Anonymous Stipend Benchmark**: See real-time internship pay scales from students at your college and top-tier global companies.
- **Student-Specific Profiles**: Onboarding flow designed around your College Major, CGPA, and Graduation Year.

### 📊 Visual Data & Analytics (Visual Module)
- **3D Skill Orbit**: A cinematic 3D visualization of your skills, showing connections and market relevance in real-time.
- **Skill Decay Tracker**: Don't let your knowledge rust. Get alerts when a technology (e.g., "React 17") is becoming obsolete.
- **Market Demand Heatmap**: A visual map showing high-demand job locations and over-saturated technology stacks.

---

## 🛠️ Technical Architecture

| Layer | Technologies |
| :--- | :--- |
| **Artificial Intelligence** | [Google Gemini-1.5-Pro](https://ai.google.dev/), `pdf-parse` |
| **Frontend Framework** | [React](https://reactjs.org/) (Vite), [Framer Motion](https://www.framer.com/motion/) |
| **3D Rendering** | [Three.js](https://threejs.org/), [React Three Fiber](https://r3f.docs.pmnd.rs/) |
| **Data Visualization** | [Recharts](https://recharts.org/) |
| **Backend Engine** | [Node.js](https://nodejs.org/), [Express.js](https://expressjs.com/) |
| **Database System** | [PostgreSQL](https://www.postgresql.org/) (Sequelize ORM) |
| **Security Architecture** | JWT, BcryptJS, Express Rate-Limit |

---



## 🚀 Installation & Setup

### Prerequisites
- Node.js (v18+)
- PostgreSQL (Local or Cloud instance)
- [Gemini API Key](https://aistudio.google.com/app/apikey)

### 1. Clone & Install
```bash
git clone https://github.com/alilakkadghat/Career-Orbit
cd Career-Orbit
```

### 2. Backend Configuration
```bash
cd server
npm install
# Create a .env file with:
# DATABASE_URL=your_postgres_url
# JWT_SECRET=your_secret_key
# GEMINI_API_KEY=your_google_ai_key
npm run dev
```

### 3. Frontend Launcher
```bash
cd client
npm install
npm run dev
```

---

## 📜 License
This project is licensed under the MIT License - see the LICENSE file for details.

© 2026 **Career-Orbit :**. All rights reserved.
