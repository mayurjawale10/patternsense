// Generate route — AI question generation by mode.
import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { findUserByFirebaseUid } from '../services/userLookup.js';
import * as claude from '../services/claudeService.js';
import GeneratedQuestion from '../models/GeneratedQuestion.js';

const ALLOWED_MODES = ['clone', 'company', 'weakness', 'progressive'];

const router = Router();

router.post('/', authMiddleware, async (req, res, next) => {
  try {
    const { mode, company, pattern, difficulty, roleLevel, salaryBand, count } = req.body;
    if (!mode || !ALLOWED_MODES.includes(mode)) {
      return res.status(400).json({ error: 'Valid mode is required' });
    }

    const params = { mode, company, pattern, difficulty, roleLevel, salaryBand, count: count || 3 };
    const result = await claude.generateQuestions(mode, params);
    if (result.error || !Array.isArray(result.data)) {
      return res.status(502).json({ error: result.error || 'Generation failed' });
    }

    const user = await findUserByFirebaseUid(req.firebaseUid);
    const saved = await GeneratedQuestion.create({
      userId: user._id,
      mode,
      company,
      pattern,
      difficulty,
      roleLevel,
      salaryBand,
      questions: result.data,
    });
    res.json({ data: saved });
  } catch (err) {
    next(err);
  }
});

export default router;
