// Express app — route mounting only.
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDatabase } from './config/db.js';
import { initFirebase } from './config/firebase.js';
import { errorMiddleware, notFoundMiddleware } from './middleware/errorMiddleware.js';
import authRoutes from './routes/authRoutes.js';
import analyseRoutes from './routes/analyseRoutes.js';
import hintsRoutes from './routes/hintsRoutes.js';
import generateRoutes from './routes/generateRoutes.js';
import problemRoutes from './routes/problemRoutes.js';
import patternRoutes from './routes/patternRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import roadmapRoutes from './routes/roadmapRoutes.js';
import companyRoutes from './routes/companyRoutes.js';
import interviewRoutes from './routes/interviewRoutes.js';
import noteRoutes from './routes/noteRoutes.js';
import battleRoutes from './routes/battleRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CLIENT_URL || true }));
app.use(express.json({ limit: '2mb' }));

initFirebase();
await connectDatabase();

app.get('/api/health', (_, res) => res.json({ ok: true, env: process.env.NODE_ENV || 'development' }));

app.use('/api/auth', authRoutes);
app.use('/api/analyse', analyseRoutes);
app.use('/api/hints', hintsRoutes);
app.use('/api/generate', generateRoutes);
app.use('/api/problems', problemRoutes);
app.use('/api/patterns', patternRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/roadmap', roadmapRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/interview', interviewRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/battle', battleRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

app.listen(PORT, () => console.log(`PatternSense API on :${PORT}`));
