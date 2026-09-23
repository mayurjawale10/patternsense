// Returning-user form: email and password; Google fallback if Gmail account.
import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import AuthInput from './AuthInput.jsx';
import GoogleButton from './GoogleButton.jsx';
import { friendlyFirebaseError } from './authErrors.js';
import { isFirebaseConfigured } from '../../config/firebase.js';
import { gradients } from '../../constants/theme.js';

export default function SignInForm({ login, loginWithGoogle, getEmailAuthMethods, onSuccess, busy, setBusy }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [needsGoogle, setNeedsGoogle] = useState(false);
  const [loading, setLoading] = useState(false);

  const run = async (task) => {
    setError('');
    setLoading(true);
    setBusy(true);
    try {
      await task();
      onSuccess();
    } catch (err) {
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password') {
        setNeedsGoogle(true);
      }
      setError(friendlyFirebaseError(err));
    } finally {
      setLoading(false);
      setBusy(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFirebaseConfigured && (!email.trim() || password.length < 6)) {
      setError('Enter the email and password for your existing account.');
      return;
    }
    const methods = await getEmailAuthMethods(email.trim());
    if (methods.includes('google.com') && !methods.includes('password')) {
      setNeedsGoogle(true);
      setError('This account was created with Gmail. Continue with Google.');
      return;
    }
    await run(() => login(email.trim() || 'dev@patternsense.app', password || 'devpass'));
  };

  return (
    <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <AuthInput icon={Mail} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" required autoComplete="email" />
      <AuthInput
        icon={Lock}
        type={showPassword ? 'text' : 'password'}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
        minLength={6}
        autoComplete="current-password"
        rightSlot={(
          <button type="button" onClick={() => setShowPassword((v) => !v)} aria-label="Toggle password" style={{ background: 'none', border: 'none', color: '#71717a', cursor: 'pointer' }}>
            {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        )}
      />
      {error && <p style={{ margin: 0, fontSize: '0.8125rem', color: '#f87171' }}>{error}</p>}
      {needsGoogle && (
        <GoogleButton onClick={() => run(() => loginWithGoogle())} loading={loading} disabled={busy} label="Continue with Google" />
      )}
      <button type="submit" disabled={busy} style={{ height: '3rem', border: 'none', borderRadius: '0.75rem', background: busy ? 'rgba(127,119,221,0.45)' : gradients.primary, color: '#fff', fontWeight: 600, cursor: busy ? 'not-allowed' : 'pointer' }}>
        {loading ? 'Signing in…' : 'Sign In'}
      </button>
    </form>
  );
}
