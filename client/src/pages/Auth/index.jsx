// Auth page — Gmail for new users, email/password for returning users.
import { Navigate, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth.js';
import { colors } from '../../constants/theme.js';
import AuthHero from './AuthHero.jsx';
import AuthCard from './AuthCard.jsx';

export default function AuthPage() {
  const navigate = useNavigate();
  const { isAuthenticated, authReady } = useAuth();

  if (authReady && isAuthenticated) return <Navigate to="/dashboard" replace />;

  const goToDashboard = () => navigate('/dashboard', { replace: true });

  return (
    <div style={{ position: 'relative', display: 'flex', minHeight: '100vh', overflow: 'hidden', background: colors.bgDark, fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div
        style={{
          pointerEvents: 'none',
          position: 'absolute',
          inset: 0,
          opacity: 0.45,
          background: 'radial-gradient(ellipse at 20% 20%, rgba(127,119,221,0.3) 0%, transparent 55%), radial-gradient(ellipse at 80% 80%, rgba(29,158,117,0.18) 0%, transparent 55%)',
        }}
      />
      <div style={{ position: 'relative', zIndex: 10, display: 'flex', width: '100%', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', padding: '2.5rem 1.5rem', gap: '3.5rem' }}>
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <AuthHero />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <AuthCard onSuccess={goToDashboard} />
        </motion.div>
      </div>
      <style>{`
        @keyframes ps-spin { to { transform: rotate(360deg); } }
        input::placeholder { color: #52525b; }
      `}</style>
    </div>
  );
}
