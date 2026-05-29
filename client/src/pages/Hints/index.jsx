// Hints page — progressive hint unlock stack.
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageWrapper from '../../components/layout/PageWrapper.jsx';
import Card from '../../components/common/Card.jsx';
import Button from '../../components/common/Button.jsx';
import AIResponseCard from '../../components/common/AIResponseCard.jsx';
import { HINT_LEVELS } from '../../constants/hints.js';
import { fetchHint } from '../../services/problemService.js';

export default function HintsPage() {
  const { problemId } = useParams();
  const [unlocked, setUnlocked] = useState(0);
  const [hints, setHints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const unlockNext = async () => {
    const level = unlocked + 1;
    if (level > 5) return;
    setLoading(true);
    setError('');
    const { data, error: apiError } = await fetchHint(problemId, level);
    setLoading(false);
    if (apiError) {
      setError(apiError);
      return;
    }
    setHints((h) => [...h, { level, ...data }]);
    setUnlocked(level);
  };

  return (
    <PageWrapper title="Progressive Hints">
      <p className="mb-4 text-sm text-zinc-500">
        <Link to="/analyse" className="text-violet-400 hover:underline">← Back to Analyser</Link>
      </p>
      <Card title="Hint Stack">
        {error && <p className="mb-3 text-sm text-red-400">{error}</p>}
        <div className="space-y-4">
          {HINT_LEVELS.map((meta) => {
            const hint = hints.find((h) => h.level === meta.level);
            if (meta.level > unlocked && !hint) return null;
            return (
              <motion.div key={meta.level} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
                {hint ? (
                  <AIResponseCard title={`Level ${meta.level}: ${meta.title}`}>
                    <p>{hint.hint}</p>
                    {hint.code && (
                      <pre className="mt-3 overflow-x-auto rounded-lg bg-black/40 p-3 text-xs">{hint.code}</pre>
                    )}
                  </AIResponseCard>
                ) : (
                  <p className="text-sm text-zinc-600">Locked — unlock level {meta.level} below</p>
                )}
              </motion.div>
            );
          })}
        </div>
        {unlocked < 5 && (
          <Button className="mt-6" loading={loading} onClick={unlockNext}>
            Unlock Level {unlocked + 1}
          </Button>
        )}
      </Card>
    </PageWrapper>
  );
}
