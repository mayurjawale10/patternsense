# PatternSense

AI-powered DSA prep for FAANG and top Indian product companies.

---

## Stack

| Layer    | Tech                                      |
|----------|-------------------------------------------|
| Frontend | React 19, Vite 8, Tailwind CSS v4, Zustand |
| Backend  | Node.js, Express, MongoDB (Mongoose)      |
| AI       | Anthropic Claude (claude-sonnet-4)        |
| Auth     | Firebase (Google + Email/Password)        |
| Hosting  | Netlify (client) + Render (server)        |

---

## Local Development

### Prerequisites
- Node.js 20+
- A MongoDB Atlas cluster (free tier works)
- Firebase project with Auth enabled
- Anthropic API key

### 1. Clone & install

```bash
# Client
cd client
npm install

# Server
cd ../server
npm install
```

### 2. Configure environment

```bash
# Client
cp client/.env.example client/.env
# Fill in VITE_FIREBASE_* and VITE_API_BASE_URL

# Server
cp server/.env.example server/.env
# Fill in ANTHROPIC_API_KEY, MONGODB_URI, FIREBASE_* vars
```

### 3. Run

```bash
# Terminal 1 — backend
cd server && npm run dev

# Terminal 2 — frontend
cd client && npm run dev
```

App runs at **http://localhost:5173**

> **Dev bypass:** If Firebase env vars are left blank, the app runs in dev mode — auth is bypassed and a mock user is used. All AI features still require `ANTHROPIC_API_KEY` on the server.

---

## Deploy to Production

### Frontend → Netlify

1. Push the repo to GitHub
2. Go to [netlify.com](https://netlify.com) → **Add new site → Import from Git**
3. Set **Base directory** to `client`
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Add environment variables in **Site settings → Environment variables**:

| Variable | Value |
|----------|-------|
| `VITE_FIREBASE_API_KEY` | From Firebase Console |
| `VITE_FIREBASE_AUTH_DOMAIN` | `your-project.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID` | Your Firebase project ID |
| `VITE_API_BASE_URL` | Your Render server URL + `/api` |

7. Click **Deploy** — your site will be live at `https://your-site.netlify.app`

> The `netlify.toml` in `client/` handles SPA routing, security headers, and asset caching automatically.

### Backend → Render

1. Go to [render.com](https://render.com) → **New → Web Service**
2. Connect your GitHub repo
3. Set **Root directory** to `server`
4. Build command: `npm install`
5. Start command: `npm start`
6. Add environment variables in the Render dashboard:

| Variable | Value |
|----------|-------|
| `ANTHROPIC_API_KEY` | From [console.anthropic.com](https://console.anthropic.com) |
| `MONGODB_URI` | MongoDB Atlas connection string |
| `FIREBASE_PROJECT_ID` | Firebase project ID |
| `FIREBASE_CLIENT_EMAIL` | From Firebase service account JSON |
| `FIREBASE_PRIVATE_KEY` | From Firebase service account JSON |
| `CLIENT_URL` | Your Netlify URL (e.g. `https://patternsense.netlify.app`) |
| `NODE_ENV` | `production` |

> Alternatively, use the `render.yaml` in the repo root for one-click deploy.

### Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a project → Enable **Authentication**
3. Enable **Google** and **Email/Password** sign-in providers
4. Add your Netlify domain to **Authorized domains** (Authentication → Settings)
5. For the server: **Project Settings → Service Accounts → Generate new private key**

---

## Features

| Page | Description |
|------|-------------|
| **Analyse** | Paste any DSA problem → AI detects patterns, complexity, hidden constraints |
| **Hints** | Progressive 5-level hints (nudge → pseudocode → full solution) |
| **Compare** | Side-by-side approach comparison with complexity tradeoffs |
| **Patterns** | Confidence scores across 18 DSA patterns |
| **Generate** | AI question generator (company/pattern/weakness/progressive modes) |
| **Companies** | FAANG + Indian company question banks with gap analysis |
| **Interview** | Full mock interview with chat + Monaco code editor + scorecard |
| **Notes** | Personal notes with search |
| **Roadmap** | AI-generated personalised study calendar |
| **Visualiser** | Interactive step-through for Bubble Sort, Binary Search, Two Pointer |
| **Blind Spots** | Mistake analytics from your problem history |
| **Battle** | Real-time coding battle with invite tokens + AI verdict |
| **Dashboard** | Progress overview, activity heatmap, review queue |
