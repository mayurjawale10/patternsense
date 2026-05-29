// Small label badge for patterns, difficulty, and mistake types.
import { colors } from '../../constants/theme.js';

const variantColors = {
  pattern: colors.primary,
  difficulty: colors.amber,
  salary: colors.teal,
  mistakeType: colors.coral,
  salaryBand: colors.teal,
  default: colors.textMuted,
};

export default function Badge({ children, variant = 'default' }) {
  const bg = variantColors[variant] || variantColors.default;
  return (
    <span
      className="inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium"
      style={{ background: `${bg}22`, color: bg, border: `1px solid ${bg}44` }}
    >
      {children}
    </span>
  );
}
