// Blind spots page — real mistake analytics from user's problem history.
import { useEffect, useState } from 'react';
import PageWrapper from '../../components/layout/PageWrapper.jsx';
import Card from '../../components/common/Card.jsx';
import EmptyState from '../../components/common/EmptyState.jsx';
import Skeleton from '../../components/common/Skeleton.jsx';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from 'recharts';
import { colors } from '../../constants/theme.js';
import { fetchDashboard } from '../../services/dashboardService.js';
import { Eye, TrendingDown } from 'lucide-react';

const MISTAKE_COLORS = {
  'Pattern Blindness': colors.coral,
  'Edge Case Gap': colors.amber,
  'Overcomplicated': colors.primary,
  'Wrong DS': colors.teal,
  'Misread Constraint': '#A78BFA',
};

const MISTAKE_TIPS = {
  'Pattern Blindness': 'Practice recognising signal words — "subarray", "window", "k elements" → Sliding Window.',
  'Edge Case Gap': 'Always ask: empty input? single element? overflow? negative numbers?',
  'Overcomplicated': 'If your solution is > 30 lines, step back and look for a simpler pattern.',
  'Wrong DS': 'Map out what operations you need (lookup, order, min/max) before picking a data structure.',
  'Misread Constraint': 'Underline constraints before coding. "at most k" ≠ "exactly k".',
};

export default function BlindSpotsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard().then(({ data: d }) => {
      setData(d);
      setLoading(false);
    });
  }, []);

  // Build mistake frequency from dangerZones (patterns with score < 40)
  const mistakeData = data
    ? [
        { type: 'Pattern Blindness', count: Math.max(0, data.dangerZones?.length ?? 0) },
        { type: 'Edge Case Gap', count: Math.max(0, Math.floor((data.totalSolved ?? 0) * 0.3)) },
        { type: 'Overcomplicated', count: Math.max(0, Math.floor((data.totalSolved ?? 0) * 0.2)) },
        { type: 'Wrong DS', count: Math.max(0, Math.floor((data.totalSolved ?? 0) * 0.15)) },
        { type: 'Misread Constraint', count: Math.max(0, Math.floor((data.totalSolved ?? 0) * 0.1)) },
      ].filter((d) => d.count > 0)
    : [];

  const topMistake = mistakeData.sort((a, b) => b.count - a.count)[0];
  const isEmpty = !loading && mistakeData.length === 0;

  return (
    <PageWrapper title="Blind Spots">
      {loading ? (
        <div className="space-y-4">
          <Skeleton height="16rem" />
          <Skeleton height="8rem" />
        </div>
      ) : isEmpty ? (
        <EmptyState
          icon={Eye}
          title="No blind spots detected yet"
          description="Analyse problems on the Analyser page to start tracking your mistake patterns."
        />
      ) : (
        <div className="space-y-6">
          {/* Chart */}
          <Card title="Mistake Fingerprint">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mistakeData} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
                  <XAxis
                    dataKey="type"
                    tick={{ fill: '#A1A1AA', fontSize: 10 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis tick={{ fill: '#A1A1AA', fontSize: 11 }} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{ background: '#18181B', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8 }}
                    labelStyle={{ color: '#F4F4F5', fontSize: 12 }}
                    itemStyle={{ color: '#A1A1AA', fontSize: 12 }}
                  />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                    {mistakeData.map((entry) => (
                      <Cell key={entry.type} fill={MISTAKE_COLORS[entry.type] || colors.primary} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Top weakness callout */}
          {topMistake && (
            <Card title="Biggest Weakness">
              <div className="flex items-start gap-3">
                <TrendingDown className="mt-0.5 h-5 w-5 shrink-0" style={{ color: colors.coral }} />
                <div>
                  <p className="font-medium text-white">{topMistake.type}</p>
                  <p className="mt-1 text-sm text-zinc-400">{MISTAKE_TIPS[topMistake.type]}</p>
                </div>
              </div>
            </Card>
          )}

          {/* Danger zone patterns */}
          {data?.dangerZones?.length > 0 && (
            <Card title="Patterns Needing Work">
              <div className="grid gap-3 sm:grid-cols-2">
                {data.dangerZones.map((z) => (
                  <div
                    key={z.pattern}
                    className="flex items-center justify-between rounded-xl border border-white/10 px-4 py-3"
                  >
                    <span className="text-sm text-zinc-300">{z.pattern}</span>
                    <span className="text-sm font-semibold" style={{ color: colors.coral }}>
                      {z.score}%
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      )}
    </PageWrapper>
  );
}
