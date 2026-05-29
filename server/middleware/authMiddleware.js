// Verifies Firebase JWT and attaches firebaseUid to the request.
import { getFirebaseAdmin } from '../config/firebase.js';

const isProduction = process.env.NODE_ENV === 'production';

export async function authMiddleware(req, res, next) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing authorization token' });
  }
  const token = header.slice(7);
  const admin = getFirebaseAdmin();

  if (!admin) {
    if (isProduction) {
      return res.status(503).json({ error: 'Authentication service is not configured' });
    }
    req.firebaseUid = token === 'dev-token' ? 'dev-user' : `dev-${token.slice(0, 32)}`;
    return next();
  }

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.firebaseUid = decoded.uid;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
}
