// GitHub-style activity heatmap for practice days.
import Card from '../../components/common/Card.jsx';
import { colors } from '../../constants/theme.js';

export default function ActivityHeatmap({ data = [] }) {
  const max = Math.max(...data.map((d) => d.count), 1);

  return (
    <Card title="Practice Heatmap">
      <div className="flex flex-wrap gap-1">
        {data.slice(0, 28).map((day) => {
          const intensity = day.count / max;
          return (
            <div
              key={day.date}
              title={`${day.date}: ${day.count} problems`}
              className="h-3 w-3 rounded-sm"
              style={{ background: `rgba(127, 119, 221, ${0.15 + intensity * 0.85})` }}
            />
          );
        })}
      </div>
      <p className="mt-3 text-xs text-zinc-500">Darker = more problems solved</p>
    </Card>
  );
}
