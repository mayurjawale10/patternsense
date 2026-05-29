// Mongoose model for user profile and pattern confidence scores.
import mongoose from 'mongoose';
import { createEmptyPatternScores } from '../utils/patternScores.js';

const weeklyActivitySchema = new mongoose.Schema({
  date: { type: Date },
  count: { type: Number, default: 0 },
});

const userSchema = new mongoose.Schema({
  firebaseUid: { type: String, required: true, unique: true },
  name: { type: String, default: '' },
  email: { type: String, default: '' },
  targetCompany: { type: String, default: '' },
  targetRole: { type: String, default: 'SDE1' },
  streak: { type: Number, default: 0 },
  lastActive: { type: Date },
  totalSolved: { type: Number, default: 0 },
  weeklyActivity: [weeklyActivitySchema],
  patternScores: {
    type: Map,
    of: Number,
    default: () => new Map(Object.entries(createEmptyPatternScores())),
  },
  patternNotes: { type: Map, of: String, default: () => new Map() },
  roadmap: { type: mongoose.Schema.Types.Mixed },
});

export default mongoose.model('User', userSchema);
