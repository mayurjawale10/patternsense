// Mongoose model for user notes linked to problems or patterns.
import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  content: { type: String, default: '' },
  tags: [{ type: String }],
  linkedProblemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Problem' },
  linkedPattern: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model('Note', noteSchema);
