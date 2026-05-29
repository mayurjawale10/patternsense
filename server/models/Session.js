// Mongoose model for mock interview sessions.
import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  role: { type: String, enum: ['user', 'interviewer'] },
  content: { type: String },
  timestamp: { type: Date, default: Date.now },
});

const codeSnapshotSchema = new mongoose.Schema({
  code: { type: String },
  timestamp: { type: Date, default: Date.now },
});

const sessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  company: { type: String },
  role: { type: String },
  difficulty: { type: String },
  problem: { type: String },
  startTime: { type: Date, default: Date.now },
  endTime: { type: Date },
  conversationHistory: [messageSchema],
  codeSnapshots: [codeSnapshotSchema],
  scorecard: {
    communication: Number,
    approach: Number,
    optimisation: Number,
    edgeCases: Number,
    speed: Number,
    overallFeedback: String,
  },
});

export default mongoose.model('Session', sessionSchema);
