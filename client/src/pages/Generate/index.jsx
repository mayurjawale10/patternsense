// Generate page — AI question generator with mode tabs.
import { useState } from 'react';
import PageWrapper from '../../components/layout/PageWrapper.jsx';
import Card from '../../components/common/Card.jsx';
import Button from '../../components/common/Button.jsx';
import Badge from '../../components/common/Badge.jsx';
import AIResponseCard from '../../components/common/AIResponseCard.jsx';
import EmptyState from '../../components/common/EmptyState.jsx';
import { Sparkles } from 'lucide-react';
import { generateQuestions } from '../../services/generateService.js';
import { PATTERNS } from '../../constants/patterns.js';
import { COMPANIES } from '../../constants/companies.js';

const MODES = ['clone', 'company', 'weakness', 'progressive'];

export default function GeneratePage() {
  const [mode, setMode] = useState('company');
  const [pattern, setPattern] = useState('arrays');
  const [company, setCompany] = useState('Google');
  const [difficulty, setDifficulty] = useState('Medium');
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    setLoading(true);
    setError('');
    const { data, error: apiError } = await generateQuestions({ mode, pattern, company, difficulty, count: 3 });
    setLoading(false);
    if (apiError) {
      setError(apiError);
      return;
    }
    setQuestions(data?.questions || []);
  };

  return (
    <PageWrapper title="Question Generator">
      <div className="mb-6 flex flex-wrap gap-2">
        {MODES.map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={`rounded-lg px-4 py-2 text-sm capitalize transition ${mode === m ? 'bg-violet-600 text-white shadow-lg shadow-violet-900/30' : 'bg-white/5 text-zinc-400 hover:bg-white/10'}`}
          >
            {m}
          </button>
        ))}
      </div>
      <Card title="Configuration">
        <div className="grid gap-4 sm:grid-cols-3">
          <select value={pattern} onChange={(e) => setPattern(e.target.value)} className="input-field">
            {PATTERNS.map((p) => <option key={p.key} value={p.key}>{p.label}</option>)}
          </select>
          <select value={company} onChange={(e) => setCompany(e.target.value)} className="input-field">
            {COMPANIES.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
          </select>
          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="input-field">
            {['Easy', 'Medium', 'Hard'].map((d) => <option key={d}>{d}</option>)}
          </select>
        </div>
        {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
        <Button className="mt-4" loading={loading} onClick={handleGenerate}>Generate</Button>
      </Card>
      <div className="mt-6 space-y-4">
        {questions.length === 0 && !loading && (
          <EmptyState icon={Sparkles} title="No questions yet" description="Configure options above and hit Generate." />
        )}
        {questions.map((q) => (
          <AIResponseCard key={q.title} title={q.title}>
            <Badge variant="difficulty">{difficulty}</Badge>
            <p className="mt-2">{q.statement}</p>
          </AIResponseCard>
        ))}
      </div>
    </PageWrapper>
  );
}
