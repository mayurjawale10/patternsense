// Spaced repetition review queue list.
import { Link } from 'react-router-dom';
import Card from '../../components/common/Card.jsx';
import Button from '../../components/common/Button.jsx';
import EmptyState from '../../components/common/EmptyState.jsx';
import { RotateCcw } from 'lucide-react';
import { hintsPath } from '../../utils/problemRoutes.js';

export default function ReviewQueue({ items = [] }) {
  if (!items.length) {
    return (
      <Card title="Review Queue">
        <EmptyState icon={RotateCcw} title="All caught up" description="No problems due for review today." />
      </Card>
    );
  }

  return (
    <Card title="Review Queue">
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item._id} className="flex items-center justify-between gap-2 border-b border-white/5 pb-3 last:border-0">
            <p className="line-clamp-1 text-sm text-zinc-300">{item.problemText}</p>
            <Link to={hintsPath(item._id)}>
              <Button variant="secondary">Review</Button>
            </Link>
          </li>
        ))}
      </ul>
    </Card>
  );
}
