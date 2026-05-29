// Analyse route — AI problem analysis and save.
import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { findUserByFirebaseUid } from '../services/userLookup.js';
import * as claude from '../services/claudeService.js';
import { updatePatternScores } from '../services/scoringService.js';
import { getNextReviewDate } from '../services/spaceRepetitionService.js';
import Problem from '../models/Problem.js';

const router = Router();

router.post('/', authMiddleware, async (req, res, next) => {
  try {
    const { problemText, problemUrl, thoughtProcess, targetRole } = req.body;
    if (!problemText?.trim()) return res.status(400).json({ error: 'Problem text is required' });

    const analysis = await claude.analyseProblem(problemText, targetRole || 'SDE1');
    if (analysis.error || !analysis.data) {
      return res.status(502).json({ error: analysis.error || 'Analysis failed' });
    }

    let thoughtResult = null;
    if (thoughtProcess?.trim()) {
      thoughtResult = await claude.analyseThoughtProcess(problemText, thoughtProcess);
      if (thoughtResult.error) {
        return res.status(502).json({ error: thoughtResult.error });
      }
    }

    const user = await findUserByFirebaseUid(req.firebaseUid);
    updatePatternScores(user, analysis.data.detectedPatterns);
    await user.save();

    const problem = await Problem.create({
      userId: user._id,
      problemText: problemText.trim(),
      problemUrl: problemUrl || '',
      thoughtProcess: thoughtProcess || '',
      detectedPatterns: analysis.data.detectedPatterns || [],
      signalWords: analysis.data.signalWords || [],
      bestTimeComplexity: analysis.data.bestTimeComplexity || '',
      bestSpaceComplexity: analysis.data.bestSpaceComplexity || '',
      hiddenConstraints: analysis.data.hiddenConstraints || [],
      difficultyPersonal: analysis.data.difficultyPersonal || '',
      approachSummary: analysis.data.approachSummary || '',
      mistakeType: thoughtResult?.data?.mistakeType,
      mistakeAnalysis: thoughtResult?.data?.mistakeAnalysis,
      nextReviewDate: getNextReviewDate(0),
    });

    res.json({ data: { problem, analysis: analysis.data, thought: thoughtResult?.data } });
  } catch (err) {
    next(err);
  }
});

export default router;
