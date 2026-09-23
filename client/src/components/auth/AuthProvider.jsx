// Runs auth bootstrap once for the whole app.
import { useEffect } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  fetchSignInMethodsForEmail,
} from 'firebase/auth';
import { auth, googleProvider, isFirebaseConfigured } from '../../config/firebase.js';
import { useUserStore } from '../../store/userStore.js';
import { fetchMe, signup } from '../../services/authService.js';
import { mockUser } from '../../constants/mockData.js';

async function syncProfile(firebaseUser) {
  const name = firebaseUser.displayName || firebaseUser.email;
  const email = firebaseUser.email;
  await signup({ name, email });
  const { data } = await fetchMe();
  return data || { name, email, avatar: firebaseUser.photoURL };
}

export function useAuthActions() {
  const setUser = useUserStore((s) => s.setUser);

  const getEmailAuthMethods = async (email) => {
    if (!isFirebaseConfigured || !email) return ['password'];
    try {
      return await fetchSignInMethodsForEmail(auth, email);
    } catch {
      return [];
    }
  };

  const login = async (email, password) => {
    if (!isFirebaseConfigured) {
      setUser({ ...mockUser, email, name: email.split('@')[0] || 'Learner' });
      return;
    }
    const credential = await signInWithEmailAndPassword(auth, email, password);
    setUser(await syncProfile(credential.user));
  };

  const loginWithGoogle = async () => {
    if (!isFirebaseConfigured) {
      setUser({ ...mockUser, name: 'Google User', email: 'gmail.user@gmail.com' });
      return;
    }
    const credential = await signInWithPopup(auth, googleProvider);
    setUser(await syncProfile(credential.user));
  };

  const logout = async () => {
    if (isFirebaseConfigured) await signOut(auth);
    useUserStore.setState({ user: null, authReady: true, loading: false });
  };

  return { login, loginWithGoogle, logout, getEmailAuthMethods };
}

export function useAuthState() {
  const user = useUserStore((s) => s.user);
  const loading = useUserStore((s) => s.loading);
  const authReady = useUserStore((s) => s.authReady);
  return { user, loading, authReady, isAuthenticated: !!user };
}

export default function AuthProvider({ children }) {
  const setUser = useUserStore((s) => s.setUser);
  const setAuthReady = useUserStore((s) => s.setAuthReady);

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setAuthReady(true);
      return undefined;
    }
    let cancelled = false;
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (cancelled) return;
      if (!firebaseUser) {
        useUserStore.setState({ user: null, authReady: true, loading: false });
        return;
      }
      try {
        setUser(await syncProfile(firebaseUser));
      } catch {
        if (!cancelled) setUser({ name: firebaseUser.displayName || firebaseUser.email, email: firebaseUser.email });
      }
    });
    return () => { cancelled = true; unsub(); };
  }, [setUser, setAuthReady]);

  return children;
}
