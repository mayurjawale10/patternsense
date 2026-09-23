# PatternSense

AI-powered DSA prep for FAANG and top Indian product companies.

## Local run (from repo root)

```bash
cd D:\PatternSense
npm run setup
npm run dev
```

That starts the API (`http://localhost:5000`) and the app (`http://localhost:5173`).

Copy env files first:

```bash
copy client\.env.example client\.env
copy server\.env.example server\.env
```

Then fill Firebase, MongoDB Atlas, and `ANTHROPIC_API_KEY`.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run setup` | Installs client + server dependencies |
| `npm run dev` | Runs API and Vite together |
| `npm run build` | Production client build (`client/dist`) |
| `npm start` | Starts the production API |

Do **not** run `npm run dev` only inside a missing folder — the root `package.json` now owns that command.

## Deploy

### Frontend (Netlify or Vercel)

Connect this GitHub repo.

**Netlify** uses root `netlify.toml` (builds `client`, publishes `client/dist`).

Set these Netlify/Vercel env vars:

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_API_BASE_URL` = `https://YOUR-RENDER-SERVICE.onrender.com/api`

### Backend (Render)

Blueprint: `render.yaml` (`rootDir: server`).

Set:

- `NODE_ENV=production`
- `MONGODB_URI`
- `ANTHROPIC_API_KEY`
- `FIREBASE_PROJECT_ID` / `FIREBASE_CLIENT_EMAIL` / `FIREBASE_PRIVATE_KEY`
- `CLIENT_URL` = your Netlify/Vercel origin (comma-separated if both)

Render injects `PORT` automatically.

### Firebase

Enable **Google** and **Email/Password**. Add the production domain under Authorized domains.

## Stack

React 19 + Vite, Express, MongoDB, Firebase Auth, Claude API.
