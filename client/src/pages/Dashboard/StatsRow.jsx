// Dashboard stat cards row — streak, solved, weekly.
import { Flame, Target, Calendar } from 'lucide-react';
import { colors } from '../../constants/theme.js';

const statConfig = [
  { key: 'streak', label: 'Day Streak', icon: Flame, color: colors.coral },
  { key: 'totalSolved', label: 'Total Solved', icon: Target, color: colors.primary },
  { key: 'weeklySolved', label: 'This Week', icon: Calendar, color: colors.teal },
];

export default function StatsRow({ data }) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {statConfig.map(({ key, label, icon: Icon, color }) => (
        <div key={key} className="glass-card relative overflow-hidden p-5">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px"
            style={{ background: `linear-gradient(90deg, transparent, ${color}88, transparent)` }}
          />
          <div className="flex items-center justify-between">
            <div>
              <p className="page-title">{label}</p>
              <p className="mt-2 text-4xl font-bold tabular-nums text-white">{data?.[key] ?? 0}</p>
            </div>
            <div
              className="flex h-12 w-12 items-center justify-center rounded-xl"
              style={{ background: `${color}22` }}
            >
              <Icon className="h-6 w-6" style={{ color }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
