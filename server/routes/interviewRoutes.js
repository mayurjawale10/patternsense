// Mock interview session routes.
import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { findUserByFirebaseUid } from '../services/userLookup.js';
import { isValidObjectId } from '../utils/validate.js';
import * as claude from '../services/claudeService.js';
import Session from '../models/Session.js';

const SAMPLE_PROBLEMS = [
  'Given an array, find two numbers that sum to a target.',
  'Reverse a linked list in-place.',
  'Find the longest increasing subsequence.',
];

const router = Router();

router.post('/start', authMiddleware, async (req, res, next) => {
  try {
    const { company, role, difficulty } = req.body;
    if (!company?.trim()) return res.status(400).json({ error: 'Company is required' });
    const user = await findUserByFirebaseUid(req.firebaseUid);
    const problem = SAMPLE_PROBLEMS[Math.floor(Math.random() * SAMPLE_PROBLEMS.length)];
    const session = await Session.create({
      userId: user._id,
      company,
      role: role || 'SDE2',
      difficulty: difficulty || 'Medium',
      problem,
      conversationHistory: [{
        role: 'interviewer',
        content: `Welcome! I'm your ${company} interviewer. Let's work on: ${problem}`,
      }],
    });
    res.json({ data: { sessionId: session._id, problem } });
  } catch (err) {
    next(err);
  }
});

router.post('/message', authMiddleware, async (req, res, next) => {
  try {
    const { sessionId, message, code } = req.body;
    if (!sessionId || !isValidObjectId(sessionId)) {
      return res.status(400).json({ error: 'Valid sessionId is required' });
    }
    if (!message?.trim()) return res.status(400).json({ error: 'Message is required' });

    const user = await findUserByFirebaseUid(req.firebaseUid);
    const session = await Session.findOne({ _id: sessionId, userId: user._id });
    if (!session) return res.status(404).json({ error: 'Session not found' });

    session.conversationHistory.push({ role: 'user', content: message.trim() });
    if (code) session.codeSnapshots.push({ code });

    const result = await claude.interviewMessage(
      session.company,
      session.problem,
      session.conversationHistory,
      message,
      code,
    );
    if (result.error) return res.status(502).json({ error: result.error });

    if (result.type === 'scorecard') {
      session.scorecard = result.data;
      session.endTime = new Date();
      await session.save();
      return res.json({ type: 'scorecard', data: result.data });
    }

    session.conversationHistory.push({ role: 'interviewer', content: String(result.data) });
    await session.save();
    res.json({ type: 'message', content: result.data });
  } catch (err) {
    next(err);
  }
});

router.get('/:sessionId', authMiddleware, async (req, res, next) => {
  try {
    if (!isValidObjectId(req.params.sessionId)) {
      return res.status(400).json({ error: 'Invalid session ID' });
    }
    const user = await findUserByFirebaseUid(req.firebaseUid);
    const session = await Session.findOne({ _id: req.params.sessionId, userId: user._id });
    if (!session) return res.status(404).json({ error: 'Session not found' });
    res.json({ data: session });
  } catch (err) {
    next(err);
  }
});

export default router;
