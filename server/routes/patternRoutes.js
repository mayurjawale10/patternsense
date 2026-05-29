// Pattern confidence and personal notes.
import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { findUserByFirebaseUid } from '../services/userLookup.js';
import { PATTERN_LIST } from '../constants/patterns.js';
import { patternScoresToObject } from '../utils/patternScores.js';
import Problem from '../models/Problem.js';

const router = Router();

router.get('/', authMiddleware, async (req, res, next) => {
  try {
    const user = await findUserByFirebaseUid(req.firebaseUid);
    const scores = patternScoresToObject(user.patternScores);

    const lastPracticed = await Problem.aggregate([
      { $match: { userId: user._id } },
      { $unwind: '$detectedPatterns' },
      { $group: { _id: '$detectedPatterns', lastDate: { $max: '$savedAt' } } },
    ]);

    const lastMap = Object.fromEntries(lastPracticed.map((r) => [r._id, r.lastDate]));
    const patterns = PATTERN_LIST.map((p) => ({
      ...p,
      score: scores[p.key] || 0,
      lastPracticed: lastMap[p.label] || lastMap[p.key] || null,
      notes: user.patternNotes?.get?.(p.key) || '',
    }));
    res.json({ data: patterns });
  } catch (err) {
    next(err);
  }
});

router.get('/:name', authMiddleware, async (req, res, next) => {
  try {
    const user = await findUserByFirebaseUid(req.firebaseUid);
    const key = req.params.name;
    const scores = patternScoresToObject(user.patternScores);
    res.json({
      data: {
        key,
        score: scores[key] || 0,
        notes: user.patternNotes?.get?.(key) || '',
      },
    });
  } catch (err) {
    next(err);
  }
});

router.patch('/:name/notes', authMiddleware, async (req, res, next) => {
  try {
    const user = await findUserByFirebaseUid(req.firebaseUid);
    const key = req.params.name;
    if (!user.patternNotes) user.patternNotes = new Map();
    user.patternNotes.set(key, req.body.notes || '');
    user.markModified('patternNotes');
    await user.save();
    res.json({ data: { notes: req.body.notes || '' } });
  } catch (err) {
    next(err);
  }
});

export default router;
