// Cognitive mistake analysis from thought process.
import AIResponseCard from '../../components/common/AIResponseCard.jsx';
import Badge from '../../components/common/Badge.jsx';

export default function WhyDidIBlankCard({ thought }) {
  if (!thought) return null;

  return (
    <AIResponseCard title="Why Did I Blank?">
      <Badge variant="mistakeType">{thought.mistakeType}</Badge>
      <p className="mt-3">{thought.mistakeAnalysis}</p>
      <p className="mt-2 text-xs text-violet-300">Recognise: {thought.whatToRecognise}</p>
    </AIResponseCard>
  );
}
