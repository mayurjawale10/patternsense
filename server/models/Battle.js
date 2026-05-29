// Mongoose model for head-to-head problem battles.
import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema({
  code: { type: String, default: '' },
  approach: { type: String, default: '' },
  hintsUsed: { type: Number, default: 0 },
});

const battleSchema = new mongoose.Schema({
  creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  opponentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  problemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Problem' },
  inviteToken: { type: String, unique: true },
  status: { type: String, enum: ['pending', 'active', 'complete'], default: 'pending' },
  startTime: { type: Date },
  endTime: { type: Date },
  creatorSubmission: submissionSchema,
  opponentSubmission: submissionSchema,
  winnerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  aiVerdict: { type: String },
});

export default mongoose.model('Battle', battleSchema);
