// Auth form input with icon, focus ring, and optional right-side control.
import { useState } from 'react';
import { colors } from '../../constants/theme.js';

export default function AuthInput({
  icon: Icon,
  type = 'text',
  value,
  onChange,
  placeholder,
  required,
  minLength,
  autoComplete,
  rightSlot,
}) {
  const [focused, setFocused] = useState(false);
  const border = focused ? colors.primary : 'rgba(255,255,255,0.1)';

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        height: '3rem',
        overflow: 'hidden',
        borderRadius: '0.75rem',
        border: `1.5px solid ${border}`,
        background: focused ? 'rgba(127,119,221,0.07)' : 'rgba(255,255,255,0.04)',
      }}
    >
      <span style={{ display: 'flex', width: '2.75rem', justifyContent: 'center', color: focused ? colors.primary : '#71717a' }}>
        <Icon size={15} />
      </span>
      <input
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        required={required}
        minLength={minLength}
        autoComplete={autoComplete}
        style={{
          flex: 1,
          minWidth: 0,
          height: '100%',
          border: 'none',
          outline: 'none',
          background: 'transparent',
          color: '#f4f4f5',
          fontSize: '0.875rem',
          fontFamily: 'Inter, system-ui, sans-serif',
        }}
      />
      {rightSlot && (
        <span style={{ display: 'flex', width: '2.75rem', justifyContent: 'center' }}>{rightSlot}</span>
      )}
    </div>
  );
}
