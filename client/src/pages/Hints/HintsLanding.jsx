// Hints entry — routes to current problem or prompts user to analyse first.
import { Link } from 'react-router-dom';
import PageWrapper from '../../components/layout/PageWrapper.jsx';
import Card from '../../components/common/Card.jsx';
import Button from '../../components/common/Button.jsx';
import EmptyState from '../../components/common/EmptyState.jsx';
import { Lightbulb } from 'lucide-react';
import { useProblemStore } from '../../store/problemStore.js';
import { hintsPath } from '../../utils/problemRoutes.js';

export default function HintsLanding() {
  const currentProblem = useProblemStore((s) => s.currentProblem);
  const problemId = currentProblem?._id;

  return (
    <PageWrapper title="Hints">
      <Card>
        {problemId ? (
          <div className="text-center py-8">
            <p className="text-sm text-zinc-400 mb-4 line-clamp-2">{currentProblem.problemText}</p>
            <Link to={hintsPath(problemId)}>
              <Button>Open Hint Stack</Button>
            </Link>
          </div>
        ) : (
          <EmptyState
            icon={Lightbulb}
            title="No problem selected"
            description="Analyse a problem first, then unlock progressive hints."
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
