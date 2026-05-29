// Green-to-red confidence score bar (0-100).
import { colors } from '../../constants/theme.js';

export default function ConfidenceBar({ score = 0 }) {
  const clamped = Math.max(0, Math.min(100, score));
  const barColor = clamped >= 70 ? colors.teal : clamped >= 40 ? colors.amber : colors.coral;

  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{ width: `${clamped}%`, background: barColor }}
      />
    </div>
  );
}
