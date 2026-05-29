// Updates user pattern confidence scores after problem analysis.
import {
  patternScoresToObject,
  patternScoresToMap,
  resolveDetectedPatterns,
} from '../utils/patternScores.js';

const PATTERN_BOOST = 3;

export function updatePatternScores(user, detectedPatterns) {
  const keys = resolveDetectedPatterns(detectedPatterns);
  const scores = patternScoresToObject(user.patternScores);
  let changed = false;

  keys.forEach((key) => {
    const next = Math.min(100, (scores[key] || 0) + PATTERN_BOOST);
    if (next !== scores[key]) changed = true;
    scores[key] = next;
  });

  if (keys.length > 0) {
    user.patternScores = patternScoresToMap(scores);
    user.totalSolved = (user.totalSolved || 0) + 1;
    user.lastActive = new Date();
    user.streak = (user.streak || 0) + 1;
  }

  return { scores, changed };
}
