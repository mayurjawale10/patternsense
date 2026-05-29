// Syncs Zustand theme to <html class="dark|light"> for global CSS.
import { useEffect } from 'react';
import { useUserStore } from '../store/userStore.js';

export function useThemeSync() {
  const theme = useUserStore((s) => s.theme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark', 'light');
    root.classList.add(theme === 'light' ? 'light' : 'dark');
  }, [theme]);
}
