// Profile page — user mastery profile from live data.
import { useEffect, useState } from 'react';
import PageWrapper from '../../components/layout/PageWrapper.jsx';
import Card from '../../components/common/Card.jsx';
import { useUserStore } from '../../store/userStore.js';
import { fetchDashboard } from '../../services/dashboardService.js';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { colors } from '../../constants/theme.js';

export default function ProfilePage() {
  const user = useUserStore((s) => s.user);
  const [radar, setRadar] = useState([]);

  useEffect(() => {
    fetchDashboard().then(({ data }) => setRadar(data?.radarData || []));
  }, []);

  return (
    <PageWrapper title="Profile">
      <Card>
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full text-2xl font-bold text-white" style={{ background: colors.primary }}>
            {(user?.name || 'U')[0].toUpperCase()}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">{user?.name || 'Learner'}</h2>
            <p className="text-sm text-zinc-500">{user?.targetCompany || 'Set target company'} · {user?.targetRole || 'SDE1'}</p>
            <p className="mt-1 text-sm text-zinc-500">Solved: {user?.totalSolved ?? 0} · Streak: {user?.streak ?? 0}</p>
          </div>
        </div>
      </Card>
      <Card title="Mastery Radar" className="mt-6">
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radar}>
              <PolarGrid stroke="rgba(255,255,255,0.1)" />
              <PolarAngleAxis dataKey="pattern" tick={{ fill: '#A1A1AA', fontSize: 10 }} />
              <Radar dataKey="score" stroke={colors.teal} fill={colors.teal} fillOpacity={0.3} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </PageWrapper>
  );
}
