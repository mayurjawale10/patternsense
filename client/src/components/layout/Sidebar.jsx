// Desktop collapsible sidebar navigation with dynamic feature links.
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { NAV_ITEMS } from '../../constants/navigation.js';
import { useProblemStore } from '../../store/problemStore.js';
import { hintsPath, comparePath } from '../../utils/problemRoutes.js';
import { colors, gradients } from '../../constants/theme.js';

function resolvePath(item, problemId) {
  if (item.path === '/hints') return hintsPath(problemId);
  if (item.path === '/compare') return comparePath(problemId);
  return item.path;
}

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const problemId = useProblemStore((s) => s.currentProblem?._id);

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 260 }}
      className="hidden h-screen flex-col border-r border-white/10 md:flex"
      style={{ background: 'rgba(11, 13, 18, 0.85)', backdropFilter: 'blur(12px)' }}
    >
      <div className="flex items-center gap-2 border-b border-white/10 p-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl" style={{ background: gradients.primary }}>
          <Sparkles className="h-5 w-5 text-white" />
        </div>
        {!collapsed && <span className="font-semibold text-white">PatternSense</span>}
      </div>
      <nav className="flex-1 space-y-0.5 overflow-y-auto p-3">
        {NAV_ITEMS.map((item) => {
          const to = resolvePath(item, problemId);
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${isActive ? 'font-medium text-white' : 'text-zinc-500 hover:text-zinc-200'}`
              }
              style={({ isActive }) => (isActive ? { background: `${colors.primary}22`, borderLeft: `2px solid ${colors.primary}` } : {})}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>
      <button
        type="button"
        onClick={() => setCollapsed(!collapsed)}
        className="m-3 flex items-center justify-center rounded-lg border border-white/10 p-2 text-zinc-500 hover:text-white"
      >
        {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </button>
    </motion.aside>
  );
}
