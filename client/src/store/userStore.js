// Zustand store for authenticated user profile.
import { create } from 'zustand';

export const useUserStore = create((set) => ({
  user: null,
  loading: false,
  authReady: false,
  theme: 'dark',
  setUser: (user) => set({ user, loading: false, authReady: true }),
  setLoading: (loading) => set({ loading }),
  setAuthReady: (authReady) => set({ authReady, loading: false }),
  toggleTheme: () => set((s) => ({ theme: s.theme === 'dark' ? 'light' : 'dark' })),
}));
