// Redirects unauthenticated users to login.
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthState } from './AuthProvider.jsx';
import { colors } from '../../constants/theme.js';

function LoadingScreen() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
        background: colors.bgDark,
        color: colors.textPrimary,
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          border: `3px solid ${colors.borderGlass}`,
          borderTopColor: colors.primary,
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }}
      />
      <p style={{ fontSize: 14, color: colors.textMuted }}>Loading PatternSense…</p>
      <style>{'@keyframes spin { to { transform: rotate(360deg); } }'}</style>
    </div>
  );
}

export default function ProtectedRoute({ children }) {
  const { authReady, isAuthenticated } = useAuthState();
  const location = useLocation();

  if (!authReady) return <LoadingScreen />;
  if (!isAuthenticated) return <Navigate to="/auth" state={{ from: location }} replace />;
  return children;
}
