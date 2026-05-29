// Company list and question bank with gap analysis.
import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { findUserByFirebaseUid } from '../services/userLookup.js';
import { patternScoresToObject } from '../utils/patternScores.js';
import { COMPANIES, COMPANY_QUESTIONS, resolveCompanyName } from '../constants/companies.js';

const router = Router();

router.get('/', authMiddleware, async (req, res, next) => {
  try {
    res.json({ data: COMPANIES });
  } catch (err) {
    next(err);
  }
});

router.get('/:name/questions', authMiddleware, async (req, res, next) => {
  try {
    const user = await findUserByFirebaseUid(req.firebaseUid);
    const companyName = resolveCompanyName(req.params.name);
    if (!companyName) return res.status(404).json({ error: 'Company not found' });

    const questions = (COMPANY_QUESTIONS[companyName] || []).filter((q) => {
      if (req.query.difficulty && q.difficulty !== req.query.difficulty) return false;
      if (req.query.pattern && !q.patterns.includes(req.query.pattern)) return false;
      return true;
    });

    const scores = patternScoresToObject(user.patternScores);
    const requiredPatterns = [...new Set(questions.flatMap((q) => q.requiredPatterns || []))];
    const gapAnalysis = requiredPatterns.map((p) => ({
      pattern: p,
      required: 70,
      userScore: scores[p] || 0,
      gap: Math.max(0, 70 - (scores[p] || 0)),
    }));

    res.json({ data: { questions, gapAnalysis } });
  } catch (err) {
    next(err);
  }
});

export default router;
