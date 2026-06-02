# 🚀 Career-Orbit : Student Edition
> **Transforming Campus Ambitions into Career Reality.**

**Career-Orbit** is a premium, AI-driven platform specifically designed for college students to bridge the gap between academic learning and high-stakes global placements. By merging **Google Gemini AI** with immersive **3D Visualizations** and PostgreSQL cloud databases, we turn career uncertainty into a calculated, visual, and actionable path.

---

## 📑 Table of Contents
- [✨ Key Highlights](#-key-highlights)
- [🧩 Modular Feature Breakdown](#-modular-feature-breakdown)
- [📂 Technical Architecture](#-technical-architecture)
- [💾 Data Storage & Google Cloud PostgreSQL](#-data-storage--google-cloud-postgresql)
- [📊 Visualizations & Interactive Graphs](#-visualizations--interactive-graphs)
- [🔗 API Endpoints Directory](#-api-endpoints-directory)
- [🚀 Installation & Setup](#-installation--setup)

---

## ✨ Key Highlights

* **Campus-First Focus:** Every tool is calibrated for the students' perspective—from internship hunting to final year placements.
* **AI-Powered Sidekick:** Integrated Gemini AI provides 24/7 career coaching, resume roasts, and mock interviews.
* **Visual Intelligence:** 3D neural networks and heatmaps reveal hidden market trends that traditional job sites miss.
* **Production Storage:** Fully integrated with Google Cloud SQL (PostgreSQL) to persist profiles and skill mastery levels.

---

## 🧩 Modular Feature Breakdown

### 🧠 Career Intelligence (AI Module)
* **AI Resume Roaster:** Upload a PDF and get a "brutal" score with professional feedback on how to beat the ATS (Applicant Tracking Systems).
* **AI Mock Interviewer:** Practice role-specific technical and behavioral questions with instant feedback and improvement tips.
* **AI Cover Letter Generator:** Automatically cross-references your resume with a job description to write a unique, non-robotic cover letter.

### 🏢 Campus & Placements (Service Module)
* **The Placement Hub:** Track upcoming campus placement drives, company-specific eligibility, and application deadlines in one place.
* **Anonymous Stipend Benchmark:** See real-time internship pay scales from students at your college and top-tier global companies.
* **Student-Specific Profiles:** Onboarding flow designed around your College Major, CGPA, and Graduation Year.

### 📊 Visual Data & Analytics (Visual Module)
* **3D Skill Orbit:** A cinematic 3D visualization of your skills, showing connections and market relevance in real-time.
* **Skill Decay Tracker:** Don't let your knowledge rust. Get alerts when a technology (e.g., "React 17") is becoming obsolete.
* **Market Demand Heatmap:** A visual map showing high-demand job locations and over-saturated technology stacks.

---

## 📂 Technical Architecture

| Layer | Technologies |
| :--- | :--- |
| **Artificial Intelligence** | [Google Gemini-2.5-Flash](https://ai.google.dev/) |
| **Frontend Framework** | [React](https://reactjs.org/) (Vite), [Framer Motion](https://www.framer.com/motion/) |
| **3D Rendering** | [Three.js](https://threejs.org/), [React Three Fiber](https://r3f.docs.pmnd.rs/) |
| **Data Visualization** | [Recharts](https://recharts.org/), Inline SVGs |
| **Backend Engine** | [Node.js](https://nodejs.org/), [Express.js](https://expressjs.com/) |
| **Database System** | [PostgreSQL](https://www.postgresql.org/) (via [Sequelize ORM](https://sequelize.org/)) |

---

## 💾 Data Storage & Google Cloud PostgreSQL

The platform uses a production-ready relational database layer using **Sequelize ORM** mapped to a **Google Cloud SQL PostgreSQL** instance.

### 🔄 Auto-Sync Architecture
On backend startup, the server automatically authenticates and synchronizes model definitions using:
```javascript
await sequelize.sync({ alter: true });
```
This guarantees that tables, indexes, and schemas are automatically updated and created in the Google Cloud database without requiring manual SQL migrations.

### 🗄️ Database Schemas
* **Users Table (`Users`):** Stores credentials, encryption salts (via `bcryptjs`), and user metadata.
* **Dynamic Skills Storage:** Stored as `JSONB` array formats to allow fast matching of multiple categories of technical, soft, and tool skills.
* **Mastery Levels Map:** Persists mastery percentage values directly in SQL to track competence over time.

---

## 📊 Visualizations & Interactive Graphs

1. **3D Skill Orbit:** 
   An interactive 3D WebGL space built with **React Three Fiber**. It maps your technical capabilities onto orbiting node clusters, letting you rotate and interact with your personal competency galaxy.
2. **Placement Readiness Ring:**
   An SVG dash-array circular progress ring built into the Job Recommendations dashboard. It dynamically calculates the percentage of your skills that match active job market demands.
3. **Competency Matrix (Radar Chart):**
   A multi-axis radar chart built with **Recharts** displaying skill velocity distribution across Technical, Soft, Tools, and Language domains.

---

## 🔗 API Endpoints Directory

The backend exposes a highly modular, RESTful API organized as follows:

| Module | Route | HTTP Method | Description |
| :--- | :--- | :--- | :--- |
| **Authentication** | `/api/auth/register` | `POST` | Registers new student profiles in PostgreSQL |
| | `/api/auth/login` | `POST` | Authenticates sessions and returns JWT tokens |
| **User Profile** | `/api/profile/create` | `POST` | Configures college, major, branch, and basic info |
| | `/api/profile` | `GET` | Fetches active user profile from database |
| | `/api/profile/update-skills` | `PUT` | Updates skill lists and mastery levels |
| **Skill Engine** | `/api/skills/analysis` | `POST` | Core parser comparing skills to industry benchmarks |
| | `/api/skills/trending` | `GET` | Pulls trending technologies from model registries |
| **AI Obsolescence**| `/api/obsolescence/analyze`| `POST` | Warns students when tech stacks are becoming obsolete |
| **Placements** | `/api/jobs/recommendations`| `GET` | Generates match scores for relevant tech openings |
| **Stipends** | `/api/stipend/benchmarks`| `GET` | Fetches location/tier benchmark statistics |
| **Resume Support** | `/api/resume/parse` | `POST` | Submits resume text to Gemini AI for ATS roast |
| **Interactive Chat**| `/api/chatbot` | `POST` | Sends chat history to Gemini for career coaching |

---

## 🚀 Installation & Setup

### Prerequisites
* Node.js (v18+)
* Google Cloud SQL PostgreSQL database instance
* Google Gemini API Key

### 1. Clone the Repository
```bash
git clone https://github.com/alilakkadghat/Career-Orbit.git
cd Career-Orbit
```

### 2. Backend Config & Run
1. Navigate to `/server` directory and install dependencies:
   ```bash
   cd server
   npm install
   ```
2. Create a `.env` file in `/server` and configure environment parameters:
   ```env
   PORT=5000
   DATABASE_URL=postgresql://<DB_USER>:<DB_PASSWORD>@<PUBLIC_IP>:5432/<DATABASE_NAME>
   JWT_SECRET=your_secure_jwt_secret
   GEMINI_API_KEY=your_google_ai_studio_api_key
   ```
3. Start backend development server:
   ```bash
   npm run dev
   ```

### 3. Frontend Config & Run
1. Navigate to `/client` directory and install dependencies:
   ```bash
   cd ../client
   npm install
   ```
2. Create a `.env` file in `/client` and configure API entry point:
   ```env
   VITE_API_URL=http://localhost:5000
   ```
3. Start frontend dev server:
   ```bash
   npm run dev
   ```

---

© 2026 **Career-Orbit :**. All rights reserved.
