// Glassmorphism card wrapper with optional title.
export default function Card({ title, children, className = '' }) {
  return (
    <div className={`glass-card p-5 ${className}`}>
      {title && <h3 className="mb-3 text-sm font-semibold text-zinc-100">{title}</h3>}
      {children}
    </div>
  );
}
