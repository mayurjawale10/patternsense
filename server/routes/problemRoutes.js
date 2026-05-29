// Problem history and spaced repetition review.
import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { findUserByFirebaseUid } from '../services/userLookup.js';
import { getNextReviewDate } from '../services/spaceRepetitionService.js';
import { isValidObjectId } from '../utils/validate.js';
import Problem from '../models/Problem.js';

const router = Router();

router.get('/history', authMiddleware, async (req, res, next) => {
  try {
    const user = await findUserByFirebaseUid(req.firebaseUid);
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(50, parseInt(req.query.limit, 10) || 20);
    const filter = { userId: user._id };
    if (req.query.pattern) filter.detectedPatterns = { $in: [req.query.pattern] };

    const [items, total] = await Promise.all([
      Problem.find(filter).sort({ savedAt: -1 }).skip((page - 1) * limit).limit(limit),
      Problem.countDocuments(filter),
    ]);
    res.json({ data: { items, total, page } });
  } catch (err) {
    next(err);
  }
});

router.patch('/:id/review', authMiddleware, async (req, res, next) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ error: 'Invalid problem ID' });
    }
    const user = await findUserByFirebaseUid(req.firebaseUid);
    const problem = await Problem.findOne({ _id: req.params.id, userId: user._id });
    if (!problem) return res.status(404).json({ error: 'Problem not found' });

    problem.reviewHistory = [...(problem.reviewHistory || []), new Date()];
    problem.nextReviewDate = getNextReviewDate(problem.hintsUsed || 0);
    problem.solved = true;
    await problem.save();
    res.json({ data: problem });
  } catch (err) {
    next(err);
  }
});

export default router;
