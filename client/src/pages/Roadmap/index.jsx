// Roadmap page — personalised study calendar.
import { useEffect, useState } from 'react';
import PageWrapper from '../../components/layout/PageWrapper.jsx';
import Card from '../../components/common/Card.jsx';
import Button from '../../components/common/Button.jsx';
import Badge from '../../components/common/Badge.jsx';
import EmptyState from '../../components/common/EmptyState.jsx';
import { Map } from 'lucide-react';
import { fetchRoadmap, generateRoadmap } from '../../services/roadmapService.js';
import { useUserStore } from '../../store/userStore.js';

export default function RoadmapPage() {
  const user = useUserStore((s) => s.user);
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRoadmap().then(({ data }) => setRoadmap(data));
  }, []);

  const handleGenerate = async () => {
    setLoading(true);
    setError('');
    const { data, error: apiError } = await generateRoadmap({
      targetCompany: user?.targetCompany || 'Google',
      targetRole: user?.targetRole || 'SDE2',
      salaryBand: '40-60 LPA',
      timeline: '8 weeks',
      selfAssessment: 'Weak in graphs and DP',
    });
    setLoading(false);
    if (apiError) {
      setError(apiError);
      return;
    }
    setRoadmap(data);
  };

  const weeks = roadmap?.weeks || [];

  return (
    <PageWrapper title="Study Roadmap">
      <Button loading={loading} onClick={handleGenerate} className="mb-6">Generate Roadmap</Button>
      {error && <p className="mb-4 text-sm text-red-400">{error}</p>}
      {weeks.length === 0 && !loading && (
        <EmptyState icon={Map} title="No roadmap yet" description="Click Generate to build your personalised study plan." />
      )}
      {weeks.map((week) => (
        <Card key={week.weekNumber} title={`Week ${week.weekNumber}: ${week.focus}`} className="mb-4">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {week.days?.map((day) => (
              <div key={day.day} className="rounded-xl border border-white/10 p-4">
                <p className="text-xs text-zinc-500">Day {day.day} · {day.date}</p>
                <p className="mt-1 font-medium text-white">{day.patternFocus}</p>
                <p className="mt-2 text-sm text-zinc-400">{day.goal}</p>
                {day.completed && <Badge variant="pattern">Done</Badge>}
              </div>
            ))}
          </div>
        </Card>
      ))}
    </PageWrapper>
  );
}
