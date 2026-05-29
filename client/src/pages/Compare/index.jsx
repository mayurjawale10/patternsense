// Compare page — approach comparison for a problem with AI-aware complexity data.
import { useParams, Link } from 'react-router-dom';
import PageWrapper from '../../components/layout/PageWrapper.jsx';
import Card from '../../components/common/Card.jsx';
import Badge from '../../components/common/Badge.jsx';
import EmptyState from '../../components/common/EmptyState.jsx';
import { useProblemStore } from '../../store/problemStore.js';
import { GitCompare, CheckCircle, XCircle } from 'lucide-react';
import { colors } from '../../constants/theme.js';

// Build approaches from the last AI analysis if available, otherwise use sensible defaults
function buildApproaches(analysis) {
  if (!analysis) {
    return [
      {
        name: 'Brute Force',
        time: 'O(n²)',
        space: 'O(1)',
        pros: ['Simple to implement', 'No extra memory'],
        cons: ['Too slow for large inputs', 'Fails time limit on n > 10⁴'],
        recommended: false,
      },
      {
        name: 'Optimal',
        time: 'O(n)',
        space: 'O(n)',
        pros: ['Linear time', 'Hash map for O(1) lookup'],
        cons: ['Extra O(n) space'],
        recommended: true,
      },
      {
        name: 'Alternative',
        time: 'O(n log n)',
        space: 'O(1)',
        pros: ['Constant space', 'Sort + two pointer'],
        cons: ['Slower than optimal', 'Modifies input order'],
        recommended: false,
      },
    ];
  }

  // Use the AI-detected best complexities to populate the optimal approach
  const optimal = {
    name: 'Optimal Approach',
    time: analysis.bestTimeComplexity || 'O(n)',
    space: analysis.bestSpaceComplexity || 'O(n)',
    pros: [analysis.approachSummary || 'AI-recommended approach'],
    cons: ['May require pattern knowledge'],
    recommended: true,
  };

  const brute = {
    name: 'Brute Force',
    time: 'O(n²)',
    space: 'O(1)',
    pros: ['Straightforward logic', 'No extra memory'],
    cons: ['Exceeds time limit for large n', 'Not interview-ready'],
    recommended: false,
  };

  const patterns = analysis.detectedPatterns || [];
  const altName = patterns.length > 1 ? `${patterns[1]} Approach` : 'Alternative';
  const alt = {
    name: altName,
    time: 'O(n log n)',
    space: 'O(1)',
    pros: ['Space-efficient', 'Different angle on the problem'],
    cons: ['Slightly slower', 'Harder to implement under pressure'],
    recommended: false,
  };

  return [brute, optimal, alt];
}

export default function ComparePage() {
  const { problemId } = useParams();
  const currentProblem = useProblemStore((s) => s.currentProblem);
  const lastAnalysis = useProblemStore((s) => s.lastAnalysis);

  const label = currentProblem?.problemText?.slice(0, 120) || `Problem ${problemId}`;
  const approaches = buildApproaches(lastAnalysis);

  if (!currentProblem) {
    return (
      <PageWrapper title="Compare Approaches">
        <EmptyState
          icon={GitCompare}
          title="No problem loaded"
          description="Analyse a problem first to compare approaches."
          action={
            <Link to="/analyse" className="text-sm text-violet-400 hover:underline">
              Go to Analyser →
            </Link>
          }
        />
      </PageWrapper>
    );
  }

  return (
    <PageWrapper title="Compare Approaches">
      <p className="mb-1 text-xs text-zinc-600 uppercase tracking-wide">Problem</p>
      <p className="mb-4 text-sm text-zinc-300 line-clamp-2">{label}</p>
      <Link to="/analyse" className="mb-6 inline-block text-sm text-violet-400 hover:underline">
        ← Back to Analyser
      </Link>

      <div className="grid gap-4 md:grid-cols-3">
        {approaches.map((a) => (
          <Card key={a.name} className={a.recommended ? 'ring-1 ring-violet-500/40' : ''}>
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-semibold text-white text-sm">{a.name}</h3>
              {a.recommended && (
                <span
                  className="rounded-full px-2 py-0.5 text-xs font-medium"
                  style={{ background: `${colors.primary}22`, color: colors.primary }}
                >
                  Recommended
                </span>
              )}
            </div>
            <div className="flex gap-2 mb-4">
              <Badge variant="pattern">Time: {a.time}</Badge>
              <Badge variant="difficulty">Space: {a.space}</Badge>
            </div>
            <div className="space-y-1 mb-3">
              {a.pros.map((p) => (
                <div key={p} className="flex items-start gap-2 text-xs text-zinc-300">
                  <CheckCircle className="mt-0.5 h-3 w-3 shrink-0" style={{ color: colors.teal }} />
                  {p}
                </div>
              ))}
            </div>
            <div className="space-y-1">
              {a.cons.map((c) => (
                <div key={c} className="flex items-start gap-2 text-xs text-zinc-500">
                  <XCircle className="mt-0.5 h-3 w-3 shrink-0" style={{ color: colors.coral }} />
                  {c}
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      {lastAnalysis?.hiddenConstraints?.length > 0 && (
        <Card title="Hidden Constraints to Watch" className="mt-6">
          <ul className="space-y-1">
            {lastAnalysis.hiddenConstraints.map((c) => (
              <li key={c} className="text-sm text-zinc-400">• {c}</li>
            ))}
          </ul>
        </Card>
      )}
    </PageWrapper>
  );
}
