// Runs auth bootstrap once for the whole app.
import { useEffect } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { auth, googleProvider, isFirebaseConfigured } from '../../config/firebase.js';
import { useUserStore } from '../../store/userStore.js';
import { fetchMe, signup } from '../../services/authService.js';
import { mockUser } from '../../constants/mockData.js';

export function useAuthActions() {
  const setUser = useUserStore((s) => s.setUser);

  const login = async (email, password) => {
    if (!isFirebaseConfigured) {
      try {
        const { data } = await fetchMe();
        setUser(data || { ...mockUser, email, name: email.split('@')[0] });
      } catch {
        setUser({ ...mockUser, email, name: email.split('@')[0] });
      }
      return;
    }
    const credential = await signInWithEmailAndPassword(auth, email, password);
    const { data } = await fetchMe();
    setUser(data || { name: credential.user.displayName || email, email: credential.user.email });
  };

  const register = async (email, password, name) => {
    if (!isFirebaseConfigured) {
      try {
        await signup({ name, email });
        const { data } = await fetchMe();
        setUser(data || { ...mockUser, name, email });
      } catch {
        setUser({ ...mockUser, name, email });
      }
      return;
    }
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    // Persist display name in Firebase so it's available on next auth state change
    await updateProfile(credential.user, { displayName: name });
    await signup({ name, email });
    const { data } = await fetchMe();
    setUser(data || { name, email: credential.user.email });
  };

  const loginWithGoogle = async () => {
    if (!isFirebaseConfigured) {
      // Dev fallback — treat as a mock Google login
      setUser({ ...mockUser, name: 'Google User', email: 'google@patternsense.app' });
      return;
    }
    const credential = await signInWithPopup(auth, googleProvider);
    const firebaseUser = credential.user;
    // Register on backend if first time (signup is idempotent)
    await signup({ name: firebaseUser.displayName || firebaseUser.email, email: firebaseUser.email });
    const { data } = await fetchMe();
    setUser(
      data || {
        name: firebaseUser.displayName || firebaseUser.email,
        email: firebaseUser.email,
        avatar: firebaseUser.photoURL,
      },
    );
  };

  const logout = async () => {
    if (isFirebaseConfigured) await signOut(auth);
    useUserStore.setState({ user: null, authReady: true, loading: false });
  };

  return { login, register, loginWithGoogle, logout };
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
    let cancelled = false;

    if (!isFirebaseConfigured) {
      setAuthReady(true);
      return undefined;
    }

    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (cancelled) return;
      if (!firebaseUser) {
        useUserStore.setState({ user: null, authReady: true, loading: false });
        return;
      }
      try {
        const { data } = await fetchMe();
        if (!cancelled)
          setUser(
            data || {
              name: firebaseUser.displayName || firebaseUser.email,
              email: firebaseUser.email,
              avatar: firebaseUser.photoURL,
            },
          );
      } catch {
        if (!cancelled)
          setUser({
            name: firebaseUser.displayName || firebaseUser.email,
            email: firebaseUser.email,
            avatar: firebaseUser.photoURL,
          });
      }
    });

    return () => {
      cancelled = true;
      unsub();
    };
  }, [setUser, setAuthReady]);

  return children;
}
