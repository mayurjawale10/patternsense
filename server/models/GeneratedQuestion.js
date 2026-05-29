// Mongoose model for AI-generated question sets.
import mongoose from 'mongoose';

const testCaseSchema = new mongoose.Schema({
  input: String,
  output: String,
});

const questionItemSchema = new mongoose.Schema({
  title: String,
  statement: String,
  constraints: [String],
  testCases: [testCaseSchema],
  expectedTimeComplexity: String,
  expectedSpaceComplexity: String,
  solution: String,
});

const generatedQuestionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  mode: { type: String },
  company: { type: String },
  pattern: { type: String },
  difficulty: { type: String },
  roleLevel: { type: String },
  salaryBand: { type: String },
  questions: [questionItemSchema],
  generatedAt: { type: Date, default: Date.now },
});

export default mongoose.model('GeneratedQuestion', generatedQuestionSchema);
