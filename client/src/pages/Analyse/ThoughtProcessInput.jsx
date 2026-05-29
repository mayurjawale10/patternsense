// Optional thought process textarea for cognitive analysis.
export default function ThoughtProcessInput({ value, onChange }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-zinc-300">Your Thought Process (optional)</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        placeholder="What did you try? Where did you get stuck?"
        className="w-full resize-none rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-violet-500 focus:outline-none"
      />
    </div>
  );
}
