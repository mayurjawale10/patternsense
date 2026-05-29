// Hidden constraints surfaced by AI.
import Card from '../../components/common/Card.jsx';

export default function HiddenConstraintsCard({ analysis }) {
  const constraints = analysis?.hiddenConstraints || analysis?.analysis?.hiddenConstraints || [];
  if (!constraints.length) return null;

  return (
    <Card title="Hidden Constraints">
      <ul className="list-inside list-disc space-y-1 text-sm text-zinc-300">
        {constraints.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>
    </Card>
  );
}
