// Right-side auth card: sign in with email, or register with Gmail.
import { useState } from 'react';
import SignInForm from './SignInForm.jsx';
import RegisterPanel from './RegisterPanel.jsx';
import { useAuth } from '../../hooks/useAuth.js';

export default function AuthCard({ onSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [busy, setBusy] = useState(false);
  const [registerError, setRegisterError] = useState('');
  const { login, loginWithGoogle, getEmailAuthMethods } = useAuth();

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '25rem',
        borderRadius: '1.25rem',
        border: '1px solid rgba(255,255,255,0.1)',
        padding: '2rem',
        boxShadow: '0 24px 64px rgba(0,0,0,0.45)',
        background: 'linear-gradient(145deg, rgba(127,119,221,0.1) 0%, rgba(255,255,255,0.02) 100%)',
        backdropFilter: 'blur(20px)',
      }}
    >
      <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600, color: '#fff' }}>
        {isLogin ? 'Welcome back' : 'Create your account'}
      </h2>
      <p style={{ margin: '0.375rem 0 1.5rem', fontSize: '0.875rem', color: '#71717a' }}>
        {isLogin ? 'Sign in with the email and password for your existing account' : 'Register with Gmail to start at zero'}
      </p>

      {isLogin ? (
        <SignInForm
          login={login}
          loginWithGoogle={loginWithGoogle}
          getEmailAuthMethods={getEmailAuthMethods}
          onSuccess={onSuccess}
          busy={busy}
          setBusy={setBusy}
        />
      ) : (
        <RegisterPanel
          loginWithGoogle={loginWithGoogle}
          onSuccess={onSuccess}
          busy={busy}
          setBusy={setBusy}
          error={registerError}
          setError={setRegisterError}
        />
      )}

      <p style={{ margin: '1.25rem 0 0', textAlign: 'center', fontSize: '0.875rem', color: '#71717a' }}>
        {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
        <button
          type="button"
          onClick={() => { setIsLogin((v) => !v); setRegisterError(''); }}
          style={{ background: 'none', border: 'none', color: '#a78bfa', fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}
        >
          {isLogin ? 'Register with Gmail' : 'Sign in with email'}
        </button>
      </p>
    </div>
  );
}
