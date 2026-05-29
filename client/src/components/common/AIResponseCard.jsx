// Card with purple left border for AI-generated content.
import { colors } from '../../constants/theme.js';

export default function AIResponseCard({ title, children }) {
  return (
    <div
      className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
      style={{ borderLeft: `3px solid ${colors.primary}` }}
    >
      {title && <p className="mb-2 text-xs font-medium uppercase tracking-wide text-zinc-400">{title}</p>}
      <div className="text-sm leading-relaxed text-zinc-200">{children}</div>
    </div>
  );
}
