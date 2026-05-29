// Auth routes — signup and current user profile.
import { Router } from 'express';
import User from '../models/User.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { findUserByFirebaseUid } from '../services/userLookup.js';
import { patternScoresToObject } from '../utils/patternScores.js';

const router = Router();

function formatUser(user) {
  const doc = user.toObject ? user.toObject() : user;
  return {
    ...doc,
    patternScores: patternScoresToObject(user.patternScores),
  };
}

router.post('/signup', authMiddleware, async (req, res, next) => {
  try {
    const { name, email, targetCompany, targetRole } = req.body;
    let user = await User.findOne({ firebaseUid: req.firebaseUid });
    if (!user) {
      user = await findUserByFirebaseUid(req.firebaseUid);
    }
    if (name) user.name = name;
    if (email) user.email = email;
    if (targetCompany) user.targetCompany = targetCompany;
    if (targetRole) user.targetRole = targetRole;
    await user.save();
    res.json({ data: formatUser(user) });
  } catch (err) {
    next(err);
  }
});

router.post('/me', authMiddleware, async (req, res, next) => {
  try {
    const user = await findUserByFirebaseUid(req.firebaseUid);
    res.json({ data: formatUser(user) });
  } catch (err) {
    next(err);
  }
});

export default router;
