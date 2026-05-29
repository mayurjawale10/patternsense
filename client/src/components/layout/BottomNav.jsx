// Mobile bottom navigation bar (screens under 768px).
import { NavLink } from 'react-router-dom';
import { MOBILE_NAV_ITEMS } from '../../constants/navigation.js';

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 flex border-t border-white/10 bg-zinc-950/95 backdrop-blur-xl md:hidden">
      {MOBILE_NAV_ITEMS.map(({ path, label, icon: Icon }) => (
        <NavLink
          key={path}
          to={path}
          className={({ isActive }) =>
            `flex flex-1 flex-col items-center gap-1 py-2 text-[10px] ${isActive ? 'text-violet-400' : 'text-zinc-500'}`
          }
        >
          <Icon className="h-5 w-5" />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
