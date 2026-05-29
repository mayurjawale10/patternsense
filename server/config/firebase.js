// Initializes Firebase Admin SDK for JWT verification.
import admin from 'firebase-admin';

let initialized = false;

export function initFirebase() {
  if (initialized) return admin;
  const { FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY } = process.env;
  if (!FIREBASE_PROJECT_ID || !FIREBASE_CLIENT_EMAIL || !FIREBASE_PRIVATE_KEY) {
    console.warn('Firebase credentials missing — auth middleware will skip verify in dev');
    return null;
  }
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: FIREBASE_PROJECT_ID,
      clientEmail: FIREBASE_CLIENT_EMAIL,
      privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    }),
  });
  initialized = true;
  return admin;
}

export function getFirebaseAdmin() {
  return initialized ? admin : null;
}
