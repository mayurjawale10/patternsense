// Compare entry — routes to current problem or prompts analyse first.
import { Link } from 'react-router-dom';
import PageWrapper from '../../components/layout/PageWrapper.jsx';
import Card from '../../components/common/Card.jsx';
import Button from '../../components/common/Button.jsx';
import EmptyState from '../../components/common/EmptyState.jsx';
import { GitCompare } from 'lucide-react';
import { useProblemStore } from '../../store/problemStore.js';
import { comparePath } from '../../utils/problemRoutes.js';

export default function CompareLanding() {
  const currentProblem = useProblemStore((s) => s.currentProblem);
  const problemId = currentProblem?._id;

  return (
    <PageWrapper title="Compare Approaches">
      <Card>
        {problemId ? (
          <div className="text-center py-8">
            <p className="text-sm text-zinc-400 mb-4 line-clamp-2">{currentProblem.problemText}</p>
            <Link to={comparePath(problemId)}>
              <Button>Compare Approaches</Button>
            </Link>
          </div>
        ) : (
          <EmptyState
            icon={GitCompare}
            title="No problem to compare"
            description="Analyse a problem to compare brute force, optimal, and alternative approaches."
            action={
              <Link to="/analyse">
                <Button>Go to Analyser</Button>
              </Link>
            }
          />
        )}
      </Card>
    </PageWrapper>
  );
}
