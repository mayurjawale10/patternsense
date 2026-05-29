// Computes next review date based on hints used when solving.
export function getNextReviewDate(hintsUsed) {
  const now = new Date();
  const days = hintsUsed === 0 ? 14 : hintsUsed <= 2 ? 7 : 3;
  const next = new Date(now);
  next.setDate(next.getDate() + days);
  return next;
}
