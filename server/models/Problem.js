// Mongoose model for analysed or practised problems per user.
import mongoose from 'mongoose';

const problemSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  problemText: { type: String, required: true },
  problemUrl: { type: String, default: '' },
  detectedPatterns: [{ type: String }],
  signalWords: [{ type: String }],
  bestTimeComplexity: { type: String },
  bestSpaceComplexity: { type: String },
  hiddenConstraints: [{ type: String }],
  difficultyPlatform: { type: String },
  difficultyPersonal: { type: String },
  thoughtProcess: { type: String },
  mistakeType: { type: String },
  mistakeAnalysis: { type: String },
  hintsUsed: { type: Number, default: 0 },
  solved: { type: Boolean, default: false },
  savedAt: { type: Date, default: Date.now },
  nextReviewDate: { type: Date },
  reviewHistory: [{ type: Date }],
});

export default mongoose.model('Problem', problemSchema);
