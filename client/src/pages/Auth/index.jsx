// Auth page — Google sign-in or email/password login & registration.
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Target, Zap, Eye, EyeOff, Mail, Lock, User, AlertCircle } from 'lucide-react';
import Button from '../../components/common/Button.jsx';
import { useAuth } from '../../hooks/useAuth.js';
import { isFirebaseConfigured } from '../../config/firebase.js';
import { colors, gradients } from '../../constants/theme.js';

const features = [
  { icon: Target, text: 'Pattern detection from any problem' },
  { icon: Zap, text: 'Scores start at zero — grow with every solve' },
];

// Google "G" logo as inline SVG — no external dependency needed
function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z"
      />
      <path
        fill="#FBBC05"
        d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z"
      />
    </svg>
  );
}

function InputField({ icon: Icon, type = 'text', value, onChange, placeholder, required, minLength, autoComplete, rightSlot }) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">
        <Icon size={16} />
      </span>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        minLength={minLength}
        autoComplete={autoComplete}
        className="input-field pl-9 pr-10"
      />
      {rightSlot && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2">{rightSlot}</span>
      )}
    </div>
  );
}

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const navigate = useNavigate();
  const { login, register, loginWithGoogle, isAuthenticated, authReady } = useAuth();

  if (authReady && isAuthenticated) return <Navigate to="/dashboard" replace />;

  const goToDashboard = () => navigate('/dashboard', { replace: true });

  // ── Google sign-in ──────────────────────────────────────────────────────────
  const handleGoogle = async () => {
    setGoogleLoading(true);
    setError('');
    try {
      await loginWithGoogle();
      goToDashboard();
    } catch (err) {
      // User closed the popup — don't show an error
      if (err.code !== 'auth/popup-closed-by-user' && err.code !== 'auth/cancelled-popup-request') {
        setError(err.message || 'Google sign-in failed. Please try again.');
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  // ── Email / password submit ─────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Client-side validation
    if (isFirebaseConfigured) {
      if (!email.trim()) { setError('Email is required.'); return; }
      if (!password) { setError('Password is required.'); return; }
      if (password.length < 6) { setError('Password must be at least 6 characters.'); return; }
      if (!isLogin && !name.trim()) { setError('Please enter your name.'); return; }
    }

    setLoading(true);
    try {
      if (!isFirebaseConfigured) {
        // Dev / demo mode — bypass real auth
        const devName = name.trim() || 'Learner';
        if (isLogin) await login('dev@patternsense.app', 'dev');
        else await register('dev@patternsense.app', 'dev', devName);
        goToDashboard();
        return;
      }
      if (isLogin) await login(email.trim(), password);
      else await register(email.trim(), password, name.trim());
      goToDashboard();
    } catch (err) {
      setError(friendlyFirebaseError(err));
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setIsLogin((v) => !v);
    setError('');
    setEmail('');
    setPassword('');
    setName('');
  };

  return (
    <div className="relative flex min-h-screen overflow-hidden" style={{ background: colors.bgDark }}>
      {/* Background glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            'radial-gradient(ellipse at 20% 20%, rgba(127,119,221,0.25) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(29,158,117,0.15) 0%, transparent 50%)',
        }}
      />

      <div className="relative z-10 flex w-full flex-col items-center justify-center p-6 lg:flex-row lg:gap-16">
        {/* ── Left: branding ── */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10 max-w-md lg:mb-0"
        >
          <div className="mb-6 flex items-center gap-3">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-2xl"
              style={{ background: gradients.primary }}
            >
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <span className="text-3xl font-bold text-white">PatternSense</span>
          </div>
          <h1 className="text-4xl font-bold leading-tight text-white">
            Master DSA patterns.<br />
            <span style={{ color: colors.primary }}>Land your dream role.</span>
          </h1>
          <p className="mt-4 text-zinc-400">AI-powered prep for FAANG and top Indian product companies.</p>
          <ul className="mt-8 space-y-3">
            {features.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3 text-sm text-zinc-300">
                <Icon className="h-4 w-4 shrink-0" style={{ color: colors.teal }} />
                {text}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* ── Right: auth card ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="w-full max-w-md rounded-2xl border border-white/10 p-8 shadow-2xl"
          style={{ background: gradients.card }}
        >
          {/* Header */}
          <h2 className="text-xl font-semibold text-white">
            {isLogin ? 'Welcome back' : 'Create your account'}
          </h2>
          <p className="mt-1 text-sm text-zinc-500">
            {isLogin ? 'Sign in to continue your prep journey' : 'Start tracking your DSA progress today'}
          </p>

          {/* ── Google button ── */}
          <button
            type="button"
            onClick={handleGoogle}
            disabled={googleLoading || loading}
            className="mt-6 flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {googleLoading ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            ) : (
              <GoogleIcon />
            )}
            {googleLoading ? 'Signing in…' : 'Continue with Google'}
          </button>

          {/* ── Divider ── */}
          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-xs text-zinc-600">or use email</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          {/* ── Email / password form ── */}
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <AnimatePresence initial={false}>
              {!isLogin && (
                <motion.div
                  key="name-field"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ overflow: 'hidden' }}
                >
                  <InputField
                    icon={User}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full name"
                    required={!isLogin}
                    autoComplete="name"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <InputField
              icon={Mail}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              required
              autoComplete={isLogin ? 'email' : 'email'}
            />

            <InputField
              icon={Lock}
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={isLogin ? 'Password' : 'Password (min 6 characters)'}
              required
              minLength={6}
              autoComplete={isLogin ? 'current-password' : 'new-password'}
              rightSlot={
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="text-zinc-500 hover:text-zinc-300 transition"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              }
            />

            {/* Error message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="flex items-start gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2"
                >
                  <AlertCircle size={14} className="mt-0.5 shrink-0 text-red-400" />
                  <p className="text-xs text-red-400">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <Button type="submit" loading={loading} disabled={googleLoading} className="w-full justify-center py-3">
              {isLogin ? 'Sign In' : 'Create Account'}
            </Button>
          </form>

          {/* ── Toggle login / register ── */}
          <p className="mt-5 text-center text-sm text-zinc-500">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button
              type="button"
              onClick={switchMode}
              className="font-medium text-violet-400 hover:text-violet-300 hover:underline transition"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

// Map Firebase error codes to human-readable messages
function friendlyFirebaseError(err) {
  const map = {
    'auth/user-not-found': 'No account found with this email. Please sign up.',
    'auth/wrong-password': 'Incorrect password. Please try again.',
    'auth/invalid-credential': 'Incorrect email or password. Please try again.',
    'auth/email-already-in-use': 'An account with this email already exists. Sign in instead.',
    'auth/weak-password': 'Password is too weak. Use at least 6 characters.',
    'auth/invalid-email': 'Please enter a valid email address.',
    'auth/too-many-requests': 'Too many failed attempts. Please wait a moment and try again.',
    'auth/network-request-failed': 'Network error. Check your connection and try again.',
    'auth/popup-blocked': 'Popup was blocked by your browser. Please allow popups for this site.',
  };
  return map[err.code] || err.message || 'Authentication failed. Please try again.';
}
