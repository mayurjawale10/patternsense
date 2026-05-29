// Radar chart of pattern confidence scores.
import Card from '../../components/common/Card.jsx';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { colors } from '../../constants/theme.js';

export default function BlindSpotRadar({ data = [] }) {
  const chartData = data.slice(0, 8).map((d) => ({ subject: d.pattern?.split(' ')[0] || d.pattern, score: d.score }));

  return (
    <Card title="Pattern Mastery Radar">
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={chartData}>
            <PolarGrid stroke="rgba(255,255,255,0.1)" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: '#A1A1AA', fontSize: 11 }} />
            <Radar dataKey="score" stroke={colors.primary} fill={colors.primary} fillOpacity={0.35} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
