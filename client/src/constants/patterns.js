// 22 DSA patterns with metadata for UI and maps.
export const PATTERNS = [
  { key: 'arrays', label: 'Arrays', color: '#7F77DD', category: 'fundamentals' },
  { key: 'twoPointer', label: 'Two Pointer', color: '#1D9E75', category: 'fundamentals' },
  { key: 'slidingWindow', label: 'Sliding Window', color: '#EF9F27', category: 'fundamentals' },
  { key: 'binarySearch', label: 'Binary Search', color: '#7F77DD', category: 'fundamentals' },
  { key: 'stack', label: 'Stack', color: '#1D9E75', category: 'fundamentals' },
  { key: 'queue', label: 'Queue', color: '#EF9F27', category: 'fundamentals' },
  { key: 'linkedList', label: 'Linked List', color: '#D85A30', category: 'fundamentals' },
  { key: 'trees', label: 'Trees', color: '#7F77DD', category: 'structures' },
  { key: 'graphs', label: 'Graphs', color: '#1D9E75', category: 'structures' },
  { key: 'heap', label: 'Heap', color: '#EF9F27', category: 'structures' },
  { key: 'trie', label: 'Trie', color: '#D85A30', category: 'structures' },
  { key: 'unionFind', label: 'Union Find', color: '#7F77DD', category: 'structures' },
  { key: 'topologicalSort', label: 'Topological Sort', color: '#1D9E75', category: 'structures' },
  { key: 'dp', label: 'Dynamic Programming', color: '#EF9F27', category: 'techniques' },
  { key: 'greedy', label: 'Greedy', color: '#D85A30', category: 'techniques' },
  { key: 'backtracking', label: 'Backtracking', color: '#7F77DD', category: 'techniques' },
  { key: 'bitManipulation', label: 'Bit Manipulation', color: '#1D9E75', category: 'techniques' },
  { key: 'math', label: 'Math', color: '#EF9F27', category: 'techniques' },
];

export function getPatternByKey(key) {
  return PATTERNS.find((p) => p.key === key);
}
