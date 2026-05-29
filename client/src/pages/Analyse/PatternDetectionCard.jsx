// Shows detected DSA patterns from analysis.
import Card from '../../components/common/Card.jsx';
import Badge from '../../components/common/Badge.jsx';
import AIResponseCard from '../../components/common/AIResponseCard.jsx';

export default function PatternDetectionCard({ analysis }) {
  if (!analysis) return null;
  const patterns = analysis.detectedPatterns || analysis.analysis?.detectedPatterns || [];

  return (
    <AIResponseCard title="Pattern Detection">
      <div className="flex flex-wrap gap-2">
        {patterns.map((p) => (
          <Badge key={p} variant="pattern">{p}</Badge>
        ))}
      </div>
      {analysis.signalWords?.length > 0 && (
        <p className="mt-3 text-xs text-zinc-500">
          Signal words: {analysis.signalWords.join(', ')}
        </p>
      )}
    </AIResponseCard>
  );
}
