// Firebase client initialization — safe fallback when config is missing or invalid.
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

function readFirebaseConfig() {
  const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
  const authDomain = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN;
  const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;
  if (!apiKey || !authDomain || !projectId) return null;
  return { apiKey, authDomain, projectId };
}

let auth = null;
let googleProvider = null;
let isFirebaseConfigured = false;

try {
  const config = readFirebaseConfig();
  if (config) {
    const app = initializeApp(config);
    auth = getAuth(app);
    googleProvider = new GoogleAuthProvider();
    googleProvider.setCustomParameters({ prompt: 'select_account' });
    isFirebaseConfigured = true;
  }
} catch (error) {
  console.warn('Firebase init skipped:', error.message);
}

export { auth, googleProvider, isFirebaseConfigured };
