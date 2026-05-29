// Battle mode — create, join, submit, results.
import { Router } from 'express';
import crypto from 'crypto';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { findUserByFirebaseUid } from '../services/userLookup.js';
import { isValidObjectId } from '../utils/validate.js';
import * as claude from '../services/claudeService.js';
import Battle from '../models/Battle.js';
import Problem from '../models/Problem.js';

const router = Router();

function isParticipant(battle, userId) {
  return battle.creatorId.equals(userId) || battle.opponentId?.equals(userId);
}

router.post('/create', authMiddleware, async (req, res, next) => {
  try {
    const user = await findUserByFirebaseUid(req.firebaseUid);
    const { problemId } = req.body;
    if (!problemId || !isValidObjectId(problemId)) {
      return res.status(400).json({ error: 'Valid problemId is required' });
    }
    const problem = await Problem.findOne({ _id: problemId, userId: user._id });
    if (!problem) return res.status(404).json({ error: 'Problem not found' });

    const token = crypto.randomBytes(16).toString('hex');
    const battle = await Battle.create({
      creatorId: user._id,
      problemId,
      inviteToken: token,
      status: 'pending',
    });
    res.json({ data: { battleId: battle._id, inviteToken: token } });
  } catch (err) {
    next(err);
  }
});

router.post('/join/:token', authMiddleware, async (req, res, next) => {
  try {
    const user = await findUserByFirebaseUid(req.firebaseUid);
    const battle = await Battle.findOne({ inviteToken: req.params.token });
    if (!battle) return res.status(404).json({ error: 'Invalid invite' });
    if (battle.status === 'complete') return res.status(400).json({ error: 'Battle already finished' });
    if (battle.creatorId.equals(user._id)) return res.status(400).json({ error: 'Cannot join your own battle' });
    if (battle.opponentId && !battle.opponentId.equals(user._id)) {
      return res.status(400).json({ error: 'Battle is full' });
    }

    battle.opponentId = user._id;
    battle.status = 'active';
    battle.startTime = new Date();
    await battle.save();
    res.json({ data: battle });
  } catch (err) {
    next(err);
  }
});

router.post('/submit', authMiddleware, async (req, res, next) => {
  try {
    const user = await findUserByFirebaseUid(req.firebaseUid);
    const { battleId, code, approach, hintsUsed } = req.body;
    if (!battleId || !isValidObjectId(battleId)) {
      return res.status(400).json({ error: 'Valid battleId is required' });
    }
    const battle = await Battle.findById(battleId);
    if (!battle) return res.status(404).json({ error: 'Battle not found' });
    if (!isParticipant(battle, user._id)) {
      return res.status(403).json({ error: 'Not a participant in this battle' });
    }

    const sub = { code: code || '', approach: approach || '', hintsUsed: hintsUsed || 0 };
    if (battle.creatorId.equals(user._id)) battle.creatorSubmission = sub;
    else if (battle.opponentId?.equals(user._id)) battle.opponentSubmission = sub;

    if (battle.creatorSubmission?.code && battle.opponentSubmission?.code) {
      const problem = await Problem.findById(battle.problemId);
      const verdict = await claude.battleVerdict(
        problem?.problemText || 'DSA problem',
        battle.creatorSubmission,
        battle.opponentSubmission,
      );
      if (verdict.error) {
        battle.aiVerdict = 'Could not generate AI verdict.';
      } else {
        battle.aiVerdict = verdict.data?.verdict || 'Both submissions received.';
        if (verdict.data?.winner === 'creator') battle.winnerId = battle.creatorId;
        else if (verdict.data?.winner === 'opponent') battle.winnerId = battle.opponentId;
        else battle.winnerId = null;
      }
      battle.status = 'complete';
      battle.endTime = new Date();
    }
    await battle.save();
    res.json({ data: battle });
  } catch (err) {
    next(err);
  }
});

router.get('/:battleId', authMiddleware, async (req, res, next) => {
  try {
    const user = await findUserByFirebaseUid(req.firebaseUid);
    if (!isValidObjectId(req.params.battleId)) {
      return res.status(400).json({ error: 'Invalid battle ID' });
    }
    const battle = await Battle.findById(req.params.battleId);
    if (!battle) return res.status(404).json({ error: 'Battle not found' });
    if (!isParticipant(battle, user._id)) {
      return res.status(403).json({ error: 'Access denied' });
    }
    res.json({ data: battle });
  } catch (err) {
    next(err);
  }
});

export default router;
