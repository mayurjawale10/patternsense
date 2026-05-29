// Notes page — personal notes with search.
import { useEffect, useState } from 'react';
import PageWrapper from '../../components/layout/PageWrapper.jsx';
import Card from '../../components/common/Card.jsx';
import Button from '../../components/common/Button.jsx';
import EmptyState from '../../components/common/EmptyState.jsx';
import { StickyNote } from 'lucide-react';
import { fetchNotes, saveNote } from '../../services/noteService.js';

export default function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    fetchNotes(search).then(({ data }) => setNotes(data || []));
  }, [search]);

  const handleSave = async () => {
    const { data } = await saveNote({ id: selected?._id, title, content });
    setNotes((n) => {
      const exists = n.find((x) => x._id === data._id);
      if (exists) return n.map((x) => (x._id === data._id ? data : x));
      return [data, ...n];
    });
    setSelected(data);
  };

  return (
    <PageWrapper title="Notes">
      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search notes…"
            className="mb-3 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
          />
          {notes.length === 0 ? (
            <EmptyState icon={StickyNote} title="No notes" description="Create your first note." />
          ) : (
            <ul className="space-y-1">
              {notes.map((n) => (
                <li key={n._id}>
                  <button type="button" onClick={() => { setSelected(n); setTitle(n.title); setContent(n.content); }} className="w-full rounded-lg px-2 py-2 text-left text-sm text-zinc-300 hover:bg-white/5">
                    {n.title}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </Card>
        <Card className="lg:col-span-2" title="Editor">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="mb-3 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white" />
          <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={12} className="w-full rounded-lg border border-white/10 bg-white/5 p-3 text-sm text-white" />
          <Button className="mt-3" onClick={handleSave}>Save Note</Button>
        </Card>
      </div>
    </PageWrapper>
  );
}
