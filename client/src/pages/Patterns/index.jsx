// Patterns page — pattern list with confidence bars (starts at 0).
import { useEffect, useState } from 'react';
import PageWrapper from '../../components/layout/PageWrapper.jsx';
import Card from '../../components/common/Card.jsx';
import ConfidenceBar from '../../components/common/ConfidenceBar.jsx';
import Skeleton from '../../components/common/Skeleton.jsx';
import { colors } from '../../constants/theme.js';
import { fetchPatterns } from '../../services/patternService.js';

export default function PatternsPage() {
  const [patterns, setPatterns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetchPatterns().then(({ data }) => {
      setPatterns(data || []);
      setSelected(data?.[0]);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <PageWrapper title="Patterns">
        <Skeleton height="20rem" />
      </PageWrapper>
    );
  }

  return (
    <PageWrapper title="Pattern Mastery">
      <p className="mb-4 text-sm text-zinc-500">Confidence builds as you analyse and solve problems.</p>
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <ul className="max-h-[28rem] space-y-1 overflow-y-auto">
            {patterns.map((p) => (
              <li key={p.key}>
                <button
                  type="button"
                  onClick={() => setSelected(p)}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition ${selected?.key === p.key ? 'bg-white/10 text-white' : 'text-zinc-400 hover:bg-white/5'}`}
                >
                  <span>{p.label}</span>
                  <span className="tabular-nums text-xs" style={{ color: colors.primary }}>{p.score}%</span>
                </button>
              </li>
            ))}
          </ul>
        </Card>
        {selected && (
          <Card title={selected.label} className="lg:col-span-2">
            <p className="mb-2 text-sm text-zinc-500">Confidence score</p>
            <ConfidenceBar score={selected.score} />
            <p className="mt-3 text-right text-2xl font-bold tabular-nums" style={{ color: colors.primary }}>
              {selected.score}%
            </p>
            {selected.lastPracticed && (
              <p className="mt-4 text-xs text-zinc-500">Last practised: {new Date(selected.lastPracticed).toLocaleDateString()}</p>
            )}
          </Card>
        )}
      </div>
    </PageWrapper>
  );
}
