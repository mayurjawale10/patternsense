// User notes CRUD.
import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { findUserByFirebaseUid } from '../services/userLookup.js';
import { isValidObjectId, escapeRegex } from '../utils/validate.js';
import Note from '../models/Note.js';

const router = Router();

router.get('/', authMiddleware, async (req, res, next) => {
  try {
    const user = await findUserByFirebaseUid(req.firebaseUid);
    const filter = { userId: user._id };
    if (req.query.search) {
      const safe = escapeRegex(String(req.query.search));
      filter.$or = [
        { title: new RegExp(safe, 'i') },
        { content: new RegExp(safe, 'i') },
      ];
    }
    const notes = await Note.find(filter).sort({ updatedAt: -1 });
    res.json({ data: notes });
  } catch (err) {
    next(err);
  }
});

router.post('/', authMiddleware, async (req, res, next) => {
  try {
    const user = await findUserByFirebaseUid(req.firebaseUid);
    const { id, title, content, tags, linkedProblemId, linkedPattern } = req.body;
    if (!title?.trim()) return res.status(400).json({ error: 'Title is required' });
    if (id && !isValidObjectId(id)) return res.status(400).json({ error: 'Invalid note ID' });

    let note;
    if (id) {
      note = await Note.findOneAndUpdate(
        { _id: id, userId: user._id },
        { title, content, tags, linkedProblemId, linkedPattern, updatedAt: new Date() },
        { new: true },
      );
      if (!note) return res.status(404).json({ error: 'Note not found' });
    } else {
      note = await Note.create({
        userId: user._id,
        title,
        content: content || '',
        tags: tags || [],
        linkedProblemId,
        linkedPattern,
      });
    }
    res.json({ data: note });
  } catch (err) {
    next(err);
  }
});

export default router;
