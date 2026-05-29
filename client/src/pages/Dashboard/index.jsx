// Dashboard page — overview of learning progress.
import PageWrapper from '../../components/layout/PageWrapper.jsx';
import Skeleton from '../../components/common/Skeleton.jsx';
import EmptyState from '../../components/common/EmptyState.jsx';
import Button from '../../components/common/Button.jsx';
import { Link } from 'react-router-dom';
import { ScanSearch, TrendingUp } from 'lucide-react';
import { useDashboard } from '../../hooks/useDashboard.js';
import StatsRow from './StatsRow.jsx';
import BlindSpotRadar from './BlindSpotRadar.jsx';
import ActivityHeatmap from './ActivityHeatmap.jsx';
import DangerZoneAlerts from './DangerZoneAlerts.jsx';
import ReviewQueue from './ReviewQueue.jsx';
import QuickActions from './QuickActions.jsx';

export default function DashboardPage() {
  const { data, loading } = useDashboard();
  const isEmpty = data && data.totalSolved === 0;

  if (loading) {
    return (
      <PageWrapper title="Dashboard">
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <Skeleton height="6rem" />
            <Skeleton height="6rem" />
            <Skeleton height="6rem" />
          </div>
          <Skeleton height="16rem" />
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper title="Dashboard">
      {isEmpty && (
        <div className="glass-card mb-6 flex flex-col items-center justify-between gap-4 p-6 sm:flex-row">
          <div>
            <p className="page-title">Welcome</p>
            <h2 className="mt-1 text-lg font-semibold text-white">Your journey starts here</h2>
            <p className="mt-1 text-sm text-zinc-500">All scores begin at 0. Analyse your first problem to begin tracking.</p>
          </div>
          <Link to="/analyse">
            <Button>
              <ScanSearch className="h-4 w-4" />
              Analyse a Problem
            </Button>
          </Link>
        </div>
      )}
      <div className="space-y-6">
        <StatsRow data={data} />
        <QuickActions />
        <div className="grid gap-6 lg:grid-cols-2">
          <BlindSpotRadar data={data?.radarData} />
          {data?.heatmap?.length > 0 ? (
            <ActivityHeatmap data={data.heatmap} />
          ) : (
            <div className="glass-card flex items-center justify-center p-8">
              <EmptyState
                icon={TrendingUp}
                title="No activity yet"
                description="Your practice heatmap will appear after you analyse problems."
              />
            </div>
          )}
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <DangerZoneAlerts zones={data?.dangerZones} />
          <ReviewQueue items={data?.reviewQueue} />
        </div>
      </div>
    </PageWrapper>
  );
}
