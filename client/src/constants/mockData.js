// Empty fallback data — all scores and counts start at zero.
import { PATTERNS } from './patterns.js';

export const mockUser = {
  name: '',
  email: '',
  targetCompany: '',
  targetRole: 'SDE1',
  streak: 0,
  totalSolved: 0,
  patternScores: Object.fromEntries(PATTERNS.map((p) => [p.key, 0])),
};

export const mockDashboard = {
  streak: 0,
  totalSolved: 0,
  weeklySolved: 0,
  radarData: PATTERNS.map((p) => ({ pattern: p.label, score: 0 })),
  dangerZones: [],
  reviewQueue: [],
  heatmap: [],
  weeklyActivity: [],
};

export const mockAnalysis = null;
export const mockThought = null;
export const mockHint = { hint: '', code: '' };

export const mockPatterns = PATTERNS.map((p) => ({
  ...p,
  score: 0,
  lastPracticed: null,
  notes: '',
}));

export const mockGeneratedQuestions = [];
export const mockInterviewSession = null;
export const mockNotes = [];
export const mockRoadmap = null;
