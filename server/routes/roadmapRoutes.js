// Roadmap generation and day completion.
import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { findUserByFirebaseUid } from '../services/userLookup.js';
import * as claude from '../services/claudeService.js';

const router = Router();

router.post('/generate', authMiddleware, async (req, res, next) => {
  try {
    const result = await claude.generateRoadmap(req.body);
    if (result.error || !result.data?.weeks) {
      return res.status(502).json({ error: result.error || 'Roadmap generation failed' });
    }
    const user = await findUserByFirebaseUid(req.firebaseUid);
    user.roadmap = result.data;
    await user.save();
    res.json({ data: result.data });
  } catch (err) {
    next(err);
  }
});

router.get('/', authMiddleware, async (req, res, next) => {
  try {
    const user = await findUserByFirebaseUid(req.firebaseUid);
    res.json({ data: user.roadmap || null });
  } catch (err) {
    next(err);
  }
});

router.patch('/complete-day', authMiddleware, async (req, res, next) => {
  try {
    const weekNumber = parseInt(req.body.weekNumber, 10);
    const day = parseInt(req.body.day, 10);
    if (!weekNumber || !day) {
      return res.status(400).json({ error: 'weekNumber and day are required' });
    }
    const user = await findUserByFirebaseUid(req.firebaseUid);
    const roadmap = user.roadmap || { weeks: [] };
    const weeks = roadmap.weeks || [];
    const week = weeks.find((w) => w.weekNumber === weekNumber);
    const dayIndex = day - 1;
    if (!week?.days?.[dayIndex]) {
      return res.status(404).json({ error: 'Day not found in roadmap' });
    }
    week.days[dayIndex].completed = true;
    user.roadmap = { ...roadmap, weeks };
    await user.save();
    res.json({ data: user.roadmap });
  } catch (err) {
    next(err);
  }
});

export default router;
