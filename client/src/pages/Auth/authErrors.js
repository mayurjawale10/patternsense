// Maps Firebase error codes to short user-facing messages.
export function friendlyFirebaseError(err) {
  const map = {
    'auth/user-not-found': 'No account found. Create one with Google.',
    'auth/wrong-password': 'Incorrect password. Please try again.',
    'auth/invalid-credential': 'Incorrect email or password.',
    'auth/email-already-in-use': 'This email is already registered. Sign in instead.',
    'auth/weak-password': 'Password must be at least 6 characters.',
    'auth/invalid-email': 'Please enter a valid email address.',
    'auth/too-many-requests': 'Too many attempts. Wait a moment and try again.',
    'auth/network-request-failed': 'Network error. Check your connection.',
    'auth/popup-blocked': 'Popup blocked. Allow popups for this site.',
    'auth/account-exists-with-different-credential': 'This email already has a password login. Sign in with email instead.',
  };
  return map[err.code] || err.message || 'Authentication failed. Please try again.';
}
