// Top bar with theme toggle and user menu.
import { Link } from 'react-router-dom';
import { Moon, Sun, Bell } from 'lucide-react';
import { useUserStore } from '../../store/userStore.js';
import { useAuth } from '../../hooks/useAuth.js';

export default function TopBar({ title }) {
  const { theme, toggleTheme } = useUserStore();
  const { user, logout } = useAuth();
  const isDark = theme === 'dark';

  return (
    <header className="flex h-16 items-center justify-between border-b border-white/10 px-4 md:px-6">
      <h1 className="text-lg font-semibold text-white md:text-xl">{title}</h1>
      <div className="flex items-center gap-3">
        <button type="button" className="rounded-lg p-2 text-zinc-400 hover:bg-white/5" aria-label="Notifications">
          <Bell className="h-5 w-5" />
        </button>
        <button type="button" onClick={toggleTheme} className="rounded-lg p-2 text-zinc-400 hover:bg-white/5" aria-label="Toggle theme">
          {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
        <Link to="/profile" className="hidden text-sm text-zinc-400 hover:text-white md:block">
          {user?.name || 'Profile'}
        </Link>
        <button type="button" onClick={logout} className="text-xs text-violet-400 hover:underline">
          Sign out
        </button>
      </div>
    </header>
  );
}
