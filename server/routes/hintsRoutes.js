// Hints route — progressive AI hints for a problem.
import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { findUserByFirebaseUid } from '../services/userLookup.js';
import { isValidObjectId, clampHintLevel } from '../utils/validate.js';
import * as claude from '../services/claudeService.js';
import Problem from '../models/Problem.js';

const router = Router();

router.post('/', authMiddleware, async (req, res, next) => {
  try {
    const { problemId, hintLevel } = req.body;
    if (!problemId || !isValidObjectId(problemId)) {
      return res.status(400).json({ error: 'Valid problemId is required' });
    }
    const level = clampHintLevel(hintLevel);
    const user = await findUserByFirebaseUid(req.firebaseUid);
    const problem = await Problem.findOne({ _id: problemId, userId: user._id });
    if (!problem) return res.status(404).json({ error: 'Problem not found' });

    const result = await claude.generateHint(problem.problemText, level);
    if (result.error || !result.data) {
      return res.status(502).json({ error: result.error || 'Hint generation failed' });
    }

    problem.hintsUsed = Math.max(problem.hintsUsed || 0, level);
    await problem.save();
    res.json({ data: result.data });
  } catch (err) {
    next(err);
  }
});

export default router;
