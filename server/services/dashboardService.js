// Aggregates dashboard metrics for a single user.
import Problem from '../models/Problem.js';
import { PATTERN_LIST } from '../constants/patterns.js';
import { patternScoresToObject } from '../utils/patternScores.js';

export async function buildDashboard(user) {
  const userId = user._id;
  const now = new Date();
  const weekAgo = new Date(now);
  weekAgo.setDate(weekAgo.getDate() - 7);

  const recentProblems = await Problem.find({ userId }).sort({ savedAt: -1 }).limit(50);
  const reviewQueue = await Problem.find({
    userId,
    nextReviewDate: { $lte: now },
  }).limit(10);

  const scores = patternScoresToObject(user.patternScores);

  const radarData = PATTERN_LIST.map((p) => ({
    pattern: p.label,
    score: scores[p.key] || 0,
  }));

  const dangerZones = radarData.filter((r) => r.score < 40 && r.score >= 0).slice(0, 5);
  const heatmap = buildHeatmap(recentProblems);

  return {
    streak: user.streak || 0,
    totalSolved: user.totalSolved || 0,
    weeklySolved: recentProblems.filter((p) => p.savedAt >= weekAgo).length,
    radarData,
    dangerZones,
    reviewQueue,
    heatmap,
    weeklyActivity: user.weeklyActivity || [],
  };
}

function buildHeatmap(problems) {
  const map = {};
  problems.forEach((p) => {
    const key = p.savedAt?.toISOString?.().slice(0, 10) || 'unknown';
    map[key] = (map[key] || 0) + 1;
  });
  return Object.entries(map).map(([date, count]) => ({ date, count }));
}
