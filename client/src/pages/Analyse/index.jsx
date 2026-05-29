// Analyse page — split pane problem analyser.
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../../components/layout/PageWrapper.jsx';
import Button from '../../components/common/Button.jsx';
import { useAnalyse } from '../../hooks/useAnalyse.js';
import { comparePath, hintsPath } from '../../utils/problemRoutes.js';
import ProblemInput from './ProblemInput.jsx';
import ThoughtProcessInput from './ThoughtProcessInput.jsx';
import RoleSelector from './RoleSelector.jsx';
import PatternDetectionCard from './PatternDetectionCard.jsx';
import ComplexityCard from './ComplexityCard.jsx';
import WhyDidIBlankCard from './WhyDidIBlankCard.jsx';
import DifficultyCard from './DifficultyCard.jsx';
import HiddenConstraintsCard from './HiddenConstraintsCard.jsx';

export default function AnalysePage() {
  const [problemText, setProblemText] = useState('');
  const [thoughtProcess, setThoughtProcess] = useState('');
  const [problemUrl, setProblemUrl] = useState('');
  const [targetRole, setTargetRole] = useState('SDE2');
  const [result, setResult] = useState(null);
  const { runAnalysis, loading, error } = useAnalyse();
  const navigate = useNavigate();

  const handleAnalyse = async () => {
    const data = await runAnalysis({ problemText, thoughtProcess, problemUrl, targetRole });
    if (data) setResult(data);
  };

  const analysis = result?.analysis || result;
  const problemId = result?.problem?._id;

  return (
    <PageWrapper title="Problem Analyser">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <ProblemInput value={problemText} onChange={setProblemText} />
          <input
            value={problemUrl}
            onChange={(e) => setProblemUrl(e.target.value)}
            placeholder="Problem URL (optional)"
            className="input-field"
          />
          <ThoughtProcessInput value={thoughtProcess} onChange={setThoughtProcess} />
          <RoleSelector value={targetRole} onChange={setTargetRole} />
          {error && <p className="text-sm text-red-400">{error}</p>}
          <div className="flex flex-wrap gap-3">
            <Button loading={loading} onClick={handleAnalyse}>Analyse with AI</Button>
            {problemId && (
              <>
                <Button variant="secondary" onClick={() => navigate(hintsPath(problemId))}>
                  Get Hints
                </Button>
                <Button variant="secondary" onClick={() => navigate(comparePath(problemId))}>
                  Compare
                </Button>
              </>
            )}
          </div>
        </div>
        <div className="space-y-4">
          <PatternDetectionCard analysis={analysis} />
          <ComplexityCard analysis={analysis} />
          <WhyDidIBlankCard thought={result?.thought} />
          <DifficultyCard analysis={analysis} />
          <HiddenConstraintsCard analysis={analysis} />
        </div>
      </div>
    </PageWrapper>
  );
}
