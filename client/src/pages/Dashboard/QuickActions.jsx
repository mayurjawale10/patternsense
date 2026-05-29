// Quick navigation shortcuts from dashboard.
import { Link } from 'react-router-dom';
import Card from '../../components/common/Card.jsx';
import { ScanSearch, Sparkles, Mic } from 'lucide-react';
import { colors } from '../../constants/theme.js';

const actions = [
  { to: '/analyse', label: 'Analyse Problem', icon: ScanSearch, color: colors.primary },
  { to: '/generate', label: 'Generate Questions', icon: Sparkles, color: colors.amber },
  { to: '/interview', label: 'Mock Interview', icon: Mic, color: colors.teal },
];

export default function QuickActions() {
  return (
    <Card title="Quick Actions">
      <div className="grid gap-3 sm:grid-cols-3">
        {actions.map(({ to, label, icon: Icon, color }) => (
          <Link
            key={to}
            to={to}
            className="flex items-center gap-3 rounded-xl border border-white/10 p-4 transition hover:bg-white/5"
          >
            <Icon className="h-5 w-5" style={{ color }} />
            <span className="text-sm font-medium text-zinc-200">{label}</span>
          </Link>
        ))}
      </div>
    </Card>
  );
}
