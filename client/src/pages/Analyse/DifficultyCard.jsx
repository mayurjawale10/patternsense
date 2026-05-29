// Personal difficulty rating from AI.
import Card from '../../components/common/Card.jsx';
import Badge from '../../components/common/Badge.jsx';

export default function DifficultyCard({ analysis }) {
  const level = analysis?.difficultyPersonal || analysis?.analysis?.difficultyPersonal;
  if (!level) return null;

  return (
    <Card title="Personal Difficulty">
      <Badge variant="difficulty">{level}</Badge>
      <p className="mt-2 text-xs text-zinc-500">Rated based on your skill profile</p>
    </Card>
  );
}
