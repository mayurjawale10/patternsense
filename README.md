# PatternSense

AI-powered DSA prep for FAANG and top Indian product companies.

---

## Overview

PatternSense is an AI-driven DSA learning platform designed to improve not only coding performance but also the learner's problem-solving thinking process.

Instead of simply providing solutions, PatternSense identifies patterns, analyzes mistakes, generates personalized hints, tracks learning progress, and helps users build long-term problem-solving skills.

---

## Stack

| Layer    | Tech                                       |
| -------- | ------------------------------------------ |
| Frontend | React 19, Vite 8, Tailwind CSS v4, Zustand |
| Backend  | Node.js, Express, MongoDB (Mongoose)       |
| AI       | Anthropic Claude (claude-sonnet-4)         |
| Auth     | Firebase (Google + Email/Password)         |
| Hosting  | Netlify (Client) + Render (Server)         |

---

## Local Development

### Prerequisites

* Node.js 20+
* MongoDB Atlas cluster
* Firebase project with Authentication enabled
* Anthropic API key

### 1. Clone & Install

```bash
# Client
cd client
npm install

# Server
cd ../server
npm install
```

### 2. Configure Environment

```bash
# Client
cp client/.env.example client/.env

# Server
cp server/.env.example server/.env
```

Fill in all Firebase, MongoDB, and Anthropic credentials.

### 3. Run

```bash
# Terminal 1
cd server
npm run dev

# Terminal 2
cd client
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

## Deploy to Production

### Frontend → Netlify

1. Push repository to GitHub
2. Open Netlify
3. Import repository
4. Set:

```text
Base Directory: client
Build Command: npm run build
Publish Directory: dist
```

5. Add required environment variables
6. Deploy

---

### Backend → Render

1. Create Web Service
2. Connect repository
3. Set:

```text
Root Directory: server
Build Command: npm install
Start Command: npm start
```

4. Add environment variables
5. Deploy

---

### Firebase Setup

1. Create Firebase project
2. Enable Authentication
3. Enable:

   * Google Login
   * Email/Password Login
4. Add production domain to Authorized Domains
5. Generate Service Account credentials for backend verification

---

## Features

| Module      | Description                                                   |
| ----------- | ------------------------------------------------------------- |
| Analyse     | AI pattern detection, complexity analysis, hidden constraints |
| Hints       | Progressive 5-level hint system                               |
| Compare     | Compare brute force, better, and optimal approaches           |
| Patterns    | Pattern confidence tracking                                   |
| Generate    | AI-powered question generation                                |
| Companies   | Company-specific DSA question bank                            |
| Interview   | Mock interview simulator                                      |
| Notes       | Personal notes and revision system                            |
| Roadmap     | Personalized learning roadmap                                 |
| Visualiser  | Interactive algorithm visualizations                          |
| Blind Spots | Weakness and mistake analytics                                |
| Battle      | Real-time coding battles                                      |
| Dashboard   | Progress tracking and review queue                            |

---

## Vision

PatternSense aims to become an intelligent DSA mentor that helps learners understand **how to think**, not just **what to code**.
