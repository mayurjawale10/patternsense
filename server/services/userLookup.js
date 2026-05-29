// Finds or creates a User document from Firebase UID (race-safe upsert).
import User from '../models/User.js';
import { createEmptyPatternScores } from '../utils/patternScores.js';

export async function findUserByFirebaseUid(firebaseUid) {
  let user = await User.findOne({ firebaseUid });
  if (user) return user;

  try {
    user = await User.create({
      firebaseUid,
      name: 'Learner',
      email: '',
      streak: 0,
      totalSolved: 0,
      patternScores: createEmptyPatternScores(),
    });
    return user;
  } catch (err) {
    if (err.code === 11000) {
      return User.findOne({ firebaseUid });
    }
    throw err;
  }
}
