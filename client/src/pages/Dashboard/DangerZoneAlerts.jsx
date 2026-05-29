// Alerts for patterns below confidence threshold.
import Card from '../../components/common/Card.jsx';
import Badge from '../../components/common/Badge.jsx';
import { AlertTriangle } from 'lucide-react';
import { colors } from '../../constants/theme.js';

export default function DangerZoneAlerts({ zones = [] }) {
  if (!zones.length) {
    return (
      <Card title="Danger Zones">
        <p className="text-sm text-zinc-500">No weak patterns detected. Keep going!</p>
      </Card>
    );
  }

  return (
    <Card title="Danger Zones">
      <ul className="space-y-3">
        {zones.map((z) => (
          <li key={z.pattern} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" style={{ color: colors.coral }} />
              <span className="text-sm text-zinc-200">{z.pattern}</span>
            </div>
            <Badge variant="difficulty">{z.score}%</Badge>
          </li>
        ))}
      </ul>
    </Card>
  );
}
