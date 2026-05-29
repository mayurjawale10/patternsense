// Hook exposing auth state and actions (logic lives in AuthProvider).
import { useAuthState, useAuthActions } from '../components/auth/AuthProvider.jsx';

export function useAuth() {
  const state = useAuthState();
  const actions = useAuthActions();
  return { ...state, ...actions };
}
