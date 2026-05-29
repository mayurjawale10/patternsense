// Animated loading placeholder block.
export default function Skeleton({ width = '100%', height = '1rem', className = '' }) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-white/10 ${className}`}
      style={{ width, height }}
    />
  );
}
