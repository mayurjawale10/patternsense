// Interview page — mock technical interview with chat and code.
import { useState } from 'react';
import PageWrapper from '../../components/layout/PageWrapper.jsx';
import Card from '../../components/common/Card.jsx';
import Button from '../../components/common/Button.jsx';
import MonacoEditor from '../../components/common/MonacoEditor.jsx';
import { startInterview, sendInterviewMessage } from '../../services/interviewService.js';
import { useSessionStore } from '../../store/sessionStore.js';
import { COMPANIES } from '../../constants/companies.js';

export default function InterviewPage() {
  const [company, setCompany] = useState('Google');
  const [message, setMessage] = useState('');
  const [code, setCode] = useState('// Write your solution here\n');
  const [loading, setLoading] = useState(false);
  const { sessionId, problem, messages, setSession, addMessage, clearSession } = useSessionStore();

  const handleStart = async () => {
    setLoading(true);
    const { data } = await startInterview({ company, role: 'SDE2', difficulty: 'Medium' });
    setSession(data.sessionId, data.problem);
    addMessage({ role: 'interviewer', content: `Let's solve: ${data.problem}` });
    setLoading(false);
  };

  const handleSend = async () => {
    if (!message.trim() || !sessionId) return;
    addMessage({ role: 'user', content: message });
    setLoading(true);
    const { data } = await sendInterviewMessage({ sessionId, message, code });
    if (data.type === 'scorecard') {
      addMessage({ role: 'system', content: `Score: ${JSON.stringify(data.data)}` });
    } else {
      addMessage({ role: 'interviewer', content: data.content });
    }
    setMessage('');
    setLoading(false);
  };

  return (
    <PageWrapper title="Mock Interview">
      {!sessionId ? (
        <Card title="Setup">
          <select value={company} onChange={(e) => setCompany(e.target.value)} className="mb-4 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white">
            {COMPANIES.map((c) => <option key={c.id}>{c.name}</option>)}
          </select>
          <Button loading={loading} onClick={handleStart}>Start Interview</Button>
        </Card>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          <Card title={problem}>
            <div className="mb-4 max-h-48 space-y-2 overflow-y-auto">
              {messages.map((m, i) => (
                <p key={i} className={`text-sm ${m.role === 'user' ? 'text-violet-300' : 'text-zinc-300'}`}>
                  <strong>{m.role}: </strong>{m.content}
                </p>
              ))}
            </div>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={2}
              className="mb-2 w-full rounded-lg border border-white/10 bg-white/5 p-2 text-sm text-white"
              placeholder="Your response…"
            />
            <div className="flex gap-2">
              <Button loading={loading} onClick={handleSend}>Send</Button>
              <Button variant="ghost" onClick={clearSession}>End</Button>
            </div>
          </Card>
          <Card title="Code">
            <MonacoEditor code={code} onChange={setCode} height={360} />
          </Card>
        </div>
      )}
    </PageWrapper>
  );
}
