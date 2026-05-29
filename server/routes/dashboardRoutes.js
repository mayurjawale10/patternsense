// Dashboard aggregate endpoint.
import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { findUserByFirebaseUid } from '../services/userLookup.js';
import { buildDashboard } from '../services/dashboardService.js';

const router = Router();

router.get('/', authMiddleware, async (req, res, next) => {
  try {
    const user = await findUserByFirebaseUid(req.firebaseUid);
    const data = await buildDashboard(user);
    res.json({ data });
  } catch (err) {
    next(err);
  }
});

export default router;
