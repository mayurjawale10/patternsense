// Primary action button — supports submit inside forms via type prop.
import { colors } from '../../constants/theme.js';

const variantStyles = {
  primary: { background: colors.primary, color: '#fff' },
  secondary: { background: 'transparent', border: `1px solid ${colors.borderGlass}`, color: colors.textPrimary },
  ghost: { background: 'transparent', color: colors.textMuted },
};

export default function Button({
  children,
  variant = 'primary',
  type = 'button',
  loading,
  disabled,
  onClick,
  className = '',
}) {
  const style = variantStyles[variant] || variantStyles.primary;
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition opacity-90 hover:opacity-100 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      style={style}
    >
      {loading ? 'Please wait…' : children}
    </button>
  );
}
