// Time and space complexity from AI analysis.
import AIResponseCard from '../../components/common/AIResponseCard.jsx';

export default function ComplexityCard({ analysis }) {
  if (!analysis) return null;
  const a = analysis.analysis || analysis;

  return (
    <AIResponseCard title="Optimal Complexity">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-zinc-500">Time</p>
          <p className="font-mono text-lg text-white">{a.bestTimeComplexity}</p>
        </div>
        <div>
          <p className="text-xs text-zinc-500">Space</p>
          <p className="font-mono text-lg text-white">{a.bestSpaceComplexity}</p>
        </div>
      </div>
      {a.approachSummary && <p className="mt-3 text-sm text-zinc-400">{a.approachSummary}</p>}
    </AIResponseCard>
  );
}
