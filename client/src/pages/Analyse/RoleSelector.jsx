// Target role dropdown for analysis context.
const ROLES = ['SDE1', 'SDE2', 'Senior', 'FAANG'];

export default function RoleSelector({ value, onChange }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-zinc-300">Target Role</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-zinc-100"
      >
        {ROLES.map((r) => (
          <option key={r} value={r}>{r}</option>
        ))}
      </select>
    </div>
  );
}
