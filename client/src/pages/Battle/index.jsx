// Battle page — create room, join with token, submit code.
import { useState } from 'react';
import PageWrapper from '../../components/layout/PageWrapper.jsx';
import Card from '../../components/common/Card.jsx';
import Button from '../../components/common/Button.jsx';
import EmptyState from '../../components/common/EmptyState.jsx';
import { Swords, Copy, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { colors } from '../../constants/theme.js';
import { useProblemStore } from '../../store/problemStore.js';
import { createBattle, joinBattle, submitBattle } from '../../services/battleService.js';

export default function BattlePage() {
  const currentProblem = useProblemStore((s) => s.currentProblem);
  const [inviteToken, setInviteToken] = useState('');
  const [joinInput, setJoinInput] = useState('');
  const [battle, setBattle] = useState(null);
  const [code, setCode] = useState('');
  const [approach, setApproach] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleCreate = async () => {
    if (!currentProblem?._id) {
      setError('Analyse a problem first — Battle needs a linked problem.');
      return;
    }
    setLoading(true);
    setError('');
    const { data, error: apiError } = await createBattle(currentProblem._id);
    setLoading(false);
    if (apiError) {
      setError(apiError);
      return;
    }
    setInviteToken(data.inviteToken);
    setBattle({ _id: data.battleId, status: 'pending' });
  };

  const handleJoin = async () => {
    if (!joinInput.trim()) {
      setError('Paste an invite token.');
      return;
    }
    setLoading(true);
    setError('');
    const { data, error: apiError } = await joinBattle(joinInput.trim());
    setLoading(false);
    if (apiError) {
      setError(apiError);
      return;
    }
    setBattle(data);
  };

  const handleSubmit = async () => {
    if (!battle?._id) return;
    setLoading(true);
    setError('');
    const { data, error: apiError } = await submitBattle(battle._id, { code, approach, hintsUsed: 0 });
    setLoading(false);
    if (apiError) {
      setError(apiError);
      return;
    }
    setBattle(data);
  };

  const copyInvite = () => {
    navigator.clipboard.writeText(inviteToken);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <PageWrapper title="Battle Mode">
      {error && <p className="mb-4 text-sm text-red-400">{error}</p>}

      {!currentProblem?._id && (
        <Card className="mb-6">
          <EmptyState
            icon={Swords}
            title="No problem loaded"
            description="Analyse a problem on the Analyser page, then create a battle."
            action={
              <Link to="/analyse">
                <Button>Go to Analyser</Button>
              </Link>
            }
          />
        </Card>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="Create Battle">
          <p className="mb-4 text-sm text-zinc-500">Host a room and share the invite token with a friend.</p>
          <Button loading={loading} onClick={handleCreate} disabled={!currentProblem?._id}>
            Create Battle
          </Button>
          {inviteToken && (
            <div className="mt-4 flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 p-3">
              <code className="flex-1 truncate text-xs text-violet-300">{inviteToken}</code>
              <button type="button" onClick={copyInvite} className="text-zinc-400 hover:text-white">
                {copied ? <Check className="h-4 w-4" style={{ color: colors.teal }} /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
          )}
        </Card>

        <Card title="Join Battle">
          <input
            value={joinInput}
            onChange={(e) => setJoinInput(e.target.value)}
            placeholder="Paste invite token"
            className="input-field mb-3"
          />
          <Button variant="secondary" loading={loading} onClick={handleJoin}>
            Join Battle
          </Button>
        </Card>
      </div>

      {battle?.status === 'active' && (
        <Card title="Your Submission" className="mt-6">
          <textarea
            value={approach}
            onChange={(e) => setApproach(e.target.value)}
            placeholder="Describe your approach…"
            rows={2}
            className="input-field mb-3"
          />
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Paste your solution code…"
            rows={6}
            className="input-field mb-3 font-mono text-xs"
          />
          <Button loading={loading} onClick={handleSubmit}>Submit Solution</Button>
        </Card>
      )}

      {battle?.status === 'complete' && (
        <Card title="Battle Result" className="mt-6">
          <p className="text-sm text-zinc-300">{battle.aiVerdict}</p>
        </Card>
      )}
    </PageWrapper>
  );
}
