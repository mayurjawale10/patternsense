// Helpers for reading and writing user patternScores (Map or plain object).
import { PATTERN_LIST } from '../constants/patterns.js';

const PATTERN_KEYS = PATTERN_LIST.map((p) => p.key);

const LABEL_TO_KEY = Object.fromEntries(
  PATTERN_LIST.flatMap((p) => [
    [p.key.toLowerCase(), p.key],
    [p.label.toLowerCase(), p.key],
  ]),
);

const ALIASES = {
  dp: 'dp',
  dynamicprogramming: 'dp',
  bfs: 'graphs',
  dfs: 'graphs',
  hashmap: 'arrays',
  twopointer: 'twoPointer',
  slidingwindow: 'slidingWindow',
  binarysearch: 'binarySearch',
  linkedlist: 'linkedList',
  unionfind: 'unionFind',
  topologicalsort: 'topologicalSort',
  bitmanipulation: 'bitManipulation',
};

export function createEmptyPatternScores() {
  return Object.fromEntries(PATTERN_KEYS.map((key) => [key, 0]));
}

export function patternScoresToObject(patternScores) {
  if (!patternScores) return createEmptyPatternScores();
  if (patternScores instanceof Map) {
    const obj = createEmptyPatternScores();
    patternScores.forEach((value, key) => {
      if (PATTERN_KEYS.includes(key)) obj[key] = Number(value) || 0;
    });
    return obj;
  }
  const obj = createEmptyPatternScores();
  PATTERN_KEYS.forEach((key) => {
    if (patternScores[key] !== undefined) obj[key] = Number(patternScores[key]) || 0;
  });
  return obj;
}

export function patternScoresToMap(scoresObject) {
  return new Map(Object.entries(patternScoresToObject(scoresObject)));
}

export function normalizePatternKey(raw) {
  if (!raw || typeof raw !== 'string') return null;
  const trimmed = raw.trim();
  const lower = trimmed.toLowerCase();
  if (PATTERN_KEYS.includes(trimmed)) return trimmed;
  if (LABEL_TO_KEY[lower]) return LABEL_TO_KEY[lower];
  const compact = lower.replace(/[^a-z0-9]/g, '');
  if (ALIASES[compact]) return ALIASES[compact];
  if (PATTERN_KEYS.includes(compact)) return compact;
  return null;
}

export function resolveDetectedPatterns(detectedPatterns) {
  if (!Array.isArray(detectedPatterns)) return [];
  const keys = detectedPatterns.map(normalizePatternKey).filter(Boolean);
  return [...new Set(keys)];
}
