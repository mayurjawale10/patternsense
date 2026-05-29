// Companies page — question bank with gap analysis.
import { useEffect, useState } from 'react';
import PageWrapper from '../../components/layout/PageWrapper.jsx';
import Card from '../../components/common/Card.jsx';
import Badge from '../../components/common/Badge.jsx';
import ConfidenceBar from '../../components/common/ConfidenceBar.jsx';
import { fetchCompanies, fetchCompanyQuestions } from '../../services/companyService.js';
import { colors } from '../../constants/theme.js';

export default function CompaniesPage() {
  const [companies, setCompanies] = useState([]);
  const [selected, setSelected] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchCompanies().then(({ data }) => {
      setCompanies(data);
      setSelected(data?.[0]);
    });
  }, []);

  useEffect(() => {
    if (!selected) return;
    fetchCompanyQuestions(selected.name).then(({ data: d }) => setData(d));
  }, [selected]);

  return (
    <PageWrapper title="Company Prep">
      <div className="grid gap-6 lg:grid-cols-4">
        <Card className="lg:col-span-1">
          <ul className="space-y-2">
            {companies.map((c) => (
              <li key={c.id}>
                <button
                  type="button"
                  onClick={() => setSelected(c)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left ${selected?.id === c.id ? 'bg-white/10' : ''}`}
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold" style={{ background: `${colors.primary}33`, color: colors.primary }}>
                    {c.logo}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-white">{c.name}</p>
                    <p className="text-xs text-zinc-500">{c.avgSalary}</p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </Card>
        <div className="space-y-4 lg:col-span-3">
          <Card title="Gap Analysis">
            <div className="space-y-3">
              {(data?.gapAnalysis || []).map((g) => (
                <div key={g.pattern}>
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="text-zinc-400">{g.pattern}</span>
                    <span className="text-zinc-500">{g.userScore}% / {g.required}%</span>
                  </div>
                  <ConfidenceBar score={g.userScore} />
                </div>
              ))}
            </div>
          </Card>
          <Card title="Question Bank">
            <ul className="divide-y divide-white/5">
              {(data?.questions || []).map((q) => (
                <li key={q.title} className="flex items-center justify-between py-3">
                  <span className="text-sm text-zinc-200">{q.title}</span>
                  <Badge variant="difficulty">{q.difficulty}</Badge>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </PageWrapper>
  );
}
