// Builds feature URLs from the current problem in the store.
export function hintsPath(problemId) {
  return problemId ? `/hints/${problemId}` : '/hints';
}

export function comparePath(problemId) {
  return problemId ? `/compare/${problemId}` : '/compare';
}
