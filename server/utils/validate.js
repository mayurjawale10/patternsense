// Shared request validation helpers.
import mongoose from 'mongoose';

export function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

export function parseObjectId(id, res) {
  if (!isValidObjectId(id)) {
    res.status(400).json({ error: 'Invalid ID format' });
    return null;
  }
  return id;
}

export function escapeRegex(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function clampHintLevel(level) {
  const n = parseInt(level, 10);
  if (Number.isNaN(n)) return 1;
  return Math.min(5, Math.max(1, n));
}
