// New-account panel — Gmail / Google is the only registration path.
import GoogleButton from './GoogleButton.jsx';
import { friendlyFirebaseError } from './authErrors.js';
import { colors } from '../../constants/theme.js';

export default function RegisterPanel({ loginWithGoogle, onSuccess, busy, setBusy, setError, error }) {
  const handleGoogle = async () => {
    setError('');
    setBusy(true);
    try {
      await loginWithGoogle();
      onSuccess();
    } catch (err) {
      if (err.code !== 'auth/popup-closed-by-user' && err.code !== 'auth/cancelled-popup-request') {
        setError(friendlyFirebaseError(err));
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <p style={{ margin: '0 0 1.25rem', fontSize: '0.875rem', color: '#a1a1aa', lineHeight: 1.6 }}>
        New accounts are created with your Gmail. If you already registered, go back and sign in with email and password.
      </p>
      <GoogleButton onClick={handleGoogle} loading={busy} disabled={busy} label="Register with Google" />
      {error && <p style={{ margin: '0.75rem 0 0', fontSize: '0.8125rem', color: colors.coral }}>{error}</p>}
    </div>
  );
}
